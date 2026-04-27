import React, { useState } from "react";
import { FiPlus, FiTrash2, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { Modal } from "../../components/common/Modal";

const defaultTestimonials = [
  { id: 1, name: "Alex Johnson", role: "Product Manager at Acme", quote: "Srikanth delivered exceptional work! His attention to detail and speed were remarkable.", rating: 5 },
  { id: 2, name: "Priya Nair", role: "CEO at StartupX", quote: "A true professional. The admin panel he built exceeded our expectations.", rating: 5 },
];

export const ManageTestimonials = () => {
  const [items, setItems] = useState(defaultTestimonials);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5 });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setItems([{ id: Date.now(), ...form }, ...items]);
    setIsAdding(false);
    setForm({ name: "", role: "", quote: "", rating: 5 });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>Testimonials</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Showcase what your clients and colleagues say.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}>
          <FiPlus size={20} /> {isAdding ? "Cancel" : "Add Testimonial"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add Testimonial">
        <form onSubmit={handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[["Full Name", "name"], ["Role & Company", "role"]].map(([label, key]) => (
              <div key={key}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} placeholder={label} />
              </div>
            ))}
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Testimonial Quote</label>
              <textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} style={{ ...inputStyle, height: "100px", resize: "none" }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "24px", padding: "12px 32px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Save Testimonial</button>
        </form>
      </Modal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
        {items.map(item => (
          <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "28px", position: "relative" }}>
            <button onClick={() => setItems(items.filter(i => i.id !== item.id))} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#ff4d4d", cursor: "pointer" }}><FiTrash2 size={16} /></button>
            <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
              {[...Array(item.rating)].map((_, i) => <FiStar key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6", marginBottom: "20px", fontStyle: "italic" }}>"{item.quote}"</p>
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>{item.name}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: 0 }}>{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
