"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Primary horizontal entry direction (if applicable) */
  direction?: "up" | "down" | "left" | "right";
  /** Base distance in px the element travels */
  distance?: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** HTML element to render */
  as?: "div" | "section" | "article" | "header" | "footer" | "span" | "p" | "h1" | "h2" | "h3";
}

/* Premium cinematic easing — fast out, gentle deceleration */
const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 25,
  duration = 0.8,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  // If a specific horizontal direction is provided, we lock the X axis.
  const isHorizontal = direction === "left" || direction === "right";
  const customXOffset = direction === "left" ? distance : direction === "right" ? -distance : 0;
  
  // Default Y starting state if it hasn't left the viewport yet (e.g. initial load)
  const initialY = isHorizontal ? 0 : distance;

  // On mount, set initial state so it's hidden before JS executes onViewportEnter
  useEffect(() => {
    if (prefersReducedMotion) return;
    controls.set({ opacity: 0, x: customXOffset, y: initialY });
  }, [controls, customXOffset, initialY, prefersReducedMotion]);

  const handleViewportEnter = () => {
    if (prefersReducedMotion) return;
    
    // When entering, always animate to natural position (x:0, y:0)
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: CINEMATIC_EASE },
    });
  };

  const handleViewportLeave = (entry: IntersectionObserverEntry | null) => {
    if (prefersReducedMotion) return;
    
    let leaveY = 0;
    if (!isHorizontal) {
      // Determine if we left via the top or bottom of the screen
      // window.innerHeight fallback ensures we don't crash in weird edge cases
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      const isLeavingFromTop = entry && entry.boundingClientRect.top < viewportHeight / 2;
      
      // If user scrolls down -> element leaves from top -> next time they scroll up it enters from top (y: -20)
      // If user scrolls up -> element leaves from bottom -> next time they scroll down it enters from bottom (y: distance)
      leaveY = isLeavingFromTop ? -20 : distance;
    }

    // Invisibly reset the position so it's ready for the next entrance
    controls.set({
      opacity: 0,
      x: customXOffset,
      y: leaveY,
    });
  };

  if (prefersReducedMotion) {
    const Component = as as React.ElementType;
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = (motion as any)[as];

  return (
    <MotionComponent
      ref={ref}
      // initial state prevents flicker before framer motion takes over
      initial={{ opacity: 0, x: customXOffset, y: initialY }}
      animate={controls}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ margin: "200px 0px -40px 0px", amount: "some" }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
