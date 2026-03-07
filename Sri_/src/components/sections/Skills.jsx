import { GlowBlob } from "../common/GlowBlob";
import { Reveal } from "../common/Reveal";
import { SLabel } from "../common/SLabel";
import { TiltCard } from "../common/TiltCard";
import { SkillBar } from "../common/SkillBar";
import { SKILLS_DATA } from "../../data/portfolioData";

export function Skills() {
    return (
        <section id="Skills" className="section-pad" style={{ background: "#050509" }}>
            <GlowBlob style={{ width: 400, height: 400, background: "rgba(139,92,246,0.09)", bottom: 0, left: 0 }} />
            <div className="container">
                <Reveal><SLabel>Skills</SLabel></Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "#fff", marginBottom: 52 }}>
                        My <span className="shimmer-text">Toolkit</span>
                    </h2>
                </Reveal>
                <div className="grid-3">
                    {Object.entries(SKILLS_DATA).map(([cat, skills], ci) => (
                        <Reveal key={cat} delay={ci * 0.1}>
                            <TiltCard style={{ padding: 28, borderRadius: 24, height: "100%", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <h3 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: 24 }}>{cat}</h3>
                                {skills.map((s, i) => (
                                    <SkillBar key={s.name} name={s.name} pct={s.pct} color={s.color} delay={ci * 0.1 + i * 0.09} />
                                ))}
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
