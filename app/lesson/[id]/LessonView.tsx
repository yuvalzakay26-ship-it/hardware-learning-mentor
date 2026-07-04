"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import PersonalNote from "@/components/PersonalNote";
import type { Confidence, Module, UnclearReason } from "@/lib/types";
import { UNCLEAR_REASONS } from "@/lib/notes";
import {
  loadProgress,
  markLessonCompleted,
  markSectionReached,
  resetSectionToStart,
  setConfidence,
  setUnclearReason,
} from "@/lib/storage";

export default function LessonView({ module }: { module: Module }) {
  const total = module.sections.length;
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [ready, setReady] = useState(false);
  const [confidence, setConf] = useState<Record<string, Confidence>>({});
  const [reasons, setReasons] = useState<Record<string, UnclearReason>>({});

  // חוזרים לנקודה שבה עצרנו — אלא אם הגענו עם ?card=N (פתיחה ישירה של כרטיס
  // מתוך אזור החזרה), ואז נפתח בדיוק את הכרטיס המבוקש.
  useEffect(() => {
    const p = loadProgress();
    const reached = p.sectionReached[module.id] ?? 0;
    let start = Math.min(reached, total - 1);
    const params = new URLSearchParams(window.location.search);
    const cardParam = params.get("card");
    if (cardParam !== null) {
      const requested = Number.parseInt(cardParam, 10);
      if (Number.isFinite(requested) && requested >= 0 && requested < total) {
        start = requested;
      }
    }
    setIndex(start);
    setConf(p.confidence);
    setReasons(p.unclearReasons);
    setReady(true);
  }, [module.id, total]);

  useEffect(() => {
    if (ready) markSectionReached(module.id, index);
  }, [ready, module.id, index]);

  function goTo(next: number) {
    setIndex(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // «לתחילת השיעור» — מחזיר את הכרטיס הנראה לכרטיס הראשון בלבד.
  // לא מוחק שום התקדמות: השלמות, תחושת ביטחון ומושגים שנלמדו נשמרים.
  function goToStart() {
    if (ready) resetSectionToStart(module.id);
    setIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish() {
    markLessonCompleted(module.id);
    setFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (finished) {
    return (
      <main className="flex min-h-[70dvh] flex-col justify-center px-4 pt-8">
        <div className="rise-in rounded-3xl border border-good/25 bg-surface p-6 text-center shadow-(--shadow-card-lg)">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-good-tint text-[28px]">
            🎉
          </div>
          <h1 className="mt-4 text-[24px] font-extrabold">כל הכבוד! סיימת את השיעור</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            עברת את כל {total} הכרטיסים של «{module.title}». אין מבחן ואין ציון —
            רק ידע חדש שנשאר איתך. בכל זמן אפשר לחזור ולרענן באזור «חזרה».
          </p>
          <Link
            href="/review"
            className="mt-5 block rounded-2xl bg-blue px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            בוא נחזור רגע על מה שלמדת
          </Link>
          <Link
            href="/modules"
            className="mt-2.5 block rounded-2xl border border-line bg-bg px-4 py-3.5 text-[15px] font-semibold text-ink-soft"
          >
            המשך לשיעור הבא
          </Link>
        </div>
      </main>
    );
  }

  const section = module.sections[index];
  const isLast = index === total - 1;
  const confKey = `${module.id}:${section.id}`;
  const currentConf = confidence[confKey];
  const currentReason = reasons[confKey];

  function pickConfidence(value: Confidence) {
    const next = setConfidence(module.id, section.id, value);
    setConf(next.confidence);
    setReasons(next.unclearReasons);
  }

  function pickReason(reason: UnclearReason) {
    const next = setUnclearReason(module.id, section.id, reason);
    setReasons(next.unclearReasons);
  }

  return (
    <main className="px-4 pt-6">
      {/* כותרת עליונה + מד התקדמות בשיעור */}
      <header>
        <div className="flex items-center justify-between">
          <Link
            href="/modules"
            className="flex items-center gap-1 text-[13px] font-semibold text-ink-soft"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="m10 6 6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            למודולים
          </Link>
          <span className="font-mono text-[12px] font-bold text-ink-faint" dir="ltr">
            {index + 1} / {total}
          </span>
        </div>
        <h1 className="mt-2 text-[19px] font-bold leading-snug">{module.title}</h1>
        <div
          className="mt-3 flex gap-1"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="התקדמות בשיעור"
        >
          {module.sections.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= index ? "bg-blue" : "bg-line"
              }`}
            />
          ))}
        </div>
      </header>

      {/* ניווט עליון מהיר בין כרטיסי השיעור: כרטיס קודם · התחלה · כרטיס הבא */}
      <nav
        aria-label="ניווט בין כרטיסי השיעור"
        className="mt-3.5 flex items-stretch gap-1 rounded-2xl border border-line bg-surface p-1"
      >
        {/* כרטיס קודם — ב-RTL נמצא בצד ימין (תחילת הקריאה) */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="לכרטיס הקודם בשיעור"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[13px] font-semibold text-blue-deep transition-colors active:bg-blue-tint disabled:text-ink-faint disabled:opacity-40 disabled:active:bg-transparent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="m10 6 6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          קודם
        </button>

        <span className="my-1 w-px shrink-0 bg-line" aria-hidden="true" />

        {/* התחלה — מחזיר לכרטיס הראשון בשיעור, בלי למחוק שום התקדמות */}
        <button
          type="button"
          onClick={goToStart}
          disabled={index === 0}
          aria-label="לתחילת השיעור — לכרטיס הראשון"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[13px] font-semibold text-ink-soft transition-colors active:bg-line disabled:text-ink-faint disabled:opacity-40 disabled:active:bg-transparent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          התחלה
        </button>

        <span className="my-1 w-px shrink-0 bg-line" aria-hidden="true" />

        {/* כרטיס הבא — ב-RTL נמצא בצד שמאל */}
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={isLast}
          aria-label="לכרטיס הבא בשיעור"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[13px] font-semibold text-blue-deep transition-colors active:bg-blue-tint disabled:text-ink-faint disabled:opacity-40 disabled:active:bg-transparent"
        >
          הבא
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>

      {/* כרטיס הלימוד הנוכחי */}
      <div className="mt-4" key={section.id}>
        <LessonCard section={section} />

        {/* תחושת ביטחון — לא מבחן, רק סימון אישי */}
        <div className="mt-3 rounded-2xl border border-line bg-surface/70 p-3.5">
          <p className="text-center text-[13px] font-semibold text-ink-soft">
            איך הכרטיס הזה הרגיש לך?
          </p>
          <div className="mt-2.5 flex gap-2.5">
            <button
              type="button"
              onClick={() => pickConfidence("got")}
              aria-pressed={currentConf === "got"}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                currentConf === "got"
                  ? "border-good/40 bg-good-tint text-good"
                  : "border-line bg-bg text-ink-soft active:bg-line"
              }`}
            >
              👍 הבנתי
            </button>
            <button
              type="button"
              onClick={() => pickConfidence("unsure")}
              aria-pressed={currentConf === "unsure"}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                currentConf === "unsure"
                  ? "border-blue/40 bg-blue-tint text-blue-deep"
                  : "border-line bg-bg text-ink-soft active:bg-line"
              }`}
            >
              🤔 לא עד הסוף
            </button>
          </div>
          {currentConf === "unsure" && (
            <div className="mt-3 border-t border-line pt-3">
              <p className="text-center text-[12.5px] leading-relaxed text-ink-faint">
                זה בסדר גמור. סימנו לך את הכרטיס — הוא יחכה לך באזור «חזרה».
              </p>
              <p className="mt-2.5 text-center text-[12.5px] font-semibold text-ink-soft">
                רוצה להוסיף למה? (לא חובה)
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {UNCLEAR_REASONS.map((r) => {
                  const active = currentReason === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => pickReason(r.id)}
                      aria-pressed={active}
                      className={`rounded-full border px-2.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                        active
                          ? "border-blue/40 bg-blue-tint text-blue-deep"
                          : "border-line bg-bg text-ink-soft active:bg-line"
                      }`}
                    >
                      {r.emoji} {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* הערה אישית לכרטיס — נשמרת במחברת שלך, לא משפיעה על ההתקדמות */}
        <PersonalNote moduleId={module.id} sectionId={section.id} />
      </div>

      {/* ניווט בין כרטיסים */}
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="rounded-2xl border border-line bg-surface px-5 py-3.5 text-[15px] font-semibold text-ink-soft transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          הקודם
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="flex-1 rounded-2xl bg-good px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            סיימתי את השיעור ✓
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="flex-1 rounded-2xl bg-blue px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            הבא
          </button>
        )}
      </div>
    </main>
  );
}
