"use client";

import StageLessonCard from "@/components/StageLessonCard";
import { lessonsInStage, stages } from "@/lib/curriculum";
import { useProgress } from "@/lib/useProgress";

export default function ModulesPage() {
  const { progress } = useProgress();

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="eyebrow">מסלול הלמידה</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight">
          מפת המסלול
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          המסלול בנוי בשלבים — מהבסיס ועד למתקדם. כל שלב נשען על מה שלפניו, וכל
          שיעור מסביר למה הוא מופיע בדיוק כאן ומה כדאי לדעת לפניו.
        </p>
      </header>

      <div className="mt-6 space-y-8">
        {stages.map((stage) => {
          const lessons = lessonsInStage(stage.id);
          if (lessons.length === 0) return null;
          const done = lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          return (
            <section key={stage.id} aria-label={stage.title}>
              {/* כותרת השלב */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-mono text-[11px] font-bold tracking-wider text-blue-tint shadow-(--shadow-chip)"
                  dir="ltr"
                  aria-hidden="true"
                >
                  {stage.chipLabel}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-blue">
                      שלב {stage.order}
                    </span>
                    <span className="text-[11px] font-semibold text-ink-faint">
                      {done}/{lessons.length} הושלמו
                    </span>
                  </div>
                  <h2 className="text-[19px] font-extrabold leading-tight">
                    {stage.title}
                  </h2>
                </div>
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                {stage.subtitle}
              </p>

              {/* שיעורי השלב */}
              <div className="mt-3 space-y-2.5">
                {lessons.map((m) => (
                  <StageLessonCard
                    key={m.id}
                    module={m}
                    completed={progress.completedLessons.includes(m.id)}
                    started={(progress.sectionReached[m.id] ?? 0) > 0}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
