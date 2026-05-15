import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiAlertCircle, FiX } from "react-icons/fi";

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "600px",
                background: "#111", // Obsidian dark
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "40px",
                position: "relative",
                textAlign: "center",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
              }}
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  opacity: 0.3
                }}
              >
                <FiX size={24} />
              </button>

              {/* Icon with Glow */}
              <div style={{ position: "relative", marginBottom: "32px", display: "inline-block" }}>
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  background: "var(--accent)", // Lime Green glow
                  borderRadius: "50%",
                  filter: "blur(30px)",
                  opacity: 0.15
                }} />
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(196, 255, 107, 0.1)", // Lime Green tint
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  position: "relative",
                  zIndex: 1
                }}>
                  <FiTrash2 size={40} />
                </div>
              </div>

              {/* Content */}
              <h2 style={{ 
                color: "#fff", 
                fontSize: "1.8rem", 
                fontWeight: "bold", 
                marginBottom: "12px",
                fontFamily: "Antonio, sans-serif" 
              }}>
                {title || "Are you sure?"}
              </h2>
              <p style={{ 
                color: "rgba(255,255,255,0.5)", 
                fontSize: "1rem", 
                lineHeight: "1.6",
                marginBottom: "32px"
              }}>
                {message || "This action cannot be undone. All data associated with this item will be permanently removed."}
              </p>

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={onConfirm}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "var(--accent)", // Lime Green for confirm
                    color: "#000",
                    border: "none",
                    borderRadius: "16px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                >
                  Delete Now
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                >
                  Keep it
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
