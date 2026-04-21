import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "../../data/portfolioData";

export function FAQ() {
    const [openIdx, setOpenIdx] = useState(null);

    const toggle = (i) => {
        setOpenIdx(prev => (prev === i ? null : i));
    };

    return (
        <section id="FAQ" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container">
                <div className="grid-2" style={{ alignItems: "flex-start" }}>
                    
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ position: "sticky", top: "120px" }}
                    >
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: "clamp(3rem, 6vw, 5rem)", 
                            fontWeight: 700, 
                            textTransform: "uppercase", 
                            lineHeight: 1, 
                            marginBottom: 24 
                        }}>
                            FREQUENTLY ASKED<br />QUESTIONS
                        </h2>
                        <p style={{ 
                            color: "var(--secondary-text)", 
                            fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", 
                            lineHeight: 1.6, 
                            maxWidth: 480 
                        }}>
                            Here are answers to some of the most common questions I receive as a freelance designer. If you don't see your question here, feel free to reach out—I'm happy to help!
                        </p>
                    </motion.div>

                    {/* Right Column */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {FAQ_DATA.map((item, i) => {
                            const isOpen = openIdx === i;
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ borderBottom: "1px solid var(--border)" }}
                                >
                                    <button 
                                        onClick={() => toggle(i)}
                                        style={{ 
                                            width: "100%", 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "space-between", 
                                            background: "none", 
                                            border: "none", 
                                            padding: "24px 0",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            color: "var(--text)"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <span style={{ 
                                                fontFamily: "var(--font-heading)", 
                                                fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", 
                                                fontWeight: 700, 
                                                color: isOpen ? "var(--accent)" : "var(--text)", 
                                                transition: "0.3s" 
                                            }}>
                                                {i + 1}.
                                            </span>
                                            <h3 style={{ 
                                                fontFamily: "var(--font-heading)", 
                                                fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", 
                                                fontWeight: 700, 
                                                textTransform: "uppercase", 
                                                color: isOpen ? "var(--accent)" : "var(--text)",
                                                transition: "0.3s" 
                                            }}>
                                                {item.q}
                                            </h3>
                                        </div>
                                        <motion.span 
                                            animate={{ rotate: isOpen ? 180 : 0 }} 
                                            transition={{ duration: 0.3 }}
                                            style={{ color: isOpen ? "var(--accent)" : "var(--text)" }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                        </motion.span>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "circOut" }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <div style={{ paddingBottom: 24, paddingLeft: 28 }}>
                                                    <p style={{ color: "var(--secondary-text)", fontSize: "1rem", lineHeight: 1.6, maxWidth: 500 }}>
                                                        {item.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
