import { useInView } from "../../hooks/useInView";

export function SkillBar({ name, pct, color, delay = 0 }) {
    const [ref, v] = useInView();
    return (
        <div ref={ref} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>{name}</span>
                <span style={{ fontSize: 12, color, fontWeight: 800 }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: v ? pct + "%" : "0%", background: `linear-gradient(90deg,${color},${color}99)`, borderRadius: 99, transition: `width 1.3s cubic-bezier(.22,1,.36,1) ${delay}s`, boxShadow: `0 0 10px ${color}88` }} />
            </div>
        </div>
    );
}