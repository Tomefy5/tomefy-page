import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container, Divider } from "@/components/ui";
import { socialLinks } from "@/lib/constants";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations();

  return (
    <footer className="relative overflow-x-hidden border-t border-border-primary bg-accent-glass">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[600px] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 70%)",
        }}
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="brand-text inline-block text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              TOMEFY
            </Link>
            <p className="caption max-w-xs text-text-tertiary">
              AI Automation &amp; AI Agent Engineering.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="label-section mb-5">
              {t("Footer.pages")}
            </h4>
            <ul className="space-y-3">
              {["", "work", "lab", "about", "contact"].map((href) => {
                const key =
                  href === ""
                    ? "Home"
                    : href.charAt(0).toUpperCase() + href.slice(1);
                return (
                  <li key={href}>
                    <Link
                      href={`/${locale}/${href}`}
                      className="nav-link inline-block text-text-secondary transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                    >
                      {t(`${key}.title`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="label-section mb-5">
              {t("Footer.connect")}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link inline-block text-text-secondary transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider accent className="my-10" />

        <div className="meta flex flex-col items-center justify-between gap-4 text-text-tertiary md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Tomefy. {t("Footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
