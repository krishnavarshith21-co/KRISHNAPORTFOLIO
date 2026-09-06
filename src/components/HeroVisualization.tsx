"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// ════════════════════════════════════════════════════════
// CONFIGURATION & COLORS
// ════════════════════════════════════════════════════════

const COLOR_GRAPHITE = new THREE.Color("#0a0a0c");
const COLOR_SILVER = new THREE.Color("#8892b0");
const COLOR_BLUE_ACCENT = new THREE.Color("#3b82f6"); // Electric blue
const COLOR_BLUE_GLOW = new THREE.Color("#1e3a8a"); // Deep navy blue

const RING_CONFIG = [
  { radius: 1.8, thickness: 0.04, tiltX: 0.8, tiltZ: 0.2, speed: 0.05 },
  { radius: 2.6, thickness: 0.06, tiltX: -0.5, tiltZ: -0.4, speed: -0.03 },
  { radius: 3.4, thickness: 0.02, tiltX: 0.2, tiltZ: 0.7, speed: 0.02 },
];

const SATELLITES = [
  { ringIndex: 0, size: 0.05, speed: 0.5, offset: 0 },
  { ringIndex: 0, size: 0.03, speed: 0.5, offset: Math.PI },
  { ringIndex: 1, size: 0.06, speed: -0.3, offset: Math.PI / 2 },
  { ringIndex: 1, size: 0.04, speed: -0.3, offset: -Math.PI / 2 },
  { ringIndex: 2, size: 0.08, speed: 0.2, offset: 0 },
];

// ════════════════════════════════════════════════════════
// 3D SCENE
// ════════════════════════════════════════════════════════

function PremiumEngineeringCore({ 
  reducedMotion, 
  isHovered,
  scrollY 
}: { 
  reducedMotion: boolean; 
  isHovered: boolean;
  scrollY: number;
}) {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const parallaxGroupRef = useRef<THREE.Group>(null!);
  
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerGlowRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group[]>([]);
  const satellitesRef = useRef<THREE.Mesh[]>([]);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const hoverInterp = useRef(0);
  
  const isCoarse = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches,
    []
  );

  // ── Geometries ──
  const coreGeo = useMemo(() => new THREE.OctahedronGeometry(1.0, 0), []);
  const innerGlowGeo = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), []);
  const satelliteGeo = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);
  
  const ringGeos = useMemo(() => {
    return RING_CONFIG.map(config => new THREE.TorusGeometry(config.radius, config.thickness, 32, 128));
  }, []);

  // ── Materials ──
  // The outer glass of the core
  const coreMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: COLOR_GRAPHITE,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.5,
    thickness: 1.5,
    ior: 1.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  }), []);

  // The inner glowing energy source
  const innerGlowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLOR_BLUE_GLOW,
    emissive: COLOR_BLUE_ACCENT,
    emissiveIntensity: 1.0, // Will be modulated
    roughness: 0.4,
    metalness: 0.8
  }), []);

  // Highly reflective dark metallic rings
  const ringMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#050505", // Very dark base
    metalness: 1.0,   // Pure metal
    roughness: 0.15,  // Slightly brushed
    envMapIntensity: 2.0 // Strong reflections
  }), []);

  const satelliteMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLOR_SILVER,
    metalness: 1.0,
    roughness: 0.2,
    emissive: COLOR_BLUE_ACCENT,
    emissiveIntensity: 0.2
  }), []);

  // ── Interaction Tracking ──
  useEffect(() => {
    if (isCoarse) return;
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isCoarse]);

  // ── Animation Loop ──
  useFrame((state, delta) => {
    if (!mainGroupRef.current || !parallaxGroupRef.current) return;
    
    // Clamp delta to prevent huge jumps if tab is inactive
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    // Hover Interpolation (Smooth transition)
    const targetHover = isHovered ? 1 : 0;
    hoverInterp.current = THREE.MathUtils.lerp(hoverInterp.current, targetHover, dt * 5.0);

    // 1. MOUSE PARALLAX (Premium Inertial)
    if (!isCoarse) {
      mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.03);
      mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.03);
      
      // Base rotation (4-7 degrees) + extra rotation when hovered
      const maxTilt = 0.07 + (hoverInterp.current * 0.03); 
      parallaxGroupRef.current.rotation.x = mouseRef.current.y * maxTilt;
      parallaxGroupRef.current.rotation.y = mouseRef.current.x * maxTilt;
    }

    // 2. SCROLL PARALLAX
    // Scroll subtly pushes the object down and fades it slightly by moving it back in Z
    const scrollFactor = Math.min(scrollY / 1000, 1.0); // 0 to 1
    mainGroupRef.current.position.y = -scrollFactor * 2.0;
    mainGroupRef.current.position.z = -scrollFactor * 3.0;
    mainGroupRef.current.rotation.x = scrollFactor * 0.5;

    // Stop continuous rotation if reduced motion
    if (reducedMotion) return;

    // 3. IDLE ANIMATIONS (Slow, continuous, physical)
    
    // Core Rotation
    if (coreRef.current && innerGlowRef.current) {
      coreRef.current.rotation.y += dt * 0.05;
      coreRef.current.rotation.x += dt * 0.02;
      innerGlowRef.current.rotation.y -= dt * 0.08;
      
      // Floating movement (Sine wave on Y)
      mainGroupRef.current.position.y += Math.sin(time * 0.5) * 0.001;
      
      // Modulate internal light pulse based on time and hover
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.2;
      innerGlowMaterial.emissiveIntensity = 0.8 * pulse + (hoverInterp.current * 1.5);
      
      // Expand core slightly on hover
      const scale = 1.0 + (hoverInterp.current * 0.03);
      coreRef.current.scale.setScalar(scale);
    }

    // Rings Rotation
    ringsRef.current.forEach((ring, idx) => {
      if (ring) {
        ring.rotation.y += dt * RING_CONFIG[idx].speed;
        // Subtly separate rings further on hover to increase volume
        const zSeparation = hoverInterp.current * 0.2 * (idx % 2 === 0 ? 1 : -1);
        ring.position.z = THREE.MathUtils.lerp(ring.position.z, zSeparation, dt * 2.0);
      }
    });

    // Satellites orbiting along rings
    satellitesRef.current.forEach((sat, idx) => {
      if (sat) {
        const config = SATELLITES[idx];
        const ringConfig = RING_CONFIG[config.ringIndex];
        // Calculate position along the ring
        const angle = (time * config.speed) + config.offset;
        sat.position.x = Math.cos(angle) * ringConfig.radius;
        sat.position.y = Math.sin(angle) * ringConfig.radius;
        // Spin the satellite itself
        sat.rotation.x += dt;
        sat.rotation.y += dt;
      }
    });
  });

  return (
    <group ref={mainGroupRef}>
      {/* Fog for depth fading */}
      <fog attach="fog" args={["#000000", 5, 15]} />

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.1} />
      
      {/* Soft cool key light from top left */}
      <directionalLight position={[-8, 10, 5]} color="#ffffff" intensity={1.5} />
      
      {/* Subtle blue rim light from bottom right */}
      <directionalLight position={[8, -10, -5]} color={COLOR_BLUE_ACCENT} intensity={1.0} />

      {/* IBL (Image Based Lighting) for ultra-realistic metallic reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Internal Point Light to illuminate the core from within */}
      <pointLight position={[0, 0, 0]} color={COLOR_BLUE_ACCENT} intensity={isHovered ? 3.0 : 1.5} distance={5} />

      {/* The Parallax Group that responds to the mouse */}
      <group ref={parallaxGroupRef}>
        
        {/* Central Core Group */}
        <group>
          {/* Inner Glowing Energy */}
          <mesh ref={innerGlowRef} geometry={innerGlowGeo} material={innerGlowMaterial} />
          {/* Outer Faceted Glass */}
          <mesh ref={coreRef} geometry={coreGeo} material={coreMaterial} />
          {/* Very subtle wireframe overlay for precision detail */}
          <mesh geometry={coreGeo}>
            <meshBasicMaterial color={COLOR_SILVER} wireframe transparent opacity={0.03} />
          </mesh>
        </group>

        {/* Orbital Rings */}
        {RING_CONFIG.map((config, idx) => (
          <group 
            key={idx} 
            ref={(el) => { if (el) ringsRef.current[idx] = el; }}
            rotation={[config.tiltX, 0, config.tiltZ]}
          >
            {/* The actual metallic ring */}
            <mesh geometry={ringGeos[idx]} material={ringMaterial} />
            
            {/* Satellites belonging to this ring */}
            {SATELLITES.filter(s => s.ringIndex === idx).map((satConfig, sIdx) => {
              // Find global index for ref
              const globalIdx = SATELLITES.findIndex(s => s === satConfig);
              return (
                <mesh 
                  key={sIdx}
                  ref={(el) => { if (el) satellitesRef.current[globalIdx] = el; }}
                  geometry={satelliteGeo}
                  material={satelliteMaterial}
                  scale={satConfig.size}
                />
              );
            })}
          </group>
        ))}

      </group>
    </group>
  );
}

// ════════════════════════════════════════════════════════
// EXPORTED WRAPPER (Handles UI state)
// ════════════════════════════════════════════════════════

export default function HeroVisualization() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Initialize media query and scroll listener
  useEffect(() => {
    setMounted(true);
    
    // Reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", motionHandler);
    
    // Scroll tracking for cinematic parallax
    const scrollHandler = () => {
      // Use requestAnimationFrame for performance
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    
    return () => {
      mq.removeEventListener("change", motionHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center cursor-crosshair transition-opacity duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        // Generous mask to fade edges naturally into the black background
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)', 
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        // Fade out entirely if scrolled far past hero
        opacity: Math.max(1 - (scrollY / 800), 0)
      }}
    >
      <Canvas
        dpr={[1, 2]} // Crisp rendering but capped at 2x for performance
        camera={{ position: [0, 0, 9.0], fov: 40 }} // Tighter FOV for less perspective distortion
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <PremiumEngineeringCore 
          reducedMotion={reducedMotion} 
          isHovered={isHovered}
          scrollY={scrollY}
        />
      </Canvas>
    </div>
  );
}
