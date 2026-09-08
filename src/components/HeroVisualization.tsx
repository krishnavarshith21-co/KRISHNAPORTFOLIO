"use client";

import { useRef, useMemo, useEffect, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
 * PREMIUM ENGINEERING CORE VISUALIZATION (TARGET DESIGN)
 *
 * Design: High-end technology rendering. Photorealistic dark 
 * metals, tinted glass, cinematic depth, and precise electric 
 * blue accents.
 * 
 * Key Elements:
 * - Octahedron Core: Dark tinted glass revealing an inner blue glow.
 * - Orbital Rings: Highly polished metallic toruses reflecting 
 *   an environment map.
 * - Nodes: Small polished metallic spheres and blue emissive dots.
 * - Lighting: Cinematic key/fill/rim setup + Environment reflections.
 * - Motion: Extremely slow, luxurious, continuous.
 * ═══════════════════════════════════════════════════════════════ */

// ── PALETTE ──
const CORE_GLASS = "#050a12";
const CORE_WIRE = "#1a3a6a";
const RING_METAL_1 = "#1f1f24";
const RING_METAL_2 = "#121218";
const BLUE_ACCENT = "#2b6eff";

// ── RING CONFIG ──
interface RingConfig {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  segments: number;
}

// 5 Rings of varying thickness and radii, angled to create a complex orbital sphere
const RINGS: RingConfig[] = [
  { radius: 1.8, tube: 0.045, tilt: [1.2, 0.4, 0.1], speed: 0.05, segments: 128 },
  { radius: 2.2, tube: 0.015, tilt: [-0.3, 0.8, -0.4], speed: -0.04, segments: 128 },
  { radius: 2.6, tube: 0.035, tilt: [0.6, -0.5, 0.7], speed: 0.03, segments: 96 },
  { radius: 2.9, tube: 0.008, tilt: [-0.8, -0.2, 0.5], speed: 0.06, segments: 96 },
  { radius: 3.3, tube: 0.025, tilt: [0.1, 1.1, -0.2], speed: -0.025, segments: 128 },
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
 * Uses MeshPhysicalMaterial to create a thick, dark, 
 * tinted glass effect that reveals the inner blue glow.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CrystalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const outerCoreRef = useRef<THREE.Mesh>(null!);
  const innerGlowRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();

    // Increased rotation on multiple axes
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.075;
    groupRef.current.rotation.z += delta * 0.045;

    // Subtle breathing/pulsing of the inner light
    if (innerGlowRef.current) {
      innerGlowRef.current.intensity = 2.5 + Math.sin(t * 0.5) * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Energy Core */}
      <mesh scale={0.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color={BLUE_ACCENT} />
      </mesh>

      {/* Internal Light Source illuminating the glass from inside */}
      <pointLight
        ref={innerGlowRef}
        color={BLUE_ACCENT}
        intensity={3}
        distance={8}
        decay={2}
      />

      {/* Outer Shell: Dark Tinted Glass Octahedron */}
      <mesh ref={outerCoreRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color={CORE_GLASS}
          metalness={0.9}
          roughness={0.05}
          transmission={0.8}    // Glass-like transparency
          thickness={0.5}       // Refraction thickness
          ior={1.5}             // Index of refraction
          clearcoat={1.0}       // Extra glossy layer
          clearcoatRoughness={0.1}
          envMapIntensity={1.5} // Strong environment reflections
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Structural Wireframe Overlay for sharp facet definition */}
      <mesh>
        <octahedronGeometry args={[1.102, 0]} />
        <meshBasicMaterial
          color={CORE_WIRE}
          wireframe
          transparent
          opacity={0.15}
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
 * Highly reflective toruses using MeshStandardMaterial
 * relying heavily on the Environment map for metallic feel.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitalRings({ reducedMotion }: { reducedMotion: boolean }) {
  const ringGroupRefs = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    RINGS.forEach((ring, i) => {
      const grp = ringGroupRefs.current[i];
      if (!grp) return;
      // Rotate the entire ring group around its tilted axis
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
              roughness={0.08 + i * 0.02} // Slight variation in polish
              envMapIntensity={2.0} // Crucial for the metallic look
            />
          </mesh>

          {/* Thin Inner Track (Subtle groove detail) */}
          <mesh>
            <torusGeometry args={[ring.radius - ring.tube * 0.4, ring.tube * 0.15, 8, ring.segments]} />
            <meshStandardMaterial
              color="#000000"
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
 * 3. ORBITING NODES — small metallic & glowing spheres
 *
 * Attached to the rings' orbital paths.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const NODE_COUNT = 12;

function OrbitingNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  // Pre-calculate random assignments for consistency
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      arr.push({
        ringIdx: i % RINGS.length,
        startAngle: (i / NODE_COUNT) * Math.PI * 2,
        speedMult: 1.2 + (i % 4) * 0.3,
        size: 0.06 + (i % 3) * 0.02,
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

      // Calculate position on the untilted ring
      const x = Math.cos(angle) * ring.radius;
      const z = Math.sin(angle) * ring.radius;

      // Apply the ring's current full rotation (tilt + animated rotation)
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
          {/* Solid polished dark metallic node */}
          <mesh
            ref={(el) => {
              if (el) nodeRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[n.size, 32, 16]} />
            <meshStandardMaterial
              color="#555566" // Dark graphite / silver base
              metalness={1.0}
              roughness={0.3} // Physically plausible metallic roughness
              envMapIntensity={2.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCENE — assembles elements, lighting, and interactions
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
      mainGroupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
      mainGroupRef.current.position.x = Math.sin(t * 0.3) * 0.05;
    }

    // Subtle scroll-based rotation and downward drift
    const scroll = s.scrollProgress;
    if (!reducedMotion && scroll > 0) {
      mainGroupRef.current.rotation.y += scroll * 0.4;
      mainGroupRef.current.position.y -= scroll * 1.2;
    }
  });

  return (
    <>
      {/* ── ENVIRONMENT MAPPING ── */}
      {/* City environment provides high-contrast urban reflections perfect for polished metal */}
      <Environment preset="city" />

      {/* ── CINEMATIC LIGHTING ── */}
      <ambientLight intensity={0.15} />

      {/* Soft Key Light from Top Right */}
      <directionalLight
        position={[8, 10, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      {/* Cool Fill Light from Bottom Left */}
      <directionalLight
        position={[-8, -5, 5]}
        intensity={1.0}
        color="#a0b0d0"
      />

      {/* Strong Blue Rim Light from Behind */}
      <spotLight
        position={[0, 5, -10]}
        intensity={15}
        angle={0.6}
        penumbra={0.5}
        color={BLUE_ACCENT}
        distance={25}
      />

      {/* ── SCENE GROUP ── */}
      <group ref={mainGroupRef} scale={0.82}>
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
 * is absolutely positioned with w-[45%] h-[800px].
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
          // ACESFilmic Tone Mapping is essential for photorealistic metal/glass rendering
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
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
