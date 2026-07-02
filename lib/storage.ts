import type { Progress, QuizResult } from "./types";

const STORAGE_KEY = "hlm-progress-v1";

export const emptyProgress: Progress = {
  completedLessons: [],
  sectionReached: {},
  quizResults: {},
  learnedTerms: [],
  lastLessonId: null,
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...emptyProgress, ...parsed };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // אחסון מלא או חסום — ממשיכים בלי לשמור
  }
}

export function markSectionReached(lessonId: string, index: number): Progress {
  const p = loadProgress();
  const current = p.sectionReached[lessonId] ?? 0;
  const next: Progress = {
    ...p,
    sectionReached: { ...p.sectionReached, [lessonId]: Math.max(current, index) },
    lastLessonId: lessonId,
  };
  saveProgress(next);
  return next;
}

export function markLessonCompleted(lessonId: string): Progress {
  const p = loadProgress();
  const next: Progress = {
    ...p,
    completedLessons: p.completedLessons.includes(lessonId)
      ? p.completedLessons
      : [...p.completedLessons, lessonId],
    lastLessonId: lessonId,
  };
  saveProgress(next);
  return next;
}

export function saveQuizResult(lessonId: string, result: QuizResult): Progress {
  const p = loadProgress();
  const previous = p.quizResults[lessonId];
  // שומרים את התוצאה הטובה ביותר
  const best =
    previous && previous.score / previous.total > result.score / result.total
      ? previous
      : result;
  const next: Progress = {
    ...p,
    quizResults: { ...p.quizResults, [lessonId]: best },
  };
  saveProgress(next);
  return next;
}

export function toggleTermLearned(termId: string): Progress {
  const p = loadProgress();
  const learned = p.learnedTerms.includes(termId)
    ? p.learnedTerms.filter((t) => t !== termId)
    : [...p.learnedTerms, termId];
  const next: Progress = { ...p, learnedTerms: learned };
  saveProgress(next);
  return next;
}
