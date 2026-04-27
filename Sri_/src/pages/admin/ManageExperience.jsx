import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";
import { adminService } from "../../services/adminService";
import { Modal } from "../../components/common/Modal";

export const ManageExperience = () => {
  const [items, setItems]   = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ role: "", company: "", duration: "", description: "" });

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
    adminService.deleteExperience(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>Experience</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Manage your work history and career timeline.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}>
          <FiPlus size={20} /> {isAdding ? "Cancel" : "Add Experience"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Experience">
        <form onSubmit={handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[["Role / Title", "role"], ["Company", "company"], ["Duration", "duration"]].map(([label, key]) => (
              <div key={key}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} placeholder={label} />
              </div>
            ))}
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: "80px", resize: "none" }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Save Experience</button>
        </form>
      </Modal>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map(item => (
          <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                <FiAward size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: "0 0 4px" }}>{item.role}</h3>
                <p style={{ color: "var(--accent)", fontSize: "0.9rem", margin: "0 0 4px" }}>{item.company}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: "0 0 10px" }}>{item.duration}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: 0 }}>{item.description}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "4px" }}><FiTrash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
