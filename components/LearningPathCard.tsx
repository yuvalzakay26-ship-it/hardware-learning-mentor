import Link from "next/link";
import type { LearningPath } from "@/lib/learningPaths";

/** כרטיס מסלול גדול לעמוד הבית — שלושת המסלולים המרכזיים. */
export default function LearningPathCard({
  path,
  lessonsTotal,
  lessonsDone,
}: {
  path: LearningPath;
  /** מספר השיעורים הפעילים במסלול (למסלול פעיל). */
  lessonsTotal?: number;
  /** כמה מהם הושלמו (למסלול פעיל). */
  lessonsDone?: number;
}) {
  const isActive = path.status === "active";
  const buttonLabel = isActive ? "כניסה למסלול" : "צפייה במסלול";

  const percent =
    isActive && lessonsTotal
      ? Math.round(((lessonsDone ?? 0) / lessonsTotal) * 100)
      : 0;

  const plannedCount =
    path.plannedSessions.length + path.plannedTerms.length;

  return (
    <Link
      href={`/modules?path=${path.id}`}
      className="block rounded-3xl border border-line bg-surface p-5 shadow-(--shadow-card) transition-transform active:scale-[0.99]"
    >
      <div className="flex items-start gap-3.5">
        {/* אייקון עגול */}
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-tint text-[24px]"
          aria-hidden="true"
        >
          {path.emoji}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full bg-navy px-2 py-0.5 font-mono text-[10.5px] font-bold tracking-wide text-blue-tint"
              dir="ltr"
            >
              {path.chip}
            </span>
            {!isActive && (
              <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
                בקרוב
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-[18px] font-extrabold leading-tight" dir="auto">
            {path.order}. {path.titleHebrew}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
        {path.descriptionHebrew}
      </p>

      {/* מטא-נתונים: התקדמות למסלול פעיל, ספירת פריטים מתוכננים למסלול מתוכנן */}
      {isActive && lessonsTotal ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[12.5px] font-semibold text-ink-soft">
            <span>
              {lessonsDone ?? 0}/{lessonsTotal} שיעורים הושלמו
            </span>
            <span className="font-mono text-blue-deep" dir="ltr">
              {percent}%
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunken">
            <div
              className="h-full rounded-full bg-gradient-to-l from-blue to-sky transition-all duration-700"
              style={{ width: `${Math.max(percent, 2)}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[12.5px] font-semibold text-ink-faint">
          {plannedCount} פריטים מתוכננים · סשנים ומונחים
        </p>
      )}

      {/* כפתור */}
      <span className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-blue px-4 py-3 text-[14.5px] font-bold text-white">
        {buttonLabel}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="m14 6-6 6 6 6"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
