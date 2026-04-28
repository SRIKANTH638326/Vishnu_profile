import { motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";

const TOOLS = [
    {
        name: "Framer",
        desc: "My creative playground for building interactive and responsive websites—fast, flexible, and no code.",
        icon: "⚡"
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
    const { width } = useWindowSize();
    const isMobile = width < 768;

    return (
        <section id="TechStack" className="section-pad" style={{ 
            background: "var(--bg)", 
            color: "var(--text)",
            padding: isMobile ? "60px 0" : "120px 0" 
        }}>
            <div className="container">
                <div style={{ maxWidth: hideImage ? "800px" : "1100px", margin: "0 auto" }}>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: isMobile ? 32 : 64, textAlign: isMobile ? "center" : "left" }}
                    >
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: isMobile ? "2.5rem" : "clamp(3.5rem, 8vw, 6.5rem)", 
                            fontWeight: 800, 
                            textTransform: "uppercase", 
                            lineHeight: 0.9, 
                            marginBottom: isMobile ? 16 : 24,
                            letterSpacing: "-0.02em"
                        }}>
                            MY TECH STACK
                        </h2>
                        <p style={{ 
                            color: "rgba(255,255,255,0.7)", 
                            fontSize: isMobile ? "0.95rem" : "1.1rem", 
                            lineHeight: 1.6, 
                            maxWidth: 500,
                            margin: isMobile ? "0 auto" : "0"
                        }}>
                            I build with intention. Framer for fast, interactive web design. Figma for clean interfaces. Notion and X for content. Each tool supports how I think and design.
                        </p>
                    </motion.div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {TOOLS.map((tool, i) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ 
                                    display: "flex", 
                                    flexDirection: isMobile ? "column" : "row",
                                    gap: isMobile ? 16 : 24, 
                                    padding: isMobile ? "24px 0" : "32px 0", 
                                    borderTop: "1px solid rgba(255,255,255,0.1)",
                                    alignItems: isMobile ? "center" : "flex-start",
                                    textAlign: isMobile ? "center" : "left"
                                }}
                            >
                                <div style={{ 
                                    width: isMobile ? 48 : 56, 
                                    height: isMobile ? 48 : 56, 
                                    borderRadius: isMobile ? 12 : 16, 
                                    background: "#1A1A1A", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    fontSize: isMobile ? 20 : 24,
                                    flexShrink: 0,
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}>
                                    {tool.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ 
                                        fontSize: isMobile ? 18 : 20, 
                                        fontWeight: 700, 
                                        marginBottom: 8, 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: isMobile ? "center" : "flex-start",
                                        gap: 12 
                                    }}>
                                        {tool.name}
                                        {tool.dot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4FF6B" }} />}
                                    </h3>
                                    <p style={{ 
                                        color: "rgba(255,255,255,0.6)", 
                                        fontSize: isMobile ? 14 : 15, 
                                        lineHeight: 1.5, 
                                        maxWidth: 400,
                                        margin: isMobile ? "0 auto" : "0"
                                    }}>
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
