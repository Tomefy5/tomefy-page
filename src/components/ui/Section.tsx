type SectionProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  decorated?: boolean;
  glowSide?: "left" | "right";
  layered?: boolean;
};

export default function Section({
  children,
  className = "",
  as: Tag = "section",
  decorated = false,
  glowSide = "right",
  layered = false,
}: SectionProps) {
  const glowPos =
    glowSide === "right"
      ? "right-0 translate-x-1/2"
      : "left-0 -translate-x-1/2";

  return (
    <Tag
      className={`relative py-24 md:py-32 lg:py-44 ${
        decorated ? "border-t border-border-primary overflow-x-hidden" : ""
      } ${layered ? "bg-accent-glass" : ""} ${className}`}
    >
      {decorated && (
        <div
          className={`pointer-events-none absolute top-0 -z-10 h-80 w-80 md:h-96 md:w-96 ${glowPos} -translate-y-1/2 opacity-30 md:opacity-20`}
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-accent-glow), transparent 70%)",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
