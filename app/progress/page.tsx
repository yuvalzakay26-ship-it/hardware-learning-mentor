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
  const quizzesTaken = Object.keys(progress.quizResults).length;

  // ההמלצה: השיעור הזמין הראשון שטרם הושלם, או מבחן שטרם נעשה
  const nextLesson = availableModules.find(
    (m) => !progress.completedLessons.includes(m.id)
  );
  const nextQuiz = availableModules.find(
    (m) => progress.completedLessons.includes(m.id) && !progress.quizResults[m.id]
  );

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="text-[14px] font-semibold text-copper-deep">המסע שלך</p>
        <h1 className="mt-1 font-display text-[28px] font-black leading-tight">
          ההתקדמות שלך
        </h1>
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
          label="מונחים שנלמדו"
          sub={`מתוך ${glossaryTerms.length} במילון`}
        />
        <ProgressCard
          value={ready ? String(quizzesTaken) : "—"}
          label="מבחנים שנעשו"
          sub="נשמרת התוצאה הטובה ביותר"
        />
        <ProgressCard
          value={
            ready
              ? String(
                  Object.values(progress.quizResults).reduce(
                    (sum, r) => sum + r.score,
                    0
                  )
                )
              : "—"
          }
          label="תשובות נכונות"
          sub="סך הכול במבחנים"
        />
      </section>

      {/* ההמלצה הבאה */}
      <section aria-label="הצעד הבא" className="mt-6">
        <h2 className="mb-3 font-display text-[18px] font-bold">הצעד הבא שלך</h2>
        {nextQuiz ? (
          <Link
            href={`/quiz/${nextQuiz.id}`}
            className="block rounded-2xl border border-copper/30 bg-copper-tint p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
          >
            <div className="text-[12px] font-bold text-copper-deep">מבחן ממתין לך</div>
            <div className="mt-1 font-display text-[17px] font-bold">
              {nextQuiz.title}
            </div>
            <p className="mt-1 text-[13px] text-ink-soft">
              סיימת את השיעור — מבחן קצר יקבע את הידע ({nextQuiz.quiz.length} שאלות).
            </p>
          </Link>
        ) : nextLesson ? (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="block rounded-2xl border border-copper/30 bg-copper-tint p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
          >
            <div className="text-[12px] font-bold text-copper-deep">
              השיעור המומלץ הבא
            </div>
            <div className="mt-1 font-display text-[17px] font-bold">
              {nextLesson.title}
            </div>
            <p className="mt-1 text-[13px] text-ink-soft">{nextLesson.subtitle}</p>
          </Link>
        ) : (
          <div className="rounded-2xl border border-good/30 bg-good-tint p-4">
            <div className="font-display text-[17px] font-bold text-good">
              סיימת את כל מה שזמין! 🎉
            </div>
            <p className="mt-1 text-[13px] text-ink-soft">
              מודולים חדשים (BIOS/UEFI, זיכרון, PCIe ועוד) יתווספו למסלול בקרוב.
            </p>
          </div>
        )}
      </section>

      {/* פירוט לפי מודול */}
      <section aria-label="פירוט לפי מודול" className="mt-6">
        <h2 className="mb-3 font-display text-[18px] font-bold">לפי מודול</h2>
        <div className="space-y-3">
          {availableModules.map((m) => {
            const done = progress.completedLessons.includes(m.id);
            const reached = progress.sectionReached[m.id] ?? 0;
            const started = reached > 0 || done;
            const result = progress.quizResults[m.id];
            const lessonPercent = done
              ? 100
              : Math.round((reached / Math.max(m.sections.length - 1, 1)) * 100);
            return (
              <div
                key={m.id}
                className="rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-[15.5px] font-bold">{m.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      done
                        ? "bg-good-tint text-good"
                        : started
                          ? "bg-copper-tint text-copper-deep"
                          : "bg-bg text-ink-faint"
                    }`}
                  >
                    {done ? "הושלם ✓" : started ? "בתהליך" : "טרם התחיל"}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-copper transition-all duration-500"
                    style={{ width: `${started ? Math.max(lessonPercent, 4) : 0}%` }}
                  />
                </div>
                <p className="mt-2 text-[12.5px] text-ink-faint">
                  {result
                    ? `מבחן: ${result.score} מתוך ${result.total} תשובות נכונות`
                    : done
                      ? "המבחן עוד מחכה לך"
                      : `${m.sections.length} כרטיסי לימוד`}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
