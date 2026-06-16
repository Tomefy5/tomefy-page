import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import Float from "@/components/ui/Float";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function FeaturedWorkSection() {
  const t = await getTranslations("HomePage.featuredWork");
  const items = t.raw("items") as {
    title: string;
    description: string;
    tags: string[];
    href: string;
  }[];
  const locale = await getLocale();

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="label-section mb-14 text-center">
            {t("heading")}
          </h2>
        </MotionWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Float key={item.title} delay={i * 0.15} distance={6} duration={5}>
              <Card as="div" className="p-6 md:p-8">
                <Link
                  href={`/${locale}${item.href}`}
                  className="block"
                >
                  <h3 className="heading-card text-text-primary transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="caption mt-3 text-text-secondary">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Link>
              </Card>
            </Float>
          ))}
        </div>
      </div>
    </section>
  );
}
