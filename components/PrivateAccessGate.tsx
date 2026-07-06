"use client";

/*
 * PrivateAccessGate — מסך כניסה פרטי הנעול לפני כל תוכן האפליקציה.
 *
 * This is a client-side privacy gate, not secure server-side authentication.
 * מדובר במחסום פרטיות בצד הלקוח בלבד (localStorage) — לא במנגנון אימות מאובטח
 * בצד השרת. מטרתו למנוע גישה מזדמנת ולהבהיר שהמערכת פרטית ואישית.
 *
 * התנהגות:
 *  - עד שהרכיב "עולה" (mounted) מוצג רקע כהה ניטרלי — כדי למנוע קפיצת תוכן
 *    ובעיות hydration (השרת אינו יודע מה מצב ה-localStorage).
 *  - לאחר העלייה: אם המערכת פתוחה — מוצג התוכן (children). אחרת — מסך הנעילה.
 *  - סיסמה נכונה פותחת מיד ושומרת את המצב מקומית.
 */

import { useEffect, useRef, useState } from "react";
import { ACCESS_PASSWORD, isUnlocked, unlockAccess } from "@/lib/access";

export default function PrivateAccessGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUnlocked(isUnlocked());
    setMounted(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === ACCESS_PASSWORD) {
      unlockAccess();
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
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[#0a0505]"
      />
    );
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

        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-red-400/90">
          Private System
        </p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-tight text-red-50">
          מערכת פרטית נעולה
        </h1>
        <p className="mt-2 text-[15px] font-medium text-red-200/85">
          מנטור החומרה — מערכת לימוד פרטית
        </p>

        {/* אזהרה — מסגרת אדומה, רצינית */}
        <div className="mt-6 w-full rounded-xl border border-red-700/50 bg-red-950/30 p-4 text-right">
          <p className="text-[13.5px] leading-relaxed text-red-100/90">
            מערכת זו נבנתה לשימוש אישי ופרטי בלבד על ידי יובל זכאי. אין להעביר,
            לשלוח, להעתיק, להשתמש או לאפשר גישה לאדם אחר ללא הרשאה מיוחדת ומפורשת
            מהיוצר — יובל זכאי.
          </p>
        </div>

        <p className="mt-3 text-[12.5px] text-red-300/70">
          כניסה למערכת מותרת רק למי שקיבל הרשאה.
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
