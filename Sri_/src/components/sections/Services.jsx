import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";
import { SLabel } from "../common/SLabel";
import { TiltCard } from "../common/TiltCard";
import { SERVICES } from "../../data/portfolioData";

export function Services() {
    return (
        <section id="Services" className="section-pad" style={{ background: "#070710" }}>
            <GlowBlob style={{ width: 400, height: 400, background: "rgba(99,102,241,0.07)", top: 0, left: "30%" }} />
            <div className="container">
                <Reveal><SLabel>Services</SLabel></Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", marginBottom: 52 }}>
                        How I can <span className="shimmer-text">help you</span>
                    </h2>
                </Reveal>
                <div className="grid-2">
                    {SERVICES.map((s, i) => (
                        <Reveal key={s.title} delay={i * 0.1}>
                            <TiltCard
                                style={{ padding: 36, borderRadius: 24, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "border-color 0.3s, transform 0.18s ease", cursor: "none" }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = s.accent + "55"}
                                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                                <div style={{ width: 52, height: 52, borderRadius: 16, background: s.accent + "20", color: s.accent, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transition: "transform 0.3s" }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2) rotate(6deg)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}>
                                    {s.icon}
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                                <p style={{ color: "#475569", lineHeight: 1.75, fontSize: 14, marginBottom: 20 }}>{s.desc}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: s.accent }}>
                                    Learn more →
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
