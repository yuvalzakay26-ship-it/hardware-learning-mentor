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
      "כוסה בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונוסף למילון כמונח היסטורי. מונח ישן/פלטפורמי — בפלטפורמות מודרניות בקר הזיכרון עבר לתוך המעבד. עדיין דורש אימות מול הצוות: האם זה מושג היסטורי בלבד או בלוק רלוונטי לפלטפורמה שלנו.",
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
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בזהירות בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונוסף למילון (רמת 'פנימי · דורש אימות צוות'). ממשק/נתיב גרפי. השימוש המדויק (GFX מול GSX מול iGPU מול ממשק PCIe לכרטיס מסך) עשוי להשתנות לפי ההקשר — לא להגדיר כעובדה בלי אימות מול הצוות.",
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
      "תקן חיבור מהיר בין המעבד/הצ'יפסט לרכיבים (כרטיסי מסך, SSD מסוג NVMe ועוד). מוזכר בשיעור CPU ו-PCH, ומורחב בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) יחד עם Lane ו-Link, כולל ההערה שנתיבים עשויים להגיע מה-CPU או מה-PCH לפי הפלטפורמה.",
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

  // ── מונחי שחרור/מוכנות של Central Workflow ─────────────────────────────────
  // מיוצגים גם ב-lib/learningPaths.ts כ-plannedTerms של מסלול central. כולם
  // מכוסים כעת (במלואם או חלקית) בשיעור הפעיל 'מחזור מוכנות חומרה — מ-Mock עד
  // PRQ' (hardware-release-lifecycle) שבמסלול Central Workflow. הם נשארים כאן
  // לתיעוד ולמעקב, ורובם עדיין דורשים אימות מול הצוות לגבי המשמעות/החישוב המדויק.
  {
    id: "inbox-hwqrc",
    rawUserInput: "HWQRC",
    normalizedTerm: "Hardware Quality Release Criteria (HWQRC)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. קריטריוני איכות חומרה לשחרור — אוסף התנאים שהחומרה צריכה לעמוד בהם כדי שאפשר לשחרר. הקריטריונים המדויקים דורשים אימות מול הצוות / התיעוד הפנימי.",
  },
  {
    id: "inbox-qs",
    rawUserInput: "QS",
    normalizedTerm: "Qualification Samples (QS)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. דגימות הסמכה / דגימות Qualification — יחידות חומרה בשלב מתקדם המשמשות לבדיקות לפני שחרור. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-prq",
    rawUserInput: "PRQ",
    normalizedTerm: "Product Release Qualification (PRQ)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. הסמכת שחרור מוצר — שלב אישור סופי לפני שחרור ללקוחות. תהליך ה-PRQ המדויק דורש אימות מול הצוות.",
  },
  {
    id: "inbox-es1",
    rawUserInput: "ES1",
    normalizedTerm: "Engineering Sample 1 (ES1)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. דגימה הנדסית ראשונה — גרסה הנדסית מוקדמת של החומרה לשלבי הבדיקה הראשונים. הציפיות המדויקות דורשות אימות מול הצוות.",
  },
  {
    id: "inbox-es2",
    rawUserInput: "ES2",
    normalizedTerm: "Engineering Sample 2 (ES2)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. דגימה הנדסית שנייה — מאוחרת יותר מ-ES1, קרובה יותר למוצר הסופי. ההבחנה המדויקת בין השלבים דורשת אימות מול הצוות.",
  },
  {
    id: "inbox-mock",
    rawUserInput: "Mock",
    normalizedTerm: "Mock",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. שלב הכנה / בדיקת מוכנות — ריצת חזרה לפני עבודה מלאה. המשמעות המדויקת של Mock משתנה לפי צוות ותהליך — דורש אימות מול הצוות.",
  },
  {
    id: "inbox-power-on",
    rawUserInput: "Power On",
    normalizedTerm: "Power On",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון (כ-Power On (P0)). הדלקה ראשונה / הפעלה ראשונית של המערכת — הרגע שבו נותנים חשמל ובודקים שהיא עולה. ההקשר המדויק דורש אימות מול הצוות.",
  },
  {
    id: "inbox-attempt",
    rawUserInput: "Attempt",
    normalizedTerm: "Attempt",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון. אחוז או כמות הבדיקות שנוסו / הורצו. אופן החישוב המדויק (מתוך מה מודדים) דורש אימות מול הצוות.",
  },
  {
    id: "inbox-pass",
    rawUserInput: "Pass",
    normalizedTerm: "Pass",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "central-release",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בשיעור 'מחזור מוכנות חומרה' (hardware-release-lifecycle) ונוסף למילון (יחד עם Pass Rate). אחוז או כמות הבדיקות שעברו בהצלחה. אופן החישוב המדויק (מתוך מה מודדים) דורש אימות מול הצוות.",
  },

  // ── מונחי פלטפורמה וארכיטקטורה ─────────────────────────────────────────────
  // רובם כוסו כעת (במלואם או חלקית) בשיעור הפעיל 'ארכיטקטורת מערכת ופלטפורמה'
  // (system-platform-architecture) שבמסלול 'יסודות חומרה'.
  {
    id: "inbox-pcb",
    rawUserInput: "PCB",
    normalizedTerm: "PCB (Printed Circuit Board)",
    confidence: "high",
    category: "board",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "כוסה בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונוסף למילון (רמה בסיסית). מעגל מודפס / הלוח הפיזי שעליו יושבים הרכיבים ומסלולי התקשורת. לוח אם או לוח יעד הם דוגמאות מעשיות.",
  },
  {
    id: "inbox-package",
    rawUserInput: "Package",
    normalizedTerm: "Package (CPU Package)",
    confidence: "high",
    category: "cpu",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "כוסה בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונוסף למילון (רמה בסיסית). האריזה הפיזית שעוטפת את הסיליקון ומחברת אותו ללוח. לא לבלבל עם 'חבילת תוכנה'.",
  },
  {
    id: "inbox-buffer",
    rawUserInput: "Buffer",
    normalizedTerm: "Buffer",
    confidence: "medium",
    category: "cpu",
    suggestedStage: "architecture",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מונח כללי — אזור זיכרון זמני שמאחסן נתונים בדרך בין רכיבים כדי לגשר על הבדלי קצב. עדיין לא נלמד בשיעור ייעודי; המשמעות המדויקת בהקשר הפלטפורמה שלנו דורשת אימות מול הצוות.",
  },
  {
    id: "inbox-opio",
    rawUserInput: "OPIO",
    normalizedTerm: "OPIO (On-Package I/O)",
    confidence: "needs-confirmation",
    category: "io",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "כוסה בזהירות בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונוסף למילון (רמה מתקדמת, מסומן 'דורש אימות'). עשוי להתייחס ל-On-Package I/O — קלט/פלט בתוך או סביב האריזה. אין להסתמך עליו עדיין; המשמעות המדויקת ספציפית לפלטפורמה ודורשת אימות מול הצוות.",
  },
  {
    id: "inbox-dmi",
    rawUserInput: "DMI",
    normalizedTerm: "DMI (Direct Media Interface)",
    confidence: "high",
    category: "io",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "כוסה בשיעור CPU ו-PCH ובשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture), ונמצא במילון. נתיב התקשורת ברמה גבוהה בין המעבד ל-PCH בתרשימי פלטפורמה רבים.",
  },
  {
    id: "inbox-memory-controller",
    rawUserInput: "Memory Controller",
    normalizedTerm: "Memory Controller",
    confidence: "high",
    category: "memory",
    suggestedStage: "architecture",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "כוסה בשיעור 'ארכיטקטורת מערכת ופלטפורמה' (system-platform-architecture) ונמצא במילון (רמת ביניים). בקר הזיכרון שמנהל את התקשורת בין המעבד ל-RAM; בפלטפורמות מודרניות יושב בתוך המעבד או צמוד אליו. לא לבלבל עם ה-RAM עצמו.",
  },
  {
    id: "inbox-ring",
    rawUserInput: "Ring",
    normalizedTerm: "Ring (Ring Interconnect)",
    confidence: "needs-confirmation",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "עשוי להתייחס ל-Ring Interconnect — טבעת קישור פנימית בתוך המעבד שמחברת בין הליבות, המטמון ורכיבי ה-Uncore. מושג מתקדם שקשור ל-Interconnect; טרם נלמד בשיעור ייעודי. המשמעות המדויקת בפלטפורמה שלנו דורשת אימות מול הצוות.",
  },

  // ── מונחי Firmware / Boot Internals — מתוכננים לשיעור עתידי ─────────────────
  // אף אחד מאלה אינו שיעור פעיל. הם מסומנים כ-future/planned: יילמדו בשיעור
  // עתידי מתוכנן 'Firmware ו-Boot Internals — ROM, Flash, Microcode, MRC, Fuses
  // ו-Straps' (ראו plannedSessions של מסלול 'יסודות חומרה'). אין להקדים אותם
  // לפני שהלומד רכש את בסיס הפלטפורמה.
  {
    id: "inbox-mrc",
    rawUserInput: "MRC",
    normalizedTerm: "MRC (Memory Reference Code)",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. עשוי להתייחס ל-Memory Reference Code — קוד בקושחה שמאתחל את הזיכרון בזמן העלייה. הוזכר קלות בשיעור הארכיטקטורה כמונח מתקדם. המשמעות המדויקת דורשת אימות מול הצוות.",
  },
  {
    id: "inbox-flash",
    rawUserInput: "Flash",
    normalizedTerm: "Flash",
    confidence: "medium",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. זיכרון לא-נדיף שבו נשמרת הקושחה (למשל ה-BIOS/UEFI). טרם נלמד בשיעור ייעודי; ההקשר המדויק אצלנו דורש אימות מול הצוות.",
  },
  {
    id: "inbox-microcode",
    rawUserInput: "Microcode",
    normalizedTerm: "Microcode (uCode)",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. שכבת קוד נמוכה מאוד בתוך המעבד שמתרגמת הוראות לפעולות פנימיות; מתעדכנת לעיתים דרך הקושחה. מונח מתקדם — טרם נלמד. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-ucode",
    rawUserInput: "uCode",
    normalizedTerm: "uCode (Microcode)",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. קיצור נפוץ ל-Microcode (ראו inbox-microcode). אותו מושג. דורש אימות מול הצוות.",
  },
  {
    id: "inbox-pcode",
    rawUserInput: "P-Code",
    normalizedTerm: "P-Code (Pcode)",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. מונח שעשוי להתייחס לקוד ניהול חשמל (Power Code) שרץ על מיקרו-בקר בתוך המעבד — אך המשמעות משתנה בין פלטפורמות. לא להגדיר כעובדה; דורש אימות מול הצוות / התיעוד הפנימי.",
  },
  {
    id: "inbox-microcontroller",
    rawUserInput: "Microcontroller",
    normalizedTerm: "Microcontroller",
    confidence: "medium",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. מחשב זעיר על שבב אחד שמריץ קושחה ומנהל משימה מוגדרת (למשל ניהול חשמל או בקרה). טרם נלמד בשיעור ייעודי; ההקשר אצלנו דורש אימות מול הצוות.",
  },
  {
    id: "inbox-rom",
    rawUserInput: "ROM",
    normalizedTerm: "ROM (Read-Only Memory)",
    confidence: "medium",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. זיכרון לקריאה בלבד (Read-Only Memory) שמחזיק קוד/נתונים קבועים, למשל שלב עלייה מוקדם. טרם נלמד בשיעור ייעודי.",
  },
  {
    id: "inbox-memory",
    rawUserInput: "Memory",
    normalizedTerm: "Memory",
    confidence: "high",
    category: "memory",
    suggestedStage: "foundation",
    alreadyCovered: true,
    shouldAddToGlossary: true,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "מושג הזיכרון הכללי מכוסה חלקית: RAM נמצא במילון, ובשיעור הארכיטקטורה מוסבר בקר הזיכרון. סוגי זיכרון נוספים (ROM, Flash) יורחבו בשיעור העתידי 'Firmware ו-Boot Internals'.",
  },
  {
    id: "inbox-fuses",
    rawUserInput: "Fuses",
    normalizedTerm: "Fuses",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. עשוי להתייחס לנקודות תצורה חד-פעמיות בתוך השבב שנקבעות בייצור וקובעות התנהגות. מונח מתקדם וספציפי לפלטפורמה — לא להסתמך עליו; דורש אימות מול הצוות.",
  },
  {
    id: "inbox-straps",
    rawUserInput: "Straps",
    normalizedTerm: "Straps",
    confidence: "needs-confirmation",
    category: "firmware",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי 'Firmware ו-Boot Internals'. עשוי להתייחס לחיווט/הגדרות שנקבעות בהדלקה וקובעות תצורה של רכיב או פלטפורמה. מונח מתקדם וספציפי לפלטפורמה — דורש אימות מול הצוות.",
  },
  {
    id: "inbox-bkc",
    rawUserInput: "BKC",
    normalizedTerm: "BKC (Best Known Configuration)",
    confidence: "needs-confirmation",
    category: "validation",
    suggestedStage: "boot-bios",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: true,
    notesHebrew:
      "מתוכנן לשיעור עתידי. עשוי להתייחס ל-Best Known Configuration — שילוב מומלץ/ידוע-טוב של גרסאות קושחה, כלים והגדרות לעבודה. המשמעות המדויקת אצלנו דורשת אימות מול הצוות / התיעוד הפנימי.",
  },
  {
    id: "inbox-alu",
    rawUserInput: "ALU",
    normalizedTerm: "ALU (Arithmetic Logic Unit)",
    confidence: "medium",
    category: "cpu",
    suggestedStage: "foundation",
    alreadyCovered: false,
    shouldAddToGlossary: false,
    shouldBecomeLesson: false,
    needsTeamConfirmation: false,
    notesHebrew:
      "יחידת החשבון והלוגיקה בתוך הליבה (Arithmetic Logic Unit) שמבצעת חישובים והשוואות. מושג רקע של מבנה המעבד; טרם נלמד בשיעור ייעודי. רמת פירוט זו כנראה מעבר לצורך המיידי של הבודק.",
  },
];

export function getInboxTerm(id: string): InboxTerm | undefined {
  return termInbox.find((t) => t.id === id);
}
