"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function switchLocale(next: string) {
    if (next === locale) return;
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = next;
      router.replace(segments.join("/"));
    });
  }

  return (
    <div
      className="relative flex items-center rounded-lg border border-border-glass bg-bg-glass p-0.5 shadow-glass backdrop-blur-sm"
      role="radiogroup"
      aria-label={locale === "fr" ? "Langue" : "Language"}
    >
      {/* Sliding active pill */}
      <motion.div
        className="absolute left-0.5 top-0.5 bottom-0.5 rounded-md bg-accent"
        layout
        transition={{ duration: 0.2, ease }}
        style={{
          width: `calc(50% - 2px)`,
          left: locale === "en" ? "calc(50% + 0px)" : "2px",
        }}
      />

      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          role="radio"
          aria-checked={locale === code}
          className={`relative z-10 rounded-md px-2.5 py-1 text-xs font-medium tracking-widest transition-colors duration-150 ${
            locale === code
              ? "text-bg-primary"
              : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
