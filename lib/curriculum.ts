// מודל היררכיית הלמידה — "עמוד השדרה" של המסלול.
//
// כאן מוגדרים שלבי הלימוד (Stages), והמטא-דאטה הלימודית של כל שיעור:
// לאיזה שלב הוא שייך, מה צריך לדעת לפניו, אילו מונחים הוא מציג, מחזק או נוגע
// בהם רק ברמה מתקדמת, ואילו מונחים הם פנימיים/ספציפיים לצוות.
//
// מטרה מרכזית: לוודא שאף מושג מתקדם לא "נשען" על ידע שעדיין לא נלמד. סדר
// השיעורים (module.order ב-content.ts) הוא רצף הלימוד בפועל; השלבים כאן הם
// שכבת הארגון הנושאית שמעליו.

import { modules } from "./content";
import type { Module } from "./types";

// ── שלבי הלמידה ────────────────────────────────────────────────────────────

export type StageId =
  | "foundation" // בסיס חומרה ומעבד
  | "architecture" // ארכיטקטורת מערכת
  | "test-env" // סביבת בדיקה
  | "boot-bios" // Boot / BIOS / Debug מוקדם
  | "system-connectors" // חיבורים ורכיבי מערכת
  | "advanced-debug" // Debug מתקדם
  | "environments-thermal" // סביבות עבודה ותרמי
  | "central-release"; // מחזור מוכנות ושחרור חומרה (Central Workflow)

export interface Stage {
  id: StageId;
  order: number;
  title: string; // כותרת השלב בעברית
  subtitle: string; // משפט אחד שמסביר מה לומדים בשלב הזה
  chipLabel: string; // תווית קצרה ל"שבב" של השלב
  /** המושגים המרכזיים שהשלב מכסה (באנגלית, כפי שמופיעים בחומר). */
  topics: string[];
}

export const stages: Stage[] = [
  {
    id: "foundation",
    order: 1,
    title: "בסיס חומרה ומעבד",
    subtitle: "מה זה מעבד, ממה הוא בנוי, ואיך הוא עובד — הלבנים של הכול.",
    chipLabel: "CPU",
    topics: [
      "Transistor",
      "Processor / CPU",
      "Core",
      "Thread",
      "Atom Core",
      "B-Core",
      "Module",
      "Uncore",
      "Cache",
      "Bus",
    ],
  },
  {
    id: "architecture",
    order: 2,
    title: "ארכיטקטורת מערכת",
    subtitle: "איך המעבד מדבר עם שאר הרכיבים — זיכרון, גרפיקה ותקשורת.",
    chipLabel: "PCH",
    topics: [
      "CPU & PCH",
      "MCH",
      "PCIe",
      "Graphics Interface / GFX",
      "RAM",
      "Memory Controller",
    ],
  },
  {
    id: "test-env",
    order: 3,
    title: "סביבת בדיקה",
    subtitle: "מי מפעיל את מי בעמדה: Host, SUT, Frame והכלים שסביבם.",
    chipLabel: "ENV",
    topics: ["Host", "SUT", "Frame", "Target", "Power Splitter", "TTK / TTK3"],
  },
  {
    id: "boot-bios",
    order: 4,
    title: "Boot / BIOS / Debug מוקדם",
    subtitle: "מה קורה מרגע הלחיצה על הכפתור ועד שהמערכת עולה.",
    chipLabel: "BIOS",
    topics: ["BIOS / UEFI", "POST Code", "Port 80", "Boot Flow"],
  },
  {
    id: "system-connectors",
    order: 5,
    title: "חיבורים ורכיבי מערכת",
    subtitle: "המחברים וההתקנים שיושבים על מערכת הבדיקה.",
    chipLabel: "I/O",
    topics: ["M.2", "Type-C", "TCSS", "J5", "Adapter", "Dock", "Cable"],
  },
  {
    id: "advanced-debug",
    order: 6,
    title: "Debug מתקדם",
    subtitle: "איך 'מציצים' עמוק לתוך המערכת כדי לחקור תקלות.",
    chipLabel: "DBG",
    topics: ["Debug", "DCI", "XDP", "IXDP", "Debug Probe", "Trace", "Evidence"],
  },
  {
    id: "environments-thermal",
    order: 7,
    title: "סביבות עבודה ותרמי",
    subtitle: "השוואת סביבות ולידציה, והתנהגות המערכת תחת חום.",
    chipLabel: "OS",
    topics: ["OSBV", "SVOS", "Thermal", "Sensor", "Throttling", "Cooling"],
  },
  {
    id: "central-release",
    order: 8,
    title: "מחזור מוכנות ושחרור חומרה",
    subtitle:
      "איך פרויקט חומרה מתקדם משלב לשלב — מ-Mock ועד PRQ — ואיך קוראים מוכנות לשחרור.",
    chipLabel: "PRQ",
    topics: [
      "Mock",
      "Power On (P0)",
      "Engineering Sample 1 (ES1)",
      "Engineering Sample 2 (ES2)",
      "Qualification Samples (QS)",
      "Product Release Qualification (PRQ)",
      "Hardware Quality Release Criteria (HWQRC)",
      "Attempt",
      "Pass",
    ],
  },
];

export function getStage(id: StageId): Stage | undefined {
  return stages.find((s) => s.id === id);
}

// ── מטא-דאטה לימודית לכל שיעור ──────────────────────────────────────────────

export interface LessonMeta {
  /** לאיזה שלב במסלול שייך השיעור. */
  stageId: StageId;
  /** מזהי שיעורים שכדאי להשלים לפני — נשענים עליהם ישירות. */
  prerequisites: string[];
  /** משפטים קצרים בעברית: "מה צריך לדעת לפני?" (לכרטיס תנאי־קדם). */
  prereqKnowledge: string[];
  /** "למה זה מופיע כאן במסלול?" — הסבר קצר על מיקום השיעור. */
  whyNow: string;
  /** מונחים שהשיעור מציג בפעם הראשונה. */
  introducedTerms: string[];
  /** מונחים שנלמדו קודם והשיעור מחזק/חוזר עליהם. */
  reinforcedTerms: string[];
  /** מונחים שהשיעור נוגע בהם רק ברמת "טעימה" — יילמדו לעומק בהמשך. */
  advancedTerms: string[];
  /** מונחים פנימיים/ספציפיים לצוות שדורשים אימות מול התיעוד הפנימי. */
  companySpecificTerms: string[];
}

export const lessonMeta: Record<string, LessonMeta> = {
  "cpu-foundations": {
    stageId: "foundation",
    prerequisites: [],
    prereqKnowledge: [],
    whyNow:
      "זו נקודת ההתחלה של כל המסלול: מפה פשוטה של מה שיש בתוך המעבד ומסביבו. כל שאר השיעורים — CPU, BIOS, POST, PCIe, Debug — נשענים על היסודות האלה.",
    introducedTerms: [
      "Transistor",
      "Logic",
      "Processor",
      "CPU",
      "Core",
      "Thread",
      "Cache",
      "Bus",
      "Uncore",
      "Atom Core",
      "B-Core",
      "Module",
    ],
    reinforcedTerms: ["RAM", "BIOS", "POST", "PCIe", "PCH", "Thermal", "Debug"],
    advancedTerms: ["Memory Controller", "System Agent", "PCIe Root Complex", "Interconnect"],
    companySpecificTerms: ["B-Core", "Module of 4 Atom Cores", "Atom Core"],
  },
  "cpu-overview": {
    stageId: "foundation",
    prerequisites: ["cpu-foundations"],
    prereqKnowledge: ["מפת היסודות של המעבד: טרנזיסטור, ליבה, ת'רד, מטמון, Bus ו-Uncore"],
    whyNow:
      "אחרי מפת היסודות, כאן מעמיקים במעבד עצמו — מה זה, ממה הוא בנוי ואיך הוא עובד בפועל.",
    introducedTerms: ["CPU", "Processor", "Core", "Thread", "Cache", "Clock", "Instruction"],
    reinforcedTerms: ["Transistor", "Bus"],
    advancedTerms: ["Uncore", "Atom Core", "B-Core", "Module", "RAM"],
    companySpecificTerms: [],
  },
  "cpu-pch": {
    stageId: "architecture",
    prerequisites: ["cpu-overview"],
    prereqKnowledge: ["מה זה מעבד (CPU) ומה תפקידו", "המושג ליבה (Core)"],
    whyNow:
      "אחרי שהבנת מה זה מעבד, הצעד הבא הוא להבין שהוא לא מדבר עם כולם לבד — יש מי שמנהל בשבילו את התקשורת.",
    introducedTerms: ["PCH", "Chipset", "DMI", "PCIe", "Memory Controller", "MCH", "GFX"],
    reinforcedTerms: ["CPU", "RAM"],
    advancedTerms: ["Uncore"],
    companySpecificTerms: ["MCH", "GFX"],
  },
  "system-platform-architecture": {
    stageId: "architecture",
    prerequisites: ["cpu-foundations", "cpu-overview", "cpu-pch"],
    prereqKnowledge: [
      "מה זה מעבד (CPU) ומה תפקידו",
      "מהו PCH ומה עובר דרכו (משיעור CPU ו-PCH)",
      "המושג לוח אם / לוח פיזי",
    ],
    whyNow:
      "אחרי שהבנת את המעבד ואת ה-PCH, כאן בונים את המפה הגדולה של הפלטפורמה כולה: הלוח (PCB), האריזה (Package), בקר הזיכרון, DMI ו-PCIe. זהו הבסיס הארכיטקטוני שעליו יישענו שיעורי סביבת הבדיקה, ה-Boot וה-Debug — ולכן הוא מגיע מיד אחרי CPU ו-PCH.",
    introducedTerms: [
      "Printed Circuit Board",
      "PCB",
      "Package",
      "Memory Controller",
      "Memory Controller Hub",
      "MCH",
      "Direct Media Interface",
      "DMI",
      "Peripheral Component Interconnect Express",
      "PCIe",
      "Graphics Interface",
      "GFX",
      "OPIO",
    ],
    reinforcedTerms: [
      "CPU",
      "Processor",
      "PCH",
      "RAM",
      "BIOS",
      "POST",
      "Port 80",
      "Debug",
      "SUT",
      "Platform",
    ],
    advancedTerms: ["MRC", "System Agent", "PCIe Root Complex", "Interconnect", "Firmware"],
    companySpecificTerms: ["GFX", "GSX", "OPIO", "MCH"],
  },
  "test-env": {
    stageId: "test-env",
    prerequisites: ["cpu-overview", "cpu-pch"],
    prereqKnowledge: ["מהי מערכת מחשב בסיסית (מעבד + לוח אם)"],
    whyNow:
      "עכשיו שאתה מבין מהי מערכת, אפשר להבין את העמדה שבה בודקים אותה: מי המחשב הנבדק ומי שולט עליו.",
    introducedTerms: ["Host", "SUT", "Frame", "Target"],
    reinforcedTerms: [],
    advancedTerms: [],
    companySpecificTerms: ["SUT", "Frame"],
  },
  "remote-connection": {
    stageId: "test-env",
    prerequisites: ["test-env"],
    prereqKnowledge: ["מיהו ה-Host ומיהו ה-SUT בעמדת הבדיקה"],
    whyNow:
      "אחרי שהכרת מי ה-Host ומי ה-SUT, השלב הטבעי הוא איך ה-Host באמת שולט על ה-SUT מרחוק.",
    introducedTerms: ["PuTTY", "SSH", "P2P", "Terminal", "Log", "IP Address"],
    reinforcedTerms: ["Host", "SUT"],
    advancedTerms: [],
    companySpecificTerms: [],
  },
  "bios-overview": {
    stageId: "boot-bios",
    prerequisites: ["cpu-overview", "test-env"],
    prereqKnowledge: ["מה זה מעבד ולוח אם", "מהי מערכת בדיקה בסיסית"],
    whyNow:
      "לפני שהמחשב מציג משהו על המסך, רץ בו רכיב אחר — ה-BIOS. כאן מתחילים להבין את שלב העלייה של המערכת.",
    introducedTerms: ["BIOS", "UEFI", "Firmware", "Boot"],
    reinforcedTerms: ["CPU"],
    advancedTerms: ["POST"],
    companySpecificTerms: [],
  },
  "post-code-port-80": {
    stageId: "boot-bios",
    prerequisites: ["bios-overview"],
    prereqKnowledge: ["מה זה BIOS ומה תפקידו בעלייה של המערכת", "המושג Boot"],
    whyNow:
      "מגיע אחרי BIOS כי POST קורה בזמן העלייה המוקדמת של המערכת — הקודים האלה מספרים עד לאיזו תחנה ה-BIOS הגיע.",
    introducedTerms: ["POST Code", "Port 80", "Checkpoint", "Hexadecimal"],
    reinforcedTerms: ["BIOS", "Boot"],
    advancedTerms: [],
    companySpecificTerms: [],
  },
  "ttk-ttk3-tools": {
    stageId: "test-env",
    prerequisites: ["post-code-port-80"],
    prereqKnowledge: ["מה זה POST Code ו-Port 80"],
    whyNow:
      "מגיע אחרי POST Code כי TTK הוא הכלי של הצוות שבעזרתו קוראים את אותם קודים — קודם צריך להבין מה קוראים, ורק אז איך.",
    introducedTerms: ["TTK", "TTK3"],
    reinforcedTerms: ["POST Code", "Port 80"],
    advancedTerms: [],
    companySpecificTerms: ["TTK", "TTK3"],
  },
  "power-splitter": {
    stageId: "test-env",
    prerequisites: ["test-env"],
    prereqKnowledge: ["מהי עמדת בדיקה ומי הרכיבים שבה"],
    whyNow:
      "שייך לסביבת הבדיקה: לפני שנוגעים בחשמל של העמדה צריך להבין איך חושבים על חלוקת חשמל בבטחה.",
    introducedTerms: ["Power Splitter", "Power Distribution", "Power Path"],
    reinforcedTerms: ["Frame"],
    advancedTerms: [],
    companySpecificTerms: [],
  },
  "target-devices": {
    stageId: "system-connectors",
    prerequisites: ["test-env"],
    prereqKnowledge: ["מהו ה-Target בתוך מערכת הבדיקה"],
    whyNow:
      "מגיע אחרי הבנת סביבת הבדיקה כי קודם צריך לדעת מהו רכיב/מחבר במערכת — ורק אז מכירים את ההתקנים שיושבים על ה-Target.",
    introducedTerms: ["M.2", "J5", "Connector", "SSD", "Adapter", "Cable", "Dock"],
    reinforcedTerms: ["Target"],
    advancedTerms: ["Type-C"],
    companySpecificTerms: ["J5"],
  },
  "type-c-tcss": {
    stageId: "system-connectors",
    prerequisites: ["target-devices"],
    prereqKnowledge: ["מהו מחבר/רכיב על מערכת הבדיקה", "היכרות בסיסית עם Type-C"],
    whyNow:
      "מגיע אחרי היכרות עם המחברים כי Type-C ו-TCSS הם צלילה עמוקה למחבר מסוים — צריך קודם את התמונה הכללית של הרכיבים.",
    introducedTerms: ["Type-C", "TCSS", "USB", "Alt-Mode", "Power Delivery"],
    reinforcedTerms: ["Connector", "Target"],
    advancedTerms: [],
    companySpecificTerms: ["TCSS"],
  },
  "debug-dci-xdp-ixdp": {
    stageId: "advanced-debug",
    prerequisites: ["cpu-pch", "post-code-port-80", "target-devices"],
    prereqKnowledge: [
      "ארכיטקטורת המערכת (CPU ו-PCH)",
      "מה זה POST ותקלת עלייה",
      "מהם מחברים על המערכת",
    ],
    whyNow:
      "Debug מתקדם מגיע בסוף כי הוא נשען על הכול: להבין את המערכת, את העלייה שלה, ואת המחברים — לפני שנכנסים אליה לעומק.",
    introducedTerms: ["Debug", "DCI", "XDP", "IXDP", "Trace", "Debug Probe", "Evidence"],
    reinforcedTerms: ["PCH", "Connector"],
    advancedTerms: [],
    companySpecificTerms: ["DCI", "XDP", "IXDP"],
  },
  "osbv-svos": {
    stageId: "environments-thermal",
    prerequisites: ["test-env", "bios-overview", "post-code-port-80"],
    prereqKnowledge: [
      "סביבת בדיקה (Host / SUT / Frame)",
      "מה זה BIOS ו-Boot",
      "לוגים ותהליך עלייה",
    ],
    whyNow:
      "מגיע מאוחר כי כדי להשוות בין שתי סביבות ולידציה צריך כבר להכיר מערכת, עלייה ולוגים — אחרת אין מה להשוות.",
    introducedTerms: ["OSBV", "SVOS", "Validation Environment"],
    reinforcedTerms: ["Host", "SUT", "BIOS", "Log"],
    advancedTerms: [],
    companySpecificTerms: ["OSBV", "SVOS"],
  },
  "thermal-basics": {
    stageId: "environments-thermal",
    prerequisites: ["cpu-overview", "test-env"],
    prereqKnowledge: ["מה זה מעבד ולמה הוא צורך חשמל", "מהי עמדת בדיקה"],
    whyNow:
      "תרמיקה מגיעה בשלב מתקדם כי צריך כבר להבין שהמעבד עובד וצורך חשמל — ומכאן מתחממים ומדברים על קירור ו-Throttling.",
    introducedTerms: ["Thermal", "Temperature", "Sensor", "Throttling", "Cooling", "Fan"],
    reinforcedTerms: ["CPU"],
    advancedTerms: [],
    companySpecificTerms: [],
  },
  "hardware-release-lifecycle": {
    stageId: "central-release",
    prerequisites: [],
    prereqKnowledge: [
      "היכרות בסיסית עם המערכת הנבדקת (SUT)",
      "מה זה BIOS ומה זה POST — שלב העלייה של המערכת",
    ],
    whyNow:
      "זהו השיעור הפעיל הראשון במסלול Central Workflow. הוא נותן את המפה הגדולה של איך פרויקט חומרה מתקדם משלב לשלב — Mock, Power On, ES1, ES2, QS ו-PRQ — כדי שכל שיחה על 'באיזה שלב אנחנו' ו'מה אחוז ה-Pass' תהיה מובנת.",
    introducedTerms: [
      "Mock",
      "Power On",
      "P0",
      "Engineering Sample 1",
      "ES1",
      "Engineering Sample 2",
      "ES2",
      "Qualification Samples",
      "QS",
      "Product Release Qualification",
      "PRQ",
      "Hardware Quality Release Criteria",
      "HWQRC",
      "Attempt",
      "Pass",
      "Release Readiness",
      "Test Coverage",
      "Pass Rate",
    ],
    reinforcedTerms: [
      "SUT",
      "BIOS",
      "POST",
      "Triage",
      "Logs",
      "Issue Tracking",
      "Central Workflow",
    ],
    advancedTerms: [],
    companySpecificTerms: ["HWQRC", "QS", "PRQ", "Mock", "P0", "Central Workflow"],
  },
};

export function getLessonMeta(id: string): LessonMeta | undefined {
  return lessonMeta[id];
}

/** השיעורים ששייכים לשלב מסוים, ממוינים לפי סדר הלימוד הגלובלי (module.order). */
export function lessonsInStage(stageId: StageId): Module[] {
  return modules
    .filter((m) => lessonMeta[m.id]?.stageId === stageId)
    .sort((a, b) => a.order - b.order);
}

/** השלב שאליו שייך שיעור נתון. */
export function stageOfLesson(lessonId: string): Stage | undefined {
  const meta = lessonMeta[lessonId];
  return meta ? getStage(meta.stageId) : undefined;
}
