import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import { SKILLS_DATA as STATIC_SKILLS } from "../../data/portfolioData";
import { FiZap, FiLayout, FiFigma, FiCode, FiDatabase, FiLayers, FiHexagon, FiMonitor, FiCpu, FiMousePointer, FiMove } from "react-icons/fi";

const iconMap = {
    "Framer": <FiMove size={24} />,
    "Figma": <FiFigma size={24} />,
    "Spline": <FiZap size={24} />,
    "X": <FiMonitor size={24} />,
    "React": <FiCode size={24} />,
    "Node.js": <FiDatabase size={24} />,
    "MongoDB": <FiDatabase size={24} />,
    "UI/UX": <FiLayout size={24} />,
    "Design": <FiHexagon size={24} />,
    "Default": <FiLayers size={24} />
};

export function Skills({ hideImage = false }) {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                if (adminService && typeof adminService.getSkills === 'function') {
                    const data = await adminService.getSkills();
                    if (data && Array.isArray(data) && data.length > 0) {
                        setSkills(data);
                        return;
                    }
                }
                
                // Fallback
                if (STATIC_SKILLS) {
                    const flat = Object.values(STATIC_SKILLS).flat();
                    setSkills(flat);
                }
            } catch (err) {
                console.error("Skills fetch error:", err);
                if (STATIC_SKILLS) {
                    const flat = Object.values(STATIC_SKILLS).flat();
                    setSkills(flat);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="Skills" style={{ padding: "120px 0", background: "#080808", color: "#fff" }}>
            <div className="container">
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: hideImage ? "1fr" : "1.2fr 0.8fr", 
                    gap: "100px" 
                }}>
                    <div>
                        <h2 style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "40px" }}>
                            My Tech <span style={{ color: "rgba(255,255,255,0.4)" }}>Stack</span>
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {skills && skills.map((skill, i) => (
                                <div 
                                    key={skill._id || skill.name || i}
                                    style={{ 
                                        padding: "32px 0",
                                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                                        display: "flex",
                                        gap: "30px"
                                    }}
                                >
                                    <div style={{ minWidth: "64px", height: "64px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: skill.color || "#C4FF6B" }}>
                                        {iconMap[skill.name] || iconMap.Default}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                                            {skill.name}
                                            {skill.isHot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />}
                                        </h3>
                                        <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                                            {skill.description || "Expertise in building modern digital solutions."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!hideImage && (
                        <div style={{ position: "sticky", top: "100px" }}>
                            <div style={{ width: "100%", borderRadius: "40px", overflow: "hidden" }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                                    alt="Stack" 
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

