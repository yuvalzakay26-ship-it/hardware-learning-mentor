"use client";

import { useEffect } from "react";

/**
 * רושם את ה-Service Worker בדפדפן.
 *
 * • בפרודקשן בלבד — כדי שמטמון אגרסיבי לא ישבש פיתוח (dev).
 * • ב-dev הקומפוננטה מבטלת רישום של SW קיים ומנקה מטמונים,
 *   כך שבדיקת פרודקשן קודמת לא משאירה תוכן תקוע ב-localhost.
 * • לא מרנדר שום UI.
 */
export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      const onLoad = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .catch((err) => console.error("[PWA] רישום SW נכשל:", err));
      };
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }

    // סביבת פיתוח — מנקים כל SW/מטמון שנרשמו קודם.
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
    if (typeof caches !== "undefined") {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  }, []);

  return null;
}
