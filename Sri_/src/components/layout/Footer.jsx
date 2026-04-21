export function Footer() {
    return (
        <footer style={{ padding: "40px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
            <div className="container footer-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#000" }}>S</div>
                    <span style={{ color: "var(--secondary-text)", fontSize: 13 }}>Srikanth C · Data Analyst & UI/UX Designer</span>
                </div>
                <div className="footer-links" style={{ display: "flex", gap: 20 }}>
                    {[{ h: "https://www.linkedin.com/in/srikanthc-270b00347", l: "LinkedIn" }, { h: "https://www.behance.net/srikanth07", l: "Behance" }, { h: "mailto:srikanthc061@gmail.com", l: "Email" }].map(({ h, l }) => (
                        <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: 12, color: "var(--secondary-text)", fontWeight: 600, transition: "color 0.2s", cursor: "none" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--secondary-text)"}>
                            {l}
                        </a>
                    ))}
                </div>
                <button className="footer-links" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{ width: 36, height: 36, borderRadius: 10, background: "var(--border)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 16, cursor: "none", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>↑</button>
            </div>
            <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "var(--secondary-text)", opacity: 0.6 }}>
                © {new Date().getFullYear()} Srikanth C. All rights reserved.
            </div>
        </footer>
    );
}
