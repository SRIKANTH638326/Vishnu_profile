import React, { useState } from "react";
import { FiSave, FiLock, FiGlobe, FiBell, FiShield, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { Toast } from "../components/Toast";

const SettingSection = ({ title, description, children }) => (
  <div style={{ 
    background: "rgba(255, 255, 255, 0.02)", 
    padding: "32px", 
    borderRadius: "24px", 
    border: "1px solid rgba(255, 255, 255, 0.05)",
    marginBottom: "24px" 
  }}>
    <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px", color: "#fff" }}>{title}</h3>
    <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.9rem", marginBottom: "24px" }}>{description}</p>
    {children}
  </div>
);

const Settings = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center", 
        marginBottom: "40px",
        gap: "20px"
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontFamily: "Antonio, sans-serif", margin: 0, color: "var(--accent-color)" }}>
            SETTINGS
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)", marginTop: "8px" }}>
            Manage your account preferences and site-wide configurations.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px",
            background: "var(--accent-color)",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            width: isMobile ? "100%" : "auto",
            justifyContent: "center"
          }}
        >
          <FiSave size={20} />
          Save All
        </motion.button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Account Settings */}
        <SettingSection 
          title="Security & Access" 
          description="Update your password and manage authentication methods."
        >
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={labelStyle}>New Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirm New Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>
          </div>
        </SettingSection>

        {/* Social Connections */}
        <SettingSection 
          title="Social Connections" 
          description="Link your professional profiles to your public portfolio."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: FiGithub, label: "GitHub Profile", value: "https://github.com/srikanth" },
              { icon: FiLinkedin, label: "LinkedIn Profile", value: "https://linkedin.com/in/srikanth" },
              { icon: FiTwitter, label: "Twitter Profile", value: "https://twitter.com/srikanth" }
            ].map((social, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "16px",
                background: "rgba(255, 255, 255, 0.02)",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}>
                <social.icon size={20} style={{ color: "var(--accent-color)" }} />
                <input 
                  type="text" 
                  defaultValue={social.value} 
                  style={{ 
                    flex: 1, 
                    background: "none", 
                    border: "none", 
                    color: "#fff", 
                    outline: "none",
                    fontSize: "0.95rem"
                  }} 
                />
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection 
          title="Email Notifications" 
          description="Choose which events you'd like to be notified about."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "New inquiry from contact form", defaultChecked: true },
              { label: "Weekly analytics summary", defaultChecked: false },
              { label: "Security alerts and login attempts", defaultChecked: true }
            ].map((pref, i) => (
              <label key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "16px", 
                cursor: "pointer",
                padding: "8px 0"
              }}>
                <div style={{ position: "relative", width: "40px", height: "20px" }}>
                  <input type="checkbox" defaultChecked={pref.defaultChecked} style={{ display: "none" }} id={`check-${i}`} />
                  <div style={{ 
                    width: "40px", 
                    height: "20px", 
                    background: pref.defaultChecked ? "var(--accent-color)" : "rgba(255, 255, 255, 0.1)", 
                    borderRadius: "20px",
                    transition: "0.3s"
                  }}>
                    <div style={{ 
                      width: "16px", 
                      height: "16px", 
                      background: pref.defaultChecked ? "#000" : "#fff", 
                      borderRadius: "50%", 
                      position: "absolute",
                      top: "2px",
                      left: pref.defaultChecked ? "22px" : "2px",
                      transition: "0.3s"
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.8)" }}>{pref.label}</span>
              </label>
            ))}
          </div>
        </SettingSection>
      </div>

      {showToast && (
        <Toast 
          message="Settings saved successfully!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

const labelStyle = { display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" };
const inputStyle = { 
  width: "100%", 
  padding: "14px 16px", 
  background: "rgba(255, 255, 255, 0.03)", 
  border: "1px solid rgba(255, 255, 255, 0.05)", 
  borderRadius: "14px", 
  color: "#fff", 
  outline: "none",
  transition: "0.3s"
};

export default Settings;
