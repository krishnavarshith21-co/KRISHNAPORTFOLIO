"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Direction the element enters from */
  direction?: "up" | "down" | "left" | "right";
  /** Distance in px the element travels */
  distance?: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** HTML element to render */
  as?: "div" | "section" | "article" | "header" | "footer" | "span";
}

/* Premium cinematic easing — fast out, gentle deceleration */
const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Trigger when element is 60px into the viewport */
const VIEWPORT_MARGIN = "-60px 0px -60px 0px" as const;

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.8,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });
  const prefersReducedMotion = useReducedMotion();

  /* Reduced motion: show immediately, no transform */
  if (prefersReducedMotion) {
    const Component = as === "div" ? "div" : as;
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      ref={ref}
      initial={{
        opacity: 0,
        x: directionMap[direction].x,
        y: directionMap[direction].y,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : {
              opacity: 0,
              x: directionMap[direction].x,
              y: directionMap[direction].y,
            }
      }
      transition={{
        duration,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
