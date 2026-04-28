import { CaseStudies } from "../components/sections/CaseStudies";
import { Projects } from "../components/sections/Projects";
import { ProjectGallery } from "../components/sections/ProjectGallery";
import { Reveal } from "../components/common/Reveal";

export function ProjectsPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero Section for Projects Page */}
      <div style={{ 
        paddingTop: "180px", 
        paddingBottom: "80px",
        textAlign: "center"
      }}>
        <div className="container">
          <Reveal>
            <h1 style={{ 
              fontFamily: "var(--font-heading)", 
              fontSize: "clamp(60px, 10vw, 120px)", 
              fontWeight: 800, 
              lineHeight: 0.9, 
              textTransform: "uppercase", 
              marginBottom: "24px"
            }}>
              Our <span className="shimmer-text">Works</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ 
              color: "var(--secondary-text)", 
              maxWidth: "600px", 
              margin: "0 auto",
              fontSize: "clamp(16px, 1.2vw, 20px)",
              lineHeight: 1.6
            }}>
              A curated collection of digital experiences, branding, and problem-solving through design and code.
            </p>
          </Reveal>
        </div>
      </div>

      <Projects />
      <ProjectGallery />
      <CaseStudies />
    </div>
  );
}
