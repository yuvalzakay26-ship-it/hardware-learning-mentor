// "תיבת מונחים נכנסים" — Backlog מובנה למונחים חדשים שצצים בסרטוני העבודה,
// לפני שהם הופכים לשיעור או למושג רשמי במילון.
//
// חשוב: אף אחד מהמונחים כאן אינו "שיעור פעיל". זו רשימת המתנה בלבד. המטרה
// היא מקום בטוח לרשום מונח כפי שנשמע, לסמן עד כמה אנחנו בטוחים בו, ולהחליט
// בהמשך אם הוא הופך למושג במילון, לשיעור, או דורש אימות מול הצוות.

import type { StageId } from "./curriculum";

/** עד כמה אנחנו בטוחים במשמעות המדויקת של המונח כרגע. */
export type TermConfidence = "high" | "medium" | "needs-confirmation";

/** קטגוריה גסה לצורך מיון — מקבילה רופפת לקטגוריות המילון. */
export type InboxCategory =
  | "cpu"
  | "board"
  | "memory"
  | "io"
  | "firmware"
  | "environment"
  | "debug"
  | "validation";

export interface InboxTerm {
  id: string;
  /** איך המשתמש שמע/רשם את המונח מהסרטון (הקלט הגולמי). */
  rawUserInput: string;
  /** הצורה המנורמלת/התקנית של המונח. */
  normalizedTerm: string;
  confidence: TermConfidence;
  category: InboxCategory;
  /** לאיזה שלב במסלול המונח כנראה שייך, אם ברור. */
  suggestedStage: StageId | null;
  /** האם המונח כבר מכוסה בחומר קיים (מילון/שיעור). */
  alreadyCovered: boolean;
  shouldAddToGlossary: boolean;
  shouldBecomeLesson: boolean;
  /** דורש אימות מול הצוות / תיעוד פנימי לפני שמסתמכים עליו. */
  needsTeamConfirmation: boolean;
  /** הערות בעברית: מה ידוע, מה לא ברור, ומה כדאי לבדוק. */
  notesHebrew: string;
}

export const termInbox: InboxTerm[] = [
  {
    id: "inbox-mch",
    rawUserInput: "MCH",
    normalizedTerm: "MCH (Memory Controller Hub)",
    confidence: "needs-confirmation",
    category: "board",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מונח ישן/פלטפורמי — בפלטפורמות מודרניות בקר הזיכרון עבר לתוך המעבד. כדאי לאמת מול הצוות איך משתמשים במונח בהקשר הספציפי שלנו.",
  },
  {
    id: "inbox-bus",
    rawUserInput: "Bus",
    normalizedTerm: "Bus",
    confidence: "high",
    category: "board",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "טופל: נוסף כמושג במילון ומוסבר בשיעור 'יסודות המעבד' (cpu-foundations). מסלול תקשורת שדרכו רכיבים מעבירים נתונים.",
  },
  {
    id: "inbox-gfx",
    rawUserInput: "GFX / Graphics Interface",
    normalizedTerm: "GFX (Graphics Interface)",
    confidence: "medium",
    category: "io",
    suggestedStage: "architecture",
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "ממשק הגרפיקה של המעבד. השימוש המדויק (GFX מול iGPU מול ממשק PCIe לכרטיס מסך) עשוי להשתנות לפי ההקשר — כדאי לאמת מול הצוות.",
  },
  {
    id: "inbox-pcie",
    rawUserInput: "PCI Express / PCIe",
    normalizedTerm: "PCIe (PCI Express)",
    confidence: "high",
    category: "io",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "תקן חיבור מהיר בין המעבד/הצ'יפסט לרכיבים (כרטיסי מסך, SSD מסוג NVMe ועוד). כבר מוזכר בשיעור CPU ו-PCH.",
  },
  {
    id: "inbox-uncore",
    rawUserInput: "Uncore",
    normalizedTerm: "Uncore",
    confidence: "medium",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "טופל: נוסף כמושג במילון (רמת ביניים) ומוסבר בשיעור 'יסודות המעבד' (cpu-foundations), עם הערה שהגבולות המדויקים משתנים בין פלטפורמות.",
  },
  {
    id: "inbox-transistor",
    rawUserInput: "Transistor",
    normalizedTerm: "Transistor",
    confidence: "high",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "טופל: נוסף כמושג בסיסי במילון ומוסבר בפתיחת שיעור 'יסודות המעבד' (cpu-foundations) — מתג זעיר, הלבנה הבסיסית של כל שבב.",
  },
  {
    id: "inbox-threads",
    rawUserInput: "Threads",
    normalizedTerm: "Thread",
    confidence: "high",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מכוסה במילון, בשיעור המעבד וכעת גם בשיעור 'יסודות המעבד' (cpu-foundations). אין צורך בפעולה נוספת מעבר לתחזוקה.",
  },
  {
    id: "inbox-processor",
    rawUserInput: "Processor",
    normalizedTerm: "Processor / CPU",
    confidence: "high",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מילה נרדפת ל-CPU. נוסף כמושג נפרד במילון ומכוסה בשיעור 'יסודות המעבד' (cpu-foundations) ובשיעור המעבד.",
  },
  {
    id: "inbox-atom-core",
    rawUserInput: "Atom Core",
    normalizedTerm: "Atom Core (E-Core)",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה חלקית: נוסף למילון (רמת 'פנימי · דורש אימות') ומוסבר בזהירות בשיעור 'יסודות המעבד' (cpu-foundations). ליבה חסכונית/יעילה — המשמעות המדויקת בהקשר הצוות/הפלטפורמה עדיין דורשת אימות מול הצוות.",
  },
  {
    id: "inbox-b-core",
    rawUserInput: "B-Core",
    normalizedTerm: "B-Core",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה חלקית ובזהירות: נוסף למילון ולשיעור 'יסודות המעבד' (cpu-foundations) מסומן במפורש כ'דורש אימות' — לא מוגדר כעובדה. ייתכן 'Big Core'/ליבת ביצועים או שם פנימי. עדיין דורש אימות ברור מול הצוות.",
  },
  {
    id: "inbox-module-atom",
    rawUserInput: "Module of 4 Atom Cores",
    normalizedTerm: "Module (of 4 Atom Cores)",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה חלקית ובזהירות: מושג 'Module' נוסף למילון (רמת 'פנימי · דורש אימות') ומוסבר בשיעור 'יסודות המעבד' (cpu-foundations). המשמעות המדויקת של 'Module of 4 Atom Cores' תלויה במונח Atom Core — לאמת את שניהם יחד מול הצוות/התיעוד.",
  },

  // ── מונחי שחרור/מוכנות של Central Workflow (Backlog בלבד) ──────────────────
  // מיוצגים גם ב-lib/learningPaths.ts כ-plannedTerms של מסלול central. כאן הם
  // נרשמים ב-Backlog לפי תקן: שם מלא באנגלית, ראשי תיבות, והסבר בעברית. אף אחד
  // אינו שיעור פעיל, ורובם דורשים אימות מול הצוות לפני שמסתמכים עליהם.
  {
    id: "inbox-hwqrc",
    rawUserInput: "HWQRC",
    normalizedTerm: "Hardware Quality Release Criteria (HWQRC)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "קריטריוני איכות חומרה לשחרור — אוסף התנאים שהחומרה צריכה לעמוד בהם כדי שאפשר לשחרר. שייך למסלול Central Workflow. המשמעות המדויקת דורשת אימות מול הצוות / התיעוד הפנימי.",
  },
  {
    id: "inbox-qs",
    rawUserInput: "QS",
    normalizedTerm: "Qualification Samples (QS)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "דגימות הסמכה / דגימות Qualification — יחידות חומרה בשלב מתקדם המשמשות לבדיקות לפני שחרור. מסלול Central Workflow. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-prq",
    rawUserInput: "PRQ",
    normalizedTerm: "Product Release Qualification (PRQ)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "הסמכת שחרור מוצר — שלב אישור סופי לפני שחרור ללקוחות. מסלול Central Workflow. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-es1",
    rawUserInput: "ES1",
    normalizedTerm: "Engineering Sample 1 (ES1)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "דגימה הנדסית ראשונה — גרסה הנדסית מוקדמת של החומרה לשלבי הבדיקה הראשונים. מסלול Central Workflow. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-es2",
    rawUserInput: "ES2",
    normalizedTerm: "Engineering Sample 2 (ES2)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "דגימה הנדסית שנייה — מאוחרת יותר מ-ES1, קרובה יותר למוצר הסופי. מסלול Central Workflow. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-mock",
    rawUserInput: "Mock",
    normalizedTerm: "Mock",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "שלב הכנה / בדיקת מוכנות — ריצת חזרה לפני עבודה מלאה. מסלול Central Workflow. המשמעות המדויקת דורשת אימות מול הצוות.",
  },
  {
    id: "inbox-power-on",
    rawUserInput: "Power On",
    normalizedTerm: "Power On",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "הדלקה ראשונה / הפעלה ראשונית של המערכת — הרגע שבו נותנים חשמל ובודקים שהיא עולה. מסלול Central Workflow. דורש אימות מול הצוות לגבי ההקשר המדויק.",
  },
  {
    id: "inbox-attempt",
    rawUserInput: "Attempt",
    normalizedTerm: "Attempt",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "אחוז או כמות הבדיקות שנוסו / הורצו. מסלול Central Workflow. דורש אימות מול הצוות לגבי אופן החישוב המדויק.",
  },
  {
    id: "inbox-pass",
    rawUserInput: "Pass",
    normalizedTerm: "Pass",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: null,
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "אחוז או כמות הבדיקות שעברו בהצלחה. מסלול Central Workflow. דורש אימות מול הצוות לגבי אופן החישוב המדויק.",
  },
];

export function getInboxTerm(id: string): InboxTerm | undefined {
  return termInbox.find((t) => t.id === id);
}
