import type { Metadata, Viewport } from "next";
import { Assistant, Rubik } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PWARegister from "@/components/PWARegister";

// גופן הגוף — אסיסטנט: עברי, נקי ומאוד קריא בנייד.
const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
});

// גופן הכותרות/כפתורים — Rubik: מודרני, גיאומטרי וטק, עם תמיכה מלאה בעברית.
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "מנטור החומרה — לומדים חומרה צעד אחר צעד",
  description:
    "מערכת לימוד אישית לעולם החומרה: מעבדים, לוחות אם וולידציה — בעברית פשוטה, מהנייד.",
  applicationName: "מנטור החומרה",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "מנטור",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // בהיר בזמן גלילה למעלה, כהה כשהאפליקציה במצב standalone.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f2544" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${rubik.variable}`}>
      <body>
        <div className="mx-auto min-h-dvh max-w-lg pb-24">{children}</div>
        <BottomNav />
        <PWARegister />
      </body>
    </html>
  );
}
