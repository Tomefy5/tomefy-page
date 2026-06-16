"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

export default function HeroBackground() {
  return <HeroScene />;
}
