import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "btn-text inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent";

const variants = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-hover active:bg-accent-dim",
  ghost:
    "border border-accent/30 text-accent hover:bg-accent-subtle hover:border-accent/60",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
};

export function LinkButton({
  children,
  href,
  variant = "primary",
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
