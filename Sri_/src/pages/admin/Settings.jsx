import React, { useState } from "react";
import { FiSave, FiUser, FiGlobe, FiShare2, FiLock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../../components/common/Toast";


const SettingSection = ({ title, icon: Icon, children }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "32px",
    marginBottom: "24px"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <div style={{ color: "var(--accent)" }}><Icon size={20} /></div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{title}</h3>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type = "text", value }) => (
  <div>
    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>{label}</label>
    <input 
      type={type} 
      defaultValue={value}
      placeholder={placeholder} 
      style={{
        width: "100%",
        padding: "12px 16px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        color: "#fff",
        outline: "none"
      }} 
    />
  </div>
);

export const Settings = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
            Settings
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Configure your portfolio's global identity and security.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <FiSave size={20} />
          Save Changes
        </motion.button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <SettingSection title="General Profile" icon={FiUser}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <InputGroup label="Full Name" value="Srikanth" />
            <InputGroup label="Job Title" value="Full Stack Developer & AI Enthusiast" />
          </div>
          <InputGroup label="Bio" placeholder="Tell people about yourself..." />
        </SettingSection>

        <SettingSection title="SEO & Global" icon={FiGlobe}>
          <InputGroup label="Site Title" value="Srikanth | Portfolio" />
          <InputGroup label="Meta Description" placeholder="SEO description for Google..." />
          <InputGroup label="Google Analytics ID" placeholder="UA-XXXXXXXXX-X" />
        </SettingSection>

        <SettingSection title="Social Connections" icon={FiShare2}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <InputGroup label="GitHub URL" value="github.com/srikanth" />
            <InputGroup label="LinkedIn URL" value="linkedin.com/in/srikanth" />
            <InputGroup label="Twitter/X URL" value="twitter.com/srikanth" />
            <InputGroup label="Instagram URL" value="instagram.com/srikanth" />
          </div>
        </SettingSection>

        <SettingSection title="Security" icon={FiLock}>
          <InputGroup label="New Admin Password" type="password" placeholder="Leave blank to keep current" />
        </SettingSection>
      </div>


      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Settings saved successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

