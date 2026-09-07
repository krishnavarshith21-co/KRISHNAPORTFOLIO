"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Parallax intensity — 0 = none, 0.1 = subtle, 0.3 = noticeable */
  speed?: number;
  className?: string;
}

/**
 * Wraps children with a subtle parallax scroll offset.
 * The element moves slightly slower/faster than the normal scroll speed,
 * creating depth without being distracting.
 */
export function ParallaxLayer({
  children,
  speed = 0.05,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
