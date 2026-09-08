"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import SelectedWork from "@/sections/SelectedWork";
import Skills from "@/sections/Skills";
import Education from "@/sections/Education";
import Journey from "@/sections/Journey";
import Credentials from "@/sections/Credentials";
import BuiltInPublic from "@/sections/BuiltInPublic";
import CurrentlyBuilding from "@/sections/CurrentlyBuilding";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const CinematicIntro = dynamic(
  () => import("@/components/CinematicIntro"),
  { ssr: false }
);

export default function Home() {
  const [introReady, setIntroReady] = useState(false);

  const handleHeroReveal = useCallback(() => {
    setIntroReady(true);
  }, []);

  return (
    <>
      <CinematicIntro onHeroReveal={handleHeroReveal} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero introReady={introReady} />
        <About />
        <SelectedWork />
        <Skills />
        <Education />
        <Journey />
        <Credentials />
        <BuiltInPublic />
        <CurrentlyBuilding />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
