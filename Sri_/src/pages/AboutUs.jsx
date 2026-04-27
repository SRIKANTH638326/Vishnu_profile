import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { TechStack } from "../components/sections/TechStack";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";

import portrait from "../assets/hero-portrait.png";
import workspaceImg from "../assets/workspace-services.png";
import skillsImg from "../assets/projects/cyberpunk.png";
import studioImg from "../assets/studio-workspace.png";

export function AboutUs() {

  const [activeSection, setActiveSection] = useState("about");
  const containerRef = useRef(null);
  
  // Scroll-linked tilt effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const rotateYScroll = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateYScroll, { stiffness: 100, damping: 30 });
  
  const getSectionImage = () => {
    switch(activeSection) {
      case "about": return portrait;
      case "services": return workspaceImg;
      case "tech": return workspaceImg;
      case "journey": return studioImg;
      default: return portrait;
    }
  };


  return (
    <div ref={containerRef} style={{ background: "var(--bg)", position: "relative" }}>
      <div className="container" style={{ display: "flex", gap: 60, position: "relative" }}>
        
        {/* Left Column: Content */}
        <div style={{ flex: "1.2", minWidth: 0 }}>
          <SectionWrapper id="about" onInView={() => setActiveSection("about")}>
            <About hideImage={true} />
          </SectionWrapper>
          
          <SectionWrapper id="services" onInView={() => setActiveSection("services")}>
            <Services hideImage={true} />
          </SectionWrapper>

          <SectionWrapper id="tech" onInView={() => setActiveSection("tech")}>
            <TechStack hideImage={true} />
          </SectionWrapper>

          <SectionWrapper id="journey" onInView={() => setActiveSection("journey")}>
            <Experience hideImage={true} />
          </SectionWrapper>

        </div>



        {/* Right Column: Sticky Image */}
        <div style={{ 
          flex: "1", 
          position: "sticky", 
          top: "100px", 
          height: "calc(100vh - 200px)", 
          display: "flex", 
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          perspective: 1200
        }} className="sticky-image-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "100%",
                maxWidth: 320,
                borderRadius: 40,
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                aspectRatio: "0.85",
                transformStyle: "preserve-3d",
                background: "var(--card-bg)",
                rotateX: springRotateX,
                rotateY: springRotateY
              }}
            >
              <img 
                src={getSectionImage()} 
                alt="Section Image" 
                style={{ width: "100%", height: "100%", objectFit: "cover", backfaceVisibility: "hidden" }} 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
            </motion.div>
          </AnimatePresence>
        </div>



      </div>

      <style>{`
        @media (max-width: 992px) {
          .container { flex-direction: column !important; }
          .sticky-image-container { 
            position: relative !important; 
            top: 0 !important; 
            height: auto !important; 
            margin-bottom: 60px;
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}

function SectionWrapper({ children, onInView }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView]);

  return <div ref={ref}>{children}</div>;
}

