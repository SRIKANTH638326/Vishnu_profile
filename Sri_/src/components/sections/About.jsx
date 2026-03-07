import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";
import { SLabel } from "../common/SLabel";
import { TiltCard } from "../common/TiltCard";

export function About() {
    const cards = [
        { icon: "◈", title: "UI/UX Design", desc: "Intuitive, beautiful interfaces grounded in user research and interaction principles.", color: "#6366f1" },
        { icon: "⬡", title: "Frontend Dev", desc: "Responsive, performant web apps with React, Tailwind, and modern JavaScript.", color: "#8b5cf6" },
        { icon: "📊", title: "Data Analytics", desc: "Transforming messy data into clean, meaningful dashboards and analytical insight.", color: "#06b6d4" },
    ];
    return (
        <section id="About" className="section-pad" style={{ background: "#070710" }}>
            <GlowBlob style={{ width: 500, height: 400, background: "rgba(99,102,241,0.07)", top: "20%", right: "-10%" }} />
            <div className="container">
                <Reveal><SLabel>About Me</SLabel></Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", marginBottom: 52, lineHeight: 1.1 }}>
                        Designer who speaks <span className="shimmer-text">data fluently</span>
                    </h2>
                </Reveal>
                <div className="grid-2 about-grid">
                    <Reveal delay={0.1} className="about-text">
                        <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
                            I'm a <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Data Analytics professional transitioning from a UI/UX background</span>. My journey started designing intuitive web experiences — and evolved into building data pipelines, dashboards, and analytical models.
                        </p>
                        <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
                            That unique blend gives me an edge: visual storytelling meets technical infrastructure. End-to-end projects in churn analysis, banking risk, and sales dashboards.
                        </p>
                        <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
                            Currently seeking <span style={{ color: "#818cf8", fontWeight: 600 }}>Data Analyst, Business Analyst, or Power BI Analyst</span> roles. Immediate joiner.
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            {[{ h: "https://www.linkedin.com/in/srikanthc-270b00347", l: "LinkedIn" }, { h: "https://www.behance.net/srikanth07", l: "Behance" }].map(({ h, l }) => (
                                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                                    style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, transition: "all 0.2s", cursor: "none" }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                                    {l} →
                                </a>
                            ))}
                        </div>
                    </Reveal>
                    <div className="about-cards" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {cards.map((c, i) => (
                            <Reveal key={c.title} delay={0.1 * (i + 1)}>
                                <TiltCard style={{ padding: 24, borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 20, alignItems: "flex-start" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: c.color + "22", color: c.color, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                                    <div>
                                        <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{c.title}</h3>
                                        <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7 }}>{c.desc}</p>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
