import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";

// Layout Component
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ 
      display: "flex", 
      background: "#0a0a0a", 
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden"
    }}>
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} isMobile={isMobile} />
      
      <main style={{ 
        flex: 1, 
        marginLeft: isMobile ? "0" : (isSidebarOpen ? "320px" : "0"), 
        padding: isMobile ? "16px 20px" : "32px 40px",
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, rgba(196, 255, 107, 0.03), transparent)",
        transition: "margin-left 0.4s ease"
      }}>
        <Navbar onMenuClick={toggleSidebar} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
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
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/projects" element={<AdminLayout><Projects /></AdminLayout>} />
        <Route path="/messages" element={<AdminLayout><Messages /></AdminLayout>} />
        {/* Redirect any other route to dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
