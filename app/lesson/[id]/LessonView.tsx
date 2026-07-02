"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import type { Module } from "@/lib/types";
import { loadProgress, markLessonCompleted, markSectionReached } from "@/lib/storage";

export default function LessonView({ module }: { module: Module }) {
  const total = module.sections.length;
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [ready, setReady] = useState(false);

  // חוזרים לנקודה שבה עצרנו בפעם הקודמת
  useEffect(() => {
    const p = loadProgress();
    const reached = p.sectionReached[module.id] ?? 0;
    setIndex(Math.min(reached, total - 1));
    setReady(true);
  }, [module.id, total]);

  useEffect(() => {
    if (ready) markSectionReached(module.id, index);
  }, [ready, module.id, index]);

  function goTo(next: number) {
    setIndex(next);
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
        <div className="rise-in rounded-2xl border border-good/30 bg-surface p-6 text-center shadow-(--shadow-card)">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-good-tint text-[28px]">
            🎉
          </div>
          <h1 className="mt-4 font-display text-[24px] font-black">
            כל הכבוד! סיימת את השיעור
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            עברת את כל {total} הכרטיסים של «{module.title}». הדרך הטובה ביותר
            לקבע את הידע היא מבחן קצר — מוכן?
          </p>
          <Link
            href={`/quiz/${module.id}`}
            className="mt-5 block rounded-xl bg-copper px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            למבחן הקצר ({module.quiz.length} שאלות)
          </Link>
          <Link
            href="/modules"
            className="mt-2.5 block rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] font-semibold text-ink-soft"
          >
            חזרה למודולים
          </Link>
        </div>
      </main>
    );
  }

  const section = module.sections[index];
  const isLast = index === total - 1;

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
        <h1 className="mt-2 font-display text-[20px] font-bold leading-snug">
          {module.title}
        </h1>
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
                i <= index ? "bg-copper" : "bg-line"
              }`}
            />
          ))}
        </div>
      </header>

      {/* כרטיס הלימוד הנוכחי */}
      <div className="mt-4" key={section.id}>
        <LessonCard section={section} />
      </div>

      {/* ניווט בין כרטיסים */}
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="rounded-xl border border-line bg-surface px-5 py-3.5 text-[15px] font-semibold text-ink-soft transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          הקודם
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="flex-1 rounded-xl bg-good px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            סיימתי את השיעור ✓
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="flex-1 rounded-xl bg-copper px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            הבא
          </button>
        )}
      </div>
    </main>
  );
}
