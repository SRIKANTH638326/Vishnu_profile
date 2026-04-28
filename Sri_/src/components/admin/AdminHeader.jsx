import React from "react";
import { FiSearch, FiBell, FiUser, FiChevronDown, FiMenu } from "react-icons/fi";
import { useWindowSize } from "../../hooks/useWindowSize";

export const AdminHeader = ({ onMenuClick }) => {
  const { width } = useWindowSize();

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px",
      padding: "20px 4px",
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(10, 10, 10, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.02)"
    }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button 
          onClick={onMenuClick}
          style={{
            display: width <= 1024 ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "14px",
            color: "white",
            cursor: "pointer"
          }}
        >
          <FiMenu size={20} />
        </button>

        {/* Search Bar */}
        <div style={{ 
          position: "relative", 
          width: width < 768 ? "100%" : "400px",
          display: width < 480 ? "none" : "block"
        }}>
          <FiSearch style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255, 255, 255, 0.3)"
          }} size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{
              width: "100%",
              padding: "12px 16px 12px 48px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              color: "#fff",
              outline: "none",
              fontSize: "0.95rem"
            }}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: width < 640 ? "12px" : "24px" }}>
        {/* Notifications */}
        <button style={{
          position: "relative",
          background: "rgba(255, 255, 255, 0.03)",
          border: "none",
          color: "rgba(255, 255, 255, 0.6)",
          width: "44px",
          height: "44px",
          borderRadius: "14px",
          display: width < 480 ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}>
          <FiBell size={20} />
          <span style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "8px",
            height: "8px",
            background: "#ff4d4d",
            borderRadius: "50%",
            border: "2px solid #000"
          }}></span>
        </button>

        {/* Profile Dropdown */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: width < 640 ? "4px" : "6px 6px 6px 16px",
          background: width < 640 ? "transparent" : "rgba(255, 255, 255, 0.03)",
          borderRadius: "16px",
          cursor: "pointer"
        }}>
          <div style={{ display: width < 640 ? "none" : "block", textAlign: "right" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: "600", margin: 0 }}>Srikanth</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", margin: 0 }}>Admin</p>
          </div>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "12px",
            background: "#c4ff6b", // Lime green theme color
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <FiUser size={20} />
          </div>
          <FiChevronDown size={16} color="rgba(255, 255, 255, 0.3)" />
        </div>
      </div>
    </header>
  );
};
