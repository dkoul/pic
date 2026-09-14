import { useCallback, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { ProfileType } from '../data/profiles';
import { questions } from '../data/questions';
import {
  calculateScores,
  determineProfile,
  generateShareId,
  type AssessmentAnswers,
} from '../lib/scoring';
import { supabase } from '../lib/supabase';
import { saveLocalAssessment, type LocalAssessment } from '../lib/storage';
import { trackEvent } from '../lib/analytics';

export function useAssessment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [started, setStarted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (answers[currentQuestion?.id] ? 1 : 0)) / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  const startAssessment = useCallback(() => {
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    trackEvent('assessment_started');
  }, []);

  const selectAnswer = useCallback(
    (answerId: string) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }));
      trackEvent('question_answered', { question: currentQuestion.id });

      if (currentIndex < questions.length - 1) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 200);
      }
    },
    [currentQuestion, currentIndex],
  );

  const goBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) setCurrentIndex(index);
  }, []);

  const getResults = useCallback(() => {
    const scores = calculateScores(answers);
    const profile = determineProfile(scores);
    return { scores, profile };
  }, [answers]);

  const saveAssessment = useCallback(
    async (user: User | null, reflection: string | null = null): Promise<LocalAssessment | null> => {
      const { scores, profile } = getResults();
      trackEvent('assessment_completed', { profile });

      const answerRecords = Object.entries(answers).map(([qId, aId]) => ({
        question_id: Number(qId),
        answer_id: aId,
      }));

      if (supabase && user) {
        const publicId = generateShareId();
        const { data: assessment, error } = await supabase
          .from('assessments')
          .insert({
            user_id: user.id,
            craft_score: scores.craft,
            organization_score: scores.organization,
            profile,
            reflection,
            public_id: publicId,
          })
          .select()
          .single();

        if (error) {
          console.error('Failed to save assessment:', error.message);
        } else if (assessment) {
          await supabase.from('assessment_answers').insert(
            answerRecords.map((a) => ({
              assessment_id: assessment.id,
              question_id: a.question_id,
              answer_id: a.answer_id,
            })),
          );
          return {
            id: assessment.id,
            createdAt: assessment.created_at,
            craftScore: scores.craft,
            organizationScore: scores.organization,
            profile: profile as ProfileType,
            reflection,
            answers,
            publicId,
          };
        }
      }

      return saveLocalAssessment({
        createdAt: new Date().toISOString(),
        craftScore: scores.craft,
        organizationScore: scores.organization,
        profile: profile as ProfileType,
        reflection,
        answers,
      });
    },
    [answers, getResults],
  );

  const retake = useCallback(() => {
    trackEvent('assessment_retaken');
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
  }, []);

  return {
    currentIndex,
    currentQuestion,
    answers,
    progress,
    started,
    isComplete,
    startAssessment,
    selectAnswer,
    goBack,
    goToQuestion,
    getResults,
    saveAssessment,
    retake,
    totalQuestions: questions.length,
  };
}
