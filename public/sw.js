/*
 * Service Worker — מנטור החומרה
 * ------------------------------------------------------------
 * מטרה: להפוך את האפליקציה להתקנה (installable) ולאפשר טעינה
 * של המסכים המרכזיים גם אחרי הביקור הראשון — בלי באגים של
 * תוכן תקוע (stale).
 *
 * אסטרטגיה:
 *   • ניווטים (דפי HTML)  → Network-first, נפילה למטמון ואז לדף הבית.
 *   • נכסים סטטיים של Next (/_next/static, קבצים עם hash) → Cache-first.
 *   • כל השאר (GET, אותו origin) → Stale-while-revalidate.
 *   • בקשות שאינן GET / cross-origin → לא מטופלות (עוברות לרשת).
 *
 * גרסת המטמון (CACHE_VERSION) — יש להעלות אותה כדי לפרסם עדכון.
 * ב-activate מוחקים כל מטמון ישן, כך שתוכן לא נשאר תקוע לנצח.
 */
const CACHE_VERSION = "v1";
const CACHE_NAME = `hlm-${CACHE_VERSION}`;

// שלד האפליקציה שנשמר מראש בהתקנה.
const APP_SHELL = ["/", "/modules", "/glossary", "/progress"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // addAll נכשל אם משאב אחד נכשל — לכן שומרים אחד-אחד בזהירות.
      await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)));
      // מפעילים את ה-SW החדש מיד, בלי להמתין לסגירת כל הטאבים.
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// מאפשר לעמוד לבקש הפעלה מיידית של SW ממתין (משמש לעדכונים).
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:js|css|png|jpg|jpeg|svg|webp|ico|woff2?)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // מטפלים רק ב-GET מאותו origin. השאר עובר ישירות לרשת.
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 1) ניווטים → Network-first (תמיד HTML עדכני; מטמון כגיבוי לאופליין).
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match("/")) || Response.error();
        }
      })()
    );
    return;
  }

  // 2) נכסים סטטיים עם hash → Cache-first (הם immutable).
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, fresh.clone());
        }
        return fresh;
      })()
    );
    return;
  }

  // 3) שאר הבקשות (GET) → Stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((res) => {
          if (res.ok) cache.put(request, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })()
  );
});
