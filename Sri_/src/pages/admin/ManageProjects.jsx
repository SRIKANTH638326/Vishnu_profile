import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { adminService } from "../../services/adminService";
import { Modal } from "../../components/common/Modal";

export const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: "", description: "" });

  useEffect(() => {
    setProjects(adminService.getProjects());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    const newProject = adminService.addProject(formData);
    setProjects([newProject, ...projects]);
    setIsAdding(false);
    setFormData({ title: "", category: "", description: "" });
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({ title: project.title, category: project.category, description: project.description });
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would call adminService.updateProject
    const updatedProjects = projects.map(p => 
      p.id === editingProject.id ? { ...p, ...formData } : p
    );
    setProjects(updatedProjects);
    setIsEditing(false);
    setEditingProject(null);
    setFormData({ title: "", category: "", description: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      adminService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };



  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
            Manage Projects
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Add, edit or remove projects from your portfolio.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <FiPlus size={20} />
          {isAdding ? "Cancel" : "Add Project"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="New Project Details">
        <form onSubmit={handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Project Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. My Awesome App" 
                style={inputStyle} 
                required
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Category</label>
              <input 
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Web Development" 
                style={inputStyle} 
              />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about the project..." 
                style={{ ...inputStyle, height: "100px", resize: "none" }} 
              />
            </div>
          </div>
          <button type="submit" style={{
            marginTop: "32px",
            width: "100%",
            padding: "14px",
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Save Project
          </button>
        </form>
      </Modal>

      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255, 255, 255, 0.02)" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                <td style={tdStyle}>{project.title}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: "4px 12px", 
                    background: "rgba(255, 255, 255, 0.05)", 
                    borderRadius: "20px",
                    fontSize: "0.85rem"
                  }}>
                    {project.category}
                  </span>
                </td>
                <td style={tdStyle}>{project.date}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button 
                      onClick={() => handleEditClick(project)}
                      style={actionButtonStyle}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button style={actionButtonStyle}><FiExternalLink size={16} /></button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      style={{ ...actionButtonStyle, color: "#ff4d4d" }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Project Modal */}
      <Modal 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        title="Edit Project"
      >
        <form onSubmit={handleUpdate}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Project Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle} 
                required
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Category</label>
              <input 
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={inputStyle} 
              />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ ...inputStyle, height: "100px", resize: "none" }} 
              />
            </div>
          </div>
          <button type="submit" style={{
            marginTop: "32px",
            width: "100%",
            padding: "14px",
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Update Project
          </button>
        </form>
      </Modal>
    </div>
  );
};


const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  color: "#fff",
  outline: "none"
};

const thStyle = {
  padding: "20px 24px",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.6)"
};

const tdStyle = {
  padding: "20px 24px"
};

const actionButtonStyle = {
  background: "none",
  border: "none",
  color: "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
  padding: "4px",
  transition: "0.3s"
};
