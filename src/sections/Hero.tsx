"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { socialLinks } from "@/lib/data";

const HeroVisualization = dynamic(
  () => import("@/components/HeroVisualization"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
        {/* Subtle placeholder while JS chunk loads */}
        <div className="relative" style={{ width: 260, height: 260 }}>
          <div
            className="absolute rounded-full"
            style={{
              width: 40,
              height: 40,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full border"
            style={{
              width: 100,
              height: 100,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotateX(68deg)",
              borderColor: "rgba(59,130,246,0.06)",
            }}
          />
          <div
            className="absolute rounded-full border"
            style={{
              width: 160,
              height: 160,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotateX(68deg) rotateZ(30deg)",
              borderColor: "rgba(59,130,246,0.04)",
            }}
          />
        </div>
      </div>
    ),
  }
);

/* Cinematic easing */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroProps {
  /** When true, hero entrance animations begin. Controlled by CinematicIntro. */
  introReady?: boolean;
}

export default function Hero({ introReady = true }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const hasTriggered = useRef(false);

  /* Determine if animations should play */
  const shouldAnimate = introReady;

  useEffect(() => {
    if (shouldAnimate && !hasTriggered.current) {
      controls.start("visible");
      hasTriggered.current = true;
    }
  }, [shouldAnimate, controls]);

  const handleViewportEnter = () => {
    if (prefersReducedMotion || !hasTriggered.current) return;
    controls.start("visible");
  };

  const handleViewportLeave = (entry: IntersectionObserverEntry | null) => {
    if (prefersReducedMotion || !hasTriggered.current) return;
    // Hero can typically only be left by scrolling down (leaving from the top)
    const isLeavingFromTop = entry && entry.boundingClientRect.top < (window.innerHeight || 800) / 2;
    if (isLeavingFromTop) {
      controls.set("hiddenTop");
    } else {
      controls.set("hidden");
    }
  };

  /* Hero entrance variants — cinematic stagger */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.0,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, hiddenTop: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        hiddenTop: { opacity: 0, y: -20, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.0, ease: EASE },
        },
      };

  const nameVariants = prefersReducedMotion
    ? { hidden: {}, hiddenTop: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        hiddenTop: { opacity: 0, y: -20, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.1, ease: EASE },
        },
      };

  const vizVariants = prefersReducedMotion
    ? { hidden: {}, hiddenTop: {}, visible: {} }
    : {
        hidden: { opacity: 0, scale: 0.96, y: 14 },
        hiddenTop: { opacity: 0, scale: 0.96, y: -10 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 1.6, delay: 0.4, ease: EASE },
        },
      };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
      aria-label="Introduction"
    >
      <div className="container-grid relative z-20 w-full flex flex-col justify-center pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative">
          
          {/* Right — 3D Visualization (Strict boundaries to prevent overlap) */}
          <motion.div
            variants={vizVariants}
            initial="hidden"
            animate={controls}
            onViewportEnter={handleViewportEnter}
            onViewportLeave={handleViewportLeave}
            viewport={{ margin: "200px 0px -40px 0px", amount: "some" }}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[45%] max-w-[650px] h-[800px] z-0 pointer-events-auto items-center justify-center"
          >
            <HeroVisualization />
          </motion.div>

          {/* Left — Identity + CTA (Foreground) */}
          <motion.div
            className="lg:col-span-6 flex flex-col z-10 pointer-events-none"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            onViewportEnter={handleViewportEnter}
            onViewportLeave={handleViewportLeave}
            viewport={{ margin: "200px 0px -40px 0px", amount: "some" }}
          >
            {/* Hello, I'm */}
            <motion.div variants={itemVariants}>
              <div className="text-[10px] md:text-[11px] font-semibold tracking-[0.3em] text-[var(--color-text-muted)] uppercase mb-4 pointer-events-auto">
                Hello, I&apos;m
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={nameVariants}>
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tight leading-[0.95] text-[var(--color-text-primary)] mb-6 pointer-events-auto">
                KRISHNA
                <br />
                VARSHITH
              </h1>
            </motion.div>

            {/* Positioning tags */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap items-center gap-3 mb-8 pointer-events-auto">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#4a78d0] uppercase">
                  AI Engineer
                </span>
                <span className="text-[var(--color-text-muted)]">/</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#4a78d0] uppercase">
                  Software Engineer
                </span>
                <span className="text-[var(--color-text-muted)]">/</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#4a78d0] uppercase">
                  Cybersecurity Builder
                </span>
              </div>
            </motion.div>

            {/* Supporting copy */}
            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md mb-12 pointer-events-auto">
                Student engineer building intelligent systems, security-focused software and practical AI applications.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center h-12 px-8 bg-white text-black text-[10px] font-bold tracking-[0.2em] hover:bg-gray-200 transition-colors"
                >
                  VIEW MY WORK ↗
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-6 border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] hover:bg-white/5 transition-colors"
                >
                  RESUME ↗
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-6 border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] hover:bg-white/5 transition-colors"
                >
                  GITHUB ↗
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-6 border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] hover:bg-white/5 transition-colors"
                >
                  LINKEDIN ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Layout Elements */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          hiddenTop: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1.2, delay: 1.0, ease: EASE } }
        }}
        className="absolute bottom-12 left-0 right-0 container-grid flex justify-between items-end z-20 pointer-events-none hidden md:flex"
      >
        {/* Left: Scroll to explore */}
        <div className="flex items-center gap-4">
          <div className="w-[1px] h-12 bg-white/20"></div>
          <span className="text-[9px] font-semibold tracking-[0.3em] text-white/40 uppercase">
            Scroll to explore
          </span>
        </div>
        
        {/* Right: Ideas -> Systems -> Impact */}
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-semibold tracking-[0.3em] text-white/60 uppercase">
            IDEAS → SYSTEMS → IMPACT
          </span>
          <div className="h-[1px] w-24 bg-white/20"></div>
        </div>
      </motion.div>
    </section>
  );
}

