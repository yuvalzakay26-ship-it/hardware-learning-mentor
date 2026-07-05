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
  tone?: "light" | "dark" | "blue";
  className?: string;
}) {
  const tones = {
    light: "border-line bg-bg text-ink",
    dark: "border-navy-deep bg-navy text-white",
    blue: "border-blue/40 bg-blue-tint text-blue-deep",
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
      <span className="h-4 w-0.5 bg-blue/70" />
      {label && (
        <span className="rounded-full border border-blue/30 bg-blue-tint px-2 py-0.5 font-mono text-[10px] font-bold text-blue-deep" dir="ltr">
          {label}
        </span>
      )}
      {label && <span className="h-4 w-0.5 bg-blue/70" />}
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
        <div className="mb-2 text-center font-mono text-[11px] font-bold tracking-widest text-blue-tint" dir="ltr">
          CPU
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-lg bg-navy-deep p-2 text-center">
              <div className="text-[12px] font-bold text-white">ליבה {n}</div>
              <div className="mt-0.5 text-[10px] text-white/60">2 ת׳רדים</div>
              <div className="mt-1.5 flex justify-center gap-1" dir="ltr">
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-tint">
                  L1
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-tint">
                  L2
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-lg bg-blue/90 py-1.5 text-center">
          <span className="text-[11px] font-bold text-white">
            מטמון L3 משותף לכל הליבות
          </span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-white/15 py-1">
          <span className="text-[10px] text-white/70">⏱ שעון פנימי —</span>
          <span className="font-mono text-[10px] font-bold text-blue-tint" dir="ltr">
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
            <span className="h-4 w-0.5 bg-blue/70" />
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
        tone="blue"
        className="py-2.5"
      />

      <div className="grid grid-cols-3 gap-2 pt-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-center">
            <span className="h-4 w-0.5 bg-blue/70" />
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

function HostSutFrame() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        שלושת שחקני סביבת הבדיקה — מי שולט, מי נבדק, ומה מחזיק
      </figcaption>

      {/* ה-Host — המחשב השולט */}
      <Box
        label="Host — המחשב השולט"
        sub="מריץ את הכלים ושולח פקודות"
        tone="dark"
        className="py-2.5"
      />

      <Wire label="כבל תקשורת" />

      {/* ה-Frame מחזיק את ה-SUT — קופסה עוטפת */}
      <div className="rounded-xl border-2 border-dashed border-blue/50 bg-blue-tint/40 p-3">
        <div className="mb-2 text-center text-[11px] font-bold text-blue-deep">
          Frame — המתקן שמחזיק ומחבר
        </div>
        <Box
          label="SUT / Target — המערכת הנבדקת"
          sub="הלוח שיושב על ה-Frame ונבדק בפועל"
          tone="blue"
          className="py-2.5"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Box label="ספק כוח" sub="חשמל ל-SUT" />
          <Box label="כבל Debug" sub="לחקירת תקלות" />
          <Box label="צג קודים" sub="Port 80" />
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        ה-Host שולט מבחוץ · ה-SUT נבדק · ה-Frame מחזיק את הכול ומספק חשמל וחיבורים.
      </p>
    </figure>
  );
}

function HostSutSsh() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        איך ה-Host מתחבר ל-SUT דרך PuTTY / SSH
      </figcaption>

      {/* ה-Host — המחשב שממנו הבודק עובד */}
      <Box
        label="Host — מחשב הבודק"
        sub="ממנו פותחים את PuTTY ושולחים פקודות"
        tone="dark"
        className="py-2.5"
      />

      <Wire label="PuTTY / SSH" />

      {/* ה-SUT — המערכת הנבדקת */}
      <Box
        label="SUT — המערכת הנבדקת"
        sub="מקבלת את הפקודות ומריצה אותן"
        tone="blue"
        className="py-2.5"
      />

      <div className="flex flex-col items-center py-0.5" aria-hidden="true">
        <span className="h-4 w-0.5 bg-blue/70" />
      </div>

      {/* מה חוזר בחזרה אל הבודק */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="Logs" sub="יומני מערכת" />
        <Box label="Commands" sub="פקודות שרצות" />
        <Box label="Debug" sub="מידע לחקירה" />
      </div>
    </figure>
  );
}

function BootFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "לחיצה על כפתור ההפעלה", sub: "Power On — הזרם מגיע ללוח", tone: "light" },
    { label: "BIOS / UEFI מתעורר", sub: "הקושחה הראשונה שרצה במחשב", tone: "dark" },
    { label: "אתחול החומרה", sub: "Hardware Initialization — הכנת הזיכרון והרכיבים", tone: "blue" },
    { label: "בחירת התקן אתחול", sub: "Boot Device — מהיכן נטענת המערכת", tone: "light" },
    { label: "מערכת ההפעלה נטענת", sub: "Windows / Linux עולה — המחשב 'חי'", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מה קורה מרגע ההדלקה ועד שמערכת ההפעלה עולה
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        הכול קורה מלמעלה למטה, בכל הדלקה מחדש. ה-BIOS/UEFI תמיד לפני מערכת ההפעלה.
      </p>
    </figure>
  );
}

function PostFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "לחיצה על כפתור ההפעלה", sub: "Power On — הזרם מגיע ללוח", tone: "light" },
    { label: "BIOS / UEFI מתעורר", sub: "הקושחה הראשונה שרצה במחשב", tone: "dark" },
    { label: "נקודות ביקורת של הבדיקה", sub: "POST Checkpoints — תחנות לאורך ההדלקה", tone: "blue" },
    { label: "הקוד מוצג החוצה", sub: "POST Code / Port 80 — המספר של התחנה הנוכחית", tone: "light" },
    { label: "רמז לחקירת תקלה", sub: "Clue for Debug — איפה בערך נעצרה ההדלקה", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        איך קוד ה-POST הופך לרמז לחקירה
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        הקוד לא 'מתקן' כלום — הוא רק מספר לך עד לאיזו תחנה המערכת הגיעה.
      </p>
    </figure>
  );
}

function TargetDevices() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מי מחובר למי: מהבודק ועד רכיבי החומרה על ה-Target
      </figcaption>

      {/* ה-Host — מחשב הבודק */}
      <Box
        label="Host — מחשב הבודק"
        sub="ממנו עובדים ושולחים פקודות ובדיקות"
        tone="dark"
        className="py-2.5"
      />

      <Wire label="חיבור / רשת" />

      {/* ה-Target / SUT — המערכת הנבדקת */}
      <Box
        label="Target / SUT — המערכת הנבדקת"
        sub="הלוח או המחשב שאותו בודקים בפועל"
        tone="blue"
        className="py-2.5"
      />

      <Wire label="על הלוח" />

      {/* שכבת המחברים והיציאות */}
      <Box
        label="מחברים ויציאות"
        sub="Connectors & Ports — הנקודות שאליהן מחברים דברים"
        className="py-2.5"
      />

      <div className="grid grid-cols-2 gap-2 pt-1" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="flex justify-center">
            <span className="h-4 w-0.5 bg-blue/70" />
          </div>
        ))}
      </div>

      {/* רכיבי החומרה עצמם */}
      <div className="grid grid-cols-2 gap-2">
        <Box label="M.2" sub="כונן SSD פנימי" />
        <Box label="Type-C" sub="נתונים / חשמל / מסך" />
        <Box label="J5" sub="מחבר ממוספר על הלוח" />
        <Box label="USB" sub="עכבר, דיסק-און-קי" />
        <Box label="Debug" sub="מחבר לחקירת תקלות" />
        <Box label="עוד רכיבים" sub="רשת, חיישנים ועוד" />
      </div>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        הבודק תמיד שואל: מה מחובר, לאן זה מתחבר, ואיך זה משפיע על הבדיקה.
      </p>
    </figure>
  );
}

function TypecFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "יציאת Type-C", sub: "Type-C Port — המחבר על הלוח", tone: "dark" },
    { label: "כבל / מתאם / דוק", sub: "Cable / Adapter / Dock — מה שמחברים", tone: "light" },
    { label: "ההתקן", sub: "Device — מסך, כונן, מטען ועוד", tone: "blue" },
    { label: "נתיב הפלטפורמה / בקר / TCSS", sub: "מי מנהל את מה שעובר — תלוי בארכיטקטורה", tone: "dark" },
    { label: "BIOS / מערכת הפעלה / לוגים", sub: "איפה רואים אם זה עבד", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        המסלול של Type-C: מהמחבר ועד ללוגים
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        תקלה יכולה לשבת בכל אחת מהתחנות — לא רק ביציאה עצמה.
      </p>
    </figure>
  );
}

function DebugFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "תקלה", sub: "Failure — משהו לא עובד כמצופה", tone: "dark" },
    { label: "רמזים בסיסיים", sub: "Basic Clues — מה רואים בכלים הרגילים", tone: "light" },
    { label: "POST / BIOS / לוגים", sub: "המקורות הראשונים לראיות", tone: "blue" },
    { label: "חיבור Debug", sub: "Debug Connection — כשצריך להעמיק", tone: "dark" },
    { label: "ראיות עמוקות יותר", sub: "Deeper Evidence — מצב הפלטפורמה מבפנים", tone: "blue" },
    { label: "דיווח / צעד הבא", sub: "Report — מסכמים ומחליטים איך ממשיכים", tone: "light" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מהתקלה ועד לראיות: מתי חיבור Debug נכנס לתמונה
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        לא קופצים ישר ל-Debug — קודם מנצלים את הרמזים הרגילים, ורק כשצריך מעמיקים.
      </p>
    </figure>
  );
}

function EnvFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "החומרה / ה-Target", sub: "Hardware — הלוח או המערכת שבודקים", tone: "dark" },
    { label: "הדלקה / BIOS", sub: "Boot / BIOS — המערכת מתעוררת ומאתחלת", tone: "light" },
    { label: "סביבת ולידציה", sub: "Validation Environment — התוכנה שבתוכה בודקים", tone: "blue" },
    { label: "OSBV או SVOS", sub: "שתי סביבות אפשריות — לפי מה שהבדיקה דורשת", tone: "dark" },
    { label: "כלים / לוגים / בדיקות", sub: "Tools / Logs / Tests — מה שרץ בפועל", tone: "light" },
    { label: "דוח / ראיות", sub: "Report / Evidence — מה שמתעדים ומדווחים", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        מהחומרה ועד הדוח: איפה סביבת הבדיקה נכנסת לתמונה
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        תקלה שקורית לפני שלב 'סביבת הבדיקה' שייכת להדלקה/BIOS — לא לסביבה עצמה.
      </p>
    </figure>
  );
}

function ThermalFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "עומס עבודה", sub: "Workload — הפעילות/הבדיקה שמעסיקה את החומרה", tone: "dark" },
    { label: "צריכת חשמל", sub: "Power — האנרגיה החשמלית שהרכיב משתמש בה", tone: "light" },
    { label: "חום", sub: "Heat — חלק מהאנרגיה הופך לחום", tone: "blue" },
    { label: "טמפרטורה", sub: "Temperature — כמה חם נעשה הרכיב", tone: "dark" },
    { label: "קירור", sub: "Cooling — מאווררים, גוף קירור וזרימת אוויר מפנים חום", tone: "light" },
    { label: "התנהגות / יציבות / Throttling", sub: "Behavior — איך המערכת מגיבה לחום", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        השרשרת התרמית: מעומס עבודה ועד להתנהגות המערכת
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        יותר עבודה ← יותר חשמל ← יותר חום ← טמפרטורה גבוהה יותר. קירור טוב שומר על הטווח הבטוח.
      </p>
    </figure>
  );
}

function TtkFlow() {
  const steps: { label: string; sub: string; tone: "light" | "dark" | "blue" }[] = [
    { label: "נושא הדרכה", sub: "Training Topic — הנושא שמופיע ברשימת ההדרכה", tone: "dark" },
    { label: "TTK / TTK3", sub: "כלי / ערכת בדיקה של הצוות — לאמת מול המנטור", tone: "blue" },
    { label: "POST Code / Port 80", sub: "קודי התקדמות ההדלקה שאפשר לראות", tone: "light" },
    { label: "רמזי Boot / BIOS", sub: "Boot / BIOS Clues — עד לאן הגיעה ההדלקה", tone: "dark" },
    { label: "ראיות לדיבאג / דוח", sub: "Evidence for Debug / Report — מה שמתעדים ומדווחים", tone: "blue" },
  ];
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <figcaption className="mb-3 text-center text-[12px] font-semibold text-ink-soft">
        איפה TTK / TTK3 יושב בשרשרת — מנושא ההדרכה ועד לראיות לדוח
      </figcaption>
      {steps.map((step, i) => (
        <div key={i}>
          <Box label={step.label} sub={step.sub} tone={step.tone} className="py-2.5" />
          {i < steps.length - 1 && <Wire />}
        </div>
      ))}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
        זהו קישור זהיר, לא הגדרה רשמית: המשמעות המדויקת של TTK / TTK3 דורשת אימות מול הצוות / המנטור.
      </p>
    </figure>
  );
}

export default function SimpleDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === "ttk-flow") return <TtkFlow />;
  if (kind === "cpu-inside") return <CpuInside />;
  if (kind === "cpu-pch") return <CpuPch />;
  if (kind === "host-sut-frame") return <HostSutFrame />;
  if (kind === "boot-flow") return <BootFlow />;
  if (kind === "post-flow") return <PostFlow />;
  if (kind === "target-devices") return <TargetDevices />;
  if (kind === "typec-flow") return <TypecFlow />;
  if (kind === "debug-flow") return <DebugFlow />;
  if (kind === "env-flow") return <EnvFlow />;
  if (kind === "thermal-flow") return <ThermalFlow />;
  return <HostSutSsh />;
}
