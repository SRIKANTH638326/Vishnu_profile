import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../data/portfolioData";

import portrait from "../../assets/hero-portrait.png";

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
        <>
            {/* Backdrop for Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(12px)",
                            zIndex: 998,
                            pointerEvents: "auto"
                        }}
                    />
                )}
            </AnimatePresence>

            <nav style={{ 
                position: "fixed", 
                top: 24, 
                left: 0, 
                right: 0, 
                zIndex: 1000, 
                display: "flex", 
                justifyContent: "center", 
                pointerEvents: "none" 
            }}>
                <motion.div
                    layout
                    initial={{ y: -100 }}
                    animate={{ 
                        y: 0,
                        width: menuOpen ? "calc(100% - 40px)" : "auto",
                        maxWidth: menuOpen ? 340 : 1000,
                        borderRadius: menuOpen ? 40 : 100,
                        padding: menuOpen ? "24px" : "6px",
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 200,
                        mass: 1,
                        layout: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
                    }}
                    style={{
                        pointerEvents: "auto",
                        background: menuOpen ? "#0d0d0d" : "var(--nav-bg, var(--card-bg))",
                        backdropFilter: "blur(20px)",
                        border: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: (scrolled || menuOpen) ? "0 40px 100px rgba(0,0,0,0.8)" : "none",
                        overflow: "hidden"
                    }}>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {!menuOpen ? (
                            <motion.div
                                key="pill-content"
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.3 }}
                                style={{ display: "flex", alignItems: "center", gap: 6 }}
                            >
                                {/* Profile Area (Small) */}
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
                                        flexShrink: 0
                                    }}>
                                    S
                                </motion.button>

                                <motion.div
                                    layout
                                    style={{ width: scrolled ? 1 : 0, height: 20, background: "var(--border)", margin: scrolled ? "0 8px" : 0, opacity: scrolled ? 1 : 0 }}
                                />

                                {/* Main Pill Content */}
                                <motion.div layout style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: (scrolled || window.innerWidth < 992) ? "flex-start" : "center" }}>
                                    <AnimatePresence mode="wait">
                                        {(!scrolled && window.innerWidth > 768) ? (
                                            <motion.div
                                                key="links"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
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
                                                            transition: "0.3s ease",
                                                            whiteSpace: "nowrap"
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
                                                    height: 48,
                                                    borderRadius: 100,
                                                }}
                                            >
                                                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                                                    <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "status-pulse 2s infinite" }} />
                                                </div>
                                                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--secondary-text)", whiteSpace: "nowrap", textTransform: "capitalize", letterSpacing: "0.05em" }}>
                                                    {window.innerWidth < 480 ? "Available" : "Available for Work"}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Right Group (Toggle) */}
                                <motion.div layout>
                                    {(scrolled || window.innerWidth < 992) && (
                                        <motion.button
                                            key="menu-toggle"
                                            onClick={() => setMenuOpen(true)}
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
                                                <div style={{ position: "absolute", top: -5, width: 14, height: 1.5, background: "var(--text)" }} />
                                                <div style={{ position: "absolute", bottom: -5, width: 14, height: 1.5, background: "var(--text)" }} />
                                            </div>
                                        </motion.button>
                                    )}
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu-expanded"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ width: "100%", display: "flex", flexDirection: "column", gap: 32 }}
                            >
                                {/* Expanded Header */}
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                >
                                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--border)", overflow: "hidden", border: "1px solid var(--border)" }}>
                                        <img src={portrait} alt="Srikanth" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            background: "var(--accent)",
                                            border: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            color: "#000"
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </motion.div>

                                {/* Expanded Links */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", alignItems: "center" }}>
                                    {NAV_LINKS.map((link, i) => (
                                        <motion.button
                                            key={link}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 + i * 0.05 }}
                                            onClick={() => scrollTo(link)}
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                color: active === link ? "var(--accent)" : "rgba(255,255,255,0.7)",
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                transition: "0.2s"
                                            }}
                                        >
                                            {link}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Expanded Footer */}
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.35 }}
                                    onClick={() => scrollTo("Contact")}
                                    style={{
                                        width: "100%",
                                        background: "var(--accent)",
                                        color: "#000",
                                        padding: "16px 0",
                                        borderRadius: 100,
                                        border: "none",
                                        fontSize: 16,
                                        fontWeight: 700,
                                        cursor: "pointer"
                                    }}
                                >
                                    Contact
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </nav>
        </>
    );
}

