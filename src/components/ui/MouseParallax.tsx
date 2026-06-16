"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
};

export default function MouseParallax({
  children,
  intensity = 8,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const disabledRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || "ontouchstart" in window) {
      disabledRef.current = true;
      return;
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", onMouse, { passive: true });

    function animate() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      posRef.current.x += (mx * intensity - posRef.current.x) * 0.05;
      posRef.current.y += (my * intensity - posRef.current.y) * 0.05;

      if (ref.current) {
        ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
