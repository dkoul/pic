import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { useAssessment } from '../hooks/useAssessment';
import { useAuth } from '../hooks/useAuth';

export function Assessment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentIndex,
    currentQuestion,
    answers,
    progress,
    started,
    isComplete,
    startAssessment,
    selectAnswer,
    goBack,
    saveAssessment,
    totalQuestions,
  } = useAssessment();

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!started) startAssessment();
  }, [started, startAssessment]);

  useEffect(() => {
    if (isComplete && !saving) {
      setSaving(true);
      saveAssessment(user).then((record) => {
        if (record) {
          navigate(`/results/${record.id}`);
        }
      });
    }
  }, [isComplete, saving, saveAssessment, user, navigate]);

  if (!currentQuestion) return null;

  const selectedAnswerId = answers[currentQuestion.id];

  return (
    <div className="form-wrap">
      <div className="form-kicker">Professional Identity Compass</div>
      <ProgressBar progress={progress} />
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedAnswerId={selectedAnswerId}
        onSelect={selectAnswer}
      />
      <div className="form-nav">
        <button
          className="back-link"
          onClick={goBack}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
        >
          ← Previous
        </button>
        {saving && <span style={{ fontSize: 13, color: 'var(--mid)' }}>Calculating your compass…</span>}
      </div>
      <p className="disclaimer" style={{ marginTop: 40 }}>
        This is a self-reflection tool. There are no right or wrong answers. Your responses describe
        patterns, not objective truths about who you are.
      </p>
    </div>
  );
}
