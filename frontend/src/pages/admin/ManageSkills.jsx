import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiZap, FiEdit3, FiType, FiFolder, FiDroplet, FiPercent } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../../components/common/Modal";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";
import { useWindowSize } from "../../hooks/useWindowSize";
import { adminService } from "../../services/adminService";

const categories = ["Design Tools", "Frontend", "Data & Analytics", "Other"];

export const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", pct: 80, category: "Frontend", color: "#6366f1" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const { width } = useWindowSize();

  const fetchSkills = async () => {
    setLoading(true);
    const data = await adminService.getSkills();
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingId(skill._id);
      setForm({
        name: skill.name,
        description: skill.description || "",
        pct: skill.pct,
        category: skill.category,
        color: skill.color || "#6366f1",
        isHot: skill.isHot || false
      });
    } else {
      setEditingId(null);
      setForm({ name: "", description: "", pct: 80, category: "Frontend", color: "#6366f1", isHot: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillData = { ...form, pct: Number(form.pct) };
    
    if (editingId) {
      const res = await adminService.updateSkill(editingId, skillData);
      if (res) fetchSkills();
    } else {
      const res = await adminService.addSkill(skillData);
      if (res) fetchSkills();
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const success = await adminService.deleteSkill(deleteModal.id);
    if (success) {
      setSkills(skills.filter(s => s._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const grouped = categories.reduce((acc, cat) => {
    const filtered = skills.filter(s => s.category === cat);
    if (filtered.length) acc[cat] = filtered;
    return acc;
  }, {});

  const otherSkills = skills.filter(s => !categories.includes(s.category));
  if (otherSkills.length) grouped["Other"] = [...(grouped["Other"] || []), ...otherSkills];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-end", 
        marginBottom: "40px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "30px"
      }}>
        <div>
          <h2 style={{ fontSize: "2.5rem", fontFamily: "Antonio, sans-serif", letterSpacing: "-0.02em", marginBottom: "8px" }}>TECH STACK</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem" }}>Curate and describe the tools that define your workflow.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "#fff" }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOpenModal()}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            padding: "14px 28px", 
            background: "var(--accent)", 
            color: "#000", 
            border: "none", 
            borderRadius: "14px", 
            fontWeight: "800", 
            cursor: "pointer",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
          <FiPlus size={20} /> Add New Tool
        </motion.button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Tool" : "Add New Tool"}>
        <form onSubmit={handleSubmit} style={{ padding: "10px 5px" }}>
          <div style={{ display: "grid", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1.5fr 1fr", gap: "20px" }}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><FiType size={14} /> Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="e.g. Framer" required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><FiFolder size={14} /> Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}><FiEdit3 size={14} /> Description</label>
              <textarea 
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })} 
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} 
                placeholder="Describe how you use this tool..."
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", gap: "20px" }}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><FiDroplet size={14} /> Brand Color</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={inputStyle} placeholder="#6366f1" />
                  <div style={{ minWidth: "48px", height: "48px", borderRadius: "12px", background: form.color, border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 20px ${form.color}33` }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "25px" }}>
                <input 
                  type="checkbox" 
                  checked={form.isHot} 
                  onChange={e => setForm({ ...form, isHot: e.target.checked })}
                  style={{ width: "20px", height: "20px", accentColor: "var(--accent)" }}
                />
                <label style={{ ...labelStyle, marginBottom: 0 }}>Feature this tool (Green Dot)</label>
              </div>
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}><FiPercent size={14} /> Proficiency: {form.pct}%</label>
              <input type="range" min="10" max="100" value={form.pct} onChange={e => setForm({ ...form, pct: e.target.value })}
                style={{ width: "100%", marginTop: "16px", accentColor: "var(--accent)" }} />
            </div>
          </div>
          <button type="submit" style={{ 
            marginTop: "32px", 
            padding: "16px", 
            background: "var(--accent)", 
            color: "#000", 
            border: "none", 
            borderRadius: "14px", 
            fontWeight: "800", 
            cursor: "pointer", 
            width: "100%",
            fontSize: "1rem",
            textTransform: "uppercase"
          }}>
            {editingId ? "Update Tool" : "Save Tool"}
          </button>
        </form>
      </Modal>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>Loading stack...</div>
      ) : (
        <div style={{ display: "grid", gap: "50px" }}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 style={{ 
                fontSize: "0.85rem", 
                color: "var(--accent)", 
                fontWeight: "800", 
                letterSpacing: "2px", 
                textTransform: "uppercase", 
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}>
                {category}
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)" }} />
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: width < 992 ? "1fr" : "1fr 1fr", gap: "20px" }}>
                {items.map(skill => (
                  <motion.div 
                    key={skill._id}
                    layout
                    style={{ 
                      background: "rgba(255,255,255,0.02)", 
                      border: "1px solid rgba(255,255,255,0.05)", 
                      borderRadius: "24px", 
                      padding: "24px",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <div style={{ 
                          width: "48px", 
                          height: "48px", 
                          borderRadius: "14px", 
                          background: `${skill.color || "var(--accent)"}15`, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: skill.color || "var(--accent)"
                        }}>
                          <FiZap size={22} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
                            {skill.name}
                            {skill.isHot && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80" }} />}
                          </h4>
                          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", fontWeight: "600" }}>{skill.pct}% Proficiency</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => handleOpenModal(skill)} style={actionBtnStyle}><FiEdit3 size={16} /></button>
                        <button onClick={() => handleDelete(skill._id)} style={{ ...actionBtnStyle, color: "#ff4d4d" }}><FiTrash2 size={16} /></button>
                      </div>
                    </div>
                    {skill.description && (
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px" }}>
                        {skill.description}
                      </p>
                    )}
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "4px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.pct}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        style={{ height: "100%", background: skill.color || "var(--accent)", borderRadius: "100px" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Remove from Stack?"
        message="This will remove the tool from your portfolio website."
      />
    </div>
  );
};

const inputGroupStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const labelStyle = { display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" };
const inputStyle = { width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", color: "#fff", outline: "none", fontSize: "1rem", transition: "0.2s" };
const actionBtnStyle = { background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" };
