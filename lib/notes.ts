import type { LessonSection, UnclearReason } from "./types";

/**
 * עזרי המחברת האישית ואזור "לא הבנתי עד הסוף".
 * הכול נשען על התוכן והמבנה הקיימים — בלי מבחנים ובלי ציונים.
 */

// הסיבות האופציונליות ל"לא הבנתי עד הסוף" — בעברית, בקצרה, בלי לחץ.
export const UNCLEAR_REASONS: { id: UnclearReason; label: string; emoji: string }[] = [
  { id: "example", label: "צריך דוגמה", emoji: "💡" },
  { id: "ask-at-work", label: "צריך לשאול בעבודה", emoji: "💬" },
  { id: "unclear-term", label: "מושג לא ברור", emoji: "❓" },
  { id: "review-again", label: "צריך לחזור על זה שוב", emoji: "🔁" },
];

export function getReasonLabel(reason: UnclearReason): string {
  return UNCLEAR_REASONS.find((r) => r.id === reason)?.label ?? "";
}

/**
 * תקציר קצר של כרטיס לימוד לתצוגה באזור החזרה והמחברת —
 * לוקח את הטקסט הראשון המשמעותי מהכרטיס.
 */
export function getSectionPreview(section: LessonSection): string {
  for (const block of section.blocks) {
    if (block.type === "p") return block.text;
    if (block.type === "term") return block.explanation;
    if (block.type === "bullets" && block.items[0]) return block.items[0];
    if (block.type === "tip") return block.text;
  }
  return section.eyebrow;
}
