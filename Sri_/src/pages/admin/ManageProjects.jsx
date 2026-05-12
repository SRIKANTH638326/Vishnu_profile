import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiUpload, FiX, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../../components/common/Modal";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";
import { useWindowSize } from "../../hooks/useWindowSize";
import { adminService } from "../../services/adminService";

export const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState("basic"); // basic, details, content
  const [formData, setFormData] = useState({ 
    title: "", 
    category: "", 
    description: "", 
    image: "",
    year: "",
    industry: "",
    client: "",
    duration: "",
    problem: "",
    solution: "",
    challenge: "",
    summary: "",
    githubLink: "",
    externalLink: "",
    isMoreProject: false,
    isFeatured: false,
    gallery: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const { width } = useWindowSize();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await adminService.getProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    setLoading(true);

    let finalImageUrl = formData.image;
    if (imageFile) {
      const uploadRes = await adminService.uploadImage(imageFile);
      if (uploadRes && uploadRes.url) {
        finalImageUrl = uploadRes.url;
      }
    }

    const newProject = await adminService.addProject({ ...formData, image: finalImageUrl });
    setProjects([newProject, ...projects]);
    setIsAdding(false);
    resetForm();
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ 
      title: "", category: "", description: "", image: "",
      year: "", industry: "", client: "", duration: "",
      problem: "", solution: "", challenge: "", summary: "",
      githubLink: "", externalLink: "", isMoreProject: false, isFeatured: false,
      gallery: []
    });
    setImageFile(null);
    setImagePreview(null);
    setActiveTab("basic");
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({ 
      title: project.title || "", 
      category: project.category || "", 
      description: project.description || "",
      image: project.image || "",
      year: project.year || "",
      industry: project.industry || "",
      client: project.client || "",
      duration: project.duration || "",
      problem: project.problem || "",
      solution: project.solution || "",
      challenge: project.challenge || "",
      summary: project.summary || "",
      githubLink: project.githubLink || "",
      externalLink: project.externalLink || project.link || "",
      isMoreProject: project.isMoreProject || false,
      isFeatured: project.isFeatured || false,
      gallery: project.gallery || []
    });
    setImagePreview(project.image);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = formData.image;
    if (imageFile) {
      const uploadRes = await adminService.uploadImage(imageFile);
      if (uploadRes && uploadRes.url) {
        finalImageUrl = uploadRes.url;
      }
    }

    const updated = await adminService.updateProject(editingProject._id || editingProject.id, { ...formData, image: finalImageUrl });
    if (updated) {
      setProjects(projects.map(p => (p._id === updated._id || p.id === updated.id) ? updated : p));
    }
    setIsEditing(false);
    setEditingProject(null);
    resetForm();
    setLoading(false);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    setLoading(true);
    await adminService.deleteProject(deleteModal.id);
    setProjects(projects.filter(p => (p._id || p.id) !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: null });
    setLoading(false);
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
            Manage Projects
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Add, edit or remove projects from your portfolio.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setIsAdding(!isAdding);
          }}
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
          }}
        >
          <FiPlus size={20} />
          {isAdding ? "Cancel" : "Add Project"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding || isEditing} onClose={() => {
        setIsAdding(false);
        setIsEditing(false);
        resetForm();
      }} title={isEditing ? "Edit Project" : "New Project Details"}>
        <form onSubmit={isEditing ? handleUpdate : handleAdd}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["basic", "details", "content"].map(tab => (
              <button 
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  color: activeTab === tab ? "var(--accent)" : "rgba(255,255,255,0.4)",
                  borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "0.3s",
                  marginRight: "15px"
                }}
              >
                {tab} info
              </button>
            ))}
          </div>

          <div style={{ minHeight: "350px" }}>
            {activeTab === "basic" && (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: width < 768 ? "1fr" : "1fr 1fr", 
                gap: "30px" 
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>Project Title</label>
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
                    <label style={labelStyle}>Category</label>
                    <input 
                      type="text" 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Web Development" 
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>GitHub Repository URL</label>
                    <input 
                      type="url" 
                      value={formData.githubLink}
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      placeholder="https://github.com/your-repo" 
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>External Project URL</label>
                    <input 
                      type="url" 
                      value={formData.externalLink}
                      onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                      placeholder="https://example.com" 
                      style={inputStyle} 
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    />
                    <label htmlFor="isFeatured" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer" }}>Mark as Featured Project</label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <input 
                      type="checkbox" 
                      id="isMoreProject"
                      checked={formData.isMoreProject}
                      onChange={(e) => setFormData({ ...formData, isMoreProject: e.target.checked })}
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    />
                    <label htmlFor="isMoreProject" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer" }}>Show in "More Projects" Section</label>
                  </div>
                  <div>
                    <label style={labelStyle}>Brief Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Short summary for cards..." 
                      style={{ ...inputStyle, height: "80px", resize: "none" }} 
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Main Image</label>
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      width: "100%",
                      height: "230px",
                      background: "rgba(255,255,255,0.02)",
                      border: "2px dashed rgba(255,255,255,0.1)",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                      transition: "0.3s",
                    }}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                        <FiImage size={40} style={{ marginBottom: "12px" }} />
                        <p style={{ fontSize: "0.9rem" }}>Click to upload</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="e.g. 2025" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Industry</label>
                  <input type="text" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} placeholder="e.g. Tech" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Client</label>
                  <input type="text" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} placeholder="e.g. Acme Corp" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 4 weeks" style={inputStyle} />
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{ fontSize: "0.8rem", color: "var(--accent)", background: "rgba(196, 255, 107, 0.05)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(196, 255, 107, 0.1)" }}>
                  💡 These sections will appear on your project's individual case study page.
                </p>
                <div>
                  <label style={labelStyle}>Case Study: The Problem</label>
                  <textarea value={formData.problem} onChange={(e) => setFormData({...formData, problem: e.target.value})} placeholder="What challenge were you trying to solve?" style={{ ...inputStyle, height: "80px", resize: "none" }} />
                </div>
                <div>
                  <label style={labelStyle}>Case Study: The Solution</label>
                  <textarea value={formData.solution} onChange={(e) => setFormData({...formData, solution: e.target.value})} placeholder="How did you solve it? Mention technologies used." style={{ ...inputStyle, height: "80px", resize: "none" }} />
                </div>
                <div>
                  <label style={labelStyle}>Case Study: The Challenge</label>
                  <textarea value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} placeholder="What was the hardest part of this project?" style={{ ...inputStyle, height: "80px", resize: "none" }} />
                </div>
                <div>
                  <label style={labelStyle}>Case Study: Project Summary</label>
                  <textarea value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})} placeholder="A high-level summary of the outcome." style={{ ...inputStyle, height: "80px", resize: "none" }} />
                </div>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: "40px",
            width: "100%",
            padding: "16px",
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: "16px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: "20px", height: "20px", border: "2px solid rgba(0,0,0,0.1)", borderTopColor: "#000", borderRadius: "50%" }}
              />
            ) : null}
            {isEditing ? "Update Project" : "Create Project"}
          </button>
        </form>
      </Modal>

      {width < 1024 ? (
        /* Card View */
        <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", gap: "24px" }}>
          {projects.map((project) => (
            <div key={project._id || project.id} style={cardStyle}>
              <div style={{ height: "180px", overflow: "hidden", borderRadius: "12px", marginBottom: "16px" }}>
                <img src={project.image || "https://via.placeholder.com/400x200"} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>{project.title}</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={tagStyle}>{project.category}</span>
                  {project.isFeatured && <span style={{ ...tagStyle, background: "rgba(196, 255, 107, 0.2)", color: "var(--accent)" }}>Featured</span>}
                  {project.isMoreProject && <span style={{ ...tagStyle, background: "rgba(255,255,255,0.1)", color: "#fff" }}>More Project</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px", marginTop: "auto" }}>
                <a 
                  href={`/projects/${project._id || project.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={actionButtonStyle}
                >
                  <FiExternalLink size={18} />
                </a>
                <button onClick={() => handleEditClick(project)} style={actionButtonStyle}><FiEdit2 size={18} /></button>
                <button onClick={() => handleDelete(project._id || project.id)} style={{ ...actionButtonStyle, color: "#ff4d4d" }}><FiTrash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div style={tableWrapperStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                <th style={thStyle}>Project</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id || project.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "60px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#222" }}>
                        <img src={project.image || "https://via.placeholder.com/60x40"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span style={{ fontWeight: "500" }}>{project.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={tagStyle}>{project.category}</span>
                      {project.isFeatured && <span style={{ padding: "2px 8px", background: "rgba(196, 255, 107, 0.2)", borderRadius: "4px", fontSize: "0.7rem", color: "var(--accent)" }}>Featured</span>}
                      {project.isMoreProject && <span style={{ padding: "2px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>More</span>}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <a 
                        href={`/projects/${project._id || project.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={actionButtonStyle}
                        title="View Live Page"
                      >
                        <FiExternalLink size={16} />
                      </a>
                      <button onClick={() => handleEditClick(project)} style={actionButtonStyle} title="Edit Project"><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDelete(project._id || project.id)} style={{ ...actionButtonStyle, color: "#ff4d4d" }} title="Delete Project"><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This will remove it from your portfolio permanently."
      />
    </div>
  );
};

const labelStyle = { 
  display: "block", 
  marginBottom: "10px", 
  fontSize: "0.85rem", 
  fontWeight: "600",
  color: "rgba(255,255,255,0.4)",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "14px",
  color: "#fff",
  outline: "none",
  fontSize: "0.95rem",
  boxSizing: "border-box"
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px"
};

const tagStyle = { 
  padding: "4px 12px", 
  background: "rgba(196, 255, 107, 0.1)", 
  color: "var(--accent)",
  borderRadius: "100px",
  fontSize: "0.75rem",
  fontWeight: "700",
  textTransform: "uppercase"
};

const tableWrapperStyle = {
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  overflow: "hidden"
};

const thStyle = {
  padding: "20px 24px",
  fontSize: "0.8rem",
  fontWeight: "700",
  color: "rgba(255, 255, 255, 0.3)",
  textTransform: "uppercase",
  letterSpacing: "1px"
};

const tdStyle = {
  padding: "16px 24px"
};

const actionButtonStyle = {
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  color: "rgba(255, 255, 255, 0.6)",
  cursor: "pointer",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s"
};
