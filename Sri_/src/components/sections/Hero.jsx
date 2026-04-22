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
                <div className="hero-flex-container">
                    
                    {/* Left Side: Name + DIGITAL */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-left"
                    >
                        <span className="hero-name-label">
                            Srikanth
                        </span>
                        <h1 className="hero-main-title">
                            Digital
                        </h1>
                    </motion.div>

                    {/* Center Side: Portrait Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="hero-portrait-wrap"
                    >
                        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                            <div className="hero-portrait-card">
                                <img src={portrait} alt="Srikanth" style={{ width: "100%", height: "auto", display: "block" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                            </div>

                            {/* "Hi" Bubble */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                                className="hero-hi-bubble"
                                style={{ transform: "translateZ(80px)" }}
                            >
                                <span style={{ color: "#000", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800 }}>Hi</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: DESIGNER + Intro */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hero-right"
                    >
                        <h1 className="hero-main-title designer-title">
                            Designer
                        </h1>
                        <p className="hero-intro-text">
                            Product Designer & Data Analyst blending aesthetics with insights.
                        </p>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .hero-flex-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                }
                .hero-left { text-align: right; flex: 1; }
                .hero-right { text-align: left; flex: 1; }
                
                .hero-name-label {
                    font-family: var(--font-heading);
                    font-size: 20px;
                    fontWeight: 700;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    display: block;
                    color: var(--secondary-text);
                }
                .hero-main-title {
                    font-family: var(--font-heading);
                    font-size: clamp(3.5rem, 10vw, 11rem);
                    font-weight: 700;
                    text-transform: uppercase;
                    line-height: 0.85;
                    margin: 0;
                }
                .hero-portrait-wrap {
                    position: relative;
                    width: 100%;
                    max-width: 420px;
                    perspective: 2000;
                    z-index: 10;
                    flex-shrink: 0;
                }
                .hero-portrait-card {
                    position: relative;
                    border-radius: 48px;
                    overflow: hidden;
                    border: 1px solid var(--border);
                    box-shadow: 0 50px 100px -20px rgba(0,0,0,0.7);
                }
                .hero-hi-bubble {
                    position: absolute;
                    bottom: 2%;
                    left: -6%;
                    width: clamp(70px, 8vw, 110px);
                    height: clamp(70px, 8vw, 110px);
                    border-radius: 50%;
                    background: var(--accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 20px 40px #c4ff6b66;
                }
                .hero-intro-text {
                    color: var(--secondary-text);
                    font-size: clamp(0.9rem, 1vw, 1.15rem);
                    line-height: 1.4;
                    max-width: 280px;
                }

                @media (max-width: 1100px) {
                    .hero-flex-container {
                        gap: 20px;
                    }
                    .hero-main-title {
                        font-size: clamp(3rem, 8vw, 8rem);
                    }
                }

                @media (max-width: 992px) {
                    .hero-flex-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 48px;
                    }
                    .hero-left, .hero-right {
                        text-align: center;
                        flex: none;
                    }
                    .hero-intro-text {
                        margin: 0 auto;
                    }
                    .hero-portrait-wrap {
                        max-width: 340px;
                        order: -1; 
                    }
                    .designer-title {
                        margin-bottom: 12px;
                    }
                }
                @media (max-width: 480px) {
                    .hero-portrait-wrap {
                        max-width: 260px;
                    }
                }
            `}</style>

            {/* Background Texture Overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", background: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

            {/* Background Texture Overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", background: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        </section>
    );
}
