"use client";

import type { GlossaryTerm } from "@/lib/types";
import { categoryLabels, getTerm } from "@/lib/glossary";

/** כרטיס מושג עשיר: הסבר פשוט, דוגמה, איפה פוגשים בעבודה, ומונחים קשורים */
export default function TermCard({
  term,
  learned,
  onToggle,
  onSelectRelated,
}: {
  term: GlossaryTerm;
  learned: boolean;
  onToggle: () => void;
  onSelectRelated?: (id: string) => void;
}) {
  const related = (term.related ?? [])
    .map((id) => getTerm(id))
    .filter((t): t is GlossaryTerm => Boolean(t));

  return (
    <div
      className={`rounded-2xl border bg-surface p-4 shadow-(--shadow-card) transition-colors ${
        learned ? "border-good/40" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[15px] font-bold text-copper-deep" dir="ltr">
              {term.en}
            </span>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10.5px] font-semibold text-ink-faint">
              {categoryLabels[term.category]}
            </span>
          </div>
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
        <p className="mt-2.5 rounded-xl bg-surface-sunken p-2.5 text-[13.5px] leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">דוגמה מהחומרה: </span>
          {term.example}
        </p>
      )}

      {term.workplace && (
        <div className="mt-2 flex gap-2 rounded-xl border-s-[3px] border-copper/50 bg-copper-tint/40 p-2.5">
          <span className="mt-0.5 shrink-0 text-[13px]" aria-hidden="true">🛠️</span>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-copper-deep">איפה פוגשים את זה בעבודה? </span>
            {term.workplace}
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-semibold text-ink-faint">מושגים קשורים:</span>
          {related.map((r) =>
            onSelectRelated ? (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelectRelated(r.id)}
                className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[12px] font-semibold text-ink-soft transition-colors active:bg-line"
                dir="ltr"
              >
                {r.en}
              </button>
            ) : (
              <span
                key={r.id}
                className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[12px] font-semibold text-ink-soft"
                dir="ltr"
              >
                {r.en}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
