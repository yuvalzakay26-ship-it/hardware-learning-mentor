"use client";

import Link from "next/link";
import { availableModules, getModule } from "@/lib/content";
import { glossaryTerms } from "@/lib/glossary";
import { getModuleTerms, getRememberItems, getReviewQuestions } from "@/lib/review";
import { useProgress } from "@/lib/useProgress";

export default function ReviewPage() {
  const { progress, ready } = useProgress();

  const completedModules = availableModules.filter((m) =>
    progress.completedLessons.includes(m.id)
  );

  // כרטיסים שהמשתמש סימן בהם "לא עד הסוף" — אלה מוקד החזרה
  const unsureCards = Object.entries(progress.confidence)
    .filter(([, v]) => v === "unsure")
    .map(([key]) => {
      const [moduleId, sectionId] = key.split(":");
      const module = getModule(moduleId);
      const section = module?.sections.find((s) => s.id === sectionId);
      if (!module || !section) return null;
      return { moduleId, module, section };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const learnedTerms = glossaryTerms.filter((t) =>
    progress.learnedTerms.includes(t.id)
  );
  const notLearnedTerms = glossaryTerms.filter(
    (t) => !progress.learnedTerms.includes(t.id)
  );

  const nothingYet =
    ready &&
    completedModules.length === 0 &&
    unsureCards.length === 0 &&
    learnedTerms.length === 0;

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="eyebrow">בלי מבחנים · בלי ציונים · בקצב שלך</p>
        <h1 className="mt-1.5 text-[28px] font-extrabold leading-tight">חזרה</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          בוא נחזור רגע על מה שלמדת. כאן מרוכזות הנקודות החשובות, מושגי המפתח
          וכמה שאלות עדינות לחשיבה — אין נכון ולא-נכון, רק ריענון.
        </p>
      </header>

      {nothingYet && (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-(--shadow-card)">
          <div className="text-[32px]">🌱</div>
          <h2 className="mt-2 text-[18px] font-bold">עוד אין על מה לחזור — וזה מצוין</h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
            ברגע שתתחיל שיעור, החומר לחזרה יופיע כאן מעצמו.
          </p>
          <Link
            href="/modules"
            className="mt-4 inline-block rounded-2xl bg-blue px-5 py-3 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            למסלול הלמידה
          </Link>
        </div>
      )}

      {/* כרטיסים שסימנת שלא הבנת עד הסוף */}
      {unsureCards.length > 0 && (
        <section aria-label="לחזור עליהם" className="mt-6">
          <h2 className="mb-1 text-[19px] font-bold">שווה לחזור על אלה</h2>
          <p className="mb-3 text-[13.5px] leading-relaxed text-ink-soft">
            סימנת שהכרטיסים האלה לא הרגישו ברורים עד הסוף. בלי לחץ — פשוט לחץ
            לפתוח אותם שוב.
          </p>
          <div className="space-y-2.5">
            {unsureCards.map(({ moduleId, module, section }) => (
              <Link
                key={`${moduleId}:${section.id}`}
                href={`/lesson/${moduleId}`}
                className="flex items-center gap-3 rounded-2xl border border-blue/25 bg-blue-tint/40 p-3.5 shadow-(--shadow-card) transition-transform active:scale-[0.985]"
              >
                <span className="text-[18px]" aria-hidden="true">🤔</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-blue-deep">
                    {module.title}
                  </div>
                  <div className="truncate text-[15px] font-bold text-ink">
                    {section.title}
                  </div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 shrink-0 text-blue" aria-hidden="true">
                  <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* סיכומי שיעורים שהושלמו */}
      {completedModules.map((module) => {
        const remember = getRememberItems(module);
        const questions = getReviewQuestions(module);
        const terms = getModuleTerms(module);
        return (
          <section
            key={module.id}
            aria-label={`חזרה על ${module.title}`}
            className="mt-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-lg bg-navy px-2 py-1 font-mono text-[11px] font-bold text-blue-tint" dir="ltr">
                {module.chipLabel}
              </span>
              <h2 className="text-[19px] font-bold">{module.title}</h2>
            </div>

            {/* מה חשוב לזכור */}
            {remember.length > 0 && (
              <div className="rounded-2xl border border-good/25 bg-good-tint/60 p-4">
                <div className="mb-2 text-[13px] font-bold text-good">מה חשוב לזכור</div>
                <ul className="space-y-2">
                  {remember.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[14.5px] leading-relaxed text-ink">
                      <span className="font-bold text-good" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* מושגי מפתח */}
            {terms.length > 0 && (
              <div className="mt-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)">
                <div className="mb-2.5 text-[13px] font-bold text-ink-soft">
                  מושגי המפתח של השיעור
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {terms.map((t) => (
                    <Link
                      key={t.id}
                      href="/glossary"
                      className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[12px] font-semibold text-blue-deep transition-colors active:bg-line"
                      dir="ltr"
                    >
                      {t.en}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* שאלות חזרה עדינות — ללא ציון */}
            {questions.length > 0 && (
              <div className="mt-3">
                <div className="mb-2 text-[13px] font-bold text-ink-soft">
                  נסה לענות בראש — ואז הצץ בתשובה
                </div>
                <div className="space-y-2.5">
                  {questions.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)"
                    >
                      <summary className="cursor-pointer list-none text-[15px] font-semibold leading-relaxed marker:hidden">
                        <span className="me-2 font-mono text-[13px] font-bold text-blue" dir="ltr">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                        <span className="mt-1.5 block text-[12px] font-medium text-blue-deep group-open:hidden">
                          לחץ לחשיפת התשובה
                        </span>
                      </summary>
                      <p className="mt-3 rounded-xl bg-surface-sunken p-3 text-[14.5px] leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* מפת מושגים: מה כבר סימנת, ומה עוד מחכה */}
      {ready && (completedModules.length > 0 || learnedTerms.length > 0) && (
        <section aria-label="מפת המושגים שלך" className="mt-8">
          <h2 className="mb-3 text-[19px] font-bold">המושגים שלך</h2>

          {learnedTerms.length > 0 && (
            <div className="rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)">
              <div className="mb-2.5 text-[13px] font-bold text-good">
                ✓ סימנת שלמדת ({learnedTerms.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {learnedTerms.map((t) => (
                  <span
                    key={t.id}
                    className="rounded-full border border-good/30 bg-good-tint px-2.5 py-1 font-mono text-[12px] font-semibold text-good"
                    dir="ltr"
                  >
                    {t.en}
                  </span>
                ))}
              </div>
            </div>
          )}

          {notLearnedTerms.length > 0 && (
            <div className="mt-3 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)">
              <div className="mb-1 text-[13px] font-bold text-ink-soft">
                מושגים שעוד לא סימנת ({notLearnedTerms.length})
              </div>
              <p className="mb-2.5 text-[12.5px] leading-relaxed text-ink-faint">
                אין כאן לחץ — כשמושג מרגיש ברור, אפשר לסמן אותו באזור «מושגים».
              </p>
              <div className="flex flex-wrap gap-1.5">
                {notLearnedTerms.map((t) => (
                  <Link
                    key={t.id}
                    href="/glossary"
                    className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[12px] font-semibold text-ink-soft transition-colors active:bg-line"
                    dir="ltr"
                  >
                    {t.en}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
