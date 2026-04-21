import { useRef, useState } from "react";
import { Reveal } from "../common/Reveal";
import { SLabel } from "../common/SLabel";
import { TiltCard } from "../common/TiltCard";
import { PROJECTS } from "../../data/portfolioData";

function ProjectCard({ p }) {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <TiltCard
            style={{ height: "100%", padding: 0 }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: "relative",
                    borderRadius: 24,
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    cursor: "none",
                    height: "100%",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    borderColor: isHovered ? p.color + "66" : "var(--border)",
                    boxShadow: isHovered ? `0 20px 40px -10px ${p.color}33` : "none"
                }}
            >
                {/* Spotlight Layer */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${p.color}1a, transparent 40%)`,
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s ease"
                    }}
                />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1, padding: 32 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        {/* Emoji icon with scale and rotation on hover */}
                        <div style={{ width: 56, height: 56, borderRadius: 18, background: p.color + "22", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: isHovered ? "scale(1.15) rotate(-8deg)" : "scale(1)" }}>{p.emoji}</div>
                        {/* Arrow Link icon moving up and right */}
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isHovered ? p.color : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: isHovered ? "#fff" : "var(--secondary-text)", fontSize: 16, transition: "all 0.4s ease", transform: isHovered ? "translate(6px, -6px)" : "none", boxShadow: isHovered ? `0 8px 16px ${p.color}44` : "none" }}>↗</div>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 12, transition: "color 0.3s ease" }}>{p.title}</h3>

                    <p style={{ color: "var(--secondary-text)", fontSize: 14, lineHeight: 1.75, marginBottom: 24, transition: "color 0.3s" }}>{p.desc}</p>

                    {/* Tags with staggered float animation */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {p.tags.map((t, idx) => (
                            <span key={t} style={{ fontSize: 11, padding: "6px 14px", borderRadius: 99, background: p.color + "18", color: p.color, border: `1px solid ${p.color}44`, fontWeight: 700, transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transitionDelay: isHovered ? `${idx * 0.05}s` : "0s", transform: isHovered ? "translateY(-4px)" : "none", boxShadow: isHovered ? `0 6px 16px ${p.color}22` : "none" }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </TiltCard>
    );
}

export function Projects() {
    return (
        <section id="Projects" className="section-pad" style={{ background: "var(--bg)", position: "relative" }}>
            {/* Ambient Background Glow */}
            <div style={{ position: "absolute", top: "20%", left: "-10%", width: 600, height: 600, background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", opacity: 0.1, pointerEvents: "none", zIndex: 0 }} />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <Reveal><SLabel>Projects</SLabel></Reveal>
                <Reveal delay={0.05}>
                    <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 900, color: "var(--text)", marginBottom: 52 }}>
                        What I've <span className="shimmer-text">Built</span>
                    </h2>
                </Reveal>
                <div className="grid-2">
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.1}>
                            <ProjectCard p={p} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
