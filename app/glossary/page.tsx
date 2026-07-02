"use client";

import { useState } from "react";
import TermCard from "@/components/TermCard";
import { glossaryTerms } from "@/lib/glossary";
import { toggleTermLearned } from "@/lib/storage";
import { useProgress } from "@/lib/useProgress";

export default function GlossaryPage() {
  const { progress, setProgress } = useProgress();
  const [query, setQuery] = useState("");

  const filtered = glossaryTerms.filter((t) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      t.en.toLowerCase().includes(q) ||
      t.he.includes(q) ||
      t.explanation.includes(q)
    );
  });

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="text-[14px] font-semibold text-copper-deep">
          {glossaryTerms.length} מונחים · {progress.learnedTerms.length} סומנו כנלמדו
        </p>
        <h1 className="mt-1 font-display text-[28px] font-black leading-tight">
          מילון המונחים
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          כל מונח מוסבר בעברית פשוטה, עם דוגמה. סמן «למדתי» כשמונח מרגיש לך
          ברור — זה נספר בהתקדמות שלך.
        </p>
      </header>

      <div className="mt-5">
        <label htmlFor="term-search" className="sr-only">
          חיפוש מונח
        </label>
        <input
          id="term-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חפש מונח… (למשל: Cache)"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] shadow-(--shadow-card) placeholder:text-ink-faint focus:border-copper focus:outline-none"
        />
      </div>

      <section className="mt-4 space-y-3">
        {filtered.map((term) => (
          <TermCard
            key={term.id}
            term={term}
            learned={progress.learnedTerms.includes(term.id)}
            onToggle={() => setProgress(toggleTermLearned(term.id))}
          />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-line bg-surface p-6 text-center text-[14px] text-ink-soft">
            לא נמצא מונח שמתאים לחיפוש «{query}». נסה מילה אחרת או נקה את
            החיפוש.
          </p>
        )}
      </section>
    </main>
  );
}
