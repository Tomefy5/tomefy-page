"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
};

const BLOBS: Omit<Blob, "x" | "y" | "vx" | "vy" | "phase">[] = [
  { radius: 400, color: "rgba(201, 169, 255, 0.06)" },
  { radius: 300, color: "rgba(180, 140, 255, 0.04)" },
  { radius: 350, color: "rgba(220, 190, 255, 0.03)" },
  { radius: 250, color: "rgba(160, 120, 240, 0.04)" },
  { radius: 200, color: "rgba(200, 160, 255, 0.02)" },
];

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      canvas.style.display = "none";
      return;
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);

      if (blobsRef.current.length === 0) {
        blobsRef.current = BLOBS.map((b) => ({
          ...b,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        }));
      }
    }

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", onMouse, { passive: true });

    function draw(time: number) {
      if (!running) return;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const { innerWidth: w, innerHeight: h } = window;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      blobsRef.current.forEach((blob, i) => {
        const t = time * 0.0003 + blob.phase;

        blob.vx += Math.sin(t + i) * 0.002;
        blob.vy += Math.cos(t + i * 1.3) * 0.002;

        blob.vx += (mx - 0.5) * 0.001 * (i + 1) * 0.1;
        blob.vy += (my - 0.5) * 0.001 * (i + 1) * 0.1;

        const speed = Math.sqrt(blob.vx ** 2 + blob.vy ** 2);
        if (speed > 0.5) {
          blob.vx = (blob.vx / speed) * 0.5;
          blob.vy = (blob.vy / speed) * 0.5;
        }

        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const pulse = 1 + Math.sin(t * 0.5 + i * 0.7) * 0.05;
        const r = blob.radius * pulse;

        const gradient = ctx!.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r);
        gradient.addColorStop(0, blob.color.replace("0.06", String(0.06 * (1 + Math.sin(t * 0.3 + i) * 0.3))));
        gradient.addColorStop(1, "transparent");

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(blob.x, blob.y, r, 0, Math.PI * 2);
        ctx!.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
