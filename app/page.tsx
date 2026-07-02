"use client";

import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import InstallCard from "@/components/InstallCard";
import { availableModules, modules } from "@/lib/content";
import { useProgress } from "@/lib/useProgress";

export default function HomePage() {
  const { progress, ready } = useProgress();

  const completedCount = availableModules.filter((m) =>
    progress.completedLessons.includes(m.id)
  ).length;
  const percent = Math.round((completedCount / availableModules.length) * 100);

  // ממשיכים מהשיעור האחרון שנגעו בו, או מהראשון שטרם הושלם
  const continueModule =
    (progress.lastLessonId &&
      !progress.completedLessons.includes(progress.lastLessonId) &&
      availableModules.find((m) => m.id === progress.lastLessonId)) ||
    availableModules.find((m) => !progress.completedLessons.includes(m.id)) ||
    availableModules[0];

  const hasStartedAnything =
    progress.lastLessonId !== null || progress.completedLessons.length > 0;

  return (
    <main className="px-4 pt-8">
      {/* פתיח */}
      <header>
        <p className="text-[14px] font-semibold text-copper-deep">
          מנטור החומרה האישי שלך
        </p>
        <h1 className="mt-1 font-display text-[30px] font-black leading-tight">
          היי יובל 👋
          <br />
          לומדים חומרה, צעד אחר צעד.
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          כל שיעור בנוי מכרטיסים קטנים וברורים — בקצב שלך, בלי להציף. מתחילים
          מהמעבד, ובונים מזה את כל התמונה.
        </p>
      </header>

      {/* התקדמות + המשך למידה */}
      <section
        aria-label="ההתקדמות שלך"
        className="mt-6 rounded-2xl border border-navy-deep bg-navy p-5 text-white shadow-(--shadow-card)"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white/70">
            ההתקדמות שלך
          </span>
          <span className="font-mono text-[13px] font-bold text-copper-tint" dir="ltr">
            {ready ? `${percent}%` : "—"}
          </span>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-copper transition-all duration-700"
            style={{ width: ready ? `${Math.max(percent, 2)}%` : "2%" }}
          />
        </div>
        <p className="mt-2 text-[13px] text-white/70">
          הושלמו {completedCount} מתוך {availableModules.length} מודולים זמינים
        </p>
        <Link
          href={`/lesson/${continueModule.id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-copper px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
        >
          {hasStartedAnything ? "המשך ללמוד" : "התחל ללמוד"} · {continueModule.title}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="m14 6-6 6 6 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* התקנה כאפליקציה (PWA) — מוסתר אוטומטית כשכבר מותקן */}
      <InstallCard />

      {/* מסלול הלמידה */}
      <section aria-label="מסלול הלמידה" className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-[20px] font-bold">מסלול הלמידה</h2>
          <Link href="/modules" className="text-[13px] font-semibold text-copper-deep">
            לכל המודולים
          </Link>
        </div>
        <div className="space-y-3">
          {modules.slice(0, 4).map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              completed={progress.completedLessons.includes(m.id)}
              started={(progress.sectionReached[m.id] ?? 0) > 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
