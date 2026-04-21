import { ThemeToggle } from "../common/ThemeToggle";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import portrait from "../../assets/hero-portrait.png";
export function Hero({ theme, toggleTheme }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="Hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            style={{ 
                minHeight: "100vh", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                position: "relative", 
                overflow: "hidden", 
                background: "var(--bg)",
                padding: "80px 0"
            }}>
            
            {/* Ornament: Floating Dot */}
            <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", top: "20%", left: "15%", width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 20px var(--accent)", opacity: 0.6 }} 
            />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ 
                    display: "flex", 
                    flexDirection: window.innerWidth > 992 ? "row" : "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: "clamp(20px, 4vw, 40px)"
                }}>
                    
                    {/* Left Side: Name + DIGITAL */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ textAlign: window.innerWidth > 992 ? "right" : "center", flex: 1 }}
                    >
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, textTransform: "uppercase", marginBottom: 8, display: "block", color: "var(--secondary-text)" }}>
                            Srikanth
                        </span>
                        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3.5rem, 8.5vw, 9.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.85, margin: 0 }}>
                            Digital
                        </h1>
                    </motion.div>

                    {/* Center Side: Portrait Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        style={{ position: "relative", width: "auto", maxWidth: 800, perspective: 2000, zIndex: 10 }}
                    >
                        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                            <div style={{ 
                                position: "relative", 
                                borderRadius: 48, 
                                overflow: "hidden", 
                                border: "1px solid var(--border)",
                                boxShadow: "0 100px 150px -50px rgba(0,0,0,0.9)"
                            }}>
                                <img src={portrait} alt="Srikanth" style={{ width: "100%", height: "auto", display: "block" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                            </div>

                            {/* "Hi" Bubble */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                                style={{ 
                                    position: "absolute",
                                    bottom: "2%",
                                    left: "-6%",
                                    width: 130,
                                    height: 130,
                                    borderRadius: "50%",
                                    background: "var(--accent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 20px 40px #c4ff6b66",
                                    transform: "translateZ(80px)"
                                }}
                            >
                                <span style={{ color: "#000", fontSize: 36, fontWeight: 800 }}>Hi</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: DESIGNER + Intro */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ textAlign: window.innerWidth > 992 ? "left" : "center", flex: 1 }}
                    >
                        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3.5rem, 8.5vw, 9.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.85, margin: 0, marginBottom: 20 }}>
                            Designer
                        </h1>
                        <p style={{ color: "var(--secondary-text)", fontSize: "clamp(0.9rem, 1vw, 1.15rem)", lineHeight: 1.4, maxWidth: 280, marginLeft: window.innerWidth > 992 ? 0 : "auto", marginRight: window.innerWidth > 992 ? 0 : "auto" }}>
                            Product Designer & Data Analyst blending aesthetics with insights.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", background: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

            {/* Theme Toggle Button */}
            <div style={{ 
                position: "absolute", 
                bottom: "40px", 
                left: "50%", 
                transform: "translateX(-50%)",
                zIndex: 100 
            }}>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </section>
    );
}
