import { getTranslations } from "next-intl/server";
import Float from "@/components/ui/Float";
import MotionWrapper from "@/components/ui/MotionWrapper";

export default async function ProofSection() {
  const t = await getTranslations("HomePage.proof");
  const items = t.raw("items") as { metric: string; label: string }[];

  return (
    <section className="border-t border-border-primary">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 lg:px-12">
        <MotionWrapper variant="fadeInUp">
          <h2 className="label-section mb-14 text-center">
            {t("heading")}
          </h2>
        </MotionWrapper>

        <div className="grid gap-10 md:grid-cols-3">
          {items.map((item, i) => (
            <Float key={item.label} delay={i * 0.15} distance={4} duration={6}>
              <MotionWrapper variant="fadeInUp" delay={i * 0.1}>
                <div className="text-center">
                  <p className="heading-display text-accent">
                    {item.metric}
                  </p>
                  <p className="caption mt-2 text-text-tertiary">{item.label}</p>
                </div>
              </MotionWrapper>
            </Float>
          ))}
        </div>
      </div>
    </section>
  );
}
