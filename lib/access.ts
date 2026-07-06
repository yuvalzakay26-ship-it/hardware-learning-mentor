/*
 * שער גישה פרטי — לוגיקת נעילה/פתיחה מקומית בלבד.
 *
 * This is a client-side privacy gate, not secure server-side authentication.
 * המפתח נשמר ב-localStorage בלבד, ואינו מהווה אבטחה אמיתית — רק מחסום פרטיות
 * שמונע כניסה מזדמנת למערכת הלימוד האישית של יובל זכאי.
 *
 * חשוב: מפתח האחסון כאן נפרד לחלוטין ממפתח ההתקדמות (hlm-progress-v1)
 * וממחברת ההערות — נעילה/פתיחה לעולם אינה נוגעת בנתוני הלמידה.
 */

/** מפתח ה-localStorage למצב הפתיחה. נפרד ממפתח ההתקדמות. */
export const ACCESS_STORAGE_KEY = "hlm-private-access-unlocked";

/** סיסמת הגישה למערכת הפרטית. */
export const ACCESS_PASSWORD = "yuval123";

/** האם המערכת פתוחה במכשיר הזה. בטוח לקריאה גם בצד השרת (מחזיר false). */
export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ACCESS_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** שומר מצב "פתוח" במכשיר. לא נוגע בשום נתון אחר ב-localStorage. */
export function unlockAccess(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACCESS_STORAGE_KEY, "true");
  } catch {
    // אחסון חסום — ממשיכים בלי לשמור
  }
}

/**
 * נועל מחדש את המערכת במכשיר — מסיר רק את מפתח הפתיחה.
 * ההתקדמות, ההערות, המושגים והחזרה נשארים כפי שהם.
 */
export function lockAccess(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ACCESS_STORAGE_KEY);
  } catch {
    // אחסון חסום — ממשיכים
  }
}
