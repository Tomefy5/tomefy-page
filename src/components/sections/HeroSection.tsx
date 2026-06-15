"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { LinkButton } from "@/components/ui";

export default function HeroSection() {
  const t = useTranslations("HomePage.hero");
  const locale = useLocale();
  const lines = t("headline").split("\n");

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Ambient pulsing glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 animate-glow-pulse-accent"
      >
        <div
          className="absolute left-[15%] top-[20%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 md:h-[800px] md:w-[800px]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 70%)",
          }}
        />
      </div>

      {/* Floating decorative circle */}
      <div
        className="pointer-events-none absolute -right-32 top-[10%] -z-10 hidden animate-float-circle md:block"
      >
        <div className="h-[450px] w-[450px] rounded-full border border-accent/15" />
      </div>

      {/* Secondary floating circle */}
      <div
        className="pointer-events-none absolute -left-20 bottom-[20%] -z-10 hidden animate-float-circle-slow lg:block"
      >
        <div className="h-[200px] w-[200px] rounded-full border border-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className="label-eyebrow text-accent animate-[hero-fade-up_0.5s_ease-out_0s_both]"
          >
            {t("eyebrow")}
          </p>

          {/* Headline */}
          <h1
            className="heading-hero mt-6 animate-[hero-fade-up_0.7s_ease-out_0.15s_both]"
          >
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="text-body-lg mt-6 max-w-xl text-text-secondary animate-[hero-fade-up_0.5s_ease-out_0.35s_both]"
          >
            {t("subtitle")}
          </p>

          {/* Single primary CTA */}
          <div
            className="mt-10 animate-[hero-fade-up_0.5s_ease-out_0.5s_both]"
          >
            <LinkButton href={`/${locale}/work`}>
              {t("cta")}
              <span aria-hidden="true">&rarr;</span>
            </LinkButton>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-[hero-fade_0.5s_ease-out_1.2s_both]"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-px bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
