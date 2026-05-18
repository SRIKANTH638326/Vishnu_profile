import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail, FiGlobe, FiTwitter, FiInstagram, FiBookOpen, FiYoutube } from "react-icons/fi";
import { adminService } from "../../services/adminService";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await adminService.getSocials();
            if (data && data.length > 0) {
                setSocials(data);
            } else {
                setSocials([
                    { platform: "LinkedIn", url: "https://www.linkedin.com/in/srikanthc-270b00347", icon: "Linkedin" },
                    { platform: "GitHub", url: "https://github.com/srikanth638326", icon: "Github" },
                    { platform: "Email", url: "mailto:srikanthc061@gmail.com", icon: "Mail" },
                    { platform: "Portfolio", url: "https://srikanthc.dev", icon: "Globe" }
                ]);
            }
        };
        load();
    }, []);

    const getIconComponent = (iconName) => {
        switch (iconName?.toLowerCase()) {
            case "linkedin": return <FiLinkedin size={20} />;
            case "github": return <FiGithub size={20} />;
            case "twitter": return <FiTwitter size={20} />;
            case "instagram": return <FiInstagram size={20} />;
            case "youtube": return <FiYoutube size={20} />;
            case "mail": return <FiMail size={20} />;
            case "behance": return <FiBookOpen size={20} />;
            default: return <FiGlobe size={20} />;
        }
    };

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
                

                {/* Sub-capabilities list
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
                </div> */}

                {/* Horizontal Full Width Divider
                <div style={{ 
                    width: "100%", 
                    height: "1px", 
                    background: "rgba(255, 255, 255, 0.08)", 
                    marginBottom: "48px" 
                }} /> */}

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
                    {socials.map((social, i) => (
                        <motion.a
                            key={social._id || i}
                            href={social.url}
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
                            {getIconComponent(social.icon)}
                        </motion.a>
                    ))}
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
                    © {currentYear} All Rights Reserved.
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
