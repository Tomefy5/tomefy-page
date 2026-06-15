"use client";

import { useInView } from "@/lib/useInView";

type Variant = "fadeInUp" | "fadeIn" | "scaleIn" | "slideInRight" | "slideInLeft";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "li" | "h2";
};

const variantClasses: Record<Variant, string> = {
  fadeInUp: "opacity-0 translate-y-6",
  fadeIn: "opacity-0",
  scaleIn: "opacity-0 scale-[0.97]",
  slideInRight: "opacity-0 -translate-x-4",
  slideInLeft: "opacity-0 translate-x-4",
};

export default function MotionWrapper({
  children,
  variant = "scaleIn",
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const { ref, inView } = useInView({ once: true, margin: "-80px" });

  return (
    <Tag
      ref={ref as any}
      className={`transition-all duration-[600ms] ease-out will-change-transform ${
        variantClasses[variant]
      } ${inView ? "!opacity-100 !translate-y-0 !translate-x-0 !scale-100" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
