import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

const Projects = () => {
  const { width } = useWindowSize();
  const [projects] = useState([
    { id: 1, title: "Modern E-commerce", category: "Web App", date: "2024-03-15" },
    { id: 2, title: "Fintech Dashboard", category: "UI/UX", date: "2024-03-10" },
    { id: 3, title: "AI Portfolio", category: "Web App", date: "2024-03-05" },
  ]);

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
          <h2 style={{ fontSize: width < 640 ? "1.6rem" : "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
            Manage Projects
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Add, edit or remove projects from your portfolio.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "#c4ff6b",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            width: width < 640 ? "100%" : "auto",
            justifyContent: "center"
          }}
        >
          <FiPlus size={20} />
          Add Project
        </motion.button>
      </div>

      {width < 1024 ? (
        /* Card View for Mobile/Tablet */
        <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", gap: "20px" }}>
          {projects.map((project) => (
            <div key={project.id} style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px" }}>{project.title}</h3>
                <span style={{ 
                  padding: "4px 12px", 
                  background: "rgba(255, 255, 255, 0.05)", 
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)"
                }}>
                  {project.category}
                </span>
                <p style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.8rem", marginTop: "12px" }}>{project.date}</p>
              </div>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
                <button style={actionButtonStyle}><FiEdit2 size={18} /></button>
                <button style={actionButtonStyle}><FiExternalLink size={18} /></button>
                <button style={{ ...actionButtonStyle, color: "#ff4d4d" }}><FiTrash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View for Desktop */
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch"
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
                      <button style={actionButtonStyle}><FiEdit2 size={16} /></button>
                      <button style={actionButtonStyle}><FiExternalLink size={16} /></button>
                      <button style={{ ...actionButtonStyle, color: "#ff4d4d" }}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "20px 24px",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.6)"
};

const tdStyle = {
  padding: "20px 24px",
  whiteSpace: "nowrap"
};

const actionButtonStyle = {
  background: "none",
  border: "none",
  color: "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
  padding: "4px",
  transition: "0.3s"
};

export default Projects;
