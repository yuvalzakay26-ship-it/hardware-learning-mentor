"use client";

import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import InstallCard from "@/components/InstallCard";
import { availableModules, modules } from "@/lib/content";
import { categoryLabels, glossaryTerms } from "@/lib/glossary";
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

  // מיקוד היום — הכרטיס הבא שממתין בשיעור הנוכחי
  const reached = progress.sectionReached[continueModule.id] ?? 0;
  const focusSection =
    continueModule.sections[Math.min(reached, continueModule.sections.length - 1)];

  // המושג הבא שכדאי להבין — הראשון שעדיין לא סומן כנלמד
  const nextTerm = glossaryTerms.find(
    (t) => !progress.learnedTerms.includes(t.id)
  );

  return (
    <main className="px-4 pt-8">
      {/* פתיח */}
      <header>
        <p className="eyebrow">מנטור החומרה האישי שלך</p>
        <h1 className="mt-1.5 text-[29px] font-extrabold leading-[1.15]">
          היי יובל 👋
          <br />
          לומדים חומרה, צעד אחר צעד.
        </h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
          כל שיעור בנוי מכרטיסים קטנים וברורים — בקצב שלך, בלי מבחנים ובלי לחץ.
        </p>
      </header>

      {/* המשך למידה + התקדמות */}
      <section
        aria-label="המשך למידה"
        className="mt-6 rounded-3xl border border-navy-deep bg-navy p-5 text-white shadow-(--shadow-card-lg)"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white/70">
            {hasStartedAnything ? "ממשיכים מאיפה שעצרת" : "מוכן להתחיל?"}
          </span>
          <span className="font-mono text-[13px] font-bold text-blue-tint" dir="ltr">
            {ready ? `${percent}%` : "—"}
          </span>
        </div>

        <h2 className="mt-2 text-[20px] font-bold leading-snug text-white">
          {continueModule.title}
        </h2>
        <p className="mt-1 text-[13.5px] leading-relaxed text-white/70">
          {continueModule.subtitle}
        </p>

        <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-l from-blue to-sky transition-all duration-700"
            style={{ width: ready ? `${Math.max(percent, 2)}%` : "2%" }}
          />
        </div>
        <p className="mt-2 text-[12.5px] text-white/60">
          הושלמו {completedCount} מתוך {availableModules.length} מודולים זמינים
        </p>

        <Link
          href={`/lesson/${continueModule.id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-blue px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
        >
          {hasStartedAnything ? "המשך ללמוד" : "התחל ללמוד"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="m14 6-6 6 6 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* המיקוד של היום + המושג הבא */}
      <section aria-label="המיקוד של היום" className="mt-4 grid gap-3">
        {focusSection && (
          <Link
            href={`/lesson/${continueModule.id}`}
            className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-tint text-[17px]" aria-hidden="true">
              🎯
            </span>
            <div className="min-w-0 flex-1">
              <div className="eyebrow">המיקוד של היום</div>
              <div className="mt-0.5 text-[15.5px] font-bold leading-snug">
                {focusSection.title}
              </div>
              <p className="mt-0.5 line-clamp-1 text-[13px] text-ink-soft">
                {focusSection.eyebrow}
              </p>
            </div>
          </Link>
        )}

        {nextTerm && (
          <Link
            href="/glossary"
            className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy font-mono text-[11px] font-bold text-blue-tint" dir="ltr" aria-hidden="true">
              {nextTerm.en.slice(0, 4)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="eyebrow">המושג הבא שכדאי להבין</div>
              <div className="mt-0.5 text-[15.5px] font-bold leading-snug" dir="auto">
                <span dir="ltr">{nextTerm.en}</span> — {nextTerm.he}
              </div>
              <p className="mt-0.5 text-[13px] text-ink-soft">
                {categoryLabels[nextTerm.category]}
              </p>
            </div>
          </Link>
        )}
      </section>

      {/* מה כבר למדת */}
      {ready && hasStartedAnything && (
        <section aria-label="מה כבר למדת" className="mt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)">
            <div className="flex flex-1 flex-col items-center border-e border-line-soft px-2">
              <span className="text-[22px] font-extrabold text-blue-deep">
                {completedCount}
              </span>
              <span className="text-[12px] font-semibold text-ink-soft">שיעורים</span>
            </div>
            <div className="flex flex-1 flex-col items-center border-e border-line-soft px-2">
              <span className="text-[22px] font-extrabold text-blue-deep">
                {progress.learnedTerms.length}
              </span>
              <span className="text-[12px] font-semibold text-ink-soft">מושגים</span>
            </div>
            <Link href="/review" className="flex flex-1 flex-col items-center px-2">
              <span className="text-[22px]">🔁</span>
              <span className="text-[12px] font-semibold text-blue-deep">לחזרה</span>
            </Link>
          </div>
        </section>
      )}

      {/* התקנה כאפליקציה (PWA) — שקט, מוסתר כשכבר מותקן */}
      <InstallCard />

      {/* מסלול הלמידה */}
      <section aria-label="מסלול הלמידה" className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[20px] font-bold">מסלול הלמידה</h2>
          <Link href="/modules" className="text-[13px] font-semibold text-blue-deep">
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
