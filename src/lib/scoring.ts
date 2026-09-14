import type { ProfileType } from '../data/profiles';
import { questions } from '../data/questions';

export interface AssessmentAnswers {
  [questionId: number]: string;
}

export interface Scores {
  craft: number;
  organization: number;
}

export const PROFILE_THRESHOLD = 55;

export function calculateScores(answers: AssessmentAnswers): Scores {
  let craftTotal = 0;
  let organizationTotal = 0;
  let maxCraft = 0;
  let maxOrganization = 0;

  for (const question of questions) {
    for (const answer of question.answers) {
      maxCraft += answer.craftWeight;
      maxOrganization += answer.organizationWeight;
    }

    const selectedAnswerId = answers[question.id];
    if (!selectedAnswerId) continue;

    const selected = question.answers.find((a) => a.id === selectedAnswerId);
    if (selected) {
      craftTotal += selected.craftWeight;
      organizationTotal += selected.organizationWeight;
    }
  }

  const craft = maxCraft > 0 ? Math.round((craftTotal / maxCraft) * 100) : 0;
  const organization = maxOrganization > 0 ? Math.round((organizationTotal / maxOrganization) * 100) : 0;

  return { craft, organization };
}

export function determineProfile(scores: Scores, threshold = PROFILE_THRESHOLD): ProfileType {
  const highCraft = scores.craft >= threshold;
  const highOrg = scores.organization >= threshold;

  if (highCraft && highOrg) return 'integrator';
  if (highCraft && !highOrg) return 'builder';
  if (!highCraft && highOrg) return 'navigator';
  return 'operator';
}

export function generateShareId(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
