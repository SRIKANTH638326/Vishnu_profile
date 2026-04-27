import React, { useState, useEffect } from "react";
import { FiMail, FiTrash2, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";
import { adminService } from "../../services/adminService";
import { Modal } from "../../components/common/Modal";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    setMessages(adminService.getMessages());
  }, []);

  const handleRead = (msg) => {
    setSelectedMessage(msg);
    setIsReading(true);
    if (msg.status === "New") {
      adminService.markMessageRead(msg.id);
      setMessages(messages.map(m => m.id === msg.id ? { ...m, status: "Read" } : m));
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this message?")) {
      adminService.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    }
  };


  return (
    <div>
      <header style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
          Inbox
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          Manage inquiries and messages from your portfolio visitors.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((msg) => (
          <div key={msg.id} 
            onClick={() => handleRead(msg)}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "24px",
              transition: "0.3s",
              cursor: "pointer",
              opacity: msg.status === "Read" ? 0.7 : 1
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: msg.status === "New" ? "rgba(163, 230, 53, 0.1)" : "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: msg.status === "New" ? "#a3e635" : "rgba(255, 255, 255, 0.5)"
            }}>
              <FiMail size={20} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <h4 style={{ fontSize: "1.1rem", margin: 0 }}>{msg.name}</h4>
                <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.3)" }}>• {msg.email}</span>
                {msg.status === "New" && (
                  <span style={{ 
                    padding: "2px 8px", 
                    background: "#a3e635", 
                    color: "#000", 
                    borderRadius: "4px", 
                    fontSize: "0.7rem", 
                    fontWeight: "bold" 
                  }}>NEW</span>
                )}
              </div>
              <p style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>{msg.subject}</p>
            </div>

            <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem" }}>
                <FiClock size={14} />
                <span>{msg.date}</span>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  onClick={(e) => handleDelete(e, msg.id)}
                  style={{ ...actionButtonStyle, color: "#ff4d4d" }} 
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Message Modal */}
      <Modal 
        isOpen={isReading} 
        onClose={() => setIsReading(false)} 
        title="Message Details"
      >
        {selectedMessage && (
          <div style={{ color: "#fff" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "16px", 
              marginBottom: "32px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "16px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "var(--accent)",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <FiUser size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMessage.name}</h4>
                <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem" }}>{selectedMessage.email}</p>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem", marginBottom: "8px" }}>Subject</label>
              <p style={{ fontSize: "1.1rem", margin: 0, fontWeight: "600" }}>{selectedMessage.subject}</p>
            </div>

            <div style={{ 
              background: "rgba(255, 255, 255, 0.02)", 
              padding: "24px", 
              borderRadius: "16px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.8)"
            }}>
              {selectedMessage.body}
            </div>

            <button 
              onClick={() => setIsReading(false)}
              style={{
                marginTop: "32px",
                width: "100%",
                padding: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
};

const actionButtonStyle = {
  background: "none",
  border: "none",
  color: "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
  padding: "4px",
  transition: "0.3s"
};
