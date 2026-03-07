import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";
import { SLabel } from "../common/SLabel";
import { TiltCard } from "../common/TiltCard";
import { CASE_STUDIES } from "../../data/portfolioData";

export function CaseStudies() {
    return (
        <section id="Case Studies" className="section-pad" style={{ background: "#070710" }}>
            <GlowBlob style={{ width: 500, height: 300, background: "rgba(99,102,241,0.07)", top: "30%", right: "-5%" }} />
            <div className="container">
                <Reveal><SLabel>Case Studies</SLabel></Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", marginBottom: 52 }}>
                        Deep <span className="shimmer-text">Dives</span>
                    </h2>
                </Reveal>
                <div className="grid-3">
                    {CASE_STUDIES.map((cs, i) => (
                        <Reveal key={cs.title} delay={i * 0.12}>
                            <TiltCard
                                style={{ padding: 32, borderRadius: 28, height: "100%", display: "flex", flexDirection: "column", background: cs.bg, border: `1px solid ${cs.accent}33`, transition: "border-color 0.3s, transform 0.18s ease", cursor: "none" }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = cs.accent + "88"}
                                onMouseLeave={e => e.currentTarget.style.borderColor = cs.accent + "33"}>
                                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: cs.accent, marginBottom: 16 }}>{cs.tag}</div>
                                <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{cs.title}</h3>
                                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.75, flex: 1, marginBottom: 20 }}>{cs.desc}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {cs.metrics.map(m => (
                                        <span key={m} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 99, background: cs.accent + "22", color: cs.accent, border: `1px solid ${cs.accent}44`, fontWeight: 700 }}>{m}</span>
                                    ))}
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
