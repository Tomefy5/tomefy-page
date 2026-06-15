type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: "hero" | "display" | "section" | "card" | "eyebrow" | "label";
  className?: string;
};

const styles: Record<string, string> = {
  hero: "heading-hero",
  display: "heading-display",
  section: "heading-section",
  card: "heading-card",
  eyebrow: "label-eyebrow text-accent",
  label: "label-eyebrow text-accent",
};

const tags: Record<string, "h1" | "h2" | "h3" | "h4"> = {
  hero: "h1",
  display: "h1",
  section: "h2",
  card: "h3",
  eyebrow: "h4",
  label: "h4",
};

export default function Heading({
  children,
  as,
  variant = "section",
  className = "",
}: HeadingProps) {
  const Tag = as || tags[variant] || "h2";
  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
}
