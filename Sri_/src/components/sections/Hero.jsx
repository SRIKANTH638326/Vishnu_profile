import { useState, useEffect } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { ROLES } from "../../data/portfolioData";
import { Counter } from "../common/Counter";

export function Hero() {
    const role = useTypewriter(ROLES);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
    const t = (d) => ({ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${d}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${d}s` });

    return (
        <section id="Hero" className="hero-wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "#050509" }}>
            {/* Toned down subtle background elements */}
            <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(5,5,9,0) 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(5,5,9,0) 70%)", pointerEvents: "none" }} />

            <div className="container" style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: 80 }}>
                <div className="hero-grid grid-2" style={{ alignItems: "center", gap: 64 }}>
                    {/* Left Content */}
                    <div className="hero-content">
                        <div style={{ ...t(0.1), display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 28 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.5)", display: "inline-block" }} />
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#cbd5e1", letterSpacing: "0.02em" }}>Available for new opportunities</span>
                        </div>

                        <h1 className="hero-title" style={{ ...t(0.2), fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.15, color: "#f8fafc", marginBottom: 16, letterSpacing: "-0.02em" }}>
                            Hi, I'm <span style={{ color: "#818cf8" }}>Srikanth</span>
                        </h1>

                        {/* Typewriter */}
                        <div style={{ ...t(0.3), fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 400, color: "#94a3b8", marginBottom: 28, minHeight: 36, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>{role}</span>
                            <span className="cursor-blink" style={{ width: 2, height: "1.1em", background: "#818cf8", display: "inline-block", verticalAlign: "middle" }} />
                        </div>

                        <p style={{ ...t(0.4), color: "#64748b", fontSize: 16, lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}>
                            I bridge <span style={{ color: "#e2e8f0", fontWeight: 500 }}>beautiful design</span> with{" "}
                            <span style={{ color: "#e2e8f0", fontWeight: 500 }}>data-driven insight</span>. Passionate about transforming complex problems into elegant, intuitive, and highly functional digital experiences.
                        </p>

                        <div style={{ ...t(0.5), display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
                            <button onClick={() => document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" })}
                                style={{ padding: "14px 28px", borderRadius: 8, background: "#6366f1", color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "none", transition: "all 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"} onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}>
                                View Projects
                            </button>
                            <a href="https://www.linkedin.com/in/srikanthc-270b00347" target="_blank" rel="noopener noreferrer"
                                style={{ padding: "14px 28px", borderRadius: 8, background: "rgba(255,255,255,0.03)", color: "#e2e8f0", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s", cursor: "none", display: "inline-block" }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                                LinkedIn Profile
                            </a>
                        </div>

                        {/* Clean Stats */}
                        <div className="hero-stats" style={{ ...t(0.6), display: "flex", gap: 48, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
                            {[["2", "+", "Years Exp"], ["10", "+", "Projects"], ["3", "", "Domains"]].map(([n, s, l]) => (
                                <div key={l}>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: "#f8fafc" }}><Counter to={parseInt(n)} suffix={s} /></div>
                                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontWeight: 500 }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Clean modern card */}
                    <div className="hero-avatar" style={{ ...t(0.4), display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
                            {/* Subtle accent backdrop */}
                            <div style={{ position: "absolute", inset: -1, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 24, opacity: 0.15, filter: "blur(20px)" }} />

                            {/* Main Card */}
                            <div style={{ position: "relative", background: "linear-gradient(145deg, rgba(30,30,36,0.6), rgba(15,15,20,0.8))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, backdropFilter: "blur(10px)", boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                                    <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 8px 16px rgba(99,102,241,0.25)" }}>
                                        👨‍💻
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc", marginBottom: 4 }}>Srikanth C</h3>
                                        <p style={{ fontSize: 14, color: "#94a3b8" }}>UI/UX & Data Analyst</p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[
                                        { label: "Location", value: "Bengaluru, India", icon: "📍" },
                                        { label: "Focus", value: "Data & Interfaces", icon: "🎯" },
                                        { label: "Tech Stack", value: "React, Python, PowerBI", icon: "⚡" }
                                    ].map(stat => (
                                        <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.04)" }}>
                                            <span style={{ fontSize: 16 }}>{stat.icon}</span>
                                            <div>
                                                <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{stat.label}</div>
                                                <div style={{ fontSize: 14, color: "#cbd5e1", fontWeight: 500 }}>{stat.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#475569", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,#6366f1,transparent)" }} />
            </div>
        </section>
    );
}
