// טיפוסים משותפים לכל מערכת הלמידה

export type DiagramKind = "cpu-inside" | "cpu-pch";

export type Block =
  | { type: "p"; text: string }
  | { type: "term"; term: string; hebrew: string; explanation: string }
  | { type: "bullets"; items: string[] }
  | { type: "remember"; items: string[] }
  | { type: "tip"; title?: string; text: string }
  | { type: "diagram"; kind: DiagramKind }
  | { type: "questions"; items: { q: string; a: string }[] };

export interface LessonSection {
  id: string;
  eyebrow: string; // תווית קטנה מעל הכותרת, למשל "שלב 1 · מה זה?"
  title: string;
  blocks: Block[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
  quiz: QuizQuestion[];
}

export interface GlossaryTerm {
  id: string;
  en: string;
  he: string;
  explanation: string;
  example?: string;
}

export interface QuizResult {
  score: number;
  total: number;
  date: string; // ISO
}

export interface Progress {
  completedLessons: string[];
  // עד איזה חלק בשיעור הגיע המשתמש (אינדקס הכרטיס האחרון שנצפה)
  sectionReached: Record<string, number>;
  quizResults: Record<string, QuizResult>;
  learnedTerms: string[];
  lastLessonId: string | null;
}
