import React, { useState } from "react";
import { FiPlus, FiTrash2, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { Modal } from "../../components/common/Modal";

const defaultSkills = [
  { id: 1, name: "React", level: 90, category: "Frontend" },
  { id: 2, name: "Node.js", level: 80, category: "Backend" },
  { id: 3, name: "MongoDB", level: 75, category: "Database" },
  { id: 4, name: "TypeScript", level: 70, category: "Frontend" },
  { id: 5, name: "Tailwind CSS", level: 85, category: "Frontend" },
];

const categories = ["Frontend", "Backend", "Database", "DevOps", "Other"];

export const ManageSkills = () => {
  const [skills, setSkills] = useState(defaultSkills);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: "", level: 80, category: "Frontend" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setSkills([{ id: Date.now(), ...form, level: Number(form.level) }, ...skills]);
    setIsAdding(false);
    setForm({ name: "", level: 80, category: "Frontend" });
  };

  const grouped = categories.reduce((acc, cat) => {
    const filtered = skills.filter(s => s.category === cat);
    if (filtered.length) acc[cat] = filtered;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>Skills</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Manage your technical skills and proficiency levels.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}>
          <FiPlus size={20} /> {isAdding ? "Cancel" : "Add Skill"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Skill">
        <form onSubmit={handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Skill Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="e.g. React" required />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Proficiency: {form.level}%</label>
              <input type="range" min="10" max="100" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                style={{ width: "100%", marginTop: "14px", accentColor: "var(--accent)" }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Save Skill</button>
        </form>
      </Modal>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>{category}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map(skill => (
              <div key={skill.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <FiZap size={18} color="var(--accent)" />
                    <span style={{ fontWeight: "600" }}>{skill.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ color: "var(--accent)", fontWeight: "bold" }}>{skill.level}%</span>
                    <button onClick={() => setSkills(skills.filter(s => s.id !== skill.id))} style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", padding: "2px" }}><FiTrash2 size={16} /></button>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ height: "100%", background: "var(--accent)", borderRadius: "100px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const labelStyle = { display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" };
const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
