import { Cursor } from "./components/common/Cursor";
import { Particles } from "./components/common/Particles";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { MarqueeStrip } from "./components/sections/MarqueeStrip";
import { Skills } from "./components/sections/Skills";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Projects } from "./components/sections/Projects";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";
import { useScrollSpy } from "./hooks/useScrollSpy";
import "./styles/global.css";

export default function App() {
  const active = useScrollSpy();
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#050509", color: "#fff" }}>
      <Cursor />
      <Particles count={48} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active={active} />
        <Hero />
        <About />
        <MarqueeStrip />
        <Skills />
        <CaseStudies />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
