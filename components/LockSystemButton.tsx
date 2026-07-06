"use client";

/*
 * LockSystemButton — נועל מחדש את המערכת הפרטית במכשיר הזה.
 *
 * This is a client-side privacy gate. It does not provide real server-side
 * authentication or real device monitoring.
 *
 * מכיוון שמצב הפתיחה חי בזיכרון בלבד (ולא ב-localStorage), טעינה מחדש של הדף
 * מאפסת אותו ומחזירה את שער הגישה. גם מנקים מפתח פתיחה קבוע ישן אם נותר.
 * אינו נוגע בהתקדמות, בהערות או במושגים.
 */

import { clearLegacyUnlock } from "@/lib/access";

export default function LockSystemButton() {
  function handleLock() {
    clearLegacyUnlock();
    // טעינה מחדש → מצב הפתיחה שבזיכרון מתאפס ושער הגישה מופיע שוב.
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleLock}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-bad/30 bg-bad-tint px-4 py-3 text-[14.5px] font-bold text-bad transition-transform active:scale-[0.985]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <path
          d="M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13v9h-13z"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      נעל מערכת
    </button>
  );
}
