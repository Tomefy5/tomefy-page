"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h1 className="text-2xl font-bold text-error" role="alert">
        {t("title")}
      </h1>
      <p className="mt-2 text-text-tertiary">
        {error.message || t("defaultMessage")}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded bg-accent px-6 py-2 font-medium text-bg-primary transition-opacity hover:opacity-90"
      >
        {t("retry")}
      </button>
    </main>
  );
}
