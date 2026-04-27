import { motion } from "framer-motion";
import portrait from "../../assets/hero-portrait.png";

export function About({ hideImage = false }) {
    return (
        <section id="About" style={{ padding: hideImage ? "80px 0" : "160px 0 100px", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
            <div className="container">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 80, flexWrap: "wrap" }}>
                    
                    {/* Left Column: Text Content */}
                    <div style={{ flex: hideImage ? "1" : "1.2", minWidth: 320 }}>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 style={{ 
                                fontFamily: "var(--font-heading)", 
                                fontSize: "clamp(5rem, 12vw, 10rem)", 
                                fontWeight: 800, 
                                textTransform: "uppercase", 
                                lineHeight: 0.8, 
                                color: "#fff",
                                marginBottom: 40,
                                letterSpacing: "-0.02em"
                            }}>
                                About Me
                            </h1>

                            <h2 style={{ 
                                fontSize: "clamp(1.5rem, 3vw, 2.5rem)", 
                                fontWeight: 700, 
                                textTransform: "uppercase", 
                                color: "#fff",
                                marginBottom: 24,
                                letterSpacing: "0.02em"
                            }}>
                                Srikanth C
                            </h2>

                            <div style={{ maxWidth: 540 }}>
                                <p style={{ 
                                    fontSize: "clamp(1rem, 1.2vw, 1.25rem)", 
                                    lineHeight: 1.6, 
                                    color: "rgba(255,255,255,0.8)", 
                                    marginBottom: 24,
                                    position: "relative"
                                }}>
                                    I'm a digital designer and Framer developer passionate about crafting meaningful, user-centered experiences.
                                    <span style={{ 
                                        display: "inline-block", 
                                        width: 10, 
                                        height: 10, 
                                        borderRadius: "50%", 
                                        background: "var(--accent)", 
                                        marginLeft: 12,
                                        verticalAlign: "middle"
                                    }} />
                                </p>
                                <p style={{ 
                                    fontSize: "clamp(1rem, 1.2vw, 1.25rem)", 
                                    lineHeight: 1.6, 
                                    color: "rgba(255,255,255,0.8)", 
                                    marginBottom: 48 
                                }}>
                                    With a strong foundation in visual design and a deep understanding of interactive systems, I bring ideas to life through thoughtful design, smooth animations, and responsive layouts.
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div style={{ display: "flex", gap: 24 }}>
                                {[
                                    { id: 'x', path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                                    { id: 'ig', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                                    { id: 'be', path: "M15.3 15.5c0 2.8-2.2 5-4.9 5H3V3.5h7.4c2.7 0 4.9 2.2 4.9 5 0 1.2-.4 2.3-1.1 3.2.7.9 1.1 2 1.1 3.3zm-7.4-7.1H5.4v2.2h2.5c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zm0 7.1H5.4v2.2h2.5c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zm13.1-4c0-2.8-2.2-5.1-4.9-5.1s-4.9 2.3-4.9 5.1 2.2 5.1 4.9 5.1c1.3 0 2.5-.5 3.4-1.3l-1.4-1.4c-.6.5-1.3.8-2 .8-1.2 0-2.3-.9-2.5-2.1h6.9v-1.1zm-6.9-.9c.2-1.2 1.2-2.1 2.5-2.1s2.3.9 2.5 2.1h-5zm0-7.1h4.9V2h-4.9v1.5z" },
                                    { id: 'dr', path: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-1.79-.53-3.626-.247.75 2.02 1.06 3.84 1.144 4.43 1.545-1.19 2.373-2.612 2.482-4.183zm-3.613 5.483c-.114-.73-.5-2.73-1.39-4.882-.03-.01-.06-.01-.092-.01-4.43 0-8.125 3.163-8.872 7.37 1.132.32 2.326.5 3.56.5 2.583 0 4.943-.767 6.794-2.088v.11zm-10.602.82c.706-3.834 4.092-6.726 8.093-6.726.11 0 .22.003.33.006.014-.032.03-.064.043-.097.172-.413.344-.827.493-1.22-.053-.01-.106-.02-.16-.03-2.128-.433-4.398-.246-6.843.555-1.077 1.83-1.68 3.96-1.68 6.236 0 .43.03.85.07 1.266l.247.01zm-1.01-1.923c-.05-.436-.082-.876-.082-1.326 0-2.308.766-4.433 2.045-6.14-.022-.01-.044-.02-.066-.032-1.616-.833-3.15-.99-4.708-.946-.62 1.58-.973 3.314-.973 5.127 0 1.25.174 2.458.502 3.602 1.013-.195 2.12-.31 3.282-.285zm1.09-11.23c1.4-.047 2.766.11 4.225.86 1.11-1.922 2.185-4.22 2.535-5.877-2.062-.51-4.218-.323-6.1.523.23.473.45 1.012.657 1.637l.683 2.857zm7.502-1.92c-.322 1.516-1.3 3.642-2.343 5.513 1.83.56 3.682.887 5.52.99.1-.645.143-1.304.143-1.975 0-1.745-.445-3.385-1.228-4.815-.7.1-1.4.195-2.09.287z" }
                                ].map(social => (
                                    <motion.a 
                                        key={social.id}
                                        href="#" 
                                        whileHover={{ scale: 1.1, color: "var(--accent)" }}
                                        style={{ color: "rgba(255,255,255,0.6)", transition: "0.2s" }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={social.path} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    {!hideImage && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ flex: "1", minWidth: 320, display: "flex", justifyContent: "flex-end" }}
                        >
                            <div style={{ 
                                width: "100%", 
                                maxWidth: 480, 
                                borderRadius: 48, 
                                overflow: "hidden", 
                                border: "1px solid var(--border)",
                                boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
                            }}>
                                <img src={portrait} alt="Srikanth" style={{ width: "100%", height: "auto", display: "block" }} />
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


