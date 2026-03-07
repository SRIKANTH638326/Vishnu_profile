import { useState } from "react";
import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";

export function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const submit = () => {
        if (form.name && form.email && form.message) {
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            setForm({ name: "", email: "", message: "" });
        }
    };

    return (
        <section id="Contact" className="section-pad" style={{ background: "#050509" }}>
            <GlowBlob style={{ width: 600, height: 500, background: "rgba(99,102,241,0.09)", bottom: 0, right: 0 }} />
            <div className="container" style={{ maxWidth: 1100 }}>
                <Reveal style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,transparent,#6366f1)" }} />
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1" }}>Contact</span>
                        <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#6366f1,transparent)" }} />
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", marginBottom: 14 }}>
                        Let's work <span className="shimmer-text">together</span>
                    </h2>
                    <p style={{ color: "#475569", maxWidth: 480, margin: "0 auto 56px" }}>Open to Data Analyst, Business Analyst, and Power BI Analyst roles. Let's talk.</p>
                </Reveal>

                <div className="grid-2">
                    <Reveal delay={0.1}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                { label: "Email", value: "srikanthc061@gmail.com", href: "mailto:srikanthc061@gmail.com", icon: "✉️", color: "#6366f1" },
                                { label: "LinkedIn", value: "srikanthc-270b00347", href: "https://www.linkedin.com/in/srikanthc-270b00347", icon: "💼", color: "#8b5cf6" },
                                { label: "Portfolio", value: "behance.net/srikanth07", href: "https://www.behance.net/srikanth07", icon: "🎨", color: "#06b6d4" },
                                { label: "Phone", value: "+91 8110813471", href: "tel:+918110813471", icon: "📱", color: "#f43f5e" },
                            ].map(c => (
                                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, borderRadius: 18, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.25s", cursor: "none" }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateX(7px)"; e.currentTarget.style.borderColor = c.color + "55"; e.currentTarget.style.background = c.color + "0f"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + "20", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{c.label}</div>
                                        <div style={{ fontSize: 13, color: "#cbd5e1" }}>{c.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div style={{ padding: 36, borderRadius: 28, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[{ k: "name", p: "Your Name", t: "text" }, { k: "email", p: "Your Email", t: "email" }].map(({ k, p, t }) => (
                                    <input key={k} type={t} placeholder={p} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none", transition: "border-color 0.2s", cursor: "none", fontFamily: "inherit" }}
                                        onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.55)"}
                                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                                ))}
                                <textarea rows={4} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 14, outline: "none", resize: "none", transition: "border-color 0.2s", cursor: "none", fontFamily: "inherit" }}
                                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.55)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                                <button onClick={submit}
                                    style={{ padding: "16px", borderRadius: 12, background: sent ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 14, border: "none", cursor: "none", transition: "all 0.3s", boxShadow: "0 8px 28px rgba(99,102,241,0.38)", fontFamily: "inherit" }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.025)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                                    {sent ? "✓ Message Sent!" : "Send Message →"}
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
