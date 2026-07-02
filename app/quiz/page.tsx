"use client";

import Link from "next/link";
import { availableModules } from "@/lib/content";
import { useProgress } from "@/lib/useProgress";

export default function QuizListPage() {
  const { progress } = useProgress();

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="text-[14px] font-semibold text-copper-deep">בדוק את עצמך</p>
        <h1 className="mt-1 font-display text-[28px] font-black leading-tight">
          מבחנים קצרים
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          כל מבחן בודק שיעור אחד: שאלות אמריקאיות עם משוב מיידי והסבר. אפשר
          לחזור על מבחן כמה פעמים — נשמרת התוצאה הטובה ביותר.
        </p>
      </header>

      <section className="mt-6 space-y-3">
        {availableModules.map((m) => {
          const result = progress.quizResults[m.id];
          const lessonDone = progress.completedLessons.includes(m.id);
          return (
            <Link
              key={m.id}
              href={`/quiz/${m.id}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
                  result
                    ? "bg-good-tint text-good"
                    : "bg-copper-tint text-copper-deep"
                }`}
                dir="ltr"
              >
                {result ? `${result.score}/${result.total}` : "?"}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-[16px] font-bold">
                  {m.title}
                </h2>
                <p className="mt-0.5 text-[13px] text-ink-soft">
                  {m.quiz.length} שאלות
                  {result
                    ? ` · התוצאה הטובה ביותר: ${result.score} מתוך ${result.total}`
                    : lessonDone
                      ? " · השיעור הושלם — זה הזמן!"
                      : " · מומלץ לסיים קודם את השיעור"}
                </p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 shrink-0 text-ink-faint" aria-hidden="true">
                <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
