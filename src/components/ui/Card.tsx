type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`group rounded-xl border border-border-glass bg-bg-secondary/80 p-5 shadow-glass transition-all duration-200 backdrop-blur-sm hover:-translate-y-1 hover:border-accent-dim hover:shadow-glass-lg focus-visible:-translate-y-1 focus-visible:border-accent-dim focus-visible:shadow-glass-lg md:p-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
