import React, { useState } from "react";
import { FiSave, FiUser, FiGlobe, FiShare2, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../../components/common/Toast";
import { useWindowSize } from "../../hooks/useWindowSize";

const SettingSection = ({ title, icon: Icon, children, width }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: width < 640 ? "24px 20px" : "32px",
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

const InputGroup = ({ label, placeholder, type = "text", value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input 
          type={isPassword ? (showPassword ? "text" : "password") : type} 
          defaultValue={value}
          placeholder={placeholder} 
          style={{
            width: "100%",
            padding: isPassword ? "12px 48px 12px 16px" : "12px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            color: "#fff",
            outline: "none",
            boxSizing: "border-box"
          }} 
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.3)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px"
            }}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const Settings = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const { width } = useWindowSize();

  const handleSave = () => {
    setShowToast(true);
  };

  const tabs = [
    { id: "general", label: "General", icon: FiUser },
    { id: "seo", label: "SEO & Global", icon: FiGlobe },
    { id: "social", label: "Social", icon: FiShare2 },
    { id: "security", label: "Security", icon: FiLock }
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "flex",
        flexDirection: width < 640 ? "column" : "row",
        justifyContent: "space-between",
        alignItems: width < 640 ? "flex-start" : "center",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <div>
          <h2 style={{ 
            fontSize: width < 640 ? "1.6rem" : "2rem", 
            fontFamily: "Antonio, sans-serif", 
            marginBottom: "8px" 
          }}>
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
            cursor: "pointer",
            width: width < 640 ? "100%" : "auto"
          }}
        >
          <FiSave size={20} />
          Save Changes
        </motion.button>
      </div>

      {/* Tabs Header */}
      <div style={{ 
        display: "flex", 
        gap: "4px", 
        marginBottom: "32px", 
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "8px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: activeTab === tab.id ? "rgba(196, 255, 107, 0.1)" : "transparent",
              color: activeTab === tab.id ? "var(--accent)" : "rgba(255,255,255,0.4)",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s",
              whiteSpace: "nowrap",
              fontSize: "0.9rem",
              fontWeight: "600"
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "general" && (
          <SettingSection title="General Profile" icon={FiUser} width={width}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup label="Full Name" value="Srikanth" />
              <InputGroup label="Job Title" value="Full Stack Developer & AI Enthusiast" />
            </div>
            <InputGroup label="Bio" placeholder="Tell people about yourself..." />
          </SettingSection>
        )}

        {activeTab === "seo" && (
          <SettingSection title="SEO & Global" icon={FiGlobe} width={width}>
            <InputGroup label="Site Title" value="Srikanth | Portfolio" />
            <InputGroup label="Meta Description" placeholder="SEO description for Google..." />
            <InputGroup label="Google Analytics ID" placeholder="UA-XXXXXXXXX-X" />
          </SettingSection>
        )}

        {activeTab === "social" && (
          <SettingSection title="Social Connections" icon={FiShare2} width={width}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup label="GitHub URL" value="github.com/srikanth" />
              <InputGroup label="LinkedIn URL" value="linkedin.com/in/srikanth" />
              <InputGroup label="Twitter/X URL" value="twitter.com/srikanth" />
              <InputGroup label="Instagram URL" value="instagram.com/srikanth" />
            </div>
          </SettingSection>
        )}

        {activeTab === "security" && (
          <SettingSection title="Security" icon={FiLock} width={width}>
            <InputGroup label="New Admin Password" type="password" placeholder="Leave blank to keep current" />
          </SettingSection>
        )}
      </motion.div>


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

