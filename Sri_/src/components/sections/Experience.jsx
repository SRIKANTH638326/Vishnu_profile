import { motion } from "framer-motion";

const EXPERIENCES = [
    {
        role: "CREATIVE ART DIRECTOR",
        company: "NovaWorks Agency",
        period: "2023 - Present"
    },
    {
        role: "SENIOR UI/UX DESIGNER",
        company: "BrightLabs Digital",
        period: "2020 - 2023"
    },
    {
        role: "UI DESIGNER",
        company: "PixelForge Interactive",
        period: "2018 - 2020"
    },
    {
        role: "GRAPHIC DESIGNER",
        company: "Creative Studio 101",
        period: "2016 - 2018"
    }
];

export function Experience({ hideImage = false }) {
    return (
        <section id="Experience" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container">
                <div style={{ maxWidth: hideImage ? "800px" : "1100px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: 60 }}
                    >
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: "clamp(3rem, 6vw, 6rem)", 
                            fontWeight: 800, 
                            textTransform: "uppercase", 
                            lineHeight: 0.9, 
                            marginBottom: 32,
                            letterSpacing: "-0.01em"
                        }}>
                            DISCOVER MY <br /> JOURNEY IN DESIGN
                        </h2>
                        <p style={{ 
                            color: "rgba(255,255,255,0.7)", 
                            fontSize: "1.1rem", 
                            lineHeight: 1.6, 
                            maxWidth: 540,
                            position: "relative"
                        }}>
                            From curious creator to full-time designer, my path has been shaped by a passion for crafting purposeful, user-centered digital experiences—blending storytelling, structure, and design into every project.
                            <span style={{ 
                                display: "inline-block", 
                                width: 10, 
                                height: 10, 
                                borderRadius: "50%", 
                                background: "#C4FF6B", 
                                marginLeft: 12,
                                verticalAlign: "middle"
                            }} />
                        </p>
                    </motion.div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {EXPERIENCES.map((exp, i) => (
                            <motion.div
                                key={exp.role}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ 
                                    display: "flex", 
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    padding: "32px 0", 
                                    borderTop: "1px solid rgba(255,255,255,0.1)",
                                    gap: 20
                                }}
                            >
                                <h3 style={{ 
                                    fontFamily: "var(--font-heading)", 
                                    fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", 
                                    fontWeight: 700, 
                                    textTransform: "uppercase",
                                    lineHeight: 1,
                                    flex: 1
                                }}>
                                    {exp.role}
                                </h3>
                                <div style={{ textAlign: "right" }}>
                                    <h4 style={{ 
                                        fontSize: 18, 
                                        fontWeight: 700, 
                                        color: "#C4FF6B",
                                        marginBottom: 4
                                    }}>
                                        {exp.company}
                                    </h4>
                                    <span style={{ 
                                        fontSize: 14, 
                                        color: "rgba(255,255,255,0.5)",
                                        fontWeight: 500
                                    }}>
                                        {exp.period}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
