/*
 * שער גישה פרטי — לוגיקת נעילה/פתיחה בזיכרון בלבד (session-only).
 *
 * This is a client-side privacy gate. It does not provide real server-side
 * authentication or real device monitoring.
 *
 * הגישה נשמרת אך ורק בזיכרון של הריצה הנוכחית (React state) — לא ב-localStorage.
 * לכן כל טעינה מחדש, פתיחת טאב חדש או סגירה ופתיחה של האפליקציה דורשות שוב סיסמה.
 *
 * חשוב: מפתח ההתקדמות (hlm-progress-v1) ומחברת ההערות אינם מנוהלים כאן ולעולם
 * אינם מושפעים מנעילה/פתיחה — נתוני הלמידה נשמרים כרגיל.
 */

/**
 * מפתח ישן ששימש בעבר לשמירת מצב "פתוח" באופן קבוע. אנחנו כבר לא כותבים אליו,
 * אבל מנקים אותו אם נותר מריצה קודמת — כדי שלא יישאר מצב פתיחה מתמשך.
 */
const LEGACY_UNLOCK_KEY = "hlm-private-access-unlocked";

/** סיסמת הגישה למערכת הפרטית. */
export const ACCESS_PASSWORD = "yuval123";

/**
 * מנקה את מפתח הפתיחה הישן והקבוע מ-localStorage, אם קיים.
 * נוגע אך ורק במפתח הזה — התקדמות והערות נשארות כפי שהן.
 */
export function clearLegacyUnlock(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LEGACY_UNLOCK_KEY);
  } catch {
    // אחסון חסום — ממשיכים
  }
}

/** האם הסיסמה שהוזנה נכונה. הפתיחה בפועל נשמרת בזיכרון הרכיב בלבד. */
export function isCorrectPassword(value: string): boolean {
  return value === ACCESS_PASSWORD;
}
