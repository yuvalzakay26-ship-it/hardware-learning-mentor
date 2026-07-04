import type { Confidence, Progress, UnclearReason } from "./types";

const STORAGE_KEY = "hlm-progress-v1";

export const emptyProgress: Progress = {
  completedLessons: [],
  sectionReached: {},
  confidence: {},
  learnedTerms: [],
  lastLessonId: null,
  personalNotes: {},
  unclearReasons: {},
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
    // שדות חדשים (personalNotes, unclearReasons) עשויים לא להתקיים בגרסאות
    // ישנות של ההתקדמות — לכן מאתחלים אותם בבטחה, בלי לפגוע בשאר הנתונים.
    return {
      completedLessons: parsed.completedLessons ?? [],
      sectionReached: parsed.sectionReached ?? {},
      confidence: parsed.confidence ?? {},
      learnedTerms: parsed.learnedTerms ?? [],
      lastLessonId: parsed.lastLessonId ?? null,
      personalNotes: parsed.personalNotes ?? {},
      unclearReasons: parsed.unclearReasons ?? {},
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
  // הסיבה ל"לא הבנתי" רלוונטית רק כשהכרטיס מסומן "unsure". אם יצא ממצב זה,
  // מנקים אותה כדי לא להשאיר נתון יתום.
  const unclearReasons = { ...p.unclearReasons };
  if (confidence[key] !== "unsure") {
    delete unclearReasons[key];
  }
  const next: Progress = { ...p, confidence, unclearReasons };
  saveProgress(next);
  return next;
}

/**
 * מסמן כרטיס כ"הבנתי עכשיו" מתוך אזור החזרה. משנה את תחושת הביטחון ל"got"
 * ומסיר את הסיבה שנשמרה — אבל לא נוגע בהערה האישית של הכרטיס.
 */
export function markUnderstoodNow(lessonId: string, sectionId: string): Progress {
  const p = loadProgress();
  const key = `${lessonId}:${sectionId}`;
  const confidence = { ...p.confidence, [key]: "got" as Confidence };
  const unclearReasons = { ...p.unclearReasons };
  delete unclearReasons[key];
  const next: Progress = { ...p, confidence, unclearReasons };
  saveProgress(next);
  return next;
}

/**
 * שומר סיבה אופציונלית לכך שהכרטיס לא הובן עד הסוף. לחיצה חוזרת על אותה
 * סיבה מבטלת אותה. זה לא ציון — רק רמז שיעזור לך לדעת מה חסר בחזרה.
 */
export function setUnclearReason(
  lessonId: string,
  sectionId: string,
  reason: UnclearReason
): Progress {
  const p = loadProgress();
  const key = `${lessonId}:${sectionId}`;
  const unclearReasons = { ...p.unclearReasons };
  if (unclearReasons[key] === reason) {
    delete unclearReasons[key];
  } else {
    unclearReasons[key] = reason;
  }
  const next: Progress = { ...p, unclearReasons };
  saveProgress(next);
  return next;
}

/**
 * שומר הערה אישית לכרטיס לימוד (moduleId + sectionId). הערה ריקה נמחקת,
 * כדי לא להשאיר ערכים ריקים במחברת. לא נוגע בשום התקדמות אחרת.
 */
export function setNote(
  lessonId: string,
  sectionId: string,
  text: string
): Progress {
  const p = loadProgress();
  const trimmed = text.trim();
  const lessonNotes = { ...(p.personalNotes[lessonId] ?? {}) };
  if (trimmed) {
    lessonNotes[sectionId] = trimmed;
  } else {
    delete lessonNotes[sectionId];
  }
  const personalNotes = { ...p.personalNotes };
  if (Object.keys(lessonNotes).length > 0) {
    personalNotes[lessonId] = lessonNotes;
  } else {
    delete personalNotes[lessonId];
  }
  const next: Progress = { ...p, personalNotes };
  saveProgress(next);
  return next;
}

/** מוחק הערה אישית מכרטיס — בלי לגעת בהתקדמות, בביטחון או במושגים. */
export function deleteNote(lessonId: string, sectionId: string): Progress {
  return setNote(lessonId, sectionId, "");
}

/** שולף את ההערה האישית של כרטיס מסוים, אם קיימת. */
export function getNote(
  progress: Progress,
  lessonId: string,
  sectionId: string
): string {
  return progress.personalNotes[lessonId]?.[sectionId] ?? "";
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
