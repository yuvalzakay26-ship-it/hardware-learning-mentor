import Image from "next/image";
import type { Visual } from "@/lib/visuals";

/**
 * כרטיס תמונה לימודי — תמונה אמיתית, כיתוב בעברית, הסבר "מה רואים בתמונה?"
 * וייחוס מקור + רישיון. עיצוב מותאם-נייד, תומך RTL ובסגנון הכחול של המערכת.
 *
 * שימוש בתמונות: כולן חוקיות (CC / CC0) ונשמרות מקומית — ראה lib/visuals.ts.
 */
export default function LearningImage({
  visual,
  priority = false,
}: {
  visual: Visual;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-(--shadow-card)">
      {/* התמונה עצמה — יחס גובה־רוחב שמור כדי למנוע קפיצת פריסה */}
      <div className="bg-surface-sunken">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes="(max-width: 512px) 100vw, 512px"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-auto w-full object-contain"
        />
      </div>

      <figcaption className="p-4">
        <p className="text-[14px] font-semibold leading-relaxed text-ink">
          {visual.caption}
        </p>

        {visual.explanation && (
          <div className="mt-3 rounded-xl border-s-[3px] border-blue/50 bg-blue-tint/50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[12.5px] font-bold text-blue-deep">
              <span aria-hidden="true">🔍</span>
              מה רואים בתמונה?
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink-soft">
              {visual.explanation}
            </p>
          </div>
        )}

        {/* ייחוס מקור ורישיון — קרדיט חוקי לכל תמונה */}
        <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
          <span>מקור: </span>
          <a
            href={visual.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-deep underline underline-offset-2"
          >
            {visual.sourceName}
          </a>
          {" · "}
          <span dir="ltr">{visual.attribution}</span>
          {" · "}
          <a
            href={visual.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            dir="ltr"
          >
            {visual.license}
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
