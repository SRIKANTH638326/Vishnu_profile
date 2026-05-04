import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar, FiBriefcase, FiTag } from "react-icons/fi";
import { adminService } from "../services/adminService";
import { Reveal } from "../components/common/Reveal";
import { useWindowSize } from "../hooks/useWindowSize";

export function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await adminService.getProjects();
        const found = data.find(p => (p._id || p.id) === id);
        setProject(found);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}><div className="loader"></div></div>;
  if (!project) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}><h1>Project not found</h1></div>;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.image || "https://via.placeholder.com/1920x1080"} 
          alt={project.title} 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 5% 80px"
        }}>
          <div className="container">
            <Link to="/projects" style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px", 
              color: "var(--accent)", 
              textDecoration: "none",
              marginBottom: "30px",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase"
            }}>
              <FiArrowLeft /> Back to Projects
            </Link>
            <Reveal>
              <h1 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "clamp(48px, 8vw, 100px)", 
                fontWeight: 800, 
                lineHeight: 0.9, 
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                {project.title.split(' ').map((word, i) => (
                  <span key={i} style={{ display: "inline-block", marginRight: "15px" }}>
                    {i % 2 === 1 ? <span className="shimmer-text">{word}</span> : word}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "700px", lineHeight: 1.6, marginBottom: "40px" }}>
                {project.description}
              </p>
            </Reveal>

            {project.link && (
              <Reveal delay={0.3}>
                <motion.a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px 32px",
                    background: "var(--accent)",
                    color: "#000",
                    borderRadius: "100px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: "0 20px 40px rgba(196, 255, 107, 0.2)"
                  }}
                >
                  Visit Live Project <FiExternalLink />
                </motion.a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Meta Info Bar */}
      <section style={{ padding: "60px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
            <MetaItem icon={<FiCalendar />} label="Year" value={project.year || "2025"} />
            <MetaItem icon={<FiTag />} label="Industry" value={project.industry || "Design"} />
            <MetaItem icon={<FiBriefcase />} label="Client" value={project.client || "Self Project"} />
            <MetaItem icon={<FiClock />} label="Duration" value={project.duration || "N/A"} />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ padding: "100px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
          
          {/* Problem Section */}
          <div style={{ display: "grid", gridTemplateColumns: width < 992 ? "1fr" : "300px 1fr", gap: "40px" }}>
            <h2 style={sectionTitleStyle}>The <span className="shimmer-text">Problem</span></h2>
            <ContentBlock content={project.problem} />
          </div>
          
          {/* Large Image Break */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              width: "100%", 
              height: width < 768 ? "300px" : "600px", 
              borderRadius: "40px", 
              overflow: "hidden", 
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
            }}
          >
             <img src={project.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Project visual" />
          </motion.div>

          {/* Solution & Challenge Grid */}
          <div style={{ display: "grid", gridTemplateColumns: width < 992 ? "1fr" : "1fr 1fr", gap: "40px" }}>
            <div style={bentoCardStyle}>
              <h2 style={cardTitleStyle}>The Solution</h2>
              <ContentBlock content={project.solution} />
            </div>
            <div style={bentoCardStyle}>
              <h2 style={cardTitleStyle}>The Challenge</h2>
              <ContentBlock content={project.challenge} />
            </div>
          </div>

          {/* Summary Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ 
              background: "rgba(196, 255, 107, 0.05)", 
              padding: width < 768 ? "40px 30px" : "80px 60px", 
              borderRadius: "40px", 
              textAlign: "center",
              border: "1px solid rgba(196, 255, 107, 0.1)"
            }}
          >
            <h2 style={{ ...sectionTitleStyle, marginBottom: "30px" }}>Project <span className="shimmer-text">Summary</span></h2>
            <p style={{ 
              fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", 
              lineHeight: 1.7, 
              color: "rgba(255,255,255,0.8)", 
              maxWidth: "900px", 
              margin: "0 auto",
              fontWeight: "400"
            }}>
              {project.summary}
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

function MetaItem({ icon, label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase" }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: "1.1rem", fontWeight: "500" }}>{value}</div>
    </div>
  );
}

function ContentBlock({ content }) {
  if (!content) return <p style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>No content provided for this section.</p>;
  return (
    <p style={{ 
      fontSize: "1.15rem", 
      lineHeight: 1.8, 
      color: "rgba(255,255,255,0.7)", 
      whiteSpace: "pre-line" 
    }}>
      {content}
    </p>
  );
}

const sectionTitleStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "2.5rem",
  fontWeight: "700",
  textTransform: "uppercase",
  lineHeight: 1,
  color: "var(--text)"
};

const cardTitleStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "1.5rem",
  fontWeight: "700",
  textTransform: "uppercase",
  marginBottom: "20px",
  color: "var(--accent)"
};

const bentoCardStyle = {
  background: "rgba(255, 255, 255, 0.02)",
  padding: "40px",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "0.3s"
};
