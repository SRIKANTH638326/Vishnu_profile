import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "../../data/portfolioData";
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

function ProjectCard({ p, i, progress, range, targetScale }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="project-card-sticky-wrapper">
            <motion.div 
                style={{ scale }}
                className="project-card-inner"
            >
                {/* Background Image */}
                <div className="project-card-image-wrap">
                    <motion.div style={{ scale: imageScale, height: "100%", width: "100%" }}>
                        <img 
                            src={imageMap[p.image]} 
                            alt={p.title} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                    </motion.div>
                </div>

                {/* Overlay */}
                <div className="project-card-overlay">
                    <span className="project-card-tag">{p.tag}</span>

                    <h3 className="project-card-title">{p.title}</h3>

                    <p className="project-card-desc">{p.desc}</p>
                </div>
            </motion.div>
        </div>
    );
}

export function Projects() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section id="Projects" ref={container} style={{ position: "relative", background: "var(--bg)" }}>
            <div className="container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <div style={{ marginBottom: "60px" }}>
                    <h2 style={{ 
                        fontFamily: "var(--font-heading)", 
                        fontSize: "clamp(48px, 7vw, 90px)", 
                        fontWeight: 700, 
                        lineHeight: 1, 
                        textTransform: "uppercase", 
                        color: "var(--text)",
                        marginBottom: "16px"
                    }}>
                        Featured <span className="shimmer-text">Projects</span>
                    </h2>
                    <p style={{ 
                        color: "var(--secondary-text)", 
                        maxWidth: "500px", 
                        fontSize: "clamp(16px, 1.2vw, 18px)", 
                        lineHeight: 1.6
                    }}>
                        These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.
                    </p>
                </div>

                <div className="projects-stack-container">
                    {PROJECTS.map((p, i) => {
                        const targetScale = 1 - ((PROJECTS.length - i) * 0.04);
                        return <ProjectCard 
                            key={p.title} 
                            p={p} 
                            i={i} 
                            progress={scrollYProgress} 
                            range={[i * 0.25, 1]} 
                            targetScale={targetScale}
                        />
                    })}
                </div>
            </div>

            <style>{`
                .projects-stack-container {
                    position: relative;
                }
                .project-card-sticky-wrapper {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: sticky;
                    top: 0;
                }
                .project-card-inner {
                    position: relative;
                    height: 550px;
                    width: 100%;
                    max-width: 1100px;
                    border-radius: 40px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: #111;
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);
                }
                .project-card-image-wrap {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                .project-card-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    text-align: center;
                }
                .project-card-tag {
                    background: var(--accent);
                    color: #000;
                    padding: 8px 20px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    letter-spacing: 0.1em;
                }
                .project-card-title {
                    font-family: var(--font-heading);
                    font-size: clamp(36px, 5vw, 72px);
                    font-weight: 700;
                    line-height: 1;
                    text-transform: uppercase;
                    color: #fff;
                    max-width: 900px;
                    margin-bottom: 20px;
                }
                .project-card-desc {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: clamp(14px, 1.1vw, 17px);
                    max-width: 550px;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .project-card-inner {
                        height: 450px;
                        border-radius: 24px;
                    }
                    .project-card-sticky-wrapper {
                        height: 80vh;
                    }
                }
            `}</style>
        </section>
    );
}
