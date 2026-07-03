import type { Block, LessonSection } from "@/lib/types";
import SimpleDiagram from "./SimpleDiagram";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-[16px] leading-relaxed text-ink">{block.text}</p>;

    case "term":
      return (
        <div className="rounded-xl border border-blue/25 bg-blue-tint/60 p-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[15px] font-bold text-blue-deep" dir="ltr">
              {block.term}
            </span>
            <span className="text-[11px] font-semibold text-blue-deep/70">
              מונח חדש
            </span>
          </div>
          <div className="mt-1 text-[15px] font-bold text-ink">{block.hebrew}</div>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
            {block.explanation}
          </p>
        </div>
      );

    case "bullets":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "remember":
      return (
        <div className="rounded-xl border border-good/25 bg-good-tint p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-good">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            מה חשוב לזכור
          </div>
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-[14.5px] leading-relaxed text-ink">
                <span className="font-bold text-good" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "mistakes":
      return (
        <div className="rounded-xl border border-bad/20 bg-bad-tint/60 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-bad">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 8.5v4M12 16h.01M10.3 3.9 2.5 17.5a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            טעויות נפוצות בהבנה
          </div>
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-[14.5px] leading-relaxed text-ink">
                <span className="font-bold text-bad" aria-hidden="true">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "tip":
      return (
        <div className="rounded-xl border-s-4 border-blue bg-surface p-4 shadow-(--shadow-card)">
          <div className="text-[13px] font-bold text-blue-deep">
            {block.title ?? "טיפ מהמנטור"}
          </div>
          <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{block.text}</p>
        </div>
      );

    case "diagram":
      return <SimpleDiagram kind={block.kind} />;

    case "questions":
      return (
        <div className="space-y-3">
          {block.items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-line bg-surface p-4"
            >
              <summary className="cursor-pointer list-none text-[15px] font-semibold leading-relaxed marker:hidden">
                <span className="me-2 font-mono text-[13px] font-bold text-blue" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.q}
                <span className="mt-1.5 block text-[12px] font-medium text-blue-deep group-open:hidden">
                  לחץ לחשיפת התשובה
                </span>
              </summary>
              <p className="mt-3 rounded-lg bg-bg p-3 text-[14.5px] leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      );
  }
}

/** כרטיס לימוד אחד — חלק אחד מתוך שיעור */
export default function LessonCard({ section }: { section: LessonSection }) {
  return (
    <article className="rise-in rounded-2xl border border-line bg-surface p-5 shadow-(--shadow-card)">
      <div className="eyebrow">{section.eyebrow}</div>
      <h2 className="mt-1.5 text-[22px] font-bold leading-snug">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
