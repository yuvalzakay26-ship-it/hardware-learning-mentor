import Link from "next/link";
import type { Module } from "@/lib/types";

type Status = "completed" | "in-progress" | "new" | "locked";

function statusOf(m: Module, completed: boolean, started: boolean): Status {
  if (!m.available) return "locked";
  if (completed) return "completed";
  if (started) return "in-progress";
  return "new";
}

const statusLabel: Record<Status, string> = {
  completed: "הושלם ✓",
  "in-progress": "בתהליך",
  new: "חדש",
  locked: "בקרוב",
};

/** כרטיס מודול בסגנון "שבב" — הריבוע הכהה עם הפינים הוא חתימת העיצוב של האפליקציה */
export default function ModuleCard({
  module: m,
  completed,
  started,
}: {
  module: Module;
  completed: boolean;
  started: boolean;
}) {
  const status = statusOf(m, completed, started);
  const locked = status === "locked";

  const card = (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform ${
        locked ? "opacity-60" : "active:scale-[0.985]"
      }`}
    >
      {/* השבב */}
      <div className="relative shrink-0" aria-hidden="true">
        <div className="absolute inset-x-2 -top-1 flex justify-between px-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1.5 w-0.5 rounded-sm bg-ink-faint/60" />
          ))}
        </div>
        <div className="absolute inset-x-2 -bottom-1 flex justify-between px-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1.5 w-0.5 rounded-sm bg-ink-faint/60" />
          ))}
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg font-mono text-[11px] font-bold tracking-wider shadow-(--shadow-chip) ${
            locked
              ? "bg-ink-faint/30 text-ink-soft"
              : "bg-navy text-copper-tint"
          }`}
          dir="ltr"
        >
          {m.chipLabel}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-ink-faint">
            מודול {m.order}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              status === "completed"
                ? "bg-good-tint text-good"
                : status === "in-progress"
                  ? "bg-copper-tint text-copper-deep"
                  : status === "new"
                    ? "bg-bg text-ink-soft"
                    : "bg-bg text-ink-faint"
            }`}
          >
            {statusLabel[status]}
          </span>
        </div>
        <h3 className="mt-0.5 truncate font-display text-[17px] font-bold leading-snug">
          {m.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink-soft">
          {m.subtitle}
        </p>
        {m.available && (
          <p className="mt-1 text-[12px] text-ink-faint">
            ‏{m.sections.length} כרטיסי לימוד · כ־{m.minutes} דקות
          </p>
        )}
      </div>

      {!locked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-5 w-5 shrink-0 text-ink-faint"
          aria-hidden="true"
        >
          <path
            d="m14 6-6 6 6 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );

  if (locked) return card;
  return (
    <Link href={`/lesson/${m.id}`} className="block">
      {card}
    </Link>
  );
}
