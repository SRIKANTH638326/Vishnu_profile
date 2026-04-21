import { motion } from "framer-motion";
import { SkillChip } from "../common/SkillChip";
import { TiltCard } from "../common/TiltCard";
import { SKILLS_DATA } from "../../data/portfolioData";

export function Skills() {
    return (
        <section id="Skills" className="section-pad" style={{ background: "var(--bg)", position: "relative" }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, textTransform: "uppercase", marginBottom: 60, lineHeight: 1 }}>
                        Expertise & <span style={{ color: "var(--accent)" }}>Toolkit</span>
                    </h2>
                </motion.div>

                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(12, 1fr)", 
                    gap: 24, 
                    width: "100%" 
                }}>
                    {Object.entries(SKILLS_DATA).map(([cat, skills], ci) => {
                        // Custom sizing for Bento feel
                        const span = cat === "Data & Analytics" ? "span 12" : "span 6";
                        const mobileSpan = "span 12";

                        return (
                            <motion.div 
                                key={cat} 
                                initial={{ opacity: 0, y: 30 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }}
                                transition={{ delay: ci * 0.1 }}
                                style={{ gridColumn: window.innerWidth > 992 ? span : mobileSpan }}
                            >
                                <TiltCard style={{ 
                                    padding: 40, 
                                    borderRadius: 32, 
                                    height: "100%", 
                                    background: "var(--card-bg)", 
                                    border: "1px solid var(--border)",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                }}>
                                    <div style={{ marginBottom: 32 }}>
                                        <h3 style={{ 
                                            fontFamily: "var(--font-heading)", 
                                            fontSize: 24, 
                                            fontWeight: 700, 
                                            textTransform: "uppercase", 
                                            letterSpacing: "0.05em", 
                                            color: "var(--text)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12
                                        }}>
                                            <span style={{ width: 12, height: 2, background: "var(--accent)" }} />
                                            {cat}
                                        </h3>
                                    </div>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                        {skills.map((s, i) => (
                                            <SkillChip key={s.name} name={s.name} color={s.color} delay={ci * 0.1 + i * 0.05} />
                                        ))}
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
