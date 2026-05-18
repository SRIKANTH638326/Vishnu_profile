import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import portrait from "../../assets/hero-portrait.png";
import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub, FiTwitter, FiInstagram, FiMail, FiGlobe, FiBookOpen } from "react-icons/fi";
import { adminService } from "../../services/adminService";

export function About({ hideImage = false, isHome = false }) {

    const [socials, setSocials] = useState([]);
    const [profile, setProfile] = useState({
        fullName: "Srikanth C",
        jobTitle: "Digital Designer & Framer Developer",
        bio: "Hi, I'm Srikanth — a digital designer and Framer developer passionate about crafting meaningful and impactful digital experiences.",
        yearsOfExperience: "12",
        completedProjects: "270",
        clientsWorldwide: "50+",
        phone: "+91 9390234567",
        email: "srikanthc061@gmail.com",
        location: "Chennai, India"
    });

    const stats = [
        { label: "Years of Experience", value: profile.yearsOfExperience || "12" },
        { label: "Completed Projects", value: profile.completedProjects || "270" },
        { label: "Clients Worldwide", value: profile.clientsWorldwide || "50+" },
    ];

    useEffect(() => {
        const load = async () => {
            const [socialData, profileData] = await Promise.all([
                adminService.getSocials(),
                adminService.getProfile()
            ]);
            
            if (socialData && socialData.length > 0) {
                setSocials(socialData);
            } else {
                setSocials([
                    { platform: "LinkedIn", url: "https://www.linkedin.com/in/srikanthc-270b00347", icon: "Linkedin" },
                    { platform: "GitHub", url: "https://github.com/srikanth638326", icon: "Github" },
                    { platform: "Email", url: "mailto:srikanthc061@gmail.com", icon: "Mail" }
                ]);
            }

            if (profileData) {
                setProfile(profileData);
            }
        };
        load();
    }, []);

    const getIconComponent = (iconName) => {
        switch (iconName?.toLowerCase()) {
            case "linkedin": return <FiLinkedin size={22} />;
            case "github": return <FiGithub size={22} />;
            case "twitter": return <FiTwitter size={22} />;
            case "instagram": return <FiInstagram size={22} />;
            case "mail": return <FiMail size={22} />;
            case "behance": return <FiBookOpen size={22} />;
            default: return <FiGlobe size={22} />;
        }
    };

    return (
        <section id="About" style={{ padding: isHome ? "140px 0" : (hideImage ? "80px 0" : "160px 0 100px"), background: "var(--bg)", position: "relative", overflow: "hidden" }}>
            <div className="container">
                <div style={{ display: "flex", alignItems: isHome ? "center" : "flex-start", gap: isHome ? 100 : 80, flexWrap: "wrap" }}>

                    {/* Left Column */}
                    <div style={{ flex: isHome ? "1.3" : (hideImage ? "1" : "1.2"), minWidth: 320 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: isHome ? "clamp(3.5rem, 8vw, 7rem)" : "clamp(5rem, 12vw, 100px)",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                lineHeight: isHome ? 1 : 0.8,
                                color: "#fff",
                                marginBottom: isHome ? 30 : 40,
                                letterSpacing: "-0.02em"
                            }}>
                                About Me
                            </h1>

                            {!isHome && (
                                <h2 style={{
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "#fff",
                                    marginBottom: 24,
                                    letterSpacing: "0.02em"
                                }}>
                                    {profile.fullName}
                                </h2>
                            )}

                            <div style={{ maxWidth: isHome ? "600px" : "540px" }}>
                                <p style={{
                                    fontSize: isHome ? "clamp(1.1rem, 1.4vw, 1.3rem)" : "clamp(1rem, 1.2vw, 1.25rem)",
                                    lineHeight: 1.6,
                                    color: "rgba(255,255,255,0.8)",
                                    marginBottom: 24,
                                    position: "relative"
                                }}>
                                    {profile.bio}
                                </p>
                            </div>

                            {isHome && (
                                <>
                                    {/* Stats Grid */}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                        gap: 24,
                                        marginBottom: 32
                                    }}>
                                        {stats.map((stat, i) => (
                                            <div key={i}>
                                                <div style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: 8 }}>
                                                    {stat.value}
                                                </div>
                                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", textTransform: "none", maxWidth: "120px" }}>
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contact Info Row */}
                                    <div style={{ display: "flex", gap: 60, flexWrap: "wrap", marginBottom: 24 }}>
                                        {profile.phone && (
                                            <div>
                                                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>Call Today :</div>
                                                <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)" }}>{profile.phone}</div>
                                            </div>
                                        )}
                                        {profile.email && (
                                            <div>
                                                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>Email :</div>
                                                <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)" }}>{profile.email}</div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Socials & Button Row */}
                            <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
                                <div style={{ display: "flex", gap: isHome ? 20 : 24 }}>
                                    {socials.map((social, i) => (
                                        <motion.a
                                            key={social._id || i}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.15, color: "var(--accent)" }}
                                            style={{ color: "#fff", transition: "0.2s" }}
                                        >
                                            {getIconComponent(social.icon)}
                                        </motion.a>
                                    ))}
                                </div>

                                {isHome && (
                                    <Link to="/about-us" style={{ textDecoration: "none" }}>
                                        <motion.div
                                            whileHover={{ backgroundColor: "var(--accent)", color: "#000" }}
                                            style={{
                                                padding: "14px 40px",
                                                borderRadius: "100px",
                                                border: "1px solid var(--accent)",
                                                color: "var(--accent)",
                                                fontSize: "1.1rem",
                                                fontWeight: 800,
                                                textTransform: "uppercase",
                                                transition: "0.3s",
                                                fontFamily: "var(--font-heading)"
                                            }}
                                        >
                                            My Storys
                                        </motion.div>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    {!hideImage && (
                        <motion.div
                            initial={isHome ? { opacity: 0, rotate: 10, scale: 0.9 } : { opacity: 0, x: 50 }}
                            whileInView={isHome ? { opacity: 1, rotate: -5, scale: 1 } : { opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: isHome ? 1 : 0.8, ease: isHome ? "circOut" : "easeOut", delay: isHome ? 0 : 0.2 }}
                            style={{ flex: "1", minWidth: 320, display: "flex", justifyContent: isHome ? "center" : "flex-end" }}
                        >
                            <div style={{
                                width: "100%",
                                maxWidth: isHome ? 440 : 480,
                                borderRadius: 48,
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.1)",
                                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                                position: "relative",
                                transform: isHome ? "rotate(-5deg)" : "none"
                            }}>
                                <img src={profile.profileImage || portrait} alt="Srikanth" style={{ width: "100%", height: "auto", display: "block" }} />
                                {isHome && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />}
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>

            {/* Background Texture Overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", background: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        </section>
    );
}
