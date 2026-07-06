"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StageLessonCard from "@/components/StageLessonCard";
import AcronymTerm from "@/components/AcronymTerm";
import { lessonsInStage, stages, type StageId } from "@/lib/curriculum";
import {
  getLearningPath,
  isLearningPathId,
  type LearningPath,
  type LearningPathId,
} from "@/lib/learningPaths";
import { useProgress } from "@/lib/useProgress";

// ── בורר המסלול בראש העמוד ──────────────────────────────────────────────────

function PathSelector({ active }: { active: LearningPathId | null }) {
  const chips: { label: string; href: string; key: LearningPathId | "all" }[] = [
    { label: "יסודות חומרה", href: "/modules?path=hardware", key: "hardware" },
    { label: "Central Workflow", href: "/modules?path=central", key: "central" },
    { label: "Tools & Execution", href: "/modules?path=tools", key: "tools" },
    { label: "הכל", href: "/modules", key: "all" },
  ];
  const activeKey: LearningPathId | "all" = active ?? "all";

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = chip.key === activeKey;
        return (
          <Link
            key={chip.key}
            href={chip.href}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              isActive
                ? "bg-blue text-white"
                : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {chip.label}
          </Link>
        );
      })}
    </div>
  );
}

// ── שלבי הלימוד הפעילים (מסלול "יסודות חומרה" / "הכל") ──────────────────────

function StageList({
  stageIds,
  completedLessons,
  sectionReached,
}: {
  stageIds: StageId[];
  completedLessons: string[];
  sectionReached: Record<string, number>;
}) {
  return (
    <div className="mt-6 space-y-8">
      {stages
        .filter((stage) => stageIds.includes(stage.id))
        .map((stage) => {
          const lessons = lessonsInStage(stage.id);
          if (lessons.length === 0) return null;
          const done = lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;

          return (
            <section key={stage.id} aria-label={stage.title}>
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

              <div className="mt-3 space-y-2.5">
                {lessons.map((m) => (
                  <StageLessonCard
                    key={m.id}
                    module={m}
                    completed={completedLessons.includes(m.id)}
                    started={(sectionReached[m.id] ?? 0) > 0}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}

// ── מסלול מתוכנן (Central / Tools): סשנים ומונחים כ"בקרוב" ──────────────────

function PlannedPath({ path }: { path: LearningPath }) {
  return (
    <div className="mt-6 space-y-8">
      <div className="rounded-2xl border border-dashed border-line bg-blue-tint/40 p-4">
        <p className="text-[13px] leading-relaxed text-ink-soft">
          זהו מסלול מתוכנן. עדיין אין בו שיעורים מלאים — כאן מרוכזים הסשנים
          והמונחים שיֵלמדו בהמשך, כדי שיהיה ברור מה מחכה קדימה.
        </p>
      </div>

      {/* סשנים מתוכננים */}
      {path.plannedSessions.length > 0 && (
        <section aria-label="סשנים מתוכננים">
          <h2 className="text-[18px] font-extrabold">סשנים מתוכננים</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            מתוך סדר־היום של הצוות — יהפכו לשיעורים בהמשך.
          </p>
          <div className="mt-3 space-y-2.5">
            {path.plannedSessions.map((s) => (
              <div
                key={s.id}
                className="flex items-start gap-3 rounded-2xl border border-dashed border-line bg-surface p-4"
              >
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-[15px]"
                  aria-hidden="true"
                >
                  📋
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
                      בקרוב
                    </span>
                  </div>
                  <h3
                    className="mt-1 text-[15px] font-bold leading-snug"
                    dir="ltr"
                  >
                    {s.titleEnglish}
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                    {s.hebrewNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* מונחים מתוכננים — לפי תקן המינוח */}
      {path.plannedTerms.length > 0 && (
        <section aria-label="מונחים מתוכננים">
          <h2 className="text-[18px] font-extrabold">מונחים מתוכננים</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            מונחי שחרור ומוכנות של הצוות. כל מונח מוצג בשם המלא באנגלית, ראשי
            התיבות, והמשמעות בעברית.
          </p>
          <div className="mt-3 space-y-2.5">
            {path.plannedTerms.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-dashed border-line bg-surface p-4"
              >
                <AcronymTerm
                  fullEnglishName={t.fullEnglishName}
                  acronym={t.acronym}
                  hebrewMeaning={t.hebrewMeaning}
                  hebrewExplanation={t.hebrewExplanation}
                  needsTeamConfirmation={t.needsTeamConfirmation}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── תוכן העמוד ──────────────────────────────────────────────────────────────

function ModulesContent() {
  const { progress } = useProgress();
  const searchParams = useSearchParams();
  const rawPath = searchParams.get("path");
  const activePathId: LearningPathId | null = isLearningPathId(rawPath)
    ? rawPath
    : null;

  const activePath = activePathId ? getLearningPath(activePathId) : undefined;

  // כותרת ותיאור לפי המסלול הנבחר.
  const heading = activePath ? activePath.titleHebrew : "מפת המסלול";
  const description = activePath
    ? activePath.descriptionHebrew
    : "המסלול בנוי בשלבים — מהבסיס ועד למתקדם. כל שלב נשען על מה שלפניו, וכל שיעור מסביר למה הוא מופיע בדיוק כאן ומה כדאי לדעת לפניו.";

  // אילו שלבים להציג: מסלול "יסודות חומרה" → השלבים שלו; "הכל" → כל השלבים.
  const stageIds: StageId[] =
    activePath && activePath.status !== "active"
      ? []
      : activePath
        ? activePath.relatedStageIds
        : stages.map((s) => s.id);

  const showPlanned = activePath && activePath.status !== "active";

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="eyebrow">מסלול הלמידה</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight" dir="auto">
          {heading}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          {description}
        </p>
      </header>

      <PathSelector active={activePathId} />

      {showPlanned && activePath ? (
        <PlannedPath path={activePath} />
      ) : (
        <StageList
          stageIds={stageIds}
          completedLessons={progress.completedLessons}
          sectionReached={progress.sectionReached}
        />
      )}
    </main>
  );
}

export default function ModulesPage() {
  return (
    <Suspense
      fallback={
        <main className="px-4 pt-8">
          <p className="eyebrow">מסלול הלמידה</p>
          <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight">
            מפת המסלול
          </h1>
        </main>
      }
    >
      <ModulesContent />
    </Suspense>
  );
}
