// תקן המינוח של המערכת — רכיב יחיד שמרכז את כל הצגת ראשי-התיבות והמונחים
// המקצועיים באנגלית. בכל מקום שבו מוצג מונח באנגלית, הוא מוצג כך:
//   שם מלא באנגלית (ראשי תיבות) — משמעות בעברית
// עם הסבר קצר בעברית, וכאשר צריך — הערת "דורש אימות מול הצוות".
//
// שימוש עקבי ברכיב הזה מבטיח שכל האפליקציה מדברת באותה שפה טרמינולוגית.

export interface AcronymTermProps {
  fullEnglishName: string;
  acronym?: string;
  hebrewMeaning: string;
  hebrewExplanation?: string;
  needsTeamConfirmation?: boolean;
}

export default function AcronymTerm({
  fullEnglishName,
  acronym,
  hebrewMeaning,
  hebrewExplanation,
  needsTeamConfirmation = false,
}: AcronymTermProps) {
  return (
    <div className="min-w-0">
      {/* שורת המונח: שם מלא באנגלית (ראשי תיבות) — משמעות בעברית */}
      <p className="text-[14.5px] font-bold leading-snug" dir="auto">
        <span dir="ltr" className="font-mono">
          {fullEnglishName}
          {acronym ? ` (${acronym})` : ""}
        </span>
        <span className="text-ink-soft"> — {hebrewMeaning}</span>
      </p>

      {hebrewExplanation && (
        <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
          {hebrewExplanation}
        </p>
      )}

      {needsTeamConfirmation && (
        <p className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-surface-sunken px-2 py-0.5 text-[11.5px] font-semibold text-ink-soft">
          <span aria-hidden="true">⚠️</span>
          דורש אימות מול הצוות
        </p>
      )}
    </div>
  );
}
