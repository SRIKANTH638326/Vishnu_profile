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

                <div className="about-bento-grid">
                    {/* Bio Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="about-card bio-card"
                    >
                        <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.6, color: "var(--text)", marginBottom: 24, opacity: 0.9 }}>
                            I'm a <span style={{ color: "var(--accent)", fontWeight: 600 }}>Data Analytics professional</span> with a deep-rooted passion for UI/UX Design. I specialize in bridging the gap between complex data structures and intuitive visual storytelling.
                        </p>
                        <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--secondary-text)" }}>
                            My journey has taken me from designing pixel-perfect interfaces to architecting robust data pipelines and interactive PowerBI dashboards for global banking and retail clients.
                        </p>
                    </motion.div>

                    {/* Stats Card 1 */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="about-card stat-card accent"
                    >
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "4.5rem", fontWeight: 700, lineHeight: 1 }}>02+</span>
                        <span style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Years of Experience</span>
                    </motion.div>

                    {/* Stats Card 2 */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="about-card stat-card"
                    >
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "4.5rem", fontWeight: 700, lineHeight: 1, color: "var(--text)" }}>15+</span>
                        <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "var(--secondary-text)" }}>Projects Delivered</span>
                    </motion.div>

                    {/* Social/Links Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="about-card social-card"
                    >
                        <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", color: "var(--secondary-text)", marginBottom: 12 }}>Connect</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                { name: "LinkedIn", url: "https://www.linkedin.com/in/srikanthc-270b00347" },
                                { name: "Behance", url: "https://www.behance.net/srikanth07" },
                                { name: "GitHub", url: "https://github.com" }
                            ].map(link => (
                                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="about-link">
                                    {link.name} <span>↗</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Focus Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="about-card focus-card"
                    >
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Primary Focus</h3>
                            <p style={{ fontSize: 18, color: "var(--text)" }}>Building data-driven interfaces that solve real-world business problems.</p>
                        </div>
                        <div className="tool-chips">
                            {["Tableau", "PowerBI", "Figma"].map(tool => (
                                <span key={tool} className="tool-chip">{tool}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .about-bento-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-auto-rows: minmax(180px, auto);
                    gap: 20px;
                }
                .about-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 32px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                }
                .bio-card { grid-column: span 8; grid-row: span 2; justify-content: center; padding: 40px; }
                .stat-card { grid-column: span 4; justify-content: space-between; }
                .stat-card.accent { background: var(--accent); color: #000; border: none; }
                .social-card { grid-column: span 4; grid-row: span 2; }
                .focus-card { grid-column: span 8; flex-direction: row; align-items: center; gap: 40px; }
                
                .about-link {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 20px;
                    background: var(--border);
                    border-radius: 16px;
                    color: var(--text);
                    font-size: 14px;
                    font-weight: 500;
                    transition: 0.2s;
                }
                .about-link:hover { background: var(--card-bg); }
                .tool-chips { display: flex; gap: 10px; }
                .tool-chip { padding: 8px 16px; border-radius: 100px; background: var(--card-bg); border: 1px solid var(--border); fontSize: 12px; fontWeight: 600; white-space: nowrap; }

                @media (max-width: 992px) {
                    .about-bento-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
                    .about-card { grid-column: span 1 !important; grid-row: auto !important; padding: 24px; }
                    .focus-card { flex-direction: column; align-items: flex-start; gap: 24px; }
                }
                @media (max-width: 480px) {
                    .tool-chips { flex-wrap: wrap; }
                }
            `}</style>
        </section>
    );
}

