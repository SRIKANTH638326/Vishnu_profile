import { useState } from "react";
import { motion } from "framer-motion";
import portrait from "../../assets/hero-portrait.png";

export function Contact() {
    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [sent, setSent] = useState(false);

    const submit = () => {
        if (form.name && form.email && form.message) {
            setSent(true);
            setTimeout(() => setSent(false), 3000);
            setForm({ name: "", email: "", service: "", message: "" });
        }
    };

    return (
        <section id="Contact" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container" style={{ maxWidth: 1000 }}>
                <div className="grid-2" style={{ alignItems: "center" }}>
                    
                    {/* Left Column: Portrait */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ position: "relative", justifySelf: "center", width: "100%", maxWidth: 360, margin: "0 auto" }}
                    >
                        <div style={{ borderRadius: 16, overflow: "hidden", background: "#f3f3f3" }}>
                            <img src={portrait} alt="Portrait" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", filter: "brightness(0.95)" }} />
                        </div>
                        {/* Hand Badge */}
                        <div style={{ 
                            position: "absolute", 
                            bottom: -20, 
                            left: -20, 
                            width: 80, 
                            height: 80, 
                            borderRadius: "50%", 
                            background: "var(--accent)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                        }}>
                            <span style={{ fontSize: 32, color: "#000" }}>✋🏼</span>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: "clamp(2.5rem, 5vw, 4rem)", 
                            fontWeight: 700, 
                            textTransform: "uppercase", 
                            lineHeight: 1, 
                            marginBottom: 16 
                        }}>
                            LET'S WORK TOGETHER
                        </h2>
                        <p style={{ color: "var(--secondary-text)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 40, maxWidth: 400 }}>
                            Let's build something impactful together—whether it's your brand, your website, or your next big idea.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {/* Row 1: Name and Email */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8, fontFamily: "var(--font-heading)" }}>Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Smith" 
                                        value={form.name} 
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "none", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8, fontFamily: "var(--font-heading)" }}>Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="johnsmith@gmail.com" 
                                        value={form.email} 
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "none", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Service Needed */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8, fontFamily: "var(--font-heading)" }}>Service Needed ?</label>
                                <div style={{ position: "relative" }}>
                                    <select 
                                        value={form.service} 
                                        onChange={e => setForm({ ...form, service: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "none", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "inherit", appearance: "none" }}
                                    >
                                        <option value="" disabled style={{ color: "rgba(255,255,255,0.5)" }}>Select...</option>
                                        <option value="ui_ux" style={{ background: "#222" }}>UI/UX Design</option>
                                        <option value="dev" style={{ background: "#222" }}>Web Development</option>
                                        <option value="data" style={{ background: "#222" }}>Data Analytics</option>
                                        <option value="other" style={{ background: "#222" }}>Other</option>
                                    </select>
                                    <div style={{ position: "absolute", right: 16, top: 18, pointerEvents: "none", color: "var(--secondary-text)" }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Message */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8, fontFamily: "var(--font-heading)" }}>What Can I Help You...</label>
                                <textarea 
                                    rows={4} 
                                    placeholder="Hello, I'd like to enquire about..." 
                                    value={form.message} 
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "none", color: "var(--text)", fontSize: 14, outline: "none", resize: "none", fontFamily: "inherit" }}
                                />
                            </div>

                            {/* Action Button */}
                            <div style={{ marginTop: 8 }}>
                                <button 
                                    onClick={submit}
                                    style={{ 
                                        padding: "12px 32px", 
                                        borderRadius: 100, 
                                        background: "transparent", 
                                        border: "1px solid var(--accent)", 
                                        color: "var(--accent)", 
                                        fontFamily: "var(--font-heading)", 
                                        fontWeight: 700, 
                                        fontSize: 16, 
                                        textTransform: "uppercase", 
                                        cursor: "pointer", 
                                        transition: "all 0.3s",
                                        letterSpacing: "0.05em"
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#000"; e.currentTarget.style.transform = "scale(1.05)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "scale(1)"; }}
                                >
                                    {sent ? "SENT!" : "SUBMIT"}
                                </button>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
