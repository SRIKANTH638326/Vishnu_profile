import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Cursor } from "./components/common/Cursor";
import { Particles } from "./components/common/Particles";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
// import { MarqueeStrip } from "./components/sections/MarqueeStrip";
import { Skills } from "./components/sections/Skills";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Projects } from "./components/sections/Projects";
import { Services } from "./components/sections/Services";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import { ThemeToggle } from "./components/common/ThemeToggle";
import { useScrollSpy } from "./hooks/useScrollSpy";
import "./styles/global.css";
import { Testimonials } from "./components/sections/Testimonials";

export default function App() {
  const active = useScrollSpy();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Cursor />
      <Particles count={24} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active={active} />
        <Hero />
        <About />
        <Services />
        <Skills />
        {/* <MarqueeStrip /> */}
        <CaseStudies />
        <Projects />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
        
        {/* Fixed Theme Toggle */}
        <div style={{ 
          position: "fixed", 
          bottom: "32px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          zIndex: 9999 
        }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
}
