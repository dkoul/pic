import type { ProfileType } from '../data/profiles';
import type { AssessmentAnswers } from './scoring';
import { generateShareId } from './scoring';

export interface LocalAssessment {
  id: string;
  createdAt: string;
  craftScore: number;
  organizationScore: number;
  profile: ProfileType;
  reflection: string | null;
  answers: AssessmentAnswers;
  publicId: string;
}

const STORAGE_KEY = 'pic_assessments';

function readAll(): LocalAssessment[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function writeAll(assessments: LocalAssessment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
}

export function saveLocalAssessment(assessment: Omit<LocalAssessment, 'id' | 'publicId'>): LocalAssessment {
  const all = readAll();
  const record: LocalAssessment = {
    ...assessment,
    id: crypto.randomUUID(),
    publicId: generateShareId(),
  };
  all.unshift(record);
  writeAll(all);
  return record;
}

export function getLocalAssessments(): LocalAssessment[] {
  return readAll();
}

export function getLocalAssessmentById(id: string): LocalAssessment | undefined {
  return readAll().find((a) => a.id === id);
}

export function getLocalAssessmentByPublicId(publicId: string): LocalAssessment | undefined {
  return readAll().find((a) => a.publicId === publicId);
}

export function updateLocalReflection(id: string, reflection: string) {
  const all = readAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx >= 0) {
    all[idx].reflection = reflection;
    writeAll(all);
  }
}

export function deleteLocalAssessment(id: string) {
  writeAll(readAll().filter((a) => a.id !== id));
}
