import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail, FiGlobe } from "react-icons/fi";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FiLinkedin, href: "https://www.linkedin.com/in/srikanthc-270b00347", label: "LinkedIn" },
        { icon: FiGithub, href: "https://github.com/srikanth638326", label: "GitHub" },
        { icon: FiMail, href: "mailto:srikanthc061@gmail.com", label: "Email" },
        { icon: FiGlobe, href: "https://srikanthc.dev", label: "Portfolio" }
    ];

    const navLinks = [
        { label: "Works", to: "/projects" },
        { label: "Services", to: "/#Services" },
        { label: "About", to: "/about-us" },
        { label: "Pricing", to: "/contact-us" },
        { label: "Contact us", to: "/contact-us" }
    ];

    return (
        <footer style={{ 
            background: "#080808", 
            color: "#fff", 
            padding: "80px 0 40px 0", 
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "var(--font-body)",
            position: "relative",
            overflow: "hidden"
        }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                
                {/* Logo and Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    {/* Squircle logo mark */}
                    <div style={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "10px", 
                        background: "#fff", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: "18px",
                            height: "18px",
                            background: "#080808",
                            transform: "rotate(45deg) translate(-2px, -2px)",
                            borderRadius: "2px"
                        }} />
                    </div>
                    <span style={{ 
                        fontSize: "24px", 
                        fontWeight: "800", 
                        letterSpacing: "1px", 
                        fontFamily: "var(--font-heading)",
                        textTransform: "uppercase"
                    }}>
                        SRI_
                    </span>
                </div>

                {/* Sub-capabilities list */}
                <div className="footer-capabilities" style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "24px", 
                    flexWrap: "wrap",
                    marginBottom: "48px",
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                }}>
                    <span>• WEB DEVELOPMENT</span>
                    <span>• UI/UX DESIGN</span>
                    <span>• DATA ANALYTICS</span>
                </div>

                {/* Horizontal Full Width Divider */}
                <div style={{ 
                    width: "100%", 
                    height: "1px", 
                    background: "rgba(255, 255, 255, 0.08)", 
                    marginBottom: "48px" 
                }} />

                {/* Middle Row Navigation */}
                <div className="footer-menu" style={{ 
                    display: "flex", 
                    gap: "36px", 
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginBottom: "40px" 
                }}>
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label} 
                            to={link.to} 
                            style={{ 
                                color: "rgba(255, 255, 255, 0.8)", 
                                fontSize: "15px", 
                                fontWeight: "500",
                                transition: "0.3s",
                                cursor: "none"
                            }}
                            className="footer-menu-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Squircle Social Icons Row */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "48px" }}>
                    {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "14px",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    transition: "all 0.3s",
                                    cursor: "none"
                                }}
                                className="social-squircle"
                            >
                                <IconComponent size={20} />
                            </motion.a>
                        );
                    })}
                </div>

                {/* Legal Policy Links */}
                <div style={{ 
                    display: "flex", 
                    gap: "16px", 
                    fontSize: "13px", 
                    color: "rgba(255, 255, 255, 0.4)", 
                    marginBottom: "16px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    <a href="#" className="legal-link">Terms & Conditions</a>
                    <span>|</span>
                    <a href="#" className="legal-link">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" className="legal-link">Disclosures</a>
                </div>

                {/* Copyright info */}
                <div style={{ 
                    fontSize: "12px", 
                    color: "rgba(255, 255, 255, 0.3)",
                    textAlign: "center"
                }}>
                    © {currentYear} SRI_. All Rights Reserved.
                </div>

            </div>

            {/* Hover styling injection */}
            <style>{`
                .footer-menu-link:hover {
                    color: var(--accent) !important;
                }
                .social-squircle:hover {
                    background: var(--accent) !important;
                    color: #000 !important;
                    border-color: var(--accent) !important;
                    box-shadow: 0 8px 24px rgba(196, 255, 107, 0.2);
                }
                .legal-link {
                    color: inherit;
                    transition: 0.3s;
                    cursor: none;
                }
                .legal-link:hover {
                    color: rgba(255, 255, 255, 0.8);
                }
                @media (max-width: 640px) {
                    .footer-capabilities {
                        flex-direction: column;
                        align-items: center;
                        gap: 12px;
                    }
                    .footer-menu {
                        gap: 20px;
                        flex-direction: column;
                        align-items: center;
                    }
                }
            `}</style>
        </footer>
    );
}
