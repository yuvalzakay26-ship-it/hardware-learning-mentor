import type { GlossaryTerm, Module } from "./types";
import { glossaryTerms } from "./glossary";

/**
 * כלי עזר לאזור "חזרה": מלקטים מתוך תוכן השיעורים את החומר לחזרה עדינה —
 * נקודות "מה חשוב לזכור", שאלות חזרה, והמושגים המרכזיים של כל מודול.
 * הכול נשען על התוכן הקיים, בלי מבחנים ובלי ציונים.
 */

export function getRememberItems(module: Module): string[] {
  const items: string[] = [];
  for (const section of module.sections) {
    for (const block of section.blocks) {
      if (block.type === "remember") items.push(...block.items);
    }
  }
  return items;
}

export function getReviewQuestions(module: Module): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = [];
  for (const section of module.sections) {
    for (const block of section.blocks) {
      if (block.type === "questions") items.push(...block.items);
    }
  }
  return items;
}

/** המושגים המרכזיים של מודול — נגזרים מכרטיסי ה"מונח חדש" שבשיעור */
export function getModuleTerms(module: Module): GlossaryTerm[] {
  const names = new Set<string>();
  for (const section of module.sections) {
    for (const block of section.blocks) {
      if (block.type === "term") names.add(block.term.toLowerCase());
    }
  }
  return glossaryTerms.filter((t) => names.has(t.en.toLowerCase()));
}
