import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../data/portfolioData";

export function Navbar({ active }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
    const scrollTo = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

    return (
        <>
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.4s", background: scrolled ? "rgba(5,5,9,0.88)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "none" }}>
                <div className="container" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => scrollTo("Hero")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "none", zIndex: 102 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}>S</div>
                        <span style={{ fontWeight: 800, color: "#fff", fontSize: 16 }}>Srikanth<span style={{ color: "#6366f1" }}>.</span></span>
                    </button>

                    <div className="nav-desktop">
                        {NAV_LINKS.map(l => (
                            <button key={l} onClick={() => scrollTo(l)} style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600, borderRadius: 8, border: "none", cursor: "none", transition: "all 0.2s", color: active === l ? "#a5b4fc" : "#64748b", background: active === l ? "rgba(99,102,241,0.14)" : "transparent" }}>{l}</button>
                        ))}
                        <a href="mailto:srikanthc061@gmail.com"
                            style={{ marginLeft: 12, padding: "9px 22px", fontSize: 13, fontWeight: 700, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 0 24px rgba(99,102,241,0.45)", transition: "transform 0.2s", cursor: "none" }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                            Hire Me
                        </a>
                    </div>

                    <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile Nav */}
            <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
                {NAV_LINKS.map(l => (
                    <button key={l} onClick={() => scrollTo(l)} style={{ fontSize: 24, fontWeight: 700, border: "none", background: "none", color: active === l ? "#fff" : "#94a3b8", cursor: "none", transition: "0.2s" }}>
                        {l}
                    </button>
                ))}
                <a href="mailto:srikanthc061@gmail.com" onClick={() => setMenuOpen(false)} style={{ marginTop: 24, padding: "14px 42px", fontSize: 16, fontWeight: 700, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", cursor: "none" }}>
                    Hire Me
                </a>
            </div>
        </>
    );
}
