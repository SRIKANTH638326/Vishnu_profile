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

                        <div className="contact-form-stack">
                            {/* Row 1: Name and Email */}
                            <div className="contact-row">
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

                            {/* Row 2: Service Needed */}
                            <div className="contact-field">
                                <label className="field-label">Service Needed ?</label>
                                <div style={{ position: "relative" }}>
                                    <select 
                                        value={form.service} 
                                        onChange={e => setForm({ ...form, service: e.target.value })}
                                        className="field-input select-input"
                                    >
                                        <option value="" disabled style={{ color: "rgba(255,255,255,0.5)" }}>Select...</option>
                                        <option value="ui_ux" style={{ background: "#222" }}>UI/UX Design</option>
                                        <option value="dev" style={{ background: "#222" }}>Web Development</option>
                                        <option value="data" style={{ background: "#222" }}>Data Analytics</option>
                                        <option value="other" style={{ background: "#222" }}>Other</option>
                                    </select>
                                    <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--secondary-text)" }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Message */}
                            <div className="contact-field">
                                <label className="field-label">What Can I Help You...</label>
                                <textarea 
                                    rows={4} 
                                    placeholder="Hello, I'd like to enquire about..." 
                                    value={form.message} 
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="field-input field-textarea"
                                />
                            </div>

                            {/* Action Button */}
                            <div style={{ marginTop: 8 }}>
                                <button 
                                    onClick={submit}
                                    className="submit-btn"
                                >
                                    {sent ? "SENT!" : "SUBMIT"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .contact-form-stack { display: flex; flexDirection: column; gap: 20px; }
                .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .field-label { display: block; fontSize: 13px; fontWeight: 700; color: var(--accent); margin-bottom: 8px; font-family: var(--font-heading); text-transform: uppercase; }
                .field-input { width: 100%; padding: 14px 16px; border-radius: 12px; background: rgba(255,255,255,0.08); border: none; color: var(--text); font-size: 14px; outline: none; font-family: inherit; }
                .select-input { appearance: none; }
                .field-textarea { resize: none; }
                .submit-btn { padding: 12px 32px; border-radius: 100px; background: transparent; border: 1px solid var(--accent); color: var(--accent); font-family: var(--font-heading); fontWeight: 700; font-size: 16px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; letter-spacing: 0.05em; }
                
                .submit-btn:hover { background: var(--accent); color: #000; transform: scale(1.05); }

                @media (max-width: 640px) {
                    .contact-row { grid-template-columns: 1fr; }
                }
                @media (max-width: 992px) {
                    #Contact .grid-2 { grid-template-columns: 1fr; gap: 48px; }
                }
            `}</style>
        </section>
    );
}

