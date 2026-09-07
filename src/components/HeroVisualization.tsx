"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
 * PREMIUM INTELLIGENT SYSTEMS CORE
 * A cinematic 3D visualization of an engineering mind:
 * faceted crystal core, orbital domain nodes, data flow,
 * selective connections, and atmospheric depth.
 * ───────────────────────────────────────────────────────────── */

// ── PALETTE ──
const BLUE_PRIMARY = new THREE.Color("#2a5aff");
const BLUE_DEEP = new THREE.Color("#1a3a8a");
const BLUE_SUBTLE = new THREE.Color("#3a6aee");
const WHITE_SOFT = new THREE.Color("#c8d0e0");
const WHITE_PURE = new THREE.Color("#ffffff");

// ── DOMAIN CONFIG ──
interface DomainConfig {
  label: string;
  radius: number;
  tilt: [number, number, number];
  speed: number;
  startAngle: number;
  nodeSize: number;
}

const DOMAINS: DomainConfig[] = [
  { label: "AI", radius: 2.4, tilt: [1.1, 0.2, 0], speed: 0.06, startAngle: 0, nodeSize: 0.16 },
  { label: "VISION", radius: 3.0, tilt: [0.7, 0.5, 0.3], speed: -0.045, startAngle: 1.2, nodeSize: 0.14 },
  { label: "SECURITY", radius: 3.5, tilt: [0.4, -0.4, 0.6], speed: 0.035, startAngle: 2.5, nodeSize: 0.15 },
  { label: "SOFTWARE", radius: 4.0, tilt: [0.9, 0.7, -0.3], speed: -0.025, startAngle: 4.0, nodeSize: 0.13 },
  { label: "SYSTEMS", radius: 4.6, tilt: [0.5, -0.6, 0.5], speed: 0.018, startAngle: 5.2, nodeSize: 0.12 },
];

// ── REDUCED MOTION ──
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. CRYSTAL CORE — faceted icosahedron with glass material
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CrystalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);
  const innerLightRef = useRef<THREE.PointLight>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const t = meshRef.current.rotation.y;
    // Slow rotation
    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.z += delta * 0.02;
    // Breathing pulse
    const breathe = 1 + Math.sin(t * 1.2) * 0.04;
    meshRef.current.scale.setScalar(breathe);
    // Halo pulse — slightly different phase
    if (haloRef.current) {
      const haloScale = 1.6 + Math.sin(t * 0.8 + 0.5) * 0.08;
      haloRef.current.scale.setScalar(haloScale);
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 0.6) * 0.025;
    }
    // Inner light oscillation
    if (innerLightRef.current) {
      innerLightRef.current.intensity = 0.5 + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group>
      {/* Inner point light */}
      <pointLight
        ref={innerLightRef}
        color={BLUE_PRIMARY}
        intensity={0.5}
        distance={6}
        decay={2}
      />

      {/* Faceted crystal */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color="#1a3a6a"
          transmission={0.82}
          roughness={0.05}
          metalness={0.08}
          ior={2.33}
          thickness={0.6}
          transparent
          opacity={0.92}
          envMapIntensity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Soft halo glow */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.55, 24, 16]} />
        <meshBasicMaterial
          color={BLUE_SUBTLE}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 2. ORBITAL PATHS — thin torus rings at different tilts
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitalPaths() {
  return (
    <group>
      {DOMAINS.map((d, i) => {
        const opacity = 0.08 - i * 0.008; // Inner brighter, outer dimmer
        return (
          <mesh key={d.label} rotation={d.tilt as unknown as THREE.Euler}>
            <torusGeometry args={[d.radius, 0.002, 8, 128]} />
            <meshBasicMaterial
              color={i < 2 ? BLUE_SUBTLE : WHITE_SOFT}
              transparent
              opacity={Math.max(opacity, 0.03)}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 3. DOMAIN NODES — 5 glass spheres orbiting on paths
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DomainNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRefs = useRef<THREE.Group[]>([]);
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    DOMAINS.forEach((d, i) => {
      const grp = groupRefs.current[i];
      const node = nodeRefs.current[i];
      if (!grp || !node) return;
      // Orbit angle
      const angle = d.startAngle + t * d.speed;
      node.position.x = Math.cos(angle) * d.radius;
      node.position.z = Math.sin(angle) * d.radius;
      node.position.y = 0;
      // Gentle node pulse
      const pulse = 1 + Math.sin(t * 0.5 + i * 1.3) * 0.06;
      node.scale.setScalar(pulse);
    });
  });

  return (
    <group>
      {DOMAINS.map((d, i) => (
        <group
          key={d.label}
          ref={(el) => {
            if (el) groupRefs.current[i] = el;
          }}
          rotation={d.tilt as unknown as THREE.Euler}
        >
          <mesh
            ref={(el) => {
              if (el) nodeRefs.current[i] = el;
            }}
            position={[
              Math.cos(d.startAngle) * d.radius,
              0,
              Math.sin(d.startAngle) * d.radius,
            ]}
          >
            <sphereGeometry args={[d.nodeSize, 20, 16]} />
            <meshPhysicalMaterial
              color={i < 2 ? "#2a4aaa" : "#3a4a6a"}
              transmission={0.55}
              roughness={0.1}
              metalness={0.05}
              ior={1.8}
              thickness={0.3}
              transparent
              opacity={0.85}
              envMapIntensity={0.4}
              clearcoat={0.8}
              clearcoatRoughness={0.1}
            />
          </mesh>
          {/* Tiny glow behind node */}
          <mesh
            position={[
              Math.cos(d.startAngle) * d.radius,
              0,
              Math.sin(d.startAngle) * d.radius,
            ]}
          >
            <sphereGeometry args={[d.nodeSize * 1.8, 12, 8]} />
            <meshBasicMaterial
              color={BLUE_PRIMARY}
              transparent
              opacity={0.04}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 4. STRUCTURAL NODES — 15 small nodes via InstancedMesh
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const STRUCTURAL_COUNT = 15;

interface StructuralNode {
  orbit: number; // radius
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  speed: number;
  startAngle: number;
  size: number;
  depth: number; // z-offset for depth
}

function StructuralNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodes = useMemo<StructuralNode[]>(() => {
    const arr: StructuralNode[] = [];
    const rng = (min: number, max: number) => min + Math.random() * (max - min);
    for (let i = 0; i < STRUCTURAL_COUNT; i++) {
      arr.push({
        orbit: rng(1.8, 5.2),
        tiltX: rng(-0.8, 1.2),
        tiltY: rng(-0.8, 0.8),
        tiltZ: rng(-0.5, 0.5),
        speed: rng(-0.04, 0.04) * (Math.random() > 0.5 ? 1 : -1),
        startAngle: rng(0, Math.PI * 2),
        size: rng(0.025, 0.06),
        depth: rng(-2, 2),
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = reducedMotion ? 0 : clock.getElapsedTime();
    nodes.forEach((n, i) => {
      const angle = n.startAngle + t * n.speed;
      // Position on tilted orbit
      const x = Math.cos(angle) * n.orbit;
      const z = Math.sin(angle) * n.orbit;
      // Apply tilt rotation manually
      const cosX = Math.cos(n.tiltX);
      const sinX = Math.sin(n.tiltX);
      const cosY = Math.cos(n.tiltY);
      const sinY = Math.sin(n.tiltY);
      // Rotate around X then Y
      const y1 = -z * sinX;
      const z1 = z * cosX;
      const x2 = x * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x * sinY + z1 * cosY;

      dummy.position.set(x2, y2, z2 + n.depth * 0.3);
      // Depth-based sizing
      const depthFactor = THREE.MathUtils.mapLinear(z2 + n.depth * 0.3, -5, 5, 1.3, 0.5);
      dummy.scale.setScalar(n.size * depthFactor);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, STRUCTURAL_COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#3a5a9a"
        transmission={0.4}
        roughness={0.15}
        metalness={0.05}
        ior={1.6}
        thickness={0.2}
        transparent
        opacity={0.6}
        envMapIntensity={0.3}
      />
    </instancedMesh>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 5. CONNECTIONS — selective thin lines
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Connections({ reducedMotion }: { reducedMotion: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null!);

  // Pre-compute connection endpoints based on domain orbital positions
  // We connect: core↔AI, core↔SECURITY, AI↔VISION, VISION↔SOFTWARE,
  // SECURITY↔SYSTEMS, SOFTWARE↔SYSTEMS, core↔SOFTWARE, core↔SYSTEMS
  const connectionPairs = useMemo(() => [
    // [from_domain_index (-1=core), to_domain_index]
    [-1, 0], [-1, 2], [0, 1], [1, 3], [2, 4], [3, 4], [-1, 3], [-1, 4],
  ], []);

  const positionBuffer = useMemo(
    () => new Float32Array(connectionPairs.length * 6), // 2 points × 3 coords
    [connectionPairs]
  );

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = reducedMotion ? 0 : clock.getElapsedTime();

    connectionPairs.forEach((pair, i) => {
      // Compute positions of each endpoint
      const getPos = (idx: number): [number, number, number] => {
        if (idx === -1) return [0, 0, 0]; // core
        const d = DOMAINS[idx];
        const angle = d.startAngle + t * d.speed;
        const x = Math.cos(angle) * d.radius;
        const z = Math.sin(angle) * d.radius;
        // Apply tilt
        const cosX = Math.cos(d.tilt[0]);
        const sinX = Math.sin(d.tilt[0]);
        const cosY = Math.cos(d.tilt[1]);
        const sinY = Math.sin(d.tilt[1]);
        const y1 = -z * sinX;
        const z1 = z * cosX;
        const x2 = x * cosY + z1 * sinY;
        const y2 = y1;
        const z2 = -x * sinY + z1 * cosY;
        return [x2, y2, z2];
      };

      const from = getPos(pair[0]);
      const to = getPos(pair[1]);
      const offset = i * 6;
      positionBuffer[offset] = from[0];
      positionBuffer[offset + 1] = from[1];
      positionBuffer[offset + 2] = from[2];
      positionBuffer[offset + 3] = to[0];
      positionBuffer[offset + 4] = to[1];
      positionBuffer[offset + 5] = to[2];
    });

    const geo = lineRef.current.geometry as THREE.BufferGeometry;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    attr.array.set(positionBuffer);
    attr.needsUpdate = true;

    // Subtle opacity pulse
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.06 + Math.sin(t * 0.3) * 0.02;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionBuffer, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={BLUE_SUBTLE}
        transparent
        opacity={0.07}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 6. DATA FLOW PARTICLES — tiny luminous dots on paths
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DATA_PARTICLE_COUNT = 24;

interface DataParticle {
  domainIndex: number;
  speedMultiplier: number;
  offset: number;
}

function DataFlowParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particles = useMemo<DataParticle[]>(() => {
    const arr: DataParticle[] = [];
    for (let i = 0; i < DATA_PARTICLE_COUNT; i++) {
      arr.push({
        domainIndex: i % DOMAINS.length,
        speedMultiplier: 1.5 + Math.random() * 2.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const positions = useMemo(
    () => new Float32Array(DATA_PARTICLE_COUNT * 3),
    []
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = reducedMotion ? 0 : clock.getElapsedTime();

    particles.forEach((p, i) => {
      const d = DOMAINS[p.domainIndex];
      const angle = p.offset + t * d.speed * p.speedMultiplier;
      const x = Math.cos(angle) * d.radius;
      const z = Math.sin(angle) * d.radius;
      // Apply domain tilt
      const cosX = Math.cos(d.tilt[0]);
      const sinX = Math.sin(d.tilt[0]);
      const cosY = Math.cos(d.tilt[1]);
      const sinY = Math.sin(d.tilt[1]);
      const y1 = -z * sinX;
      const z1 = z * cosX;
      const x2 = x * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x * sinY + z1 * cosY;
      positions[i * 3] = x2;
      positions[i * 3 + 1] = y2;
      positions[i * 3 + 2] = z2;
    });

    const geo = pointsRef.current.geometry as THREE.BufferGeometry;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    attr.array.set(positions);
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={WHITE_PURE}
        size={0.02}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 7. ATMOSPHERE PARTICLES — depth-stratified ambient dust
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ATMO_COUNT = 80;

function AtmosphereParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(ATMO_COUNT * 3);
    const sz = new Float32Array(ATMO_COUNT);
    for (let i = 0; i < ATMO_COUNT; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 16;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      // Depth-based size: closer (positive z) = larger
      const depthNorm = THREE.MathUtils.mapLinear(z, -8, 8, 0.006, 0.025);
      sz[i] = depthNorm;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.006;
    pointsRef.current.rotation.x = t * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={WHITE_SOFT}
        size={0.015}
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 8. MOUSE PARALLAX — smooth scene tilt toward cursor
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useMouseParallax(
  groupRef: React.RefObject<THREE.Group | null>,
  reducedMotion: boolean
) {
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (reducedMotion) return;
      // Normalize to -1..1
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    [reducedMotion]
  );

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return;
    // Smooth lerp
    mouse.current.x += (target.current.x - mouse.current.x) * 0.025;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.025;
    // Apply subtle rotation
    groupRef.current.rotation.y = mouse.current.x * 0.08;
    groupRef.current.rotation.x = mouse.current.y * 0.06;
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 9. IDLE MOTION — gentle floating when mouse is still
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useIdleMotion(
  groupRef: React.RefObject<THREE.Group | null>,
  reducedMotion: boolean
) {
  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    // Very subtle global drift
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.08;
    groupRef.current.position.x = Math.sin(t * 0.1 + 1) * 0.04;
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MAIN SCENE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Scene() {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const reducedMotion = useReducedMotion();

  useMouseParallax(mainGroupRef, reducedMotion);
  useIdleMotion(mainGroupRef, reducedMotion);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.04} />
      <pointLight
        color={BLUE_PRIMARY}
        intensity={0.7}
        position={[2, 3, 4]}
        distance={20}
        decay={2}
      />
      <pointLight
        color={WHITE_PURE}
        intensity={0.25}
        position={[-3, -1, 3]}
        distance={15}
        decay={2}
      />
      {/* Rim light from behind */}
      <pointLight
        color={BLUE_DEEP}
        intensity={0.35}
        position={[0, 0, -6]}
        distance={12}
        decay={2}
      />

      {/* Environment for glass reflections — very low intensity */}
      <Environment preset="night" environmentIntensity={0.15} />

      {/* Main group — parallax + idle motion applied here */}
      <group ref={mainGroupRef}>
        <CrystalCore reducedMotion={reducedMotion} />
        <OrbitalPaths />
        <DomainNodes reducedMotion={reducedMotion} />
        <StructuralNodes reducedMotion={reducedMotion} />
        <Connections reducedMotion={reducedMotion} />
        <DataFlowParticles reducedMotion={reducedMotion} />
        <AtmosphereParticles reducedMotion={reducedMotion} />
      </group>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXPORTED COMPONENT — same interface, premium internals
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroVisualization() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
