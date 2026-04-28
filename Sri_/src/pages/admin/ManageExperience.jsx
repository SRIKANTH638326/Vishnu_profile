import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";
import { adminService } from "../../services/adminService";
import { Modal } from "../../components/common/Modal";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";
import { useWindowSize } from "../../hooks/useWindowSize";

export const ManageExperience = () => {
  const [items, setItems]   = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ role: "", company: "", duration: "", description: "" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const { width } = useWindowSize();

  useEffect(() => { setItems(adminService.getExperience()); }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.role) return;
    const n = adminService.addExperience(form);
    setItems(prev => [n, ...prev]);
    setIsAdding(false);
    setForm({ role: "", company: "", duration: "", description: "" });
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    adminService.deleteExperience(deleteModal.id);
    setItems(prev => prev.filter(i => i.id !== deleteModal.id));
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
            Experience
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Manage your work history and career timeline.</p>
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
          <FiPlus size={20} /> {isAdding ? "Cancel" : "Add Experience"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Experience">
        <form onSubmit={handleAdd}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", 
            gap: "20px" 
          }}>
            {[["Role / Title", "role"], ["Company", "company"], ["Duration", "duration"]].map(([label, key]) => (
              <div key={key} style={{ gridColumn: (key === "duration" && width < 640) ? "span 1" : "" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} placeholder={label} />
              </div>
            ))}
            <div style={{ gridColumn: width < 640 ? "span 1" : "span 2" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: "80px", resize: "none" }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Save Experience</button>
        </form>
      </Modal>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            background: "rgba(255,255,255,0.03)", 
            border: "1px solid rgba(255,255,255,0.05)", 
            borderRadius: "20px", 
            padding: width < 480 ? "20px" : "28px", 
            display: "flex", 
            flexDirection: width < 480 ? "column" : "row",
            justifyContent: "space-between", 
            alignItems: width < 480 ? "flex-start" : "flex-start",
            gap: "20px"
          }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ 
                width: width < 480 ? "40px" : "48px", 
                height: width < 480 ? "40px" : "48px", 
                borderRadius: "14px", 
                background: "rgba(255,255,255,0.06)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "var(--accent)", 
                flexShrink: 0 
              }}>
                <FiAward size={width < 480 ? 18 : 22} />
              </div>
              <div>
                <h3 style={{ fontSize: width < 480 ? "1rem" : "1.1rem", fontWeight: "600", margin: "0 0 4px" }}>{item.role}</h3>
                <p style={{ color: "var(--accent)", fontSize: "0.9rem", margin: "0 0 4px" }}>{item.company}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: "0 0 10px" }}>{item.duration}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>{item.description}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(item.id)} style={{ 
              alignSelf: width < 480 ? "flex-end" : "flex-start",
              background: "none", 
              border: "none", 
              color: "#ff4d4d", 
              cursor: "pointer", 
              padding: "4px" 
            }}>
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Remove Experience?"
        message="Are you sure you want to remove this work experience? This cannot be undone."
      />
    </div>
  );
};

const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
