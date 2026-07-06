"use client";

/*
 * PrivateAccessGate — מסך כניסה פרטי הנעול לפני כל תוכן האפליקציה.
 *
 * This is a client-side privacy gate. It does not provide real server-side
 * authentication or real device monitoring.
 *
 * מדובר במחסום פרטיות בצד הלקוח בלבד — לא במנגנון אימות מאובטח בצד השרת ולא
 * בניטור מכשירים אמיתי. מטרתו למנוע גישה מזדמנת ולהבהיר שהמערכת פרטית ואישית.
 *
 * התנהגות גישה (session-only):
 *  - מצב הפתיחה נשמר אך ורק בזיכרון של הרכיב (React state) — לא ב-localStorage.
 *  - לכן כל טעינה מחדש, פתיחת טאב חדש, או סגירה ופתיחה של האפליקציה דורשות שוב
 *    סיסמה. אין "זכירת פתיחה" מתמשכת.
 *  - עד שהרכיב "עולה" (mounted) מוצג רקע כהה ניטרלי — למניעת קפיצת תוכן ובעיות
 *    hydration (השרת אינו יודע מה מצב הריצה בצד הלקוח).
 *  - מפתח פתיחה ישן וקבוע (אם נותר מגרסה קודמת) מנוקה בעת העלייה.
 */

import { useEffect, useRef, useState } from "react";
import { clearLegacyUnlock, isCorrectPassword } from "@/lib/access";

export default function PrivateAccessGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  // מצב הפתיחה חי בזיכרון בלבד — מתאפס בכל טעינה מחדש / טאב חדש.
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // מנקים מפתח פתיחה קבוע ישן — כדי שלא יישאר מצב פתיחה מתמשך.
    clearLegacyUnlock();
    setMounted(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isCorrectPassword(value)) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      inputRef.current?.focus();
    }
  }

  // לפני העלייה — רקע כהה ניטרלי, בלי תוכן ובלי ניווט. עקבי בין שרת ללקוח.
  if (!mounted) {
    return <div aria-hidden="true" className="fixed inset-0 bg-[#0a0505]" />;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <main
      dir="rtl"
      className="fixed inset-0 z-[100] flex min-h-dvh flex-col items-center justify-center overflow-y-auto bg-[#0a0505] px-6 py-10 text-red-50"
      style={{
        // גרדיאנט אדום-שחור עמוק, רציני — בלי הבזקים ובלי אנימציות.
        backgroundImage:
          "radial-gradient(120% 90% at 50% -10%, rgba(120,15,20,0.55) 0%, rgba(40,6,8,0.35) 38%, rgba(10,5,5,0) 70%)",
      }}
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* מגן/מנעול — אייקון גדול, כבד */}
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/40 shadow-[0_0_40px_-8px_rgba(220,38,38,0.5)]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-11 w-11 text-red-400"
          >
            <path
              d="M12 2.5 4.5 5.5v5.2c0 4.6 3.1 8.4 7.5 9.8 4.4-1.4 7.5-5.2 7.5-9.8V5.5L12 2.5Z"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 11.5v-1.2a2.5 2.5 0 0 1 5 0v1.2M8.6 11.5h6.8v4.2H8.6z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* תווית אזהרה קטנה — «גישה למורשים בלבד» */}
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-950/50 px-3 py-1 text-[12px] font-bold tracking-wide text-red-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              d="M12 3 2.5 20h19L12 3ZM12 9.5v4.5M12 17h.01"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          גישה למורשים בלבד
        </span>

        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-red-400/90">
          Private System
        </p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-tight text-red-50">
          מערכת פרטית נעולה
        </h1>
        <p className="mt-2 text-[15px] font-medium text-red-200/85">
          מנטור החומרה — מערכת לימוד פרטית של יובל זכאי
        </p>

        {/* אזהרה ראשית — מסגרת אדומה, רצינית */}
        <div className="mt-6 w-full rounded-xl border border-red-700/50 bg-red-950/30 p-4 text-right">
          <p className="text-[13.5px] leading-relaxed text-red-100/90">
            המערכת מיועדת לשימוש אישי ופרטי בלבד על ידי יובל זכאי. אין להעביר,
            לשלוח, להעתיק, לפרסם, לשתף קישור, לשתף סיסמה או לאפשר שימוש לאדם אחר
            ללא הרשאה מפורשת מהיוצר — יובל זכאי.
          </p>
        </div>

        {/* בלוק אזהרה נוסף — כניסה ללא הרשאה אסורה */}
        <div className="mt-3 w-full rounded-xl border border-red-600/60 bg-red-900/25 p-4 text-right">
          <p className="text-[13.5px] font-semibold leading-relaxed text-red-100">
            כניסה ללא הרשאה אסורה. שימוש לא מורשה במערכת, ניסיון כניסה או העברת
            הגישה לאחרים אינם מאושרים.
          </p>
        </div>

        {/* ניסוח כן לגבי אופי הנעילה — בלי לטעון לניטור מכשירים אמיתי */}
        <p className="mt-3 text-right text-[12px] leading-relaxed text-red-300/70">
          הגישה מיועדת למכשירים מורשים בלבד. בשלב זה מדובר בנעילת פרטיות בצד
          הלקוח, ולא במערכת אימות שרת מלאה.
        </p>

        {/* טופס כניסה */}
        <form onSubmit={handleSubmit} className="mt-7 w-full text-right">
          <label
            htmlFor="private-access-password"
            className="mb-2 block text-[13.5px] font-semibold text-red-100"
          >
            הכנס סיסמת גישה
          </label>
          <input
            ref={inputRef}
            id="private-access-password"
            type="password"
            inputMode="text"
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            aria-invalid={error}
            aria-describedby={error ? "private-access-error" : undefined}
            className="w-full rounded-xl border border-red-700/60 bg-black/50 px-4 py-3 text-[16px] text-red-50 placeholder-red-300/40 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-500/40"
            placeholder="••••••••"
          />

          {error && (
            <p
              id="private-access-error"
              role="alert"
              className="mt-2 text-[13px] font-semibold text-red-300"
            >
              סיסמה שגויה. אין הרשאה להיכנס למערכת.
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-[15.5px] font-bold text-white shadow-[0_4px_20px_-4px_rgba(220,38,38,0.6)] transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 active:bg-red-700"
          >
            כניסה למערכת
          </button>
        </form>

        <p className="mt-8 text-[11.5px] tracking-wide text-red-400/60">
          Private Learning System · Yuval Zakay
        </p>
      </div>
    </main>
  );
}
