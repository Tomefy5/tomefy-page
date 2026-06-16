import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { LinkButton } from "@/components/ui";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function NotesPreviewSection() {
  const t = await getTranslations("HomePage.notes");
  const items = t.raw("items") as {
    title: string;
    slug: string;
    date: string;
  }[];
  const locale = await getLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="label-eyebrow text-accent">
            {t("heading")}
          </h2>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.08}>
          <p className="text-body mt-6 max-w-xl text-text-secondary">
            {t("body")}
          </p>
        </MotionWrapper>

        <div className="mt-10 space-y-2">
          {items.map((item, i) => (
            <MotionWrapper key={item.slug} variant="fadeInUp" delay={i * 0.08}>
              <Link
                href={`/${locale}/notes/${item.slug}`}
                className="group flex items-baseline justify-between gap-4 rounded-lg border border-transparent px-4 py-3 transition-all duration-200 hover:border-border-glass hover:bg-bg-glass hover:shadow-glass"
              >
                <span className="text-body text-text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                {item.date && (
                  <span className="meta shrink-0 tabular-nums text-text-tertiary">
                    {item.date}
                  </span>
                )}
              </Link>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper variant="fadeInUp" delay={items.length * 0.08 + 0.08}>
          <div className="mt-8">
            <LinkButton
              href={`/${locale}/notes`}
              variant="ghost"
            >
              {t("cta")}
              <span aria-hidden="true">&rarr;</span>
            </LinkButton>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
