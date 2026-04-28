import React, { useState } from "react";
import { FiSave, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../../components/common/Toast";
import { useWindowSize } from "../../hooks/useWindowSize";

const ProfileSection = ({ title, icon: Icon, children, width }) => (
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

export const Profile = () => {
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const handleSave = () => {
    setShowToast(true);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: FiUser },
    { id: "contact", label: "Contact Details", icon: FiMail }
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
            My Profile
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Manage your personal details and contact information.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          Save Profile
        </motion.button>
      </div>

      {/* Tabs Header */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        marginBottom: "32px", 
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "8px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              background: activeTab === tab.id ? "rgba(196, 255, 107, 0.1)" : "transparent",
              color: activeTab === tab.id ? "var(--accent)" : "rgba(255,255,255,0.4)",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s",
              whiteSpace: "nowrap",
              fontSize: "0.95rem",
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "personal" && (
          <ProfileSection title="Personal Information" icon={FiUser} width={width}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 480 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup label="First Name" value="Srikanth" />
              <InputGroup label="Last Name" value="Vishnu" />
            </div>
            <InputGroup label="Professional Bio" placeholder="Short bio for your profile..." />
          </ProfileSection>
        )}

        {activeTab === "contact" && (
          <ProfileSection title="Contact Details" icon={FiMail} width={width}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 480 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup label="Email Address" value="admin@example.com" />
              <InputGroup label="Phone Number" value="+1 234 567 890" />
            </div>
            <InputGroup label="Location" icon={FiMapPin} value="San Francisco, CA" />
          </ProfileSection>
        )}
      </motion.div>

      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Profile updated successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
