import { getTranslations, getLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui";
import MouseParallax from "@/components/ui/MouseParallax";
import HeroBackground from "@/components/ui/HeroBackground";

export default async function HeroSection() {
  const t = await getTranslations("HomePage.hero");
  const locale = await getLocale();
  const lines = t("headline").split("\n");

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 3D background scene — lazy loaded */}
      <HeroBackground />

      {/* Floating decorative circle with mouse parallax */}
      <MouseParallax intensity={10} className="pointer-events-none absolute -right-32 top-[10%] -z-10 hidden md:block">
        <div className="animate-float-circle">
          <div className="h-[450px] w-[450px] rounded-full border border-accent/15" />
        </div>
      </MouseParallax>

      {/* Secondary floating circle with mouse parallax */}
      <MouseParallax intensity={6} className="pointer-events-none absolute -left-20 bottom-[20%] -z-10 hidden lg:block">
        <div className="animate-float-circle-slow">
          <div className="h-[200px] w-[200px] rounded-full border border-accent/10" />
        </div>
      </MouseParallax>

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
