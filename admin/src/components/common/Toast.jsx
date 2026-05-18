import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

export const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 10000,
        background: "rgba(20, 20, 20, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        minWidth: "300px"
      }}
    >
      <div style={{
        color: type === "success" ? "#a3e635" : "#ff4d4d",
        display: "flex"
      }}>
        {type === "success" ? <FiCheckCircle size={24} /> : <FiXCircle size={24} />}
      </div>
      
      <div style={{ flex: 1 }}>
        <p style={{ 
          margin: 0, 
          fontSize: "0.95rem", 
          fontWeight: "500",
          color: "#fff" 
        }}>{message}</p>
      </div>

      <button 
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.3)",
          cursor: "pointer",
          display: "flex",
          padding: "4px"
        }}
      >
        <FiX size={18} />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 4, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          background: type === "success" ? "#a3e635" : "#ff4d4d",
          borderRadius: "0 0 0 16px"
        }}
      />
    </motion.div>
  );
};
