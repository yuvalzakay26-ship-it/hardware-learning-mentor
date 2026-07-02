"use client";

import type { GlossaryTerm } from "@/lib/types";

/** כרטיס מונח במילון, עם כפתור "למדתי" שנשמר בהתקדמות */
export default function TermCard({
  term,
  learned,
  onToggle,
}: {
  term: GlossaryTerm;
  learned: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border bg-surface p-4 shadow-(--shadow-card) transition-colors ${
        learned ? "border-good/40" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[15px] font-bold text-copper-deep" dir="ltr">
            {term.en}
          </span>
          <div className="mt-0.5 text-[15.5px] font-bold text-ink">{term.he}</div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={learned}
          className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            learned
              ? "border-good/40 bg-good-tint text-good"
              : "border-line bg-bg text-ink-soft active:bg-line"
          }`}
        >
          {learned ? "✓ למדתי" : "סמן שלמדתי"}
        </button>
      </div>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
        {term.explanation}
      </p>
      {term.example && (
        <p className="mt-2 rounded-lg bg-bg p-2.5 text-[13.5px] leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">דוגמה: </span>
          {term.example}
        </p>
      )}
    </div>
  );
}
