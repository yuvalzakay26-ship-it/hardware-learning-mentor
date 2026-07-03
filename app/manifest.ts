import type { MetadataRoute } from "next";

// Web App Manifest — הגישה הרשמית של Next.js App Router.
// נגיש אוטומטית בכתובת /manifest.webmanifest ומקושר ל-<head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "מנטור החומרה",
    short_name: "מנטור",
    description:
      "מנטור אישי ללימוד עולם החומרה והוולידציה — מעבדים, לוחות אם ותהליכי בדיקה, בעברית פשוטה ומהנייד.",
    lang: "he",
    dir: "rtl",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#0f2544", // נייבי-שבב כהה
    background_color: "#f5f9fc", // לבן-כחלחל
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
