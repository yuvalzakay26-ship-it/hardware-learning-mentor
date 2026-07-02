import type { DiagramKind } from "@/lib/types";

/**
 * תרשימים פשוטים בסגנון סכמת לוח: קופסאות, קווי חיבור ותוויות בעברית.
 * בנויים ב-HTML/CSS בלבד כדי להיראות חדים בכל גודל מסך.
 */

function Box({
  label,
  sub,
  tone = "light",
  className = "",
}: {
  label: string;
  sub?: string;
  tone?: "light" | "dark" | "copper";
  className?: string;
}) {
  const tones = {
    light: "border-line bg-bg text-ink",
    dark: "border-navy-deep bg-navy text-white",
    copper: "border-copper/40 bg-copper-tint text-copper-deep",
  } as const;
  return (
    <div
      className={`rounded-lg border px-2 py-1.5 text-center ${tones[tone]} ${className}`}
    >
      <div className="text-[12px] font-bold leading-tight">{label}</div>
      {sub && <div className="mt-0.5 text-[10px] leading-tight opacity-75">{sub}</div>}
    </div>
  );
}

function Wire({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-0.5" aria-hidden="true">
      <span className="h-4 w-0.5 bg-copper/70" />
      {label && (
        <span className="rounded-full border border-copper/30 bg-copper-tint px-2 py-0.5 font-mono text-[10px] font-bold text-copper-deep" dir="ltr">
          {label}
        </span>
      )}
      {label && <span className="h-4 w-0.5 bg-copper/70" />}
    </div>
  );
}

function CpuInside() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מבט אל תוך המעבד (בפישוט)
      </figcaption>
      <div className="rounded-xl border-2 border-navy bg-navy p-3">
        <div className="mb-2 text-center font-mono text-[11px] font-bold tracking-widest text-copper-tint" dir="ltr">
          CPU
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-lg bg-navy-deep p-2 text-center">
              <div className="text-[12px] font-bold text-white">ליבה {n}</div>
              <div className="mt-0.5 text-[10px] text-white/60">2 ת׳רדים</div>
              <div className="mt-1.5 flex justify-center gap-1" dir="ltr">
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-copper-tint">
                  L1
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-copper-tint">
                  L2
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-lg bg-copper/90 py-1.5 text-center">
          <span className="text-[11px] font-bold text-white">
            מטמון L3 משותף לכל הליבות
          </span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-white/15 py-1">
          <span className="text-[10px] text-white/70">⏱ שעון פנימי —</span>
          <span className="font-mono text-[10px] font-bold text-copper-tint" dir="ltr">
            3.5GHz
          </span>
          <span className="text-[10px] text-white/70">= 3.5 מיליארד פעימות בשנייה</span>
        </div>
      </div>
    </figure>
  );
}

function CpuPch() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מי מחובר למי: המעבד, ה-PCH וכל השאר
      </figcaption>

      {/* שורת החיבורים הישירים למעבד */}
      <div className="grid grid-cols-3 items-end gap-2">
        <Box label="כרטיס גרפי" sub="PCIe מהיר" />
        <Box label="זיכרון RAM" sub="חיבור ישיר" />
        <Box label="SSD ראשי" sub="NVMe" />
      </div>
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-center">
            <span className="h-4 w-0.5 bg-copper/70" />
          </div>
        ))}
      </div>

      {/* המעבד */}
      <Box label="המעבד (CPU)" sub="החישובים וההחלטות" tone="dark" className="py-2.5" />

      <Wire label="DMI" />

      {/* ה-PCH */}
      <Box
        label="PCH — רכזת בקרת הפלטפורמה"
        sub="צומת התקשורת של כל השאר"
        tone="copper"
        className="py-2.5"
      />

      <div className="grid grid-cols-3 gap-2 pt-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-center">
            <span className="h-4 w-0.5 bg-copper/70" />
          </div>
        ))}
      </div>

      {/* הרכיבים שמנוהלים דרך ה-PCH */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="USB" sub="עכבר, מקלדת" />
        <Box label="אחסון נוסף" sub="SATA" />
        <Box label="רשת" sub="Wi-Fi / קווית" />
        <Box label="שמע" sub="אוזניות" />
        <Box label="BIOS / UEFI" sub="שבב הקושחה" />
        <Box label="חיישנים" sub="חום, מאווררים" />
      </div>
    </figure>
  );
}

export default function SimpleDiagram({ kind }: { kind: DiagramKind }) {
  return kind === "cpu-inside" ? <CpuInside /> : <CpuPch />;
}
