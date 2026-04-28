import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Subtle scrollbar style so the user knows it's scrollable
const scrollbarStyle = `
  .admin-nav::-webkit-scrollbar { width: 6px; }
  .admin-nav::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
  .admin-nav::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
  .admin-nav::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
`;

import {
  FiGrid,
  FiFileText,
  FiBriefcase,
  FiLogOut,
  FiSidebar,
  FiAward,
  FiZap,
  FiLayers,
  FiUser
} from "react-icons/fi";
import { useAdmin } from "../../context/AdminContext";

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <motion.div
      whileHover={{ x: 5 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 20px",
        borderRadius: "12px",
        background: active ? "#000000" : "transparent",
        color: active ? "#c4ff6b" : "#000000",
        transition: "0.3s",
        marginBottom: "8px",
        fontWeight: active ? "600" : "500",
        boxShadow: active ? "0 4px 12px rgba(0,0,0,0.15)" : "none"
      }}
    >
      <Icon size={20} />
      <span style={{ fontSize: "0.95rem" }}>{label}</span>
    </motion.div>
  </Link>
);


export const Sidebar = ({ isOpen, toggle, isMobile }) => {
  const location = useLocation();
  const { logout } = useAdmin();

  const mainItems = [
    { to: "/admin/dashboard",    icon: FiGrid,       label: "Dashboard"    },
    { to: "/admin/projects",     icon: FiFileText,   label: "Project"      },
    { to: "/admin/skills",       icon: FiZap,        label: "Skills"       },
    { to: "/admin/experience",   icon: FiAward,      label: "Experience"   },
    { to: "/admin/services",     icon: FiLayers,     label: "Services"     },
    { to: "/admin/profile",      icon: FiUser,       label: "Profile"      },
    { to: "/admin/settings",     icon: FiBriefcase,  label: "Settings"     },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ 
        x: isOpen ? 0 : (isMobile ? "-110%" : "-100%"),
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        width: "280px",
        height: isMobile ? "calc(100vh - 20px)" : "calc(100vh - 40px)",
        background: "#c4ff6b",
        margin: isMobile ? "10px" : "20px",
        borderRadius: "32px",
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}
    >
      <style>{scrollbarStyle}</style>

      {/* Top Header */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
          marginBottom: "24px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "#000",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c4ff6b",
              fontWeight: "bold",
              fontSize: "1.2rem"
            }}>S</div>
            <span style={{ color: "#000", fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "1px" }}>SRI_</span>
          </div>
          <FiSidebar 
            onClick={toggle}
            color="#000" 
            size={24} 
            style={{ cursor: "pointer", opacity: 0.6 }} 
          />
        </div>
        <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "20px" }}></div>
      </div>

      {/* Main Menu — explicitly scrollable */}
      <nav 
        className="admin-nav" 
        data-lenis-prevent="true"
        style={{ 
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          height: "100%", /* Additional robustness for flex scroll */
          paddingRight: "8px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {mainItems.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            active={location.pathname === item.to}
          />
        ))}
      </nav>

      {/* Logout — fixed at bottom */}
      <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }}>
        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 20px",
            borderRadius: "12px",
            background: "rgba(255, 0, 0, 0.1)",
            color: "#D00",
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s",
            fontSize: "1rem",
            fontWeight: "600"
          }}
        >
          <FiLogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
};
