import React, { useState, useEffect } from "react";
import { FiSearch, FiBell, FiUser, FiChevronDown, FiMenu } from "react-icons/fi";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

export const AdminHeader = ({ onMenuClick, isSidebarOpen, messages = [] }) => {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Calculate unread count based on last viewed timestamp
  useEffect(() => {
    const lastViewed = localStorage.getItem("lastViewedNotificationsTime");
    if (!lastViewed) {
      setUnreadCount(messages.length);
      return;
    }

    const unread = messages.filter(msg => {
      if (!msg || !msg.date) return false;
      return new Date(msg.date) > new Date(lastViewed);
    });
    setUnreadCount(unread.length);
  }, [messages]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      localStorage.setItem("lastViewedNotificationsTime", new Date().toISOString());
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClose = () => setIsOpen(false);
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [isOpen]);

  const handleItemClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    navigate("/admin/dashboard"); // Route directly to Messages grid
  };

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
      background: "var(--card-bg)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)"
    }}>
      <style>{`
        .notif-scroll::-webkit-scrollbar { width: 4px; }
        .notif-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .notif-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .notif-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
        .notif-item:hover {
          background: rgba(196, 255, 107, 0.05) !important;
          border-color: rgba(196, 255, 107, 0.2) !important;
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
          style={{
            display: width <= 1024 || !isSidebarOpen ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            color: "var(--text)",
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
            color: "var(--text)",
            opacity: 0.5
          }} size={18} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 48px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              color: "var(--text)",
              outline: "none",
              fontSize: "0.95rem"
            }}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: width < 640 ? "12px" : "24px" }}>
        
        {/* Notifications Wrapper for Absolute Alignment */}
        <div style={{ position: "relative", display: width < 480 ? "none" : "block" }}>
          
          {/* Bell Icon Trigger */}
          <button 
            onClick={handleToggle}
            style={{
              position: "relative",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "8px",
                height: "8px",
                background: "#ff4d4d",
                borderRadius: "50%",
                border: "2px solid var(--card-bg)"
              }}></span>
            )}
          </button>

          {/* Right-Aligned Dropdown Popup Card */}
          {isOpen && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "54px",
                right: 0,
                width: "340px",
                background: "rgba(10, 10, 10, 0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(196, 255, 107, 0.2)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 0 15px rgba(255, 255, 255, 0.02)",
                zIndex: 1000
              }}
            >
              {/* Header section */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "#fff" }}>Notifications</h4>
                {messages.length > 0 && (
                  <span 
                    style={{ fontSize: "0.75rem", color: "var(--accent)", cursor: "pointer", fontWeight: "600" }} 
                    onClick={() => {
                      setUnreadCount(0);
                      localStorage.setItem("lastViewedNotificationsTime", new Date().toISOString());
                    }}
                  >
                    Mark all as unread
                  </span>
                )}
              </div>

              {/* Scrollable list of recent requests */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxHeight: "260px",
                overflowY: "auto",
                paddingRight: "4px"
              }} className="notif-scroll">
                {messages.length === 0 ? (
                  <p style={{ margin: "24px 0", textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                    No notifications yet
                  </p>
                ) : (
                  messages.slice(0, 5).map((msg) => (
                    <div 
                      key={msg._id}
                      onClick={handleItemClick}
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        cursor: "pointer",
                        transition: "0.2s"
                      }}
                      className="notif-item"
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#fff" }}>{msg.name}</span>
                        <span style={{ 
                          fontSize: "0.7rem", 
                          background: "rgba(196, 255, 107, 0.1)", 
                          color: "var(--accent)", 
                          padding: "2px 6px", 
                          borderRadius: "4px",
                          fontWeight: "600",
                          textTransform: "uppercase" 
                        }}>
                          {msg.subject || "inquiry"}
                        </span>
                      </div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: "0.75rem", 
                        color: "rgba(255,255,255,0.5)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom footer action */}
              <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px", textAlign: "center" }}>
                <span 
                  onClick={handleItemClick}
                  style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: "700", cursor: "pointer" }}
                >
                  View All Messages
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Profile Dropdown */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: width < 640 ? "4px" : "6px 6px 6px 16px",
          background: width < 640 ? "transparent" : "var(--bg)",
          border: width < 640 ? "none" : "1px solid var(--border)",
          borderRadius: "16px",
          cursor: "pointer"
        }}>
          <div style={{ display: width < 640 ? "none" : "block", textAlign: "right" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: "600", margin: 0, color: "var(--text)" }}>Srikanth</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text)", opacity: 0.6, margin: 0 }}>Admin</p>
          </div>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "12px",
            background: "var(--accent)",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <FiUser size={20} />
          </div>
          <FiChevronDown size={16} color="var(--text)" style={{ opacity: 0.5 }} />
        </div>
      </div>
    </header>
  );
};
