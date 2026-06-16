import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function FounderSection() {
  const t = await getTranslations("HomePage.founder");
  const locale = await getLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="shrink-0">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border border-border-glass md:h-48 md:w-48">
                <Image
                  src="/images/tomefy-pdp.png"
                  alt="Tomefy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 176px, 192px"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
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
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
