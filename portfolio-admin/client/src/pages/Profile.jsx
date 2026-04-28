import React, { useState } from "react";
import { FiSave, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import { Toast } from "../components/Toast"; // Assuming you have a Toast component in components

const InputGroup = ({ label, placeholder, type = "text", value, icon: Icon }) => (
  <div style={{ marginBottom: "24px" }}>
    <label style={{ 
      display: "block", 
      marginBottom: "10px", 
      fontSize: "0.9rem", 
      fontWeight: "500",
      color: "rgba(255, 255, 255, 0.5)" 
    }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      {Icon && <Icon style={{
        position: "absolute",
        left: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--accent-color)",
        opacity: 0.6
      }} size={18} />}
      <input 
        type={type} 
        defaultValue={value}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: Icon ? "14px 16px 14px 48px" : "14px 16px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "14px",
          color: "#fff",
          outline: "none",
          fontSize: "1rem",
          transition: "0.3s"
        }}
      />
    </div>
  </div>
);

const Profile = () => {
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
            MY PROFILE
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)", marginTop: "8px" }}>
            Update your personal information and professional bio.
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
          Save Changes
        </motion.button>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", 
        gap: "40px" 
      }}>
        {/* Profile Picture Section */}
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "180px", 
            height: "180px", 
            borderRadius: "50%", 
            background: "rgba(255, 255, 255, 0.03)", 
            border: "2px dashed rgba(255, 255, 255, 0.1)",
            margin: "0 auto 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden"
          }}>
            <FiUser size={48} style={{ color: "rgba(255, 255, 255, 0.2)", marginBottom: "12px" }} />
            <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.4)" }}>Upload Photo</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.3)" }}>
            Allowed JPG, GIF or PNG. Max size of 2MB
          </p>
        </div>

        {/* Form Section */}
        <div style={{ 
          background: "rgba(255, 255, 255, 0.02)", 
          padding: isMobile ? "24px" : "40px", 
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
            gap: "24px" 
          }}>
            <InputGroup label="Full Name" icon={FiUser} value="Srikanth" />
            <InputGroup label="Email Address" icon={FiMail} value="srikanth@example.com" />
            <InputGroup label="Phone Number" icon={FiPhone} value="+1 (555) 000-0000" />
            <InputGroup label="Location" icon={FiMapPin} value="Hyderabad, India" />
          </div>

          <div style={{ marginTop: "12px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontSize: "0.9rem", 
              fontWeight: "500",
              color: "rgba(255, 255, 255, 0.5)" 
            }}>
              Professional Bio
            </label>
            <textarea 
              defaultValue="I am a passionate Full Stack Developer and UI/UX Designer specialized in creating premium web experiences."
              style={{
                width: "100%",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "14px",
                color: "#fff",
                outline: "none",
                fontSize: "1rem",
                minHeight: "150px",
                resize: "vertical"
              }}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <Toast 
          message="Profile updated successfully!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default Profile;
