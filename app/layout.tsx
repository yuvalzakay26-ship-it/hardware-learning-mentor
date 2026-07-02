import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PWARegister from "@/components/PWARegister";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["400", "500", "600", "700"],
});

const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank",
  weight: ["500", "700", "900"],
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
    { media: "(prefers-color-scheme: light)", color: "#f3f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#16263f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`}>
      <body>
        <div className="mx-auto min-h-dvh max-w-lg pb-24">{children}</div>
        <BottomNav />
        <PWARegister />
      </body>
    </html>
  );
}
