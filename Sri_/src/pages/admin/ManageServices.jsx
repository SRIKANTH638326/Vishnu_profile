import React, { useState } from "react";
import { FiPlus, FiTrash2, FiLayers, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Modal } from "../../components/common/Modal";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";
import { useWindowSize } from "../../hooks/useWindowSize";

const defaultServices = [
  { id: 1, title: "Web Development", description: "Building responsive, performant websites using React and modern web standards.", icon: "🌐" },
  { id: 2, title: "UI/UX Design", description: "Crafting beautiful, intuitive interfaces that prioritize user experience.", icon: "🎨" },
  { id: 3, title: "Backend APIs", description: "Designing scalable REST APIs with Node.js, Express, and MongoDB.", icon: "⚙️" },
];

export const ManageServices = () => {
  const [services, setServices] = useState(defaultServices);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "🚀" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const { width } = useWindowSize();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setServices([{ id: Date.now(), ...form }, ...services]);
    setIsAdding(false);
    setForm({ title: "", description: "", icon: "🚀" });
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    setServices(services.filter(s => s.id !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: null });
  };

  return (
    <div>
      <div style={{ 
        display: "flex", 
        flexDirection: width < 640 ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: width < 640 ? "flex-start" : "center", 
        gap: "20px",
        marginBottom: "40px" 
      }}>
        <div>
          <h2 style={{ 
            fontSize: width < 640 ? "1.6rem" : "2rem", 
            fontFamily: "Antonio, sans-serif", 
            marginBottom: "8px" 
          }}>
            Services
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Define what you offer to your clients.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: "8px", 
            padding: "12px 24px", 
            background: "var(--accent)", 
            color: "#000", 
            border: "none", 
            borderRadius: "12px", 
            fontWeight: "bold", 
            cursor: "pointer",
            width: width < 640 ? "100%" : "auto"
          }}>
          <FiPlus size={20} /> {isAdding ? "Cancel" : "Add Service"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Service">
        <form onSubmit={handleAdd}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: width < 480 ? "1fr" : "80px 1fr", 
            gap: "20px" 
          }}>
            <div style={{ width: width < 480 ? "100%" : "auto" }}>
              <label style={labelStyle}>Icon</label>
              <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} style={{ ...inputStyle, textAlign: "center", fontSize: "1.5rem" }} maxLength={2} />
            </div>
            <div>
              <label style={labelStyle}>Service Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="e.g. Web Development" required />
            </div>
            <div style={{ gridColumn: width < 480 ? "span 1" : "span 2" }}>
              <label style={labelStyle}>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: "80px", resize: "none" }} placeholder="What does this service include?" />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Save Service</button>
        </form>
      </Modal>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: width < 768 ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "24px" 
      }}>
        {services.map(service => (
          <motion.div key={service.id} whileHover={{ y: -4 }}
            style={{ 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.05)", 
              borderRadius: "20px", 
              padding: width < 480 ? "24px" : "32px", 
              position: "relative" 
            }}>
            <button onClick={() => handleDelete(service.id)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#ff4d4d", cursor: "pointer" }}>
              <FiTrash2 size={16} />
            </button>
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{service.icon}</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px" }}>{service.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6", margin: 0, fontSize: "0.95rem" }}>{service.description}</p>
          </motion.div>
        ))}
      </div>

      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Remove Service?"
        message="Are you sure you want to remove this service? It will no longer be visible to your potential clients."
      />
    </div>
  );
};

const labelStyle = { display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" };
const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
