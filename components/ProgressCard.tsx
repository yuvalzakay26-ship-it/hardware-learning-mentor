/** כרטיס נתון בודד במסך ההתקדמות */
export default function ProgressCard({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)">
      <div className="font-display text-[28px] font-black leading-none text-blue-deep">
        {value}
      </div>
      <div className="mt-1.5 text-[13px] font-semibold text-ink">{label}</div>
      {sub && <div className="mt-0.5 text-[12px] text-ink-faint">{sub}</div>}
    </div>
  );
}
