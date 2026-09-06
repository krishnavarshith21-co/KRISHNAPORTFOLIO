"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't show on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onHoverIn = (e: Event) => {
      const el = e.target as HTMLElement;
      const cursorLabel = el.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorLabel) setLabel(cursorLabel);
    };

    const onHoverOut = () => setLabel("");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Re-attach listeners on DOM changes
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll("[data-cursor]");
      newElements.forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Dot */}
      <div
        className="rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: label ? 80 : 8,
          height: label ? 80 : 8,
          marginLeft: label ? -40 : -4,
          marginTop: label ? -40 : -4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <span
            ref={labelRef}
            className="text-[10px] font-medium tracking-[0.15em] uppercase text-black"
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
