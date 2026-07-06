import Link from "next/link";
import type { Module } from "@/lib/types";
import { getLessonMeta } from "@/lib/curriculum";
import { getModule } from "@/lib/content";

type Status = "completed" | "in-progress" | "new";

const statusLabel: Record<Status, string> = {
  completed: "הושלם ✓",
  "in-progress": "בתהליך",
  new: "חדש",
};

const statusChip: Record<Status, string> = {
  completed: "bg-good-tint text-good",
  "in-progress": "bg-blue-tint text-blue-deep",
  new: "bg-surface-sunken text-ink-soft",
};

/**
 * כרטיס שיעור בתוך מפת המסלול (תצוגת שלבים). מציג סטטוס, זמן משוער, ומאפשר
 * לפתוח "למה לומדים את זה עכשיו?" ו"מה צריך לדעת לפני?" בלי להעמיס על המסך.
 */
export default function StageLessonCard({
  module: m,
  completed,
  started,
}: {
  module: Module;
  completed: boolean;
  started: boolean;
}) {
  const status: Status = completed ? "completed" : started ? "in-progress" : "new";
  const meta = getLessonMeta(m.id);
  const prereqLessons = (meta?.prerequisites ?? [])
    .map((id) => getModule(id))
    .filter((mod): mod is Module => Boolean(mod));
  const hasDetails =
    Boolean(meta?.whyNow) ||
    (meta?.prereqKnowledge.length ?? 0) > 0 ||
    prereqLessons.length > 0;

  return (
    <div className="rounded-2xl border border-line bg-surface shadow-(--shadow-card)">
      <Link
        href={`/lesson/${m.id}`}
        className="flex items-center gap-3.5 p-3.5 transition-transform active:scale-[0.99]"
      >
        {/* השבב */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy font-mono text-[10px] font-bold tracking-wider text-blue-tint shadow-(--shadow-chip)"
          dir="ltr"
          aria-hidden="true"
        >
          {m.chipLabel}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-ink-faint">
              שיעור {m.order}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${statusChip[status]}`}
            >
              {statusLabel[status]}
            </span>
          </div>
          <h4 className="mt-0.5 truncate text-[15.5px] font-bold leading-snug">
            {m.title}
          </h4>
          <p className="mt-0.5 text-[12px] text-ink-faint">
            ‏{m.sections.length} כרטיסים · כ־{m.minutes} דקות
          </p>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-5 w-5 shrink-0 text-ink-faint"
          aria-hidden="true"
        >
          <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {hasDetails && meta && (
        <details className="group border-t border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-2.5 text-[12.5px] font-semibold text-blue-deep">
            <span>למה זה כאן? · מה צריך לדעת לפני?</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90"
              aria-hidden="true"
            >
              <path d="m10 6 6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>

          <div className="space-y-2.5 px-3.5 pb-3.5">
            {meta.whyNow && (
              <div className="rounded-xl border-s-[3px] border-blue/50 bg-blue-tint/40 p-2.5">
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-blue-deep">למה לומדים את זה עכשיו? </span>
                  {meta.whyNow}
                </p>
              </div>
            )}

            {meta.prereqKnowledge.length > 0 && (
              <div className="rounded-xl bg-surface-sunken p-2.5">
                <p className="text-[12px] font-semibold text-ink">מה צריך לדעת לפני?</p>
                <ul className="mt-1 space-y-0.5">
                  {meta.prereqKnowledge.map((item) => (
                    <li
                      key={item}
                      className="flex gap-1.5 text-[12.5px] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {prereqLessons.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11.5px] font-semibold text-ink-faint">
                  שיעורי בסיס:
                </span>
                {prereqLessons.map((p) => (
                  <Link
                    key={p.id}
                    href={`/lesson/${p.id}`}
                    className="rounded-full border border-line bg-bg px-2.5 py-1 text-[12px] font-semibold text-ink-soft transition-colors active:bg-line"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
