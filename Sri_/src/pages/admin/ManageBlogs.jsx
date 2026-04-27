import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../../components/common/Modal";

export const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "How to master Framer Motion", status: "Published", views: 452, date: "2024-03-15", content: "" },
    { id: 2, title: "Building premium React UIs", status: "Draft", views: 0, date: "2024-03-22", content: "" },
    { id: 3, title: "The future of Agentic AI", status: "Published", views: 1205, date: "2024-01-05", content: "" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", status: "Draft" });

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content || "", status: blog.status });
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...formData } : b));
    setIsEditing(false);
    setEditingBlog(null);
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
            Blog Management
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Share your thoughts and tutorials with the world.
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
          {isAdding ? "Cancel" : "Create Post"}
        </motion.button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="New Post">
        <form>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Blog Title</label>
              <input type="text" placeholder="Enter post title..." style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Content (Markdown supported)</label>
              <textarea placeholder="Start writing..." style={{ ...inputStyle, height: "250px", resize: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button style={{
              padding: "12px 32px",
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              flex: 1
            }}>
              Publish Now
            </button>
            <button style={{
              padding: "12px 32px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              flex: 1
            }}>
              Save Draft
            </button>
          </div>
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
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Views</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                <td style={tdStyle}>{blog.title}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: "4px 12px", 
                    background: blog.status === "Published" ? "rgba(163, 230, 53, 0.1)" : "rgba(255, 255, 255, 0.05)", 
                    color: blog.status === "Published" ? "#a3e635" : "rgba(255, 255, 255, 0.5)",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600"
                  }}>
                    {blog.status}
                  </span>
                </td>
                <td style={tdStyle}>{blog.views}</td>
                <td style={tdStyle}>{blog.date}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button style={actionButtonStyle} title="View"><FiEye size={16} /></button>
                    <button 
                      onClick={() => handleEditClick(blog)}
                      style={actionButtonStyle} 
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button style={{ ...actionButtonStyle, color: "#ff4d4d" }} title="Delete"><FiTrash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Blog Modal */}
      <Modal 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        title="Edit Blog Post"
      >
        <form onSubmit={handleUpdate}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Blog Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle} 
                required
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={inputStyle}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Content</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                style={{ ...inputStyle, height: "200px", resize: "none" }} 
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
            Update Post
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
