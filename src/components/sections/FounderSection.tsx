"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default function FounderSection() {
  const t = useTranslations("HomePage.founder");
  const locale = useLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="label-eyebrow text-accent">
            {t("heading")}
          </h2>
          <div className="mt-6 space-y-4 text-body text-text-secondary">
            {t("body")
              .split("\n\n")
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
          <LinkButton
            href={`/${locale}/about`}
            variant="ghost"
            className="mt-8"
          >
            {t("cta")}
            <span aria-hidden="true">&rarr;</span>
          </LinkButton>
        </MotionWrapper>
      </div>
    </section>
  );
}
