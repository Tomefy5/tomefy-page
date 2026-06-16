type Props = {
  variant?: "wave" | "curve";
  className?: string;
};

export default function SectionDivider({
  variant = "wave",
  className = "",
}: Props) {
  if (variant === "curve") {
    return (
      <div
        className={`pointer-events-none relative -mb-1 h-16 w-full overflow-hidden md:h-24 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="rgba(201, 169, 255, 0.03)"
        >
          <path d="M0,64 C360,128 1080,0 1440,64 L1440,96 L0,96 Z" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none relative -mb-1 h-16 w-full overflow-hidden md:h-20 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="rgba(201, 169, 255, 0.03)"
      >
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
