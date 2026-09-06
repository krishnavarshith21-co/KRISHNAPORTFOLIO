"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            ? "bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-grid flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-sm font-black tracking-[0.2em] text-[var(--color-text-primary)]">
            KV
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] font-medium tracking-[0.15em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: social + resume */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              GITHUB
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-medium tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              RESUME ↗
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
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-accent)]"
              >
                RESUME ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
