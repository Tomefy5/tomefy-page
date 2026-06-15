type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
};

const variants = {
  default: "border-border-glass text-text-tertiary",
  accent: "border-accent/20 text-accent",
  muted: "border-border-secondary text-text-tertiary",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`caption inline-flex items-center rounded-full border px-3 py-1 font-medium tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
