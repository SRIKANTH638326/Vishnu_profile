import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export const Modal = ({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              cursor: "pointer"
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: "relative", // Changed from absolute
              width: "90%",
              maxWidth: "640px",
              background: "#0f0f0f",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              overflow: "hidden", // Crucial for header background matching corners
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              zIndex: 1 // Ensure it sits above the absolute backdrop
            }}
          >
            {/* Distinct Header Bar */}
            <div style={{
              background: "#97e94bff", // Dark forest green matching your theme
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#fff", margin: 0 }}>
                  {title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  padding: "4px"
                }}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ 
              maxHeight: "75vh", 
              overflowY: "auto", 
              padding: "32px 24px",
              background: "#0a0a0a"
            }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
