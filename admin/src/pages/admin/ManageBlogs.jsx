import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiImage, FiUpload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../../components/common/Modal";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";
import { useWindowSize } from "../../hooks/useWindowSize";
import { adminService } from "../../services/adminService";

export const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [formData, setFormData] = useState({ title: "", content: "", status: "Draft", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { width } = useWindowSize();
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await adminService.getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", status: "Draft", image: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    let finalImageUrl = "";
    if (imageFile) {
      const uploadRes = await adminService.uploadImage(imageFile);
      if (uploadRes && uploadRes.url) finalImageUrl = uploadRes.url;
    }
    const newBlog = await adminService.addBlog({ ...formData, image: finalImageUrl });
    setBlogs([newBlog, ...blogs]);
    setIsAdding(false);
    resetForm();
    setLoading(false);
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content, status: blog.status, image: blog.image || "" });
    setImagePreview(blog.image);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let finalImageUrl = formData.image;
    if (imageFile) {
      const uploadRes = await adminService.uploadImage(imageFile);
      if (uploadRes && uploadRes.url) finalImageUrl = uploadRes.url;
    }
    const updated = await adminService.updateBlog(editingBlog._id || editingBlog.id, { ...formData, image: finalImageUrl });
    if (updated) {
      setBlogs(blogs.map(b => (b._id === updated._id || b.id === updated.id) ? updated : b));
    }
    setIsEditing(false);
    resetForm();
    setLoading(false);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    setLoading(true);
    await adminService.deleteBlog(deleteModal.id);
    setBlogs(blogs.filter(b => (b._id || b.id) !== deleteModal.id));
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
          <h2 style={{ fontSize: width < 640 ? "1.6rem" : "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>Blog Management</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>Share your thoughts and tutorials with the world.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { resetForm(); setIsAdding(true); }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 24px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", width: width < 640 ? "100%" : "auto" }}
        >
          <FiPlus size={20} />
          Create Post
        </motion.button>
      </div>

      <Modal isOpen={isAdding || isEditing} onClose={() => { setIsAdding(false); setIsEditing(false); resetForm(); }} title={isEditing ? "Edit Blog Post" : "Create New Post"}>
        <form onSubmit={isEditing ? handleUpdate : handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: width < 768 ? "1fr" : "1.5fr 1fr", gap: "30px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Blog Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter post title..." style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ ...inputStyle, background: "#161616" }}>
                  <option value="Draft" style={{ background: "#161616", color: "#fff" }}>Draft</option>
                  <option value="Published" style={{ background: "#161616", color: "#fff" }}>Published</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Content (Markdown supported)</label>
                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Start writing..." style={{ ...inputStyle, height: "200px", resize: "none" }} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Featured Image</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                style={{ width: "100%", height: "200px", background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}
              >
                {imagePreview ? <img src={imagePreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <FiImage size={40} color="rgba(255,255,255,0.2)" />}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} accept="image/*" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: "32px", width: "100%", padding: "16px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Processing..." : (isEditing ? "Update Post" : "Publish Post")}
          </button>
        </form>
      </Modal>

      {width < 1024 ? (
        <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", gap: "20px" }}>
          {blogs.map((blog) => (
            <div key={blog._id || blog.id} style={cardStyle}>
              <div style={{ height: "150px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <img src={blog.image || "https://via.placeholder.com/400x200"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "12px" }}>{blog.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ padding: "4px 12px", background: blog.status === "Published" ? "rgba(163, 230, 53, 0.1)" : "rgba(255, 255, 255, 0.05)", color: blog.status === "Published" ? "#a3e635" : "rgba(255, 255, 255, 0.5)", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "600" }}>{blog.status}</span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleEditClick(blog)} style={actionButtonStyle}><FiEdit2 size={18} /></button>
                  <button onClick={() => handleDelete(blog._id || blog.id)} style={{ ...actionButtonStyle, color: "#ff4d4d" }}><FiTrash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={tableWrapperStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Views</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id || blog.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                  <td style={tdStyle}>{blog.title}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: "4px 12px", background: blog.status === "Published" ? "rgba(163, 230, 53, 0.1)" : "rgba(255, 255, 255, 0.05)", color: blog.status === "Published" ? "#a3e635" : "rgba(255, 255, 255, 0.5)", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" }}>{blog.status}</span>
                  </td>
                  <td style={tdStyle}>{blog.views}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button onClick={() => handleEditClick(blog)} style={actionButtonStyle} title="Edit"><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDelete(blog._id || blog.id)} style={{ ...actionButtonStyle, color: "#ff4d4d" }} title="Delete"><FiTrash2 size={16} /></button>
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
        title="Delete Blog Post?"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
};

const labelStyle = { display: "block", marginBottom: "8px", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: "bold" };
const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", color: "#fff", outline: "none" };
const cardStyle = { background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "20px", padding: "24px" };
const tableWrapperStyle = { background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "24px", overflow: "hidden" };
const thStyle = { padding: "20px 24px", fontSize: "0.8rem", fontWeight: "600", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase" };
const tdStyle = { padding: "20px 24px" };
const actionButtonStyle = { background: "rgba(255, 255, 255, 0.05)", border: "none", color: "rgba(255, 255, 255, 0.6)", cursor: "pointer", padding: "10px", borderRadius: "10px", transition: "0.3s" };
