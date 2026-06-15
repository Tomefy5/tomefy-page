type DividerProps = {
  className?: string;
  accent?: boolean;
};

export default function Divider({ className = "", accent = false }: DividerProps) {
  return (
    <hr
      className={`border-0 ${accent ? "h-px bg-accent/30" : "h-px bg-border-secondary"} ${className}`}
    />
  );
}
