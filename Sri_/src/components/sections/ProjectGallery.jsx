import { motion } from "framer-motion";
import { PROJECTS } from "../../data/portfolioData";
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { Reveal } from "../common/Reveal";

// Import images
import festivalImg from "../../assets/projects/festival.png";
import abstractImg from "../../assets/projects/abstract.png";
import cyberpunkImg from "../../assets/projects/cyberpunk.png";
import packagingImg from "../../assets/projects/packaging.png";

const imageMap = {
    "festival.png": festivalImg,
    "abstract.png": abstractImg,
    "cyberpunk.png": cyberpunkImg,
    "packaging.png": packagingImg
};

export function ProjectGallery() {
    // Show some related projects (excluding the main featured ones or just a selection)
    const relatedProjects = PROJECTS.slice(0, 3); 

    return (
        <section style={{ padding: "100px 0", background: "var(--bg)" }}>
            <div className="container">
                <Reveal>
                    <h2 style={{ 
                        fontFamily: "var(--font-heading)", 
                        fontSize: "clamp(32px, 4vw, 48px)", 
                        fontWeight: 700, 
                        marginBottom: "40px",
                        color: "var(--text)",
                        textTransform: "uppercase"
                    }}>
                        More <span className="shimmer-text">Projects</span>
                    </h2>
                </Reveal>

                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
                    gap: "32px" 
                }}>
                    {PROJECTS.map((project, i) => (
                        <Reveal key={project.title} delay={i * 0.1}>
                            <motion.div 
                                whileHover={{ y: -10 }}
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    height: "100%"
                                }}
                            >
                                <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                                    <img 
                                        src={imageMap[project.image]} 
                                        alt={project.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                                        display: "flex",
                                        alignItems: "flex-end",
                                        padding: "20px"
                                    }}>
                                        <span style={{ 
                                            background: "var(--accent)", 
                                            color: "#000", 
                                            padding: "4px 12px", 
                                            borderRadius: "100px", 
                                            fontSize: "11px", 
                                            fontWeight: "800",
                                            textTransform: "uppercase"
                                        }}>
                                            {project.tag}
                                        </span>
                                    </div>
                                </div>
                                
                                <div style={{ padding: "24px" }}>
                                    <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "12px", color: "var(--text)" }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ color: "var(--secondary-text)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "24px" }}>
                                        {project.desc}
                                    </p>
                                    
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", gap: "16px" }}>
                                            <FiGithub size={20} style={{ color: "var(--secondary-text)", cursor: "pointer" }} />
                                            <FiExternalLink size={20} style={{ color: "var(--secondary-text)", cursor: "pointer" }} />
                                        </div>
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "var(--accent)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Details <FiArrowRight />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
