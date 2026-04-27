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
        <section id="Contact" className="section-pad" style={{ background: "var(--bg)", color: "var(--text)", position: "relative", overflow: "hidden" }}>
            <div className="container">
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(40px, 8vw, 100px)", flexWrap: "wrap", justifyContent: "center" }}>
                    
                    {/* Left Column: Portrait with Badge */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ position: "relative", width: "100%", maxWidth: 420 }}
                    >
                        <div style={{ 
                            borderRadius: 32, 
                            overflow: "hidden", 
                            border: "1px solid var(--border)",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
                        }}>
                            <img src={portrait} alt="Portrait" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
                        </div>
                        
                        {/* Special Hand Badge */}
                        <motion.div 
                            initial={{ scale: 0, rotate: -20 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", delay: 0.4 }}
                            style={{ 
                                position: "absolute", 
                                bottom: "5%", 
                                left: "-5%", 
                                width: "clamp(80px, 15vw, 120px)", 
                                height: "clamp(80px, 15vw, 120px)", 
                                borderRadius: "50%", 
                                background: "#C4FF6B", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                                zIndex: 5
                            }}
                        >
                            <span style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#000" }}>🖐️</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ flex: "1", minWidth: 320, maxWidth: 600 }}
                    >
                        <h2 style={{ 
                            fontFamily: "var(--font-heading)", 
                            fontSize: "clamp(3rem, 6vw, 6rem)", 
                            fontWeight: 800, 
                            textTransform: "uppercase", 
                            lineHeight: 0.9, 
                            marginBottom: 24,
                            letterSpacing: "-0.01em"
                        }}>
                            LET'S WORK <br /> TOGETHER
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 1.1vw, 1.15rem)", lineHeight: 1.5, marginBottom: 48, maxWidth: 500 }}>
                            Let's build something impactful together—whether it's your brand, your website, or your next big idea.
                        </p>

                        <div className="contact-form-layout">
                            <div className="contact-grid">
                                <div className="contact-field">
                                    <label className="field-label">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Smith" 
                                        value={form.name} 
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="field-input"
                                    />
                                </div>
                                <div className="contact-field">
                                    <label className="field-label">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="johnsmith@gmail.com" 
                                        value={form.email} 
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="field-input"
                                    />
                                </div>
                            </div>

                            <div className="contact-field">
                                <label className="field-label">Service Needed ?</label>
                                <div style={{ position: "relative" }}>
                                    <select 
                                        value={form.service} 
                                        onChange={e => setForm({ ...form, service: e.target.value })}
                                        className="field-input select-input"
                                    >
                                        <option value="" disabled>Select...</option>
                                        <option value="ui_ux">UI/UX Design</option>
                                        <option value="dev">Web Development</option>
                                        <option value="data">Data Analytics</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.4)" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-field">
                                <label className="field-label">What Can I Help You...</label>
                                <textarea 
                                    rows={5} 
                                    placeholder="Hello, I'd like to enquire about..." 
                                    value={form.message} 
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="field-input field-textarea"
                                />
                            </div>

                            <div style={{ marginTop: 12 }}>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={submit}
                                    className="submit-btn"
                                >
                                    {sent ? "SENT!" : "SUBMIT"}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .contact-form-layout { display: flex; flex-direction: column; gap: 24px; }
                .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .field-label { display: block; font-size: 14px; font-weight: 700; color: #C4FF6B; margin-bottom: 12px; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em; }
                .field-input { width: 100%; padding: 18px 24px; border-radius: 20px; background: #1A1A1A; border: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 15px; outline: none; transition: 0.3s; }
                .field-input:focus { border-color: #C4FF6B; background: #222; }
                .select-input { appearance: none; cursor: pointer; }
                .field-textarea { resize: none; }
                .submit-btn { padding: 16px 48px; border-radius: 100px; background: transparent; border: 1px solid rgba(255,255,255,0.4); color: #fff; font-family: var(--font-heading); font-weight: 700; font-size: 20px; text-transform: uppercase; cursor: pointer; transition: 0.3s; letter-spacing: 0.05em; }
                .submit-btn:hover { border-color: #C4FF6B; color: #C4FF6B; }

                @media (max-width: 640px) {
                    .contact-grid { grid-template-columns: 1fr; }
                    .container { padding: 0 20px; }
                }
            `}</style>
        </section>
    );
}


