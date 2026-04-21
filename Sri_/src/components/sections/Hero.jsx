import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import portrait from "../../assets/hero-portrait.png";

export function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="Hero" className="hero-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "var(--bg)", paddingTop: 100 }}>
            
            {/* Background Text Layer (Antonio) */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pointerEvents: "none", zIndex: 0, opacity: 0.05 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(8rem, 20vw, 18rem)", fontWeight: 700, lineHeight: 0.8, color: "var(--text)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SRIKANTH
                </h2>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(6rem, 15vw, 12rem)", fontWeight: 400, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                    CREATIVE
                </h2>
            </div>

            <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Floating Badge */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", padding: "10px 20px", borderRadius: 100, display: "flex", alignItems: "center", gap: 10, marginBottom: 40, backdropFilter: "blur(10px)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                    <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", color: "var(--secondary-text)", textTransform: "uppercase" }}>Available for freelance work</span>
                </motion.div>

                {/* Main Portrait with 3D Tilt */}
                <motion.div style={{ position: "relative", width: "100%", maxWidth: 500, rotateX, rotateY, transformStyle: "preserve-3d" }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "circOut" }}
                        style={{ position: "relative", zIndex: 2, borderRadius: 24, overflow: "hidden", boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)" }}>
                        <img src={portrait} alt="Srikanth" style={{ width: "100%", height: "auto", display: "block" }} />
                        
                        {/* Shadow Gradient */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                    </motion.div>

                    {/* Floating Tech Badges */}
                    {[["React", -40, -40], ["UI/UX", 110, -30], ["Data", -30, 80]].map(([label, top, right], i) => (
                        <motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                            style={{ position: "absolute", top: `${top}%`, right: `${right}%`, padding: "8px 16px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "var(--text)", transform: "translateZ(50px)" }}>
                            {label}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Intro Text */}
                <div style={{ textAlign: "center", marginTop: 60, maxWidth: 640 }}>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, textTransform: "uppercase", marginBottom: 20, lineHeight: 1 }}>
                        Crafting <span style={{ color: "var(--accent)" }}>Digital Experiences</span> through Design & Data
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        style={{ color: "var(--secondary-text)", fontSize: "clamp(1rem, 1.2vw, 1.25rem)", lineHeight: 1.6, marginBottom: 40 }}>
                        Hey! I'm Srikanth, a Product Designer & Data Analyst blending aesthetics with insights to build high-performance interfaces.
                    </motion.p>
                    
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" })}
                        style={{ background: "var(--accent)", color: "#000", padding: "18px 48px", borderRadius: 100, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "0.3s" }}>
                        Schedule a Call
                    </motion.button>
                </div>
            </div>

            {/* Scroll Cue */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2 }}
                style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--secondary-text)" }}>Scroll to Explore</span>
                <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
            </motion.div>
        </section>
    );
}
