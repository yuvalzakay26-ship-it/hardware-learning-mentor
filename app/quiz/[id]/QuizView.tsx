"use client";

import { useState } from "react";
import Link from "next/link";
import QuizQuestion from "@/components/QuizQuestion";
import type { Module } from "@/lib/types";
import { saveQuizResult } from "@/lib/storage";

export default function QuizView({ module }: { module: Module }) {
  const total = module.quiz.length;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  // מפתח שמאלץ רינדור מחדש של השאלות כשמתחילים ניסיון נוסף
  const [attempt, setAttempt] = useState(0);

  function handleAnswered(correct: boolean) {
    if (correct) setScore((s) => s + 1);
    setAnswered(true);
  }

  function next(finalScore: number) {
    if (index + 1 < total) {
      setIndex(index + 1);
      setAnswered(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      saveQuizResult(module.id, {
        score: finalScore,
        total,
        date: new Date().toISOString(),
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setDone(false);
    setAttempt((a) => a + 1);
  }

  if (done) {
    const percent = Math.round((score / total) * 100);
    const great = percent >= 80;
    return (
      <main className="flex min-h-[70dvh] flex-col justify-center px-4 pt-8">
        <div className="rise-in rounded-2xl border border-line bg-surface p-6 text-center shadow-(--shadow-card)">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full font-display text-[22px] font-black ${
              great ? "bg-good-tint text-good" : "bg-copper-tint text-copper-deep"
            }`}
            dir="ltr"
          >
            {score}/{total}
          </div>
          <h1 className="mt-4 font-display text-[24px] font-black">
            {great ? "מצוין, יובל! 🎉" : "התקדמות יפה!"}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            {great
              ? "שליטה מעולה בחומר. התוצאה נשמרה — אפשר להמשיך לשיעור הבא בראש שקט."
              : "ענית נכון על " +
                score +
                " מתוך " +
                total +
                ". שווה לעבור שוב על כרטיסי הסיכום בשיעור ולנסות שוב — ככה הידע מתקבע."}
          </p>
          <div className="mt-5 space-y-2.5">
            {!great && (
              <Link
                href={`/lesson/${module.id}`}
                className="block rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] font-semibold text-ink"
              >
                חזרה לשיעור לחיזוק
              </Link>
            )}
            <button
              type="button"
              onClick={retry}
              className="block w-full rounded-xl bg-copper px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
            >
              נסה שוב
            </button>
            <Link
              href="/progress"
              className="block rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] font-semibold text-ink-soft"
            >
              למסך ההתקדמות
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pt-6">
      <header>
        <div className="flex items-center justify-between">
          <Link
            href="/quiz"
            className="flex items-center gap-1 text-[13px] font-semibold text-ink-soft"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="m10 6 6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            למבחנים
          </Link>
          <span className="text-[12px] font-semibold text-ink-faint">
            צדקת עד כה: {score}
          </span>
        </div>
        <h1 className="mt-2 font-display text-[20px] font-bold leading-snug">
          מבחן: {module.title}
        </h1>
        <div className="mt-3 flex gap-1" aria-hidden="true">
          {module.quiz.map((q, i) => (
            <span
              key={q.id}
              className={`h-1.5 flex-1 rounded-full ${
                i < index ? "bg-copper" : i === index ? "bg-copper/50" : "bg-line"
              }`}
            />
          ))}
        </div>
      </header>

      <div className="mt-4">
        <QuizQuestion
          key={`${attempt}-${module.quiz[index].id}`}
          question={module.quiz[index]}
          index={index}
          total={total}
          onAnswered={handleAnswered}
        />
      </div>

      {answered && (
        <button
          type="button"
          onClick={() => next(score)}
          className="rise-in mt-4 w-full rounded-xl bg-copper px-4 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
        >
          {index + 1 < total ? "לשאלה הבאה" : "סיום וצפייה בתוצאה"}
        </button>
      )}
    </main>
  );
}
