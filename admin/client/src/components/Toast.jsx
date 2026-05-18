import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

export const Toast = ({ message, type = "success", onClose }) => {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: isSuccess ? "#c4ff6b" : "#ff4d4d",
          color: "#000",
          padding: "16px 24px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          zIndex: 9999,
          fontWeight: "600",
        }}
      >
        {isSuccess ? <FiCheckCircle size={20} /> : <FiXCircle size={20} />}
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#000",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
            marginLeft: "8px",
            opacity: 0.7,
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
        >
          <FiX size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
