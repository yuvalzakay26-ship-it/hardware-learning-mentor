"use client";

import { useEffect, useRef, useState } from "react";
import { deleteNote, loadProgress, setNote } from "@/lib/storage";

const PLACEHOLDER =
  "כתוב כאן משהו שתרצה לזכור מהשיעור, שאלה למנטור, או משהו שלא היה ברור.";

/**
 * הערה אישית לכרטיס לימוד בודד (moduleId + sectionId).
 * נשמרת ב-localStorage, שורדת רענון ופתיחה מחדש של האפליקציה (PWA),
 * ולא משפיעה על השלמת השיעור או על תחושת הביטחון.
 */
export default function PersonalNote({
  moduleId,
  sectionId,
  onChange,
}: {
  moduleId: string;
  sectionId: string;
  onChange?: (text: string) => void;
}) {
  const [note, setNoteState] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // טוענים את ההערה הקיימת אחרי עליית העמוד (מונע אי-התאמה שרת/לקוח)
  useEffect(() => {
    const existing = loadProgress().personalNotes[moduleId]?.[sectionId] ?? "";
    setNoteState(existing);
  }, [moduleId, sectionId]);

  function openEditor() {
    setDraft(note);
    setOpen(true);
    setSaved(false);
    // מיקוד רך על ה-textarea לאחר שנפתח
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function save() {
    setNote(moduleId, sectionId, draft);
    const clean = draft.trim();
    setNoteState(clean);
    setOpen(false);
    setSaved(true);
    onChange?.(clean);
  }

  function clear() {
    deleteNote(moduleId, sectionId);
    setNoteState("");
    setDraft("");
    setOpen(false);
    setSaved(false);
    onChange?.("");
  }

  const hasNote = note.length > 0;

  return (
    <div className="mt-3 rounded-2xl border border-line bg-surface/70 p-3.5">
      {!open ? (
        <button
          type="button"
          onClick={openEditor}
          className="flex w-full items-center gap-2.5 text-right"
          aria-expanded={false}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue-deep"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-[18px] w-[18px]">
              <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-bold text-ink">
              {hasNote ? "הערה אישית" : "הוסף הערה אישית"}
            </span>
            <span className="block truncate text-[12.5px] text-ink-soft">
              {hasNote ? "יש לך הערה אישית לכרטיס הזה" : "משהו לזכור, שאלה, או נקודה לא ברורה"}
            </span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 shrink-0 text-blue" aria-hidden="true">
            <path d="m14 6-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <div>
          <label htmlFor={`note-${moduleId}-${sectionId}`} className="mb-2 block text-[14px] font-bold text-ink">
            הערה אישית
          </label>
          <textarea
            id={`note-${moduleId}-${sectionId}`}
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={4}
            dir="rtl"
            className="w-full resize-y rounded-xl border border-line bg-bg p-3 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:border-blue focus:outline-none"
          />
          <div className="mt-2.5 flex gap-2.5">
            <button
              type="button"
              onClick={save}
              className="flex-1 rounded-xl bg-blue px-4 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98]"
            >
              שמור הערה
            </button>
            {hasNote && (
              <button
                type="button"
                onClick={clear}
                className="rounded-xl border border-bad/25 bg-bad-tint/50 px-4 py-2.5 text-[14px] font-semibold text-bad transition-colors active:bg-bad-tint"
              >
                מחק הערה
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-line bg-bg px-4 py-2.5 text-[14px] font-semibold text-ink-soft transition-colors active:bg-line"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {saved && !open && (
        <p className="mt-2 text-center text-[12px] font-medium text-good">
          ההערה נשמרה במחברת שלך ✓
        </p>
      )}
    </div>
  );
}
