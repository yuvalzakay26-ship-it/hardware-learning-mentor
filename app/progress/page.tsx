"use client";

import Link from "next/link";
import ProgressCard from "@/components/ProgressCard";
import { availableModules } from "@/lib/content";
import { glossaryTerms } from "@/lib/glossary";
import { useProgress } from "@/lib/useProgress";

export default function ProgressPage() {
  const { progress, ready } = useProgress();

  const completed = availableModules.filter((m) =>
    progress.completedLessons.includes(m.id)
  );

  const confValues = Object.values(progress.confidence);
  const clearCards = confValues.filter((v) => v === "got").length;
  const reviewCards = confValues.filter((v) => v === "unsure").length;

  // מספר ההערות האישיות בכל המחברת — לקישור עדין אל «חזרה»
  const notesCount = Object.values(progress.personalNotes).reduce(
    (sum, lesson) => sum + Object.keys(lesson).length,
    0
  );

  // הצעד הבא: השיעור הזמין הראשון שטרם הושלם — או ריענון עדין אם סיימת הכול
  const nextLesson = availableModules.find(
    (m) => !progress.completedLessons.includes(m.id)
  );

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="eyebrow">המסע שלך</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight">ההתקדמות שלך</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          כל צעד נחשב. אין כאן ציונים — רק תמונה רגועה של כמה כבר צברת.
        </p>
      </header>

      {/* מספרים מרכזיים */}
      <section aria-label="סיכום התקדמות" className="mt-6 grid grid-cols-2 gap-3">
        <ProgressCard
          value={ready ? `${completed.length}/${availableModules.length}` : "—"}
          label="שיעורים שהושלמו"
          sub="מתוך המודולים הזמינים"
        />
        <ProgressCard
          value={ready ? String(progress.learnedTerms.length) : "—"}
          label="מושגים שנלמדו"
          sub={`מתוך ${glossaryTerms.length} מושגים`}
        />
        <ProgressCard
          value={ready ? String(clearCards) : "—"}
          label="כרטיסים שהרגישו ברורים"
          sub="סימנת «הבנתי» בלמידה"
        />
        <ProgressCard
          value={ready ? String(reviewCards) : "—"}
          label="כרטיסים לחזרה"
          sub="מחכים לך באזור «חזרה»"
        />
      </section>

      {/* המחברת שלי — קישור עדין, מופיע רק כשיש הערות */}
      {ready && notesCount > 0 && (
        <Link
          href="/review"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
        >
          <span className="text-[22px]" aria-hidden="true">📔</span>
          <div className="min-w-0 flex-1">
            <div className="text-[15.5px] font-bold">המחברת שלי</div>
            <p className="text-[12.5px] text-ink-soft">
              {notesCount} הערות אישיות · פתח באזור «חזרה»
            </p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 shrink-0 text-blue" aria-hidden="true">
            <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}

      {/* הצעד הבא */}
      <section aria-label="הצעד הבא" className="mt-6">
        <h2 className="mb-3 text-[18px] font-bold">הצעד הבא שלך</h2>
        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="block rounded-2xl border border-blue/25 bg-blue-tint/60 p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
          >
            <div className="eyebrow">השיעור המומלץ הבא</div>
            <div className="mt-1 text-[17px] font-bold">{nextLesson.title}</div>
            <p className="mt-1 text-[13px] text-ink-soft">{nextLesson.subtitle}</p>
          </Link>
        ) : (
          <Link
            href="/review"
            className="block rounded-2xl border border-good/25 bg-good-tint p-4 transition-transform active:scale-[0.985]"
          >
            <div className="text-[17px] font-bold text-good">
              סיימת את כל מה שזמין! 🎉
            </div>
            <p className="mt-1 text-[13px] text-ink-soft">
              מודולים חדשים יתווספו למסלול בקרוב. בינתיים — בוא נחזור רגע על מה
              שלמדת.
            </p>
          </Link>
        )}
      </section>

      {/* פירוט לפי מודול */}
      <section aria-label="פירוט לפי מודול" className="mt-6">
        <h2 className="mb-3 text-[18px] font-bold">לפי מודול</h2>
        <div className="space-y-3">
          {availableModules.map((m) => {
            const done = progress.completedLessons.includes(m.id);
            const reached = progress.sectionReached[m.id] ?? 0;
            const started = reached > 0 || done;
            const lessonPercent = done
              ? 100
              : Math.round((reached / Math.max(m.sections.length - 1, 1)) * 100);
            return (
              <Link
                key={m.id}
                href={`/lesson/${m.id}`}
                className="block rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15.5px] font-bold">{m.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      done
                        ? "bg-good-tint text-good"
                        : started
                          ? "bg-blue-tint text-blue-deep"
                          : "bg-surface-sunken text-ink-faint"
                    }`}
                  >
                    {done ? "הושלם ✓" : started ? "בתהליך" : "טרם התחיל"}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line-soft">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-blue to-sky transition-all duration-500"
                    style={{ width: `${started ? Math.max(lessonPercent, 4) : 0}%` }}
                  />
                </div>
                <p className="mt-2 text-[12.5px] text-ink-faint">
                  {done
                    ? "השיעור הושלם — אפשר לחזור עליו בכל זמן"
                    : `${m.sections.length} כרטיסי לימוד`}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
