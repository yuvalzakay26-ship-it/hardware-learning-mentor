// מסלולי הלמידה — שכבת הניווט העליונה של האפליקציה.
//
// שלושה מסלולים מרכזיים שמארגנים את כל החומר: יסודות חומרה, Central Workflow,
// ו-Tools & Execution. מסלול "יסודות חומרה" נשען על שיעורים פעילים (דרך השלבים
// ב-curriculum.ts). שני המסלולים האחרים הם כרגע *מתוכננים* — יש בהם סשנים ומונחים
// מתוכננים (Backlog), אך עדיין אין בהם שיעורים פעילים. אין להפעיל אותם כשיעורים
// מלאים במסגרת שלב זה.
//
// תקן מינוח: כל מונח/ראשי-תיבות באנגלית מיוצג עם השם המלא באנגלית, ראשי התיבות
// בסוגריים, והסבר בעברית. מונחים שהמשמעות המדויקת שלהם ספציפית לצוות מסומנים
// ב-needsTeamConfirmation, ומוצגים עם ההערה "דורש אימות מול הצוות".

import type { StageId } from "./curriculum";

export type LearningPathId = "hardware" | "central" | "tools";

/** סטטוס המסלול: פעיל (יש שיעורים), מתוכנן (רק Backlog), או משולב. */
export type PathStatus = "active" | "planned" | "mixed";

/** סשן לימוד מתוכנן — מגיע מסדר-היום של Deborah, עדיין לא שיעור פעיל. */
export interface PlannedSession {
  id: string;
  /** שם הסשן באנגלית כפי שמופיע בסדר-היום. */
  titleEnglish: string;
  /** משפט קצר בעברית: מה לומדים בסשן הזה. */
  hebrewNote: string;
}

/**
 * מונח מתוכנן (Backlog) — מיוצג לפי תקן המינוח:
 * שם מלא באנגלית + ראשי תיבות + משמעות והסבר בעברית.
 * אינו שיעור פעיל ואינו מונח רשמי במילון עדיין.
 */
export interface PlannedTerm {
  id: string;
  /** השם המלא באנגלית. */
  fullEnglishName: string;
  /** ראשי התיבות, אם קיימים (למשל HWQRC). */
  acronym?: string;
  /** המשמעות בעברית — תרגום מעשי, לא בהכרח תרגום רשמי. */
  hebrewMeaning: string;
  /** הסבר קצר וידידותי למתחיל בעברית. */
  hebrewExplanation: string;
  /** המשמעות המדויקת עשויה להשתנות בין צוותים — דורש אימות מול הצוות. */
  needsTeamConfirmation: boolean;
  suggestedPath: LearningPathId;
  /** האם צריך להפוך לשיעור מלא — false לעת עתה. */
  shouldBecomeLesson: boolean;
  /** האם להוסיף למילון הרשמי, או להשאיר כ-Backlog בלבד. */
  shouldAddToGlossary: boolean;
}

export interface LearningPath {
  id: LearningPathId;
  order: number;
  titleHebrew: string;
  /** תווית ה"שבב" הקצרה על הכרטיס. */
  chip: string;
  descriptionHebrew: string;
  /** אימוג'י מייצג למסלול. */
  emoji: string;
  status: PathStatus;
  /** שלבים פעילים (ב-curriculum) שהמסלול מכסה. ריק אם המסלול מתוכנן בלבד. */
  relatedStageIds: StageId[];
  plannedSessions: PlannedSession[];
  plannedTerms: PlannedTerm[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "hardware",
    order: 1,
    titleHebrew: "יסודות חומרה",
    chip: "Hardware",
    descriptionHebrew:
      "הבסיס הטכני להבנת המעבד, רכיבי המערכת, ארכיטקטורת הפלטפורמה, BIOS, POST, Debug, חיבורים ותרמי.",
    emoji: "🧩",
    // מסלול משולב: יש בו שיעורים פעילים רבים, ולצידם שיעור עתידי מתוכנן אחד
    // (Firmware ו-Boot Internals) שעדיין אינו פעיל.
    status: "mixed",
    // כל השלבים הפעילים — כדי שאף שיעור קיים לא יישאר מחוץ למסלול.
    relatedStageIds: [
      "foundation",
      "architecture",
      "test-env",
      "boot-bios",
      "system-connectors",
      "advanced-debug",
      "environments-thermal",
    ],
    plannedSessions: [
      {
        id: "hw-firmware-boot-internals",
        titleEnglish:
          "Firmware & Boot Internals — ROM, Flash, Microcode, MRC, Fuses and Straps",
        hebrewNote:
          "שיעור עתידי מתוכנן: פנימיות הקושחה והעלייה — ROM, Flash, Microcode/uCode, MRC, Fuses ו-Straps. נלמד רק אחרי שבסיס הפלטפורמה מוטמע. עדיין אינו שיעור פעיל.",
      },
    ],
    plannedTerms: [],
  },
  {
    id: "central",
    order: 2,
    titleHebrew: "Central Workflow",
    chip: "Workflow",
    descriptionHebrew:
      "איך צוות Central עובד בפועל: מחזור בדיקה, הרצות, טריאז׳, תקלות, Screening ושלבי מוכנות לשחרור.",
    emoji: "🧭",
    // מסלול משולב: יש בו כבר שיעור פעיל אחד (מחזור מוכנות החומרה), ולצידו סשנים
    // ומונחים מתוכננים שיֵלמדו בהמשך.
    status: "mixed",
    relatedStageIds: ["central-release"],
    plannedSessions: [
      {
        id: "central-intro",
        titleEnglish: "Team Introduction & Welcome",
        hebrewNote: "היכרות עם הצוות, התפקידים ואופן העבודה המשותף.",
      },
      {
        id: "central-mow",
        titleEnglish: "Central MOW and Activity",
        hebrewNote: "מה עושה צוות Central ביום־יום ואיך מתנהלת הפעילות.",
      },
      {
        id: "central-test-lifecycle",
        titleEnglish: "Test Lifecycle and Test Cycle",
        hebrewNote: "מחזור החיים של בדיקה — משלב התכנון ועד הסגירה.",
      },
      {
        id: "central-triage-nga",
        titleEnglish: "Basic Triage Using NGA",
        hebrewNote: "טריאז׳ בסיסי של תקלות בעזרת הכלי NGA.",
      },
      {
        id: "central-screening",
        titleEnglish: "End-to-End Screening Flow",
        hebrewNote: "זרימת Screening מקצה לקצה — מסינון ראשוני ועד החלטה.",
      },
      {
        id: "central-hsdes",
        titleEnglish: "HSDES",
        hebrewNote: "מערכת ניהול תקלות/משימות של הצוות. דורש אימות מול הצוות.",
      },
    ],
    plannedTerms: [
      {
        id: "term-hwqrc",
        fullEnglishName: "Hardware Quality Release Criteria",
        acronym: "HWQRC",
        hebrewMeaning: "קריטריוני איכות חומרה לשחרור",
        hebrewExplanation:
          "אוסף התנאים שהחומרה צריכה לעמוד בהם כדי שאפשר יהיה לשחרר אותה. המשמעות המדויקת דורשת אימות מול הצוות / התיעוד הפנימי.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-qs",
        fullEnglishName: "Qualification Samples",
        acronym: "QS",
        hebrewMeaning: "דגימות הסמכה / דגימות Qualification",
        hebrewExplanation:
          "יחידות חומרה בשלב מתקדם, קרוב לגרסה הסופית, שמשמשות לבדיקות הסמכה לפני שחרור. דורש אימות מול הצוות.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-prq",
        fullEnglishName: "Product Release Qualification",
        acronym: "PRQ",
        hebrewMeaning: "הסמכת שחרור מוצר / שלב אישור לפני שחרור מוצר",
        hebrewExplanation:
          "שלב שבו המוצר עובר אישור סופי לפני שחרור ללקוחות. דורש אימות מול הצוות.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-mock",
        fullEnglishName: "Mock",
        hebrewMeaning: "שלב הכנה / בדיקת מוכנות",
        hebrewExplanation:
          "ריצת חזרה / בדיקת מוכנות לפני עבודה מלאה, כדי לוודא שהכול מוכן. המשמעות המדויקת דורשת אימות מול הצוות.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-power-on",
        fullEnglishName: "Power On",
        hebrewMeaning: "הדלקה ראשונה / הפעלה ראשונית",
        hebrewExplanation:
          "ההפעלה הראשונה של המערכת — הרגע שבו נותנים לה חשמל ובודקים שהיא עולה. דורש אימות מול הצוות לגבי ההקשר המדויק.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-es1",
        fullEnglishName: "Engineering Sample 1",
        acronym: "ES1",
        hebrewMeaning: "דגימה הנדסית ראשונה",
        hebrewExplanation:
          "גרסה הנדסית מוקדמת של החומרה, לשלבי הבדיקה הראשונים. דורש אימות מול הצוות.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-es2",
        fullEnglishName: "Engineering Sample 2",
        acronym: "ES2",
        hebrewMeaning: "דגימה הנדסית שנייה / מתקדמת יותר",
        hebrewExplanation:
          "גרסה הנדסית מאוחרת יותר מ-ES1, קרובה יותר למוצר הסופי. דורש אימות מול הצוות.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-attempt",
        fullEnglishName: "Attempt",
        hebrewMeaning: "בדיקות שנוסו / הורצו",
        hebrewExplanation:
          "אחוז או כמות הבדיקות שנוסו או הורצו. דורש אימות מול הצוות לגבי אופן החישוב המדויק.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
      {
        id: "term-pass",
        fullEnglishName: "Pass",
        hebrewMeaning: "בדיקות שעברו בהצלחה",
        hebrewExplanation:
          "אחוז או כמות הבדיקות שעברו בהצלחה. דורש אימות מול הצוות לגבי אופן החישוב המדויק.",
        needsTeamConfirmation: true,
        suggestedPath: "central",
        shouldBecomeLesson: false,
        shouldAddToGlossary: true,
      },
    ],
  },
  {
    id: "tools",
    order: 3,
    titleHebrew: "Tools & Execution",
    chip: "Tools",
    descriptionHebrew:
      "היכרות עם כלי העבודה: NGA, Python SV, PKGC, Workloads, Galaxy, Solar וכלי AI.",
    emoji: "🛠️",
    status: "planned",
    relatedStageIds: [],
    plannedSessions: [
      {
        id: "tools-nga",
        titleEnglish: "NGA Execution",
        hebrewNote: "הרצות ותפעול בעזרת הכלי NGA.",
      },
      {
        id: "tools-python-sv-pkgc",
        titleEnglish: "Python SV + PKGC",
        hebrewNote: "עבודה עם Python SV ו-PKGC לצורך שליטה ובדיקה.",
      },
      {
        id: "tools-main-wls",
        titleEnglish: "Main WLs",
        hebrewNote: "עומסי העבודה (Workloads) המרכזיים שמריצים על המערכת.",
      },
      {
        id: "tools-galaxy-solar",
        titleEnglish: "Galaxy and Solar",
        hebrewNote: "הפלטפורמות Galaxy ו-Solar. דורש אימות מול הצוות.",
      },
      {
        id: "tools-fv-ai",
        titleEnglish: "FV AI Tools",
        hebrewNote: "כלי AI לשיפור פרודוקטיביות ובדיקה. דורש אימות מול הצוות.",
      },
    ],
    plannedTerms: [],
  },
];

export function getLearningPath(id: LearningPathId): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

/** האם מחרוזת query היא מזהה מסלול חוקי. */
export function isLearningPathId(value: string | null): value is LearningPathId {
  return value === "hardware" || value === "central" || value === "tools";
}
