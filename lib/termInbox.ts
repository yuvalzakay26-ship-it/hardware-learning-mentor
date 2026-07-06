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
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מסלול תקשורת שדרכו רכיבים מעבירים נתונים. מונח בסיסי — מתאים כמושג במילון, לא כשיעור נפרד.",
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
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "כל מה שבמעבד שאינו הליבות עצמן (בקר זיכרון, cache משותף, ממשקים). מונח מתקדם — מתאים כמושג, עם הערה שזה נושא לעומק בהמשך.",
  },
  {
    id: "inbox-transistor",
    rawUserInput: "Transistor",
    normalizedTerm: "Transistor",
    confidence: "high",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מתג זעיר — הלבנה הבסיסית ביותר של כל שבב. מתאים כמושג בסיסי במילון, אפשר גם ככרטיס פתיחה בשלב הבסיס.",
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
    notesHebrew: "כבר מכוסה בשיעור המעבד ובמילון. אין צורך בפעולה נוספת מעבר לתחזוקה.",
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
    notesHebrew: "מילה נרדפת ל-CPU. מכוסה במלואה בשיעור הראשון ובמילון.",
  },
  {
    id: "inbox-atom-core",
    rawUserInput: "Atom Core",
    normalizedTerm: "Atom Core (E-Core)",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "ליבה 'חסכונית' בארכיטקטורה היברידית (מול ליבת ביצועים). השם המדויק והשימוש בצוות דורשים אימות — לסמן מתקדם.",
  },
  {
    id: "inbox-b-core",
    rawUserInput: "B-Core",
    normalizedTerm: "B-Core",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מונח לא ודאי — ייתכן שמדובר ב'Big Core'/ליבת ביצועים או בשם פנימי. לא להוסיף למילון עד אימות ברור מול הצוות.",
  },
  {
    id: "inbox-module-atom",
    rawUserInput: "Module of 4 Atom Cores",
    normalizedTerm: "Module (of 4 Atom Cores)",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "קבוצה של 4 ליבות Atom שחולקות משאבים (למשל cache). התלוי במונח Atom Core הלא-ודאי — לאמת את שניהם יחד לפני הוספה.",
  },
];

export function getInboxTerm(id: string): InboxTerm | undefined {
  return termInbox.find((t) => t.id === id);
}
