"use client";

import { useState } from "react";
import TermCard from "@/components/TermCard";
import { categoryLabels, categoryOrder, glossaryTerms } from "@/lib/glossary";
import { toggleTermLearned } from "@/lib/storage";
import { useProgress } from "@/lib/useProgress";
import type { TermCategory } from "@/lib/types";

export default function ConceptsPage() {
  const { progress, setProgress } = useProgress();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TermCategory | "all">("all");

  const filtered = glossaryTerms.filter((t) => {
    if (category !== "all" && t.category !== category) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      t.en.toLowerCase().includes(q) ||
      t.he.includes(q) ||
      t.explanation.includes(q)
    );
  });

  // בכל קטגוריה — כמה מושגים קיימים (לתצוגת השבבים)
  const countIn = (c: TermCategory) =>
    glossaryTerms.filter((t) => t.category === c).length;

  function selectRelated(id: string) {
    const term = glossaryTerms.find((t) => t.id === id);
    if (!term) return;
    setCategory("all");
    setQuery(term.en);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="eyebrow">אוצר המילים של החומרה</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight">מושגים</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          כל מושג מוסבר בעברית פשוטה — עם דוגמה מהחומרה ואיפה פוגשים אותו בעבודה.
          סמן «למדתי» כשמושג מרגיש לך ברור.
        </p>
        <p className="mt-1.5 text-[13px] font-semibold text-ink-faint">
          {progress.learnedTerms.length} מתוך {glossaryTerms.length} מושגים סומנו כנלמדו
        </p>
      </header>

      {/* חיפוש */}
      <div className="mt-5">
        <label htmlFor="term-search" className="sr-only">
          חיפוש מושג
        </label>
        <input
          id="term-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חפש מושג… (למשל: Cache)"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] shadow-(--shadow-card) placeholder:text-ink-faint focus:border-blue focus:outline-none"
        />
      </div>

      {/* שבבי קטגוריה */}
      <div className="mt-3 -mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pb-1">
          <CategoryChip
            active={category === "all"}
            label={`הכול · ${glossaryTerms.length}`}
            onClick={() => setCategory("all")}
          />
          {categoryOrder.map((c) => (
            <CategoryChip
              key={c}
              active={category === c}
              label={`${categoryLabels[c]} · ${countIn(c)}`}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>
      </div>

      <section className="mt-4 space-y-3">
        {filtered.map((term) => (
          <TermCard
            key={term.id}
            term={term}
            learned={progress.learnedTerms.includes(term.id)}
            onToggle={() => setProgress(toggleTermLearned(term.id))}
            onSelectRelated={selectRelated}
          />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-line bg-surface p-6 text-center text-[14px] text-ink-soft">
            לא נמצא מושג שמתאים. נסה מילה אחרת, או בחר קטגוריה אחרת.
          </p>
        )}
      </section>
    </main>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? "border-navy bg-navy text-white"
          : "border-line bg-surface text-ink-soft active:bg-line"
      }`}
    >
      {label}
    </button>
  );
}
