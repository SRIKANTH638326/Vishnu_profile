import React from "react";
import { FiMail, FiTrash2, FiUser, FiClock } from "react-icons/fi";
import { useWindowSize } from "../hooks/useWindowSize";

const Messages = () => {
  const { width } = useWindowSize();
  const messages = [
    { id: 1, sender: "Elon Musk", email: "elon@tesla.com", subject: "Collaboration", date: "2h ago", read: false },
    { id: 2, sender: "Jeff Bezos", email: "jeff@amazon.com", subject: "AWS Inquiry", date: "5h ago", read: true },
    { id: 3, sender: "Satya Nadella", email: "satya@microsoft.com", subject: "Open Source Project", date: "1d ago", read: true },
  ];

  return (
    <div>
      <header style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: width < 640 ? "1.6rem" : "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
          Inbox
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>Manage your inquiries and messages.</p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            background: msg.read ? "rgba(255, 255, 255, 0.02)" : "rgba(196, 255, 107, 0.05)",
            border: `1px solid ${msg.read ? "rgba(255, 255, 255, 0.05)" : "rgba(196, 255, 107, 0.15)"}`,
            borderRadius: "20px",
            padding: width < 640 ? "16px" : "20px 24px",
            display: "flex",
            flexDirection: width < 640 ? "column" : "row",
            justifyContent: "space-between",
            alignItems: width < 640 ? "flex-start" : "center",
            gap: width < 640 ? "16px" : "24px",
            cursor: "pointer",
            transition: "0.3s"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: width < 640 ? "16px" : "20px", 
              flex: 1, 
              overflow: "hidden",
              width: "100%"
            }}>
              <div style={{
                width: width < 640 ? "40px" : "44px",
                height: width < 640 ? "40px" : "44px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: msg.read ? "rgba(255,255,255,0.3)" : "#c4ff6b",
                flexShrink: 0
              }}>
                <FiUser size={width < 640 ? 20 : 22} />
              </div>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2px" }}>
                  <h4 style={{ margin: 0, fontWeight: "600", color: msg.read ? "rgba(255,255,255,0.7)" : "#fff", fontSize: width < 640 ? "1rem" : "1.1rem" }}>{msg.sender}</h4>
                  {!msg.read && <span style={{ width: "8px", height: "8px", background: "#c4ff6b", borderRadius: "50%" }}></span>}
                </div>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {msg.subject}
                </p>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "24px", 
              width: width < 640 ? "100%" : "auto",
              justifyContent: width < 640 ? "space-between" : "flex-end",
              borderTop: width < 640 ? "1px solid rgba(255,255,255,0.05)" : "none",
              paddingTop: width < 640 ? "12px" : "0"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                <FiClock size={14} />
                <span>{msg.date}</span>
              </div>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
