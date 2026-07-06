import Link from "next/link";
import type { Module } from "@/lib/types";
import { getLessonMeta, stageOfLesson } from "@/lib/curriculum";
import { getModule } from "@/lib/content";

/**
 * כרטיס קצר בראש השיעור (מוצג רק בכרטיס הראשון): מיקום בשלב, "למה זה כאן",
 * ו"מה כדאי להבין לפני". קומפקטי — לא מעמיס, ומופיע רק כשיש מה להראות.
 */
export default function LessonIntroMeta({ module: m }: { module: Module }) {
  const meta = getLessonMeta(m.id);
  if (!meta) return null;

  const stage = stageOfLesson(m.id);
  const prereqLessons = meta.prerequisites
    .map((id) => getModule(id))
    .filter((mod): mod is Module => Boolean(mod));

  const hasPrereq = meta.prereqKnowledge.length > 0 || prereqLessons.length > 0;
  if (!meta.whyNow && !hasPrereq && !stage) return null;

  return (
    <section
      aria-label="הקשר השיעור במסלול"
      className="rise-in mb-4 space-y-2.5 rounded-2xl border border-line bg-surface/70 p-3.5"
    >
      {stage && (
        <p className="text-[11.5px] font-bold uppercase tracking-wide text-blue">
          שלב {stage.order} · {stage.title}
        </p>
      )}

      {meta.whyNow && (
        <div className="flex gap-2 rounded-xl border-s-[3px] border-blue/50 bg-blue-tint/40 p-2.5">
          <span className="mt-0.5 shrink-0 text-[13px]" aria-hidden="true">🧭</span>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-blue-deep">למה זה מופיע כאן במסלול? </span>
            {meta.whyNow}
          </p>
        </div>
      )}

      {hasPrereq && (
        <div className="rounded-xl bg-surface-sunken p-2.5">
          <p className="text-[12.5px] font-semibold text-ink">
            לפני השיעור הזה כדאי להבין:
          </p>
          {meta.prereqKnowledge.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {meta.prereqKnowledge.map((item) => (
                <li
                  key={item}
                  className="flex gap-1.5 text-[13px] leading-relaxed text-ink-soft"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {prereqLessons.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11.5px] font-semibold text-ink-faint">
                מומלץ לחזור אל:
              </span>
              {prereqLessons.map((p) => (
                <Link
                  key={p.id}
                  href={`/lesson/${p.id}`}
                  className="rounded-full border border-line bg-bg px-2.5 py-1 text-[12px] font-semibold text-blue-deep transition-colors active:bg-blue-tint"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
