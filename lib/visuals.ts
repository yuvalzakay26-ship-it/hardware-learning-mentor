// שכבת התמונות הלימודית — מטא-דאטה מרוכז לכל תמונה אמיתית באפליקציה.
//
// כל התמונות כאן הן חוקיות לשימוש: רישיון Creative Commons (CC BY / CC BY-SA)
// או נחלת הכלל (CC0). כולן הורדו מ-Wikimedia Commons ונשמרות מקומית תחת
// public/images/learning/. אין כאן שום תמונה פנימית/סודית של אינטל או של מעבדה.
//
// כל תמונה מקבלת ייחוס מלא (מקור, יוצר, רישיון) שמוצג ללומד בתחתית הכרטיס.

export interface Visual {
  id: string;
  topicId: string; // נושא כללי, למשל "cpu"
  lessonId?: string; // מזהה המודול שבו התמונה רלוונטית
  termId?: string; // מזהה מושג במילון — לתצוגת תצוגה מקדימה בכרטיס המושג
  src: string;
  width: number;
  height: number;
  alt: string; // טקסט חלופי בעברית — לנגישות
  caption: string; // כיתוב קצר מתחת לתמונה
  explanation?: string; // "מה רואים בתמונה?" — הסבר לומד
  sourceName: string; // שם המקור, למשל "Wikimedia Commons"
  sourceUrl: string; // קישור לעמוד המקור
  license: string; // שם הרישיון, למשל "CC BY-SA 4.0"
  licenseUrl: string;
  attribution: string; // שם היוצר לייחוס
}

export const visuals: Visual[] = [
  {
    id: "cpu-processor",
    topicId: "cpu",
    lessonId: "cpu-overview",
    termId: "cpu",
    src: "/images/learning/cpu-processor.jpg",
    width: 960,
    height: 960,
    alt: "מבט מלמעלה על מעבד אינטל Core i7 — ריבוע מתכת עם כיתוב וסימונים",
    caption: "מעבד (CPU) אמיתי — דגם Intel Core i7-6700K, מבט מלמעלה.",
    explanation:
      "זה המעבד כפי שהוא נראה ביד. המכסה המתכתי (IHS) הוא מה שרואים — תחתיו נמצא השבב (הדַּיי) שבו יושבות הליבות. הכיתוב על המכסה מזהה את הדגם. בעבודת ולידציה תפגוש מעבד כזה מותקן בשקע (Socket) על הלוח, ובדרך כלל מכוסה בגוף קירור.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Intel_CPU_Core_i7_6700K_Skylake_top.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "Eric Gaba (Sting)",
  },
  {
    id: "motherboard-pch-chipset",
    topicId: "pch",
    lessonId: "cpu-pch",
    termId: "pch",
    src: "/images/learning/motherboard-pch-chipset.jpg",
    width: 960,
    height: 629,
    alt: "פינה של לוח אם עם גוף קירור של ה-PCH וחריצי הרחבה לצידו",
    caption: "ה-PCH (השבב המשני) על לוח אם אמיתי — Gigabyte H170, לצד חריצי ההרחבה.",
    explanation:
      "המלבן עם גוף הקירור (המשטח המתכתי) הוא ה-PCH — שבב שמנהל את החיבורים ה'איטיים' של המערכת: USB, דיסקים, רשת ועוד. לידו רואים את חריצי ה-PCIe שאליהם מחברים כרטיסים. המעבד עצמו יושב במקום אחר על הלוח ומדבר עם ה-PCH דרך קו מהיר שנקרא DMI.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:GigabyteH170-HD3-PCH-and-Slots.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "TheStriker",
  },
  {
    id: "motherboard",
    topicId: "board",
    lessonId: "target-devices",
    termId: "motherboard",
    src: "/images/learning/motherboard.jpg",
    width: 960,
    height: 1155,
    alt: "לוח אם שלם עם שקע מעבד, חריצי זיכרון, חריצי הרחבה ומחברים רבים",
    caption: "לוח אם (Motherboard) שלם — הבסיס שכל רכיבי המערכת מתחברים אליו.",
    explanation:
      "לוח האם הוא ה'מגרש' של החומרה: כל רכיב יושב עליו או מתחבר אליו. אפשר לזהות את שקע המעבד במרכז, חריצי הזיכרון (RAM) לצידו, חריצי ההרחבה הארוכים למטה, ומסביב — עשרות מחברים (Connectors). בעבודת ולידציה תלמד למצוא כל מחבר לפי הסימון המודפס לידו על הלוח (Reference Designator).",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2023_P%C5%82yta_g%C5%82%C3%B3wna_Asus_ROG_STRIX_Z690-A_GAMING_WIFI.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "Jacek Halicki",
  },
  {
    id: "m2-ssd",
    topicId: "m2",
    lessonId: "target-devices",
    termId: "m2",
    src: "/images/learning/m2-ssd.jpg",
    width: 960,
    height: 343,
    alt: "כרטיס אחסון M.2 מוארך ודק עם שבבים ומגע זהב בקצה",
    caption: "כונן SSD בתצורת M.2 — כרטיס דק וארוך שנכנס ישירות לחריץ על הלוח.",
    explanation:
      "זהו כונן אחסון (SSD) בתצורת M.2 — פס דק שבקצהו מגעי זהב (החלק שנכנס לחריץ M.2 על הלוח). אין בו חלקים נעים. בעבודה תזהה אותו לפי הצורה המוארכת ולפי הבורג הקטן שמקבע את הקצה השני. חשוב להבחין בין ה-M.2 (התצורה הפיזית) לבין NVMe (הפרוטוקול שרץ עליו).",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Samsung_980_PRO_PCIe_4.0_NVMe_SSD_1TB-top_PNr%C2%B00915.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "D-Kuru",
  },
  {
    id: "usb-type-c-port",
    topicId: "typec",
    lessonId: "target-devices",
    termId: "typec",
    src: "/images/learning/usb-type-c-port.jpg",
    width: 960,
    height: 1280,
    alt: "פורט USB Type-C סגלגל בצד של מחשב נייד",
    caption: "פורט USB Type-C אמיתי בצד של מחשב נייד — מחבר סגלגל וקטן.",
    explanation:
      "זהו הפורט (השקע) של Type-C. שים לב לצורה הסגלגלה והסימטרית — לכן אפשר להכניס את הכבל משני הכיוונים. Type-C הוא רק צורת המחבר; דרכו יכולים לעבור נתונים, וידאו וגם חשמל. בבדיקות תפגוש אותו גם על לוחות בדיקה וגם על מחשבים ניידים.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:USB-C_connector_on_a_laptop.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    attribution: "Logant547",
  },
  {
    id: "post-code-debug-card",
    topicId: "post-code",
    lessonId: "post-code-port-80",
    termId: "post-code",
    src: "/images/learning/post-code-debug-card.jpg",
    width: 960,
    height: 720,
    alt: "כרטיס אבחון POST עם תצוגת שתי ספרות הקסדצימליות",
    caption: "כרטיס אבחון POST — מציג את קוד ה-POST (Port 80) בשתי ספרות.",
    explanation:
      "כרטיס אבחון קטן שנכנס למחשב ומציג את קוד ה-POST הנוכחי בשתי ספרות הקסדצימליות (למשל ‏b4‏). כל קוד מסמן באיזה שלב באתחול המערכת נמצאת. אם האתחול נתקע — הקוד שנשאר על התצוגה מספר לך היכן בדיוק העניין נעצר, וזו נקודת פתיחה מצוינת לחקירת תקלה.",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:BIOS_POST_card_for_PCI,_PCIe_and_LPC_bus.jpg",
    license: "CC0 (נחלת הכלל)",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    attribution: "Markus Kuhn",
  },
  {
    id: "fan-heatsink",
    topicId: "thermal",
    lessonId: "thermal-basics",
    termId: "known-good", // אין מונח ייעודי — משמש כתמונת פתיחה לשיעור החום
    src: "/images/learning/fan-heatsink.jpg",
    width: 960,
    height: 685,
    alt: "מכלול קירור של מעבד — מאוורר צמוד לגוף קירור עם צלעות מתכת וצינורות חום",
    caption: "מכלול קירור מלא — מאוורר + גוף קירור (Heat Sink) יחד, כפי שיושב על מעבד.",
    explanation:
      "כך נראה פתרון קירור אופייני: גוף קירור מתכתי עם צלעות וצינורות חום (Heat Pipes), ומאוורר שדוחף אוויר דרכן. גוף הקירור מושך את החום מהמעבד, והמאוורר מפזר אותו החוצה. אם הקירור לא עובד — המעבד מתחמם, יאט את עצמו (Throttling) ובסוף ייכבה כהגנה. בבדיקות חום זה בדיוק מה שבודקים.",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:ThinkPad_X220_CPU_cooling_system_(fan_and_heatsink_assembly).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "Siarhei Besarab",
  },
  {
    id: "heatsink",
    topicId: "thermal",
    lessonId: "thermal-basics",
    src: "/images/learning/heatsink.jpg",
    width: 960,
    height: 640,
    alt: "גוף קירור עם צלעות אלומיניום צפופות וצינורות חום נחושת",
    caption: "גוף קירור (Heat Sink) — צלעות מתכת שמגדילות את השטח לפיזור חום.",
    explanation:
      "גוף הקירור עשוי מהמון צלעות דקות. ככל שיש יותר שטח מתכת במגע עם האוויר — כך קל יותר להעביר אליו את החום מהמעבד. הצינורות הנחושתיים (Heat Pipes) מובילים את החום מהבסיס אל הצלעות במהירות. אין כאן חשמל או תוכנה — זו פיזיקה פשוטה של פיזור חום.",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Arctic_Freezer_13_heatsink.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    attribution: "Sergio D’Afflitto",
  },
  {
    id: "fan",
    topicId: "thermal",
    lessonId: "thermal-basics",
    src: "/images/learning/fan.jpg",
    width: 960,
    height: 768,
    alt: "מאוורר מחשב מרובע עם שבע כנפיים במרכז",
    caption: "מאוורר מחשב (Fan) — דוחף אוויר כדי לפזר את החום.",
    explanation:
      "מאוורר פשוט: מנוע שמסובב כנפיים ודוחף אוויר. הוא לא מקרר לבד — הוא מזרים אוויר דרך גוף הקירור כדי לקחת ממנו את החום. במערכת בדיקה תשמע אותו מאיץ כשהמעבד עובד קשה, וזה סימן תקין. מאוורר שנתקע או מתמלא אבק הוא סיבה נפוצה להתחממות.",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Corsair_Logo_120mm_desktop_computer_case_fan_(52504601012).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    attribution: "Eric Chan",
  },
];

const byId = new Map(visuals.map((v) => [v.id, v]));

// מיפוי מושג→תמונה. חלק מהמושגים משתפים תמונה קיימת (למשל "ssd" מציג את תמונת ה-M.2).
const termAliases: Record<string, string> = {
  ssd: "m2-ssd",
  fan: "fan",
  "heat-sink": "heatsink",
  thermal: "fan-heatsink",
  cooling: "fan-heatsink",
  chipset: "motherboard-pch-chipset",
};

const byTerm = new Map<string, Visual>();
for (const v of visuals) {
  if (v.termId && !byTerm.has(v.termId)) byTerm.set(v.termId, v);
}
for (const [termId, visualId] of Object.entries(termAliases)) {
  const v = byId.get(visualId);
  if (v && !byTerm.has(termId)) byTerm.set(termId, v);
}

export function getVisual(id: string): Visual | undefined {
  return byId.get(id);
}

/** תצוגה מקדימה של תמונה עבור מושג במילון (אם קיימת) */
export function getVisualByTerm(termId: string): Visual | undefined {
  return byTerm.get(termId);
}
