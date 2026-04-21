import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "../../data/portfolioData";
import workspaceImg from "../../assets/workspace-services.png";

export function Services() {
    const [openId, setOpenId] = useState("01");

    return (
        <section id="Services" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container">
                <div className="grid-2" style={{ alignItems: "flex-start", gap: "clamp(40px, 8vw, 100px)" }}>
                    {/* Left Column: Content + Accordion */}
                    <div style={{ width: "100%" }}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            style={{ width: "100%" }}
                        >
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 40 }}>
                                What I can <br /> do for you
                            </h2>
                            <p style={{ color: "var(--secondary-text)", fontSize: "clamp(0.95rem, 1.1vw, 1.2rem)", lineHeight: 1.6, maxWidth: 480, marginBottom: 60 }}>
                                As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.
                            </p>
                        </motion.div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {SERVICES.map((service) => (
                                <AccordionItem 
                                    key={service.id} 
                                    service={service} 
                                    isOpen={openId === service.id} 
                                    toggle={() => setOpenId(openId === service.id ? null : service.id)} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Tilted Image */}
                    <div style={{ position: "sticky", top: 150 }}>
                        <motion.div 
                            initial={{ opacity: 0, x: 50, rotate: 5 }}
                            whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "circOut" }}
                            style={{ 
                                position: "relative",
                                width: "100%",
                                maxWidth: 500,
                                borderRadius: 24,
                                overflow: "hidden",
                                boxShadow: "-40px 40px 80px rgba(0,0,0,0.5)",
                                border: "1px solid var(--border)"
                            }}
                        >
                            <img src={workspaceImg} alt="Workspace" style={{ width: "100%", height: "auto", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(45deg, rgba(196, 255, 107, 0.05), transparent)" }} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AccordionItem({ service, isOpen, toggle }) {
    return (
        <div style={{ borderTop: "1px solid var(--border)", padding: "30px 0" }}>
            <button 
                onClick={toggle}
                style={{ 
                    width: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    background: "none", 
                    border: "none", 
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-heading)", color: isOpen ? "var(--accent)" : "var(--secondary-text)", transition: "0.3s" }}>
                        {service.id}.
                    </span>
                    <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 700, fontFamily: "var(--font-heading)", textTransform: "uppercase", color: isOpen ? "var(--accent)" : "var(--text)", transition: "0.3s" }}>
                        {service.title}
                    </h3>
                </div>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}
                    style={{ color: "var(--secondary-text)" }}>
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
                        <div style={{ paddingTop: 24, paddingLeft: 56 }}>
                            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                                {service.features.map((feature, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--secondary-text)", fontSize: 15 }}
                                    >
                                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6 9 17l-5-5"/>
                                            </svg>
                                        </div>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
