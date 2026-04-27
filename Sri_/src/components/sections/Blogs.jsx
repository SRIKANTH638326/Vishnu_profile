import { motion } from "framer-motion";
import { BLOG_DATA } from "../../data/portfolioData";

export function Blogs() {
    return (
        <section id="Blogs" className="section-pad" style={{ background: "var(--bg)", position: "relative" }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    style={{ marginBottom: 60 }}
                >
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1 }}>
                        Latest <span style={{ color: "var(--accent)" }}>Insights</span>
                    </h2>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
                    {BLOG_DATA.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: "var(--card-bg)",
                                borderRadius: 32,
                                border: "1px solid var(--border)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                transition: "0.3s ease"
                            }}
                            whileHover={{ y: -10, borderColor: "var(--accent)" }}
                        >
                            <div style={{ position: "relative", paddingBottom: "60%", background: "var(--border)", overflow: "hidden" }}>
                                {/* Placeholder for blog image */}
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg, var(--card-bg), var(--border))" }}>
                                    <span style={{ fontSize: 48, opacity: 0.2 }}>📰</span>
                                </div>
                                <div style={{ position: "absolute", top: 20, left: 20, background: "var(--accent)", color: "#000", padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                                    {blog.category}
                                </div>
                            </div>
                            
                            <div style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
                                <span style={{ color: "var(--secondary-text)", fontSize: 13, marginBottom: 12, display: "block" }}>{blog.date}</span>
                                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>{blog.title}</h3>
                                <p style={{ color: "var(--secondary-text)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>{blog.desc}</p>
                                
                                <div style={{ marginTop: "auto" }}>
                                    <button style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                        Read More 
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
