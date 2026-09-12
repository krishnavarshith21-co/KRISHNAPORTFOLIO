"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#050608]/85 backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="wide-grid flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            className="text-[13px] font-black tracking-[0.25em] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            KV
          </a>

          {/* Desktop Nav — Center */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[9px] font-medium tracking-[0.16em] px-3 py-2 transition-colors ${
                  activeSection === link.href
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[1px] bg-[var(--color-accent)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-medium tracking-[0.14em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              GITHUB
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-medium tracking-[0.14em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="#contact"
              className="text-[9px] font-bold tracking-[0.14em] text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors border border-[var(--color-border-accent)] px-4 py-1.5 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
            >
              LET&apos;S TALK
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`w-5 h-[1.5px] bg-[var(--color-text-primary)] transition-transform ${
                mobileOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-[var(--color-text-primary)] transition-transform ${
                mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-[var(--color-bg-primary)] flex flex-col justify-center px-8"
          >
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="block text-2xl font-bold tracking-wider text-[var(--color-text-primary)]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-16 flex flex-col gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.15em] text-[var(--color-text-muted)]"
              >
                GITHUB ↗
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.15em] text-[var(--color-text-muted)]"
              >
                LINKEDIN ↗
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-accent)]"
              >
                LET&apos;S TALK →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
