"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

const content = {
  en: { message: "This page does not exist.", cta: "Go home" },
  fr: { message: "Cette page n'existe pas.", cta: "Accueil" },
} as const;

export default function NotFound() {
  const locale = useLocale();
  const t = content[locale as keyof typeof content] ?? content.en;

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-lg text-text-tertiary" role="alert">
        {t.message}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded bg-accent px-6 py-2 font-medium text-bg-primary transition-opacity hover:opacity-90"
      >
        {t.cta}
      </Link>
    </main>
  );
}
