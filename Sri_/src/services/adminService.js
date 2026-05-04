/**
 * Admin Service
 * Handles all API communication between the Frontend and the Node.js/MongoDB Backend.
 * Replace API_URL with your production domain when deploying.
 */

const API_URL = "http://localhost:5000/api";

export const adminService = {
  // ─── PROJECTS ──────────────────────────────────────────────────────────
  getProjects: async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching projects:", err);
      return [];
    }
  },
  
  addProject: async (data) => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error adding project:", err);
      return null;
    }
  },

  updateProject: async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error updating project:", err);
      return null;
    }
  },

  deleteProject: async (id) => {
    try {
      await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("Error deleting project:", err);
      return false;
    }
  },

  // ─── BLOGS ─────────────────────────────────────────────────────────────
  getBlogs: async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return [];
    }
  },

  addBlog: async (data) => {
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error adding blog:", err);
      return null;
    }
  },

  updateBlog: async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error updating blog:", err);
      return null;
    }
  },

  deleteBlog: async (id) => {
    try {
      await fetch(`${API_URL}/blogs/${id}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("Error deleting blog:", err);
      return false;
    }
  },

  // ─── MESSAGES ──────────────────────────────────────────────────────────
  getMessages: async () => {
    try {
      const res = await fetch(`${API_URL}/messages`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching messages:", err);
      return [];
    }
  },

  deleteMessage: async (id) => {
    try {
      await fetch(`${API_URL}/messages/${id}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("Error deleting message:", err);
      return false;
    }
  },

  // ─── SKILLS ─────────────────────────────────────────────────────────────
  getSkills: async () => {
    try {
      const res = await fetch(`${API_URL}/skills`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching skills:", err);
      return [];
    }
  },

  addSkill: async (data) => {
    try {
      const res = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error adding skill:", err);
      return null;
    }
  },

  updateSkill: async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error updating skill:", err);
      return null;
    }
  },

  deleteSkill: async (id) => {
    try {
      await fetch(`${API_URL}/skills/${id}`, { method: "DELETE" });
      return true;
    } catch (err) {
      console.error("Error deleting skill:", err);
      return false;
    }
  },

  // ─── MEDIA UPLOAD ──────────────────────────────────────────────────────
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${API_URL}/projects/upload`, {
        method: "POST",
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  },

  // ─── AUTHENTICATION ───────────────────────────────────────────────────
  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  },

  // NOTE: Experience, Skills, and Services are currently being migrated.
  // Add their backend routes similar to Projects/Blogs above when ready.
};
