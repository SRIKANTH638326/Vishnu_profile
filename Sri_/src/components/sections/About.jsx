import { motion } from "framer-motion";

export function About() {
    return (
        <section id="About" style={{ padding: "120px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
            <div className="container">
                <div style={{ marginBottom: 60 }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, color: "var(--text)" }}>
                        The <span style={{ color: "var(--accent)" }}>Story</span> <br /> Behind the Data
                    </h2>
                </div>

                <div className="bento-grid" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(12, 1fr)", 
                    gridAutoRows: "minmax(160px, auto)", 
                    gap: 20 
                }}>
                    {/* Bio Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{ 
                            gridColumn: "span 8", 
                            gridRow: "span 2", 
                            background: "var(--card-bg)", 
                            border: "1px solid var(--border)", 
                            borderRadius: 32, 
                            padding: 40,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                        <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.6, color: "var(--text)", marginBottom: 24, opacity: 0.9 }}>
                            I'm a <span style={{ color: "var(--accent)", fontWeight: 600 }}>Data Analytics professional</span> with a deep-rooted passion for UI/UX Design. I specialize in bridging the gap between complex data structures and intuitive visual storytelling.
                        </p>
                        <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--secondary-text)" }}>
                            My journey has taken me from designing pixel-perfect interfaces to architecting robust data pipelines and interactive PowerBI dashboards for global banking and retail clients.
                        </p>
                    </motion.div>

                    {/* Stats Card 1 */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        style={{ 
                            gridColumn: "span 4", 
                            background: "var(--accent)", 
                            borderRadius: 32, 
                            padding: 32,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            color: "#000"
                        }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "4rem", fontWeight: 700, lineHeight: 1 }}>02+</span>
                        <span style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Years of Experience</span>
                    </motion.div>

                    {/* Stats Card 2 */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        style={{ 
                            gridColumn: "span 4", 
                            background: "var(--card-bg)", 
                            border: "1px solid var(--border)", 
                            borderRadius: 32, 
                            padding: 32,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "4rem", fontWeight: 700, lineHeight: 1, color: "var(--text)" }}>15+</span>
                        <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "var(--secondary-text)" }}>Projects Delivered</span>
                    </motion.div>

                    {/* Social/Links Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        style={{ 
                            gridColumn: "span 4", 
                            gridRow: "span 2", 
                            background: "var(--card-bg)", 
                            border: "1px solid var(--border)", 
                            borderRadius: 32, 
                            padding: 32,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", color: "var(--secondary-text)", marginBottom: 12 }}>Connect</h3>
                        {[
                            { name: "LinkedIn", url: "https://www.linkedin.com/in/srikanthc-270b00347" },
                            { name: "Behance", url: "https://www.behance.net/srikanth07" },
                            { name: "GitHub", url: "https://github.com" }
                        ].map(link => (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                                style={{ 
                                    display: "flex", 
                                    justifyContent: "space-between", 
                                    alignItems: "center", 
                                    padding: "16px 20px", 
                                    background: "var(--border)", 
                                    borderRadius: 16, 
                                    textDecoration: "none",
                                    color: "var(--text)",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    transition: "0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--card-bg)"}
                                onMouseLeave={e => e.currentTarget.style.background = "var(--border)"}>
                                {link.name} <span>↗</span>
                            </a>
                        ))}
                    </motion.div>

                    {/* Focus Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        style={{ 
                            gridColumn: "span 8", 
                            background: "var(--card-bg)", 
                            border: "1px solid var(--border)", 
                            borderRadius: 32, 
                            padding: 32,
                            display: "flex",
                            alignItems: "center",
                            gap: 40
                        }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Primary Focus</h3>
                            <p style={{ fontSize: 18, color: "var(--text)" }}>Building data-driven interfaces that solve real-world business problems.</p>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            {["Tableau", "PowerBI", "Figma"].map(tool => (
                                <span key={tool} style={{ padding: "8px 16px", borderRadius: 100, background: "var(--card-bg)", border: "1px solid var(--border)", fontSize: 12, fontWeight: 600 }}>{tool}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Responsive styles for bento grid */}
            <style>{`
                @media (max-width: 992px) {
                    .bento-grid {
                        grid-template-columns: repeat(1, 1fr) !important;
                    }
                    .bento-grid > div {
                        grid-column: span 1 !important;
                        grid-row: auto !important;
                    }
                }
            `}</style>
        </section>
    );
}
