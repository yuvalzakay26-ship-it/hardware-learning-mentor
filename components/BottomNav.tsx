"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/",
    label: "בית",
    icon: (
      <path
        d="M3 10.5 12 3l9 7.5M5.5 9v10.5h13V9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/modules",
    label: "שיעורים",
    icon: (
      <path
        d="M4 5.5h16v13H4zM4 9.5h16M8 5.5v-2M16 5.5v-2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/glossary",
    label: "מושגים",
    icon: (
      <path
        d="M5 4.5h11a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2v-13ZM5 16.5a2 2 0 0 1 2-2h11M9 8.5h5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/review",
    label: "חזרה",
    icon: (
      <path
        d="M4.5 12a7.5 7.5 0 1 1 2.2 5.3M4.5 12V7.5M4.5 12H9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/progress",
    label: "התקדמות",
    icon: (
      <path
        d="M4 20V10M10 20V4M16 20v-7M21 20H3"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ניווט ראשי"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1.5 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) ||
                (item.href === "/modules" && pathname.startsWith("/lesson"));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group flex flex-1 flex-col items-center gap-1 pt-2 pb-1.5 text-[11px] font-medium transition-colors ${
                active ? "text-blue" : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              <span
                className={`flex h-8 w-12 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-blue-tint" : "bg-transparent"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-[22px] w-[22px]"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </span>
              <span className={active ? "font-semibold" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
