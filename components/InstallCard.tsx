"use client";

import { useEffect, useState } from "react";

// אירוע beforeinstallprompt אינו מוגדר בטיפוסי הדפדפן הסטנדרטיים.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "hlm:install-card-dismissed";

/**
 * כרטיס "התקן כאפליקציה" — לא פולשני, מופיע בעמוד הבית.
 *
 * • אם הדפדפן תומך ב-beforeinstallprompt (כרום באנדרואיד) — מציג כפתור
 *   שמריץ את דיאלוג ההתקנה המקורי.
 * • אחרת — מציג הוראות התקנה ידניות בעברית.
 * • מוסתר כשהאפליקציה כבר מותקנת (standalone) או אם המשתמש סגר אותו.
 */
export default function InstallCard() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // כבר מותקן? אל תציג.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;
    if (standalone) return;

    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    setVisible(true);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault(); // מונע את הבאנר האוטומטי — נציג כפתור משלנו.
      setPromptEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setVisible(false);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible) return null;

  async function handleInstall() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") setVisible(false);
    setPromptEvent(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  return (
    <section
      aria-label="התקנת האפליקציה"
      className="mt-6 rounded-2xl border border-line bg-surface p-4 shadow-(--shadow-card)"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-copper-tint"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M12 3v10m0 0 3.5-3.5M12 13 8.5 9.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-bold">התקן כאפליקציה</h2>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
            הוסף את מנטור החומרה למסך הבית — פתיחה מהירה במסך מלא, בלי שורת
            הכתובת.
          </p>

          {promptEvent ? (
            <button
              onClick={handleInstall}
              className="mt-3 w-full rounded-xl bg-copper px-4 py-3 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
            >
              התקן עכשיו
            </button>
          ) : (
            <p className="mt-3 rounded-xl bg-bg px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
              ב־Android: פתח בכרום ‹ שלוש נקודות ‹ התקנת האפליקציה / הוספה למסך
              הבית.
            </p>
          )}

          <button
            onClick={dismiss}
            className="mt-2 text-[12px] font-semibold text-ink-faint"
          >
            אל תציג שוב
          </button>
        </div>
      </div>
    </section>
  );
}
