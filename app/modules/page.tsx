"use client";

import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/lib/content";
import { useProgress } from "@/lib/useProgress";

export default function ModulesPage() {
  const { progress } = useProgress();
  const available = modules.filter((m) => m.available);
  const upcoming = modules.filter((m) => !m.available);

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="text-[14px] font-semibold text-copper-deep">מסלול הלמידה</p>
        <h1 className="mt-1 font-display text-[28px] font-black leading-tight">
          מודולי הלימוד
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          המסלול בנוי בהדרגה: כל מודול נשען על מה שלמדת לפניו. מומלץ ללמוד לפי
          הסדר.
        </p>
      </header>

      <section aria-label="מודולים זמינים" className="mt-6 space-y-3">
        {available.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            completed={progress.completedLessons.includes(m.id)}
            started={(progress.sectionReached[m.id] ?? 0) > 0}
          />
        ))}
      </section>

      <section aria-label="מודולים עתידיים" className="mt-8">
        <h2 className="mb-3 font-display text-[18px] font-bold text-ink-soft">
          בהמשך המסלול
        </h2>
        <div className="space-y-3">
          {upcoming.map((m) => (
            <ModuleCard key={m.id} module={m} completed={false} started={false} />
          ))}
        </div>
      </section>
    </main>
  );
}
