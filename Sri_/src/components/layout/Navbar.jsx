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
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 20 }}
                style={{ 
                    pointerEvents: "auto",
                    background: scrolled ? "rgba(26, 26, 27, 0.7)" : "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.3)" : "none",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                }}>
                
                {/* Logo */}
                <button onClick={() => scrollTo("Hero")} style={{ background: "var(--accent)", color: "#000", width: 36, height: 36, borderRadius: "50%", border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer", marginRight: 8 }}>
                    S
                </button>

                {/* desktop links */}
                <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {NAV_LINKS.map((link) => (
                        <button key={link} onClick={() => scrollTo(link)}
                            style={{ 
                                padding: "10px 18px",
                                fontSize: 13,
                                fontWeight: 500,
                                borderRadius: 100,
                                border: "none",
                                background: active === link ? "rgba(255,255,255,0.08)" : "transparent",
                                color: active === link ? "var(--accent)" : "rgba(255,255,255,0.6)",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}>
                            {link}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <a href="mailto:srikanthc061@gmail.com"
                    style={{ 
                        marginLeft: 8,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        padding: "10px 24px",
                        borderRadius: 100,
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "0.3s"
                    }}>
                    Hire Me
                </a>

                {/* Mobile Menu Toggle */}
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ width: 36, height: 36, borderRadius: "50%", background: "none", border: "1px solid var(--border)", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <div style={{ width: 18, height: 2, background: "var(--text)", position: "relative" }}>
                        <div style={{ position: "absolute", top: menuOpen ? 0 : -6, width: 18, height: 2, background: "var(--text)", transform: menuOpen ? "rotate(45deg)" : "none", transition: "0.2s" }} />
                        <div style={{ position: "absolute", bottom: menuOpen ? 0 : -6, width: 18, height: 2, background: "var(--text)", transform: menuOpen ? "rotate(-45deg)" : "none", transition: "0.2s" }} />
                    </div>
                </button>
            </motion.div>

            {/* Mobile Nav Overlay omitted for brevity, can be added if needed */}
        </nav>
    );
}
