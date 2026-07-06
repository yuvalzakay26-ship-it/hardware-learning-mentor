"use client";

import Image from "next/image";
import type { GlossaryTerm, TermLevel } from "@/lib/types";
import {
  categoryLabels,
  getTerm,
  getTermCaveat,
  getTermLevel,
  levelLabels,
} from "@/lib/glossary";
import { getVisualByTerm } from "@/lib/visuals";

// צבעי תווית לפי רמת לימוד — עדין, לא צועק.
const levelChipClass: Record<TermLevel, string> = {
  basic: "bg-good-tint text-good",
  intermediate: "bg-blue-tint text-blue-deep",
  advanced: "bg-surface-sunken text-ink",
  internal: "bg-navy text-blue-tint",
};

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

  const visual = getVisualByTerm(term.id);
  const level = getTermLevel(term);
  const caveat = getTermCaveat(term);

  return (
    <div
      className={`rounded-2xl border bg-surface p-4 shadow-(--shadow-card) transition-colors ${
        learned ? "border-good/40" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[15px] font-bold text-blue-deep" dir="ltr">
              {term.en}
            </span>
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10.5px] font-semibold text-ink-faint">
              {categoryLabels[term.category]}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${levelChipClass[level]}`}
            >
              {levelLabels[level]}
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

      {caveat && (
        <div className="mt-2.5 flex gap-2 rounded-xl border-s-[3px] border-bad/50 bg-bad-tint/40 p-2.5">
          <span className="mt-0.5 shrink-0 text-[13px]" aria-hidden="true">⚠️</span>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-bad">שים לב: </span>
            {caveat}
          </p>
        </div>
      )}

      {visual && (
        <figure className="mt-3 overflow-hidden rounded-xl border border-line bg-surface-sunken">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            sizes="(max-width: 512px) 100vw, 512px"
            loading="lazy"
            className="max-h-52 w-full object-contain"
          />
          <figcaption className="px-2.5 py-1.5 text-[10.5px] leading-snug text-ink-faint">
            <a
              href={visual.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {visual.sourceName}
            </a>
            {" · "}
            <span dir="ltr">{visual.attribution}</span>
            {" · "}
            <span dir="ltr">{visual.license}</span>
          </figcaption>
        </figure>
      )}

      {term.example && (
        <p className="mt-2.5 rounded-xl bg-surface-sunken p-2.5 text-[13.5px] leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">דוגמה מהחומרה: </span>
          {term.example}
        </p>
      )}

      {term.workplace && (
        <div className="mt-2 flex gap-2 rounded-xl border-s-[3px] border-blue/50 bg-blue-tint/40 p-2.5">
          <span className="mt-0.5 shrink-0 text-[13px]" aria-hidden="true">🛠️</span>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-blue-deep">איפה פוגשים את זה בעבודה? </span>
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
