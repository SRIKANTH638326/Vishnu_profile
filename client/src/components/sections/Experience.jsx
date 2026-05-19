import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminService } from "../../services/adminService";

const STATIC_EXPERIENCES = [
    {
        role: "CREATIVE ART DIRECTOR",
        company: "NovaWorks Agency",
        period: "2023 - Present"
    },
    {
        role: "SENIOR UI/UX DESIGNER",
        company: "BrightLabs Digital",
        period: "2020 - 2023"
    }
];

export function Experience({ hideImage = false }) {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [experienceImage, setExperienceImage] = useState("");

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const [data, imageData] = await Promise.all([
                    adminService.getExperience(),
                    adminService.getImages()
                ]);
                if (data && data.length > 0) {
                    setExperiences(data);
                } else {
                    setExperiences(STATIC_EXPERIENCES);
                }
                if (imageData?.experience) setExperienceImage(imageData.experience);
            } catch (err) {
                setExperiences(STATIC_EXPERIENCES);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);
    return (
        <section id="Experience" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container">
                <div style={{
                    display: hideImage ? "block" : "grid",
                    gridTemplateColumns: hideImage ? undefined : "1.2fr 0.8fr",
                    gap: "clamp(40px, 8vw, 100px)",
                    alignItems: "flex-start"
                }}>
                    {/* Left Column: Content + Timeline */}
                    <div style={{ maxWidth: hideImage ? "800px" : "none" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: 60 }}
                        >
                            <h2 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                lineHeight: 0.9,
                                marginBottom: 32,
                                letterSpacing: "-0.01em"
                            }}>
                                DISCOVER MY <br /> JOURNEY IN DESIGN
                            </h2>
                            <p style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "1.1rem",
                                lineHeight: 1.6,
                                maxWidth: 540,
                                position: "relative"
                            }}>
                                From curious creator to full-time designer, my path has been shaped by a passion for crafting purposeful, user-centered digital experiences—blending storytelling, structure, and design into every project.
                                <span style={{
                                    display: "inline-block",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#C4FF6B",
                                    marginLeft: 12,
                                    verticalAlign: "middle"
                                }} />
                            </p>
                        </motion.div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp._id || exp.role || i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        padding: "32px 0",
                                        borderTop: "1px solid rgba(255,255,255,0.1)",
                                        gap: 20
                                    }}
                                >
                                    <h3 style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        lineHeight: 1,
                                        flex: 1
                                    }}>
                                        {exp.role}
                                    </h3>
                                    <div style={{ textAlign: "right" }}>
                                        <h4 style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            color: "#C4FF6B",
                                            marginBottom: 4
                                        }}>
                                            {exp.company}
                                        </h4>
                                        <span style={{
                                            fontSize: 14,
                                            color: "rgba(255,255,255,0.5)",
                                            fontWeight: 500
                                        }}>
                                            {exp.period || exp.duration}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    {!hideImage && (
                        <div style={{ position: "sticky", top: "100px" }}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                style={{
                                    width: "100%",
                                    maxWidth: 480,
                                    borderRadius: "32px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                                    aspectRatio: "4/5"
                                }}
                            >
                                {experienceImage ? (
                                    <img src={experienceImage} alt="Experience" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "rgba(255,255,255,0.1)",
                                        fontSize: "1rem"
                                    }}>
                                        Upload an image in admin panel
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
