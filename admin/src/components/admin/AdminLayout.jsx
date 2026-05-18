import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { motion, AnimatePresence } from "framer-motion";
import { adminService } from "../../services/adminService";
import { FiX, FiMessageSquare } from "react-icons/fi";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [notifications, setNotifications] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const navigate = useNavigate();

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

  // Real-time polling for new user messages / requests
  useEffect(() => {
    let prevMessageCount = null;
    let initialIds = new Set();

    console.log("🔌 Notification polling started in AdminLayout!");

    const checkNewMessages = async () => {
      try {
        const messages = await adminService.getMessages();
        console.log("📬 Polling messages count:", messages.length, "prevCount:", prevMessageCount);
        setAllMessages(messages);
        
        if (prevMessageCount === null) {
          // Initial load: store current IDs to avoid notifying on old messages
          messages.forEach(msg => {
            if (msg && msg._id) initialIds.add(msg._id);
          });
          prevMessageCount = messages.length;
          console.log("📝 Initial messages indexed:", initialIds.size);
          return;
        }

        if (messages.length > prevMessageCount) {
          // Find messages not in initial list
          const newMessages = messages.filter(msg => msg && msg._id && !initialIds.has(msg._id));
          console.log("⚡ Found new messages:", newMessages.length);
          
          newMessages.forEach(msg => {
            const id = msg._id || Date.now() + Math.random();
            console.log("🔔 Dispatching overlay for:", msg.name, "subject:", msg.subject);
            
            setNotifications(prev => [
              ...prev, 
              { 
                id, 
                name: msg.name, 
                subject: msg.subject || "General Inquiry", 
                message: msg.message 
              }
            ]);
            
            initialIds.add(msg._id);
          });

          prevMessageCount = messages.length;
        } else if (messages.length < prevMessageCount) {
          console.log("🗑️ Message count decreased (item deleted). Updating count to:", messages.length);
          prevMessageCount = messages.length;
        }
      } catch (err) {
        console.error("❌ Notification polling failed:", err);
      }
    };

    checkNewMessages();
    const interval = setInterval(checkNewMessages, 6000); // Check every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const handleNotificationClick = (id) => {
    removeNotification(id);
    navigate("/admin/dashboard"); // Navigate to dashboard/messages view
  };

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

          <AdminHeader onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} messages={allMessages} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Real-time Notification Left Overlay Drawer */}
        <div style={{
          position: "fixed",
          bottom: "32px",
          left: isMobile ? "24px" : (isSidebarOpen ? "304px" : "32px"),
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "360px",
          width: "calc(100% - 48px)",
          transition: "left 0.4s ease"
        }}>
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -150, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  background: "rgba(10, 10, 10, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(196, 255, 107, 0.25)",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 0 15px rgba(196, 255, 107, 0.04)",
                  position: "relative",
                  cursor: "pointer"
                }}
                onClick={() => handleNotificationClick(notif.id)}
              >
                {/* Header info */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    background: "var(--accent)",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px var(--accent)"
                  }} />
                  <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                    New Request
                  </span>
                  
                  {/* Close button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notif.id);
                    }}
                    style={{
                      marginLeft: "auto",
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "50%",
                      transition: "0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <FiX size={16} />
                  </button>
                </div>

                {/* Name */}
                <h4 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: "600", color: "#fff" }}>
                  {notif.name}
                </h4>

                {/* Subject Badge */}
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ 
                    background: "rgba(196, 255, 107, 0.1)", 
                    color: "var(--accent)", 
                    padding: "3px 8px", 
                    borderRadius: "6px", 
                    fontSize: "11px", 
                    fontWeight: "600",
                    display: "inline-block"
                  }}>
                    {notif.subject}
                  </span>
                </div>

                {/* Message preview */}
                <p style={{ 
                  margin: 0, 
                  fontSize: "13px", 
                  color: "rgba(255,255,255,0.6)", 
                  lineHeight: "1.4",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}>
                  {notif.message}
                </p>

                {/* Bottom tip */}
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(196, 255, 107, 0.7)" }}>
                  <FiMessageSquare size={12} />
                  <span>Click to open in inbox</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
