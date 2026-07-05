// טיפוסים משותפים לכל מערכת הלמידה

export type DiagramKind =
  | "cpu-inside"
  | "cpu-pch"
  | "host-sut-frame"
  | "host-sut-ssh"
  | "boot-flow"
  | "post-flow"
  | "target-devices"
  | "typec-flow"
  | "debug-flow"
  | "env-flow"
  | "thermal-flow"
  | "ttk-flow"
  | "power-splitter-flow"
  | "thermal-sensor"
  | "debug-connector";

export type Block =
  | { type: "p"; text: string }
  | { type: "term"; term: string; hebrew: string; explanation: string }
  | { type: "bullets"; items: string[] }
  | { type: "remember"; items: string[] }
  | { type: "mistakes"; items: string[] } // טעויות נפוצות בהבנה
  | { type: "tip"; title?: string; text: string }
  | { type: "diagram"; kind: DiagramKind }
  | { type: "image"; visualId: string } // תמונה אמיתית מתוך lib/visuals.ts
  | { type: "questions"; items: { q: string; a: string }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };

export interface LessonSection {
  id: string;
  eyebrow: string; // תווית קטנה מעל הכותרת, למשל "שלב 1 · מה זה?"
  title: string;
  blocks: Block[];
}

export interface Module {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  chipLabel: string; // הכיתוב על "השבב" בכרטיס המודול, למשל CPU
  minutes: number; // הערכת זמן לימוד בדקות
  available: boolean;
  sections: LessonSection[];
}

// קטגוריות המושגים — לסינון וארגון באזור "מושגים"
export type TermCategory =
  | "cpu" // מעבד
  | "board" // לוח אם
  | "memory" // זיכרון
  | "io" // תקשורת
  | "firmware" // קושחה / BIOS
  | "environment" // סביבת בדיקה (Host, SUT, Frame, Target)
  | "debug" // חיבורי Debug ושליטה מרחוק
  | "validation"; // ולידציה

export interface GlossaryTerm {
  id: string;
  en: string;
  he: string;
  category: TermCategory;
  explanation: string;
  example?: string; // דוגמה מהחומרה האמיתית
  workplace?: string; // "איפה פוגשים את זה בעבודה?"
  related?: string[]; // מזהי מונחים קשורים
}

// רמת ביטחון של הלומד בכרטיס לימוד — ללא ציון, רק תחושה אישית
export type Confidence = "got" | "unsure";

// סיבה אופציונלית לכך שכרטיס לא הובן עד הסוף — עוזרת למקד את החזרה
export type UnclearReason =
  | "example" // צריך דוגמה
  | "ask-at-work" // צריך לשאול בעבודה
  | "unclear-term" // מושג לא ברור
  | "review-again"; // צריך לחזור על זה שוב

export interface Progress {
  completedLessons: string[];
  // עד איזה חלק בשיעור הגיע המשתמש (אינדקס הכרטיס האחרון שנצפה)
  sectionReached: Record<string, number>;
  // תחושת הביטחון בכל כרטיס: מפתח "moduleId:sectionId" → "got" | "unsure"
  confidence: Record<string, Confidence>;
  learnedTerms: string[];
  lastLessonId: string | null;
  // המחברת האישית: הערה חופשית לכל כרטיס — personalNotes[moduleId][sectionId] = טקסט
  personalNotes: Record<string, Record<string, string>>;
  // סיבה אופציונלית ל"לא הבנתי עד הסוף": מפתח "moduleId:sectionId" → סיבה
  unclearReasons: Record<string, UnclearReason>;
}
