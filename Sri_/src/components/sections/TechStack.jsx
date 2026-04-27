import { motion } from "framer-motion";

const TOOLS = [
    {
        name: "Framer",
        desc: "My creative playground for building interactive and responsive websites—fast, flexible, and no code.",
        icon: "⚡" // Replace with actual icons if needed
    },
    {
        name: "Figma",
        desc: "Where I connect, share insights, and grow within the design and Framer community.",
        icon: "🎨",
        dot: true
    },
    {
        name: "X",
        desc: "My go-to for UI/UX design—perfect for wireframing, prototyping, and collaborating in real time.",
        icon: "𝕏"
    },
    {
        name: "Spline",
        desc: "My tool for bringing 3D visuals into the web—perfect for adding playful, interactive depth to projects.",
        icon: "🌀"
    },
    {
        name: "Lemon Squeezy",
        desc: "My trusted solution for managing payments and licensing digital products effortlessly.",
        icon: "🍋"
    }
];

export function TechStack({ hideImage = false }) {
    return (
        <section id="TechStack" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container">
                <div style={{ maxWidth: hideImage ? "800px" : "1100px" }}>
                    

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: 48 }}
                    >
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 24 }}>
                            MY TECH STACK
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: 500 }}>
                            I build with intention. Framer for fast, interactive web design. Figma for clean interfaces. Notion and X for content. Each tool supports how I think, design.
                        </p>
                    </motion.div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {TOOLS.map((tool, i) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ 
                                    display: "flex", 
                                    gap: 24, 
                                    padding: "32px 0", 
                                    borderTop: "1px solid rgba(255,255,255,0.1)",
                                    alignItems: "flex-start"
                                }}
                            >
                                <div style={{ 
                                    width: 56, 
                                    height: 56, 
                                    borderRadius: 16, 
                                    background: "#1A1A1A", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    fontSize: 24,
                                    flexShrink: 0,
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}>
                                    {tool.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                                        {tool.name}
                                        {tool.dot && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#C4FF6B" }} />}
                                    </h3>
                                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.5, maxWidth: 400 }}>
                                        {tool.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
