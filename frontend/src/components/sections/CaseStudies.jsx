import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";
import { CASE_STUDIES } from "../../data/portfolioData";
import { FiArrowUpRight } from "react-icons/fi";
import designTrendsImg from "../../assets/insights/design-trends.png";
import workflowImg from "../../assets/insights/workflow.png";

const imageMap = {
    "design-trends.png": designTrendsImg,
    "workflow.png": workflowImg
};

export function CaseStudies() {
    return (
        <section id="Case Studies" className="section-pad" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
            <GlowBlob style={{ width: 600, height: 400, background: "rgba(196, 255, 107, 0.03)", top: "10%", left: "-10%" }} />
            
            <div className="container">
                <div style={{ marginBottom: 64, maxWidth: 650 }}>
                    <Reveal>
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: "clamp(48px, 7vw, 90px)", 
                            fontWeight: 700, 
                            lineHeight: 1, 
                            textTransform: "uppercase", 
                            color: "var(--text)", 
                            marginBottom: 24 
                        }}>
                            Design Insights & Ideas
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p style={{ color: "var(--secondary-text)", fontSize: "clamp(16px, 1.1vw, 18px)", lineHeight: 1.6 }}>
                            From design trends to creative processes, these articles offer insights to help you elevate your craft, solve challenges, and spark new ideas for your projects.
                        </p>
                    </Reveal>
                </div>

                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                    gap: 40 
                }}>
                    {CASE_STUDIES.map((cs, i) => (
                        <Reveal key={cs.title} delay={i * 0.15}>
                            <div style={{ 
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                            }} className="insight-card">
                                {/* Image Container */}
                                <div style={{ 
                                    position: "relative", 
                                    borderRadius: 32, 
                                    overflow: "hidden", 
                                    aspectRatio: "4/3",
                                    marginBottom: 24,
                                    background: "var(--card-bg)"
                                }}>
                                    <img 
                                        src={imageMap[cs.image]} 
                                        alt={cs.title} 
                                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                                        className="insight-img"
                                    />
                                    
                                    {/* Floating Arrow Icon (only visible on hover via CSS) */}
                                    <div className="arrow-float" style={{
                                        position: "absolute",
                                        bottom: 24,
                                        left: "50%",
                                        transform: "translateX(-50%) translateY(100px)",
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        background: "var(--accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#000",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                                        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                                    }}>
                                        <FiArrowUpRight size={32} />
                                    </div>
                                </div>

                                {/* Meta */}
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                                    <span style={{ 
                                        fontSize: 12, 
                                        fontWeight: 700, 
                                        textTransform: "uppercase", 
                                        padding: "6px 16px", 
                                        borderRadius: 99, 
                                        background: cs.tag === "Insights" ? "var(--accent)" : "transparent",
                                        color: cs.tag === "Insights" ? "#000" : "var(--text)",
                                        border: cs.tag === "Insights" ? "none" : "1px solid var(--border)",
                                        letterSpacing: "0.05em"
                                    }}>
                                        {cs.tag}
                                    </span>
                                    <span style={{ color: "var(--secondary-text)", fontSize: 13, fontWeight: 500 }}>{cs.date}</span>
                                </div>

                                {/* Content */}
                                <h3 style={{ 
                                    fontFamily: "var(--font-heading)", 
                                    fontSize: "clamp(24px, 2.5vw, 36px)", 
                                    fontWeight: 700, 
                                    textTransform: "uppercase", 
                                    color: "var(--text)", 
                                    marginBottom: 12,
                                    lineHeight: 1.1
                                }}>
                                    {cs.title}
                                </h3>
                                <p style={{ color: "var(--secondary-text)", fontSize: 14, lineHeight: 1.6, maxWidth: "90%" }}>
                                    {cs.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
                    <Reveal delay={0.4}>
                        <button style={{
                            background: "transparent",
                            border: "1px solid var(--accent)",
                            borderRadius: 100,
                            padding: "16px 40px",
                            color: "var(--accent)",
                            fontFamily: "var(--font-heading)",
                            fontSize: 20,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        }} className="browse-all-btn">
                            Browse All Insights
                        </button>
                    </Reveal>
                </div>
            </div>

            <style>{`
                .insight-card:hover .insight-img {
                    transform: scale(1.05);
                }
                .insight-card:hover .arrow-float {
                    transform: translateX(-50%) translateY(0) !important;
                }
                .browse-all-btn:hover {
                    background: var(--accent);
                    color: #000;
                    box-shadow: 0 0 30px rgba(196, 255, 107, 0.3);
                }
            `}</style>
        </section>
    );
}
