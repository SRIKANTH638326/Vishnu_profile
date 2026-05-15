import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { motion, AnimatePresence } from "framer-motion";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <style>{`
        .admin-panel, .admin-panel * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      <div className="admin-panel" style={{
        display: "flex",
        background: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text)",
        overflowX: "clip"
      }}>
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} isMobile={isMobile} />

        <main style={{
          flex: 1,
          marginLeft: isMobile ? "0" : (isSidebarOpen ? "320px" : "0"),
          padding: isMobile ? "16px 20px" : "32px 40px",
          minHeight: "100vh",
          background: "radial-gradient(circle at top right, rgba(255, 255, 255, 0.02), transparent)",
          transition: "margin-left 0.4s ease"
        }}>

          <AdminHeader onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 90,
                backdropFilter: "blur(4px)"
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
