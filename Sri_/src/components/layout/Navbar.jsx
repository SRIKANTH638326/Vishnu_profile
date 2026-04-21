import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../data/portfolioData";

export function Navbar({ active }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav style={{ position: "fixed", top: 24, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
            <motion.div
                layout
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 150,
                    mass: 0.8
                }}
                style={{
                    pointerEvents: "auto",
                    background: "var(--nav-bg, var(--card-bg))",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: scrolled ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "none",
                }}>

                {/* Profile Group */}
                <motion.div
                    layout
                    style={{ display: "flex", alignItems: "center", gap: 0 }}
                >
                    <motion.button
                        layout
                        onClick={() => scrollTo("Hero")}
                        style={{
                            background: "var(--accent)",
                            color: "#000",
                            height: 40,
                            width: 40,
                            borderRadius: 100,
                            border: "none",
                            fontWeight: 800,
                            fontSize: 16,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2
                        }}>
                        S
                    </motion.button>

                    <AnimatePresence>
                        {scrolled && (
                            <motion.span
                                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
                                exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
                                style={{ overflow: "hidden", whiteSpace: "nowrap", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 13, fontWeight: 700 }}
                            >
                                {/* Srikanth */}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    layout
                    style={{ width: scrolled ? 1 : 0, height: 20, background: "var(--border)", margin: scrolled ? "0 8px" : 0, opacity: scrolled ? 1 : 0 }}
                />

                {/* Main Content Area */}
                <motion.div layout style={{ display: "flex", alignItems: "center" }}>
                    <AnimatePresence mode="wait">
                        {!scrolled ? (
                            <motion.div
                                key="links"
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.2 }}
                                className="nav-desktop"
                                style={{ display: "flex", alignItems: "center", gap: 2 }}
                            >
                                {NAV_LINKS.map((link) => (
                                    <button key={link} onClick={() => scrollTo(link)}
                                        style={{
                                            padding: "8px 18px",
                                            fontSize: 13,
                                            fontWeight: 500,
                                            borderRadius: 100,
                                            border: "none",
                                            background: active === link ? "var(--border)" : "transparent",
                                            color: active === link ? "var(--accent)" : "var(--secondary-text)",
                                            cursor: "pointer",
                                            transition: "0.3s ease"
                                        }}>
                                        {link}
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="status"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "0 16px 0 8px",
                                    height: 40,
                                    borderRadius: 100,
                                    background: "var(--border)"
                                }}
                            >
                                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                                    <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "status-pulse 2s infinite" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--secondary-text)", whiteSpace: "nowrap", textTransform: "capitalize", letterSpacing: "0.05em" }}>
                                    Available for Work
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Right Group: Action */}
                <motion.div layout style={{ display: "flex", alignItems: "center" }}>
                    <AnimatePresence>
                        {!scrolled ? (
                            <motion.a
                                key="cta"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                href="mailto:srikanthc061@gmail.com"
                                style={{
                                    marginLeft: 6,
                                    background: "var(--border)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)",
                                    padding: "10px 22px",
                                    borderRadius: 100,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textDecoration: "none"
                                }}>
                                Let's Talk
                            </motion.a>
                        ) : (
                            <motion.button
                                key="menu"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setMenuOpen(!menuOpen)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: "var(--card-bg)",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    marginLeft: 6
                                }}
                            >
                                <div style={{ width: 14, height: 2, background: "var(--text)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: menuOpen ? 0 : -5, width: 14, height: 1.5, background: "var(--text)", transform: menuOpen ? "rotate(45deg)" : "none", transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                                    <div style={{ position: "absolute", bottom: menuOpen ? 0 : -5, width: 14, height: 1.5, background: "var(--text)", transform: menuOpen ? "rotate(-45deg)" : "none", transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                                </div>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Mobile Nav Overlay omitted for brevity, can be added if needed */}
        </nav>
    );
}
