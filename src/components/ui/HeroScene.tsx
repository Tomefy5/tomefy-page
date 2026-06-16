"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame((_state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15;
      torusRef.current.rotation.y += delta * 0.2;
      torusRef.current.position.x +=
        (mouseRef.current.x * 0.3 - torusRef.current.position.x) * 0.02;
      torusRef.current.position.y +=
        (-mouseRef.current.y * 0.3 - torusRef.current.position.y) * 0.02;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.x += delta * 0.1;
      icosaRef.current.rotation.z += delta * 0.12;
      icosaRef.current.position.x +=
        (mouseRef.current.x * 0.15 - icosaRef.current.position.x) * 0.02;
      icosaRef.current.position.y +=
        (-mouseRef.current.y * 0.15 - icosaRef.current.position.y) * 0.02;
    }
  });

  const escala = Math.min(viewport.width / 12, 1);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 3]} intensity={0.8} />
      <directionalLight position={[-2, -1, 2]} intensity={0.3} color="#c9a9ff" />

      <mesh ref={torusRef} position={[-2.5 * escala, 0.5 * escala, 0]}>
        <torusKnotGeometry args={[0.6 * escala, 0.2 * escala, 100, 16]} />
        <meshStandardMaterial
          color="#c9a9ff"
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh
        ref={icosaRef}
        position={[2.2 * escala, -0.8 * escala, -1]}
      >
        <icosahedronGeometry args={[0.5 * escala, 0]} />
        <meshStandardMaterial
          color="#8b6fd6"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Scene />
      </Canvas>
    </div>
  );
}
