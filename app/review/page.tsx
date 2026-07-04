"use client";

import Link from "next/link";
import { availableModules, getModule } from "@/lib/content";
import { glossaryTerms } from "@/lib/glossary";
import { getModuleTerms, getRememberItems, getReviewQuestions } from "@/lib/review";
import { getReasonLabel, getSectionPreview } from "@/lib/notes";
import { deleteNote, markUnderstoodNow } from "@/lib/storage";
import { useProgress } from "@/lib/useProgress";

export default function ReviewPage() {
  const { progress, setProgress, ready } = useProgress();

  const completedModules = availableModules.filter((m) =>
    progress.completedLessons.includes(m.id)
  );

  // כרטיסים שהמשתמש סימן בהם "לא עד הסוף" — אלה מוקד החזרה
  const unsureCards = Object.entries(progress.confidence)
    .filter(([, v]) => v === "unsure")
    .map(([key]) => {
      const [moduleId, sectionId] = key.split(":");
      const module = getModule(moduleId);
      const cardIndex = module?.sections.findIndex((s) => s.id === sectionId) ?? -1;
      const section = cardIndex >= 0 ? module!.sections[cardIndex] : undefined;
      if (!module || !section) return null;
      const note = progress.personalNotes[moduleId]?.[sectionId] ?? "";
      const reason = progress.unclearReasons[key];
      return { moduleId, module, section, cardIndex, note, reason };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // המחברת: כל ההערות האישיות, מקובצות לפי מודול, בסדר הכרטיסים בשיעור
  const notebook = availableModules
    .map((module) => {
      const lessonNotes = progress.personalNotes[module.id] ?? {};
      const entries = module.sections
        .map((section, cardIndex) => ({ section, cardIndex, note: lessonNotes[section.id] }))
        .filter((e): e is { section: (typeof module.sections)[number]; cardIndex: number; note: string } =>
          Boolean(e.note)
        );
      return { module, entries };
    })
    .filter((g) => g.entries.length > 0);

  const hasNotes = notebook.length > 0;

  function handleUnderstood(moduleId: string, sectionId: string) {
    const next = markUnderstoodNow(moduleId, sectionId);
    setProgress(next);
  }

  function handleDeleteNote(moduleId: string, sectionId: string) {
    if (!window.confirm("למחוק את ההערה הזו מהמחברת?")) return;
    const next = deleteNote(moduleId, sectionId);
    setProgress(next);
  }

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
    learnedTerms.length === 0 &&
    !hasNotes;

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

      {/* דברים שלא הבנתי עד הסוף — מרוכזים למעלה, עם הערה, סיבה ופעולות */}
      {unsureCards.length > 0 && (
        <section aria-label="דברים שלא הבנתי עד הסוף" className="mt-6">
          <h2 className="mb-1 text-[19px] font-bold">דברים שלא הבנתי עד הסוף</h2>
          <p className="mb-3 text-[13.5px] leading-relaxed text-ink-soft">
            סימנת שהכרטיסים האלה לא הרגישו ברורים עד הסוף. בלי לחץ — אפשר לפתוח
            אותם שוב, ומתי שירגיש ברור לסמן שהבנת.
          </p>
          <div className="space-y-3">
            {unsureCards.map(({ moduleId, module, section, cardIndex, note, reason }) => (
              <article
                key={`${moduleId}:${section.id}`}
                className="rounded-2xl border border-blue/25 bg-blue-tint/40 p-4 shadow-(--shadow-card)"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-[18px]" aria-hidden="true">🤔</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-blue-deep">
                      {module.title}
                    </div>
                    <h3 className="text-[16px] font-bold leading-snug text-ink">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-ink-soft">
                  {getSectionPreview(section)}
                </p>

                {reason && (
                  <div className="mt-2.5 inline-flex items-center rounded-full border border-blue/30 bg-surface px-2.5 py-1 text-[12px] font-semibold text-blue-deep">
                    {getReasonLabel(reason)}
                  </div>
                )}

                {note && (
                  <div className="mt-2.5 rounded-xl border-s-4 border-blue bg-surface p-3">
                    <div className="mb-1 text-[11px] font-bold text-blue-deep">ההערה שלך</div>
                    <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink">
                      {note}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex gap-2.5">
                  <Link
                    href={`/lesson/${moduleId}?card=${cardIndex}`}
                    className="flex-1 rounded-xl bg-blue px-3 py-2.5 text-center text-[13.5px] font-bold text-white transition-transform active:scale-[0.98]"
                  >
                    פתח את הכרטיס
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleUnderstood(moduleId, section.id)}
                    className="rounded-xl border border-good/30 bg-good-tint px-3 py-2.5 text-[13.5px] font-semibold text-good transition-colors active:bg-good-tint/70"
                  >
                    סמן שהבנתי עכשיו
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* המחברת שלי — כל ההערות האישיות, מקובצות לפי שיעור */}
      {ready && !nothingYet && (
        <section aria-label="המחברת שלי" className="mt-8">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[18px]" aria-hidden="true">📔</span>
            <h2 className="text-[19px] font-bold">המחברת שלי</h2>
          </div>
          <p className="mb-3 text-[13.5px] leading-relaxed text-ink-soft">
            כל ההערות שכתבת לעצמך תוך כדי הלמידה — מרוכזות במקום אחד.
          </p>

          {hasNotes ? (
            <div className="space-y-4">
              {notebook.map(({ module, entries }) => (
                <div key={module.id}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-lg bg-navy px-2 py-1 font-mono text-[11px] font-bold text-blue-tint" dir="ltr">
                      {module.chipLabel}
                    </span>
                    <h3 className="text-[15px] font-bold">{module.title}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {entries.map(({ section, cardIndex, note }) => (
                      <article
                        key={section.id}
                        className="rounded-2xl border border-line bg-surface p-3.5 shadow-(--shadow-card)"
                      >
                        <div className="text-[11px] font-semibold text-blue-deep">
                          {section.title}
                        </div>
                        <p className="mt-1 line-clamp-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">
                          {note}
                        </p>
                        <div className="mt-2.5 flex gap-2">
                          <Link
                            href={`/lesson/${module.id}?card=${cardIndex}`}
                            className="rounded-lg bg-blue-tint px-3 py-1.5 text-[12.5px] font-bold text-blue-deep transition-colors active:bg-blue-tint/70"
                          >
                            פתח
                          </Link>
                          <Link
                            href={`/lesson/${module.id}?card=${cardIndex}`}
                            className="rounded-lg border border-line bg-bg px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors active:bg-line"
                          >
                            ערוך
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteNote(module.id, section.id)}
                            className="ms-auto rounded-lg border border-bad/25 bg-bad-tint/40 px-3 py-1.5 text-[12.5px] font-semibold text-bad transition-colors active:bg-bad-tint"
                          >
                            מחק
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-surface p-5 text-center shadow-(--shadow-card)">
              <div className="text-[26px]">✍️</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                עדיין אין הערות אישיות. כשתלמד שיעור ותכתוב הערה, היא תופיע כאן.
              </p>
            </div>
          )}
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
