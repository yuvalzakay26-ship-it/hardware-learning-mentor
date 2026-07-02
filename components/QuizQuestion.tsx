"use client";

import { useState } from "react";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

/** שאלת מבחן אמריקאית עם משוב מיידי והסבר */
export default function QuizQuestion({
  question,
  index,
  total,
  onAnswered,
}: {
  question: QuizQuestionType;
  index: number;
  total: number;
  onAnswered: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === question.correctIndex;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    onAnswered(i === question.correctIndex);
  }

  return (
    <div className="rise-in rounded-2xl border border-line bg-surface p-5 shadow-(--shadow-card)">
      <div className="text-[12px] font-bold text-copper-deep">
        שאלה {index + 1} מתוך {total}
      </div>
      <h2 className="mt-1.5 text-[17px] font-bold leading-snug">
        {question.question}
      </h2>

      <div className="mt-4 space-y-2.5" role="group" aria-label="אפשרויות תשובה">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let style = "border-line bg-bg active:bg-line";
          if (answered && isCorrect) style = "border-good bg-good-tint text-good";
          else if (answered && isSelected) style = "border-bad bg-bad-tint text-bad";
          else if (answered) style = "border-line bg-bg opacity-55";

          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => choose(i)}
              className={`flex w-full items-start gap-2.5 rounded-xl border p-3.5 text-start text-[14.5px] font-medium leading-relaxed transition-colors ${style}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
                  answered && isCorrect
                    ? "border-good bg-good text-white"
                    : answered && isSelected
                      ? "border-bad bg-bad text-white"
                      : "border-ink-faint/50 text-ink-soft"
                }`}
                aria-hidden="true"
              >
                {answered && isCorrect ? "✓" : answered && isSelected ? "✗" : "אבגד"[i]}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`rise-in mt-4 rounded-xl p-4 ${
            correct ? "bg-good-tint" : "bg-bad-tint"
          }`}
          role="status"
        >
          <div className={`text-[14px] font-bold ${correct ? "text-good" : "text-bad"}`}>
            {correct ? "נכון מאוד! 👏" : "לא מדויק — אבל ככה לומדים"}
          </div>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
