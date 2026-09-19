"use client";

import { useRef, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
 * PREMIUM ENGINEERING CORE VISUALIZATION
 *
 * Design: High-end engineering artifact. Dark graphite metals 
 * with silver/white rim highlights, smoked glass core, precise
 * orbital rings, restrained blue accent lighting.
 * 
 * Key changes from previous version:
 * - Brighter base materials (graphite #1a1d24, not near-black)
 * - Strong white/silver rim lighting for edge definition
 * - 3 rings (precision) instead of 5 (noise)
 * - 6 nodes (crafted) instead of 12 (clutter)
 * - 40% slower rotation for sophisticated motion
 * - Higher ambient + key light for overall readability
 * - Increased tone mapping exposure (1.5 vs 1.2)
 * ═══════════════════════════════════════════════════════════════ */

// ── PALETTE ──
const CORE_GLASS = "#1a1d24";      // Dark graphite glass — visible against #050608 bg
const CORE_WIRE = "#3a4a6a";       // Brighter wireframe edges
const RING_METAL_1 = "#2a2d35";    // Lighter graphite for even rings
const RING_METAL_2 = "#1e2028";    // Slightly darker for odd rings
const BLUE_ACCENT = "#3B82F6";     // Restrained electric blue
const NODE_METAL = "#606878";      // Silver-graphite nodes

// ── RING CONFIG ──
interface RingConfig {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  segments: number;
}

// 3 Rings — clean, precise, elegant orbital structure
const RINGS: RingConfig[] = [
  { radius: 1.9, tube: 0.04, tilt: [1.1, 0.3, 0.1], speed: 0.03, segments: 128 },
  { radius: 2.4, tube: 0.02, tilt: [-0.4, 0.9, -0.3], speed: -0.025, segments: 128 },
  { radius: 2.9, tube: 0.03, tilt: [0.5, -0.4, 0.6], speed: 0.018, segments: 128 },
];

// ── SHARED STATE ──
interface SceneState {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  targetMouseX: number;
  targetMouseY: number;
}

// ── REDUCED MOTION ──
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. CRYSTAL CORE — faceted dark-glass octahedron
 *
 * Uses MeshPhysicalMaterial for thick dark glass effect.
 * Brighter base color (#1a1d24) ensures facets catch light.
 * Strong clearcoat creates highlight reflections on edges.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CrystalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const innerGlowRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();

    // Slow, multi-axis rotation (40% slower than before)
    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.x += delta * 0.045;
    groupRef.current.rotation.z += delta * 0.027;

    // Subtle breathing of the inner light
    if (innerGlowRef.current) {
      innerGlowRef.current.intensity = 2.0 + Math.sin(t * 0.4) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Energy Core — small bright element visible through glass */}
      <mesh scale={0.35}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={BLUE_ACCENT} />
      </mesh>

      {/* Internal Light Source illuminating the glass from inside */}
      <pointLight
        ref={innerGlowRef}
        color={BLUE_ACCENT}
        intensity={2.0}
        distance={6}
        decay={2}
      />

      {/* Outer Shell: Dark Graphite Glass Octahedron */}
      <mesh>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color={CORE_GLASS}
          metalness={0.85}
          roughness={0.08}
          transmission={0.7}
          thickness={0.6}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={2.0}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Structural Wireframe — sharper edges, brighter lines */}
      <mesh>
        <octahedronGeometry args={[1.105, 0]} />
        <meshBasicMaterial
          color={CORE_WIRE}
          wireframe
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 2. ORBITAL RINGS — polished metallic bands
 *
 * Brighter metals with higher envMapIntensity for strong
 * specular reflections. 3 rings for precision.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitalRings({ reducedMotion }: { reducedMotion: boolean }) {
  const ringGroupRefs = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    RINGS.forEach((ring, i) => {
      const grp = ringGroupRefs.current[i];
      if (!grp) return;
      grp.rotation.set(ring.tilt[0], ring.tilt[1] + t * ring.speed, ring.tilt[2]);
    });
  });

  return (
    <group>
      {RINGS.map((ring, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) ringGroupRefs.current[i] = el;
          }}
        >
          {/* Main Metallic Ring */}
          <mesh>
            <torusGeometry args={[ring.radius, ring.tube, 32, ring.segments]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? RING_METAL_1 : RING_METAL_2}
              metalness={1.0}
              roughness={0.06 + i * 0.02}
              envMapIntensity={2.8}
            />
          </mesh>

          {/* Thin Inner Track (Subtle groove detail) */}
          <mesh>
            <torusGeometry args={[ring.radius - ring.tube * 0.4, ring.tube * 0.12, 8, ring.segments]} />
            <meshStandardMaterial
              color="#0a0a0e"
              metalness={0.8}
              roughness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 3. ORBITING NODES — small metallic spheres
 *
 * 6 nodes for precision. Silver-graphite material catches
 * rim lighting strongly.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const NODE_COUNT = 6;

function OrbitingNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      arr.push({
        ringIdx: i % RINGS.length,
        startAngle: (i / NODE_COUNT) * Math.PI * 2,
        speedMult: 1.0 + (i % 3) * 0.2,
        size: 0.065 + (i % 3) * 0.02,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    nodes.forEach((n, i) => {
      const mesh = nodeRefs.current[i];
      if (!mesh) return;
      
      const ring = RINGS[n.ringIdx];
      const angle = n.startAngle + t * ring.speed * n.speedMult;

      const x = Math.cos(angle) * ring.radius;
      const z = Math.sin(angle) * ring.radius;

      const euler = new THREE.Euler(
        ring.tilt[0],
        ring.tilt[1] + t * ring.speed,
        ring.tilt[2]
      );
      const vec = new THREE.Vector3(x, 0, z).applyEuler(euler);

      mesh.position.copy(vec);
    });
  });

  return (
    <group>
      {nodes.map((n, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              if (el) nodeRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[n.size, 32, 16]} />
            <meshStandardMaterial
              color={NODE_METAL}
              metalness={1.0}
              roughness={0.2}
              envMapIntensity={3.0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCENE — assembles elements, lighting, and interactions
 *
 * Lighting strategy for visibility:
 * - Ambient: 0.3 (doubled from 0.15 — prevents pure black areas)
 * - Key light: 3.5 intensity white from top-right
 * - Fill light: 1.2 cool blue-white from bottom-left  
 * - Rim light: 3.0 white from behind-right (silver edge highlights)
 * - Accent light: 4.0 blue spot from behind (restrained blue hint)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Scene({ sceneStateRef }: { sceneStateRef: React.RefObject<SceneState> }) {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (!mainGroupRef.current) return;
    const s = sceneStateRef.current;
    if (!s) return;

    if (!reducedMotion) {
      // Smooth mouse parallax via lerp
      s.mouseX = THREE.MathUtils.lerp(s.mouseX, s.targetMouseX, 0.02);
      s.mouseY = THREE.MathUtils.lerp(s.mouseY, s.targetMouseY, 0.02);

      // Apply subtle rotation based on mouse (max ~5 degrees)
      mainGroupRef.current.rotation.y = s.mouseX * 0.08;
      mainGroupRef.current.rotation.x = s.mouseY * 0.05;

      // Idle floating motion
      const t = clock.getElapsedTime();
      mainGroupRef.current.position.y = Math.sin(t * 0.3) * 0.08;
      mainGroupRef.current.position.x = Math.sin(t * 0.2) * 0.04;
    }

    // Subtle scroll-based rotation and downward drift
    const scroll = s.scrollProgress;
    if (!reducedMotion && scroll > 0) {
      mainGroupRef.current.rotation.y += scroll * 0.3;
      mainGroupRef.current.position.y -= scroll * 1.0;
    }
  });

  return (
    <>
      {/* ── ENVIRONMENT MAPPING ── */}
      <Environment preset="city" />

      {/* ── CINEMATIC LIGHTING ── */}
      
      {/* Ambient — higher base for overall readability */}
      <ambientLight intensity={0.3} />

      {/* Key Light — strong white from top-right */}
      <directionalLight
        position={[8, 10, 5]}
        intensity={3.5}
        color="#ffffff"
      />

      {/* Cool Fill Light — from bottom-left, prevents pure black shadows */}
      <directionalLight
        position={[-8, -5, 5]}
        intensity={1.2}
        color="#c0c8d8"
      />

      {/* Silver Rim Light — from behind-right, creates edge highlights */}
      <directionalLight
        position={[5, 3, -8]}
        intensity={3.0}
        color="#e0e8f0"
      />

      {/* Restrained Blue Accent — from behind, subtle color hint only */}
      <spotLight
        position={[0, 4, -10]}
        intensity={4.0}
        angle={0.6}
        penumbra={0.5}
        color={BLUE_ACCENT}
        distance={22}
      />

      {/* ── SCENE GROUP ── */}
      <group ref={mainGroupRef} scale={0.78}>
        <CrystalCore reducedMotion={reducedMotion} />
        <OrbitalRings reducedMotion={reducedMotion} />
        <OrbitingNodes reducedMotion={reducedMotion} />
      </group>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXPORTED COMPONENT
 *
 * Container: fills parent (w-full h-full). Parent in Hero.tsx
 * is absolutely positioned with w-[50%] h-[800px].
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroVisualization() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const stateRef = useRef<SceneState>({
    scrollProgress: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (process.env.NODE_ENV === "development") {
      console.log("[HeroVisualization] mounted");
    }
  }, []);

  // ── Mouse tracking (global) ──
  const onPointerMove = useCallback((e: PointerEvent) => {
    stateRef.current.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    stateRef.current.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  // ── Scroll tracking ──
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      stateRef.current.scrollProgress = Math.min(scrollY / heroHeight, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
          if (process.env.NODE_ENV === "development") {
            const c = gl.domElement;
            console.log(`[HeroVisualization] WebGL OK — ${c.width}×${c.height}`);
          }
        }}
      >
        <Suspense fallback={null}>
          <Scene sceneStateRef={stateRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
