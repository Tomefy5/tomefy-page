"use client";

import { useInView } from "@/lib/useInView";

type Props = {
  className?: string;
  color?: string;
  size?: number;
};

export default function AmbientGlow({
  className = "",
  color = "var(--color-accent-glow, rgba(196, 160, 255, 0.4))",
  size = 500,
}: Props) {
  const { ref, inView } = useInView({ once: false, margin: "-300px" });

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute -z-10 ${className}`}
    >
      <div
        className={`rounded-full transition-opacity duration-500 ${
          inView ? "animate-glow-drift" : "opacity-30"
        }`}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(ellipse at center, ${color}, transparent 70%)`,
          animation: inView ? "glow-drift 16s ease-in-out infinite" : "none",
        }}
      />
    </div>
  );
}
