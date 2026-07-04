import type { Confidence, Progress } from "./types";

const STORAGE_KEY = "hlm-progress-v1";

export const emptyProgress: Progress = {
  completedLessons: [],
  sectionReached: {},
  confidence: {},
  learnedTerms: [],
  lastLessonId: null,
};

/**
 * טוען התקדמות מ-localStorage.
 * מיגרציה בטוחה: גרסאות ישנות של האפליקציה שמרו כאן גם נתוני מבחנים
 * (quizResults). אנחנו פשוט מתעלמים מהם — נשמרים רק השדות המוכרים,
 * כך שהאפליקציה לא נשברת גם אם קיים מידע ישן.
 */
export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<Progress> & Record<string, unknown>;
    // בונים אובייקט נקי מהשדות המוכרים בלבד — נתוני מבחנים ישנים נזרקים.
    return {
      completedLessons: parsed.completedLessons ?? [],
      sectionReached: parsed.sectionReached ?? {},
      confidence: parsed.confidence ?? {},
      learnedTerms: parsed.learnedTerms ?? [],
      lastLessonId: parsed.lastLessonId ?? null,
    };
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

/**
 * מחזיר את מיקום הקריאה בשיעור לכרטיס הראשון (אינדקס 0), בלי לפגוע בשום
 * התקדמות אחרת: שיעורים שהושלמו, תחושת הביטחון והמושגים שנלמדו נשארים כמו שהם.
 * משמש לכפתור «לתחילת השיעור».
 */
export function resetSectionToStart(lessonId: string): Progress {
  const p = loadProgress();
  const next: Progress = {
    ...p,
    sectionReached: { ...p.sectionReached, [lessonId]: 0 },
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

/**
 * שומר את תחושת הביטחון בכרטיס לימוד. לחיצה חוזרת על אותה תחושה מבטלת אותה.
 * זה לא ציון ולא מבחן — רק סימון אישי שעוזר לדעת על מה כדאי לחזור.
 */
export function setConfidence(
  lessonId: string,
  sectionId: string,
  value: Confidence
): Progress {
  const p = loadProgress();
  const key = `${lessonId}:${sectionId}`;
  const confidence = { ...p.confidence };
  if (confidence[key] === value) {
    delete confidence[key];
  } else {
    confidence[key] = value;
  }
  const next: Progress = { ...p, confidence };
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
