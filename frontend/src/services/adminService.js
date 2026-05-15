/**
 * Admin Service
 * Handles all API communication between the Frontend and the Node.js/MongoDB Backend.
 * Replace API_URL with your production domain when deploying.
 */

const API_URL = "http://localhost:5000/api";

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

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

  getFeaturedProjects: async () => {
    try {
      const res = await fetch(`${API_URL}/projects/featured`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching featured projects:", err);
      return [];
    }
  },

  getMoreProjects: async () => {
    try {
      const res = await fetch(`${API_URL}/projects/more`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching more projects:", err);
      return [];
    }
  },

  getProjectById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`);
      return await res.json();
    } catch (err) {
      console.error("Error fetching project by ID:", err);
      return null;
    }
  },
  
  addProject: async (data) => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: getHeaders(),
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
        headers: getHeaders(),
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
      await fetch(`${API_URL}/projects/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
      await fetch(`${API_URL}/blogs/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
      return true;
    } catch (err) {
      console.error("Error deleting blog:", err);
      return false;
    }
  },

  // ─── MESSAGES ──────────────────────────────────────────────────────────
  getMessages: async () => {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        headers: getHeaders()
      });
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching messages:", err);
      return [];
    }
  },

  deleteMessage: async (id) => {
    try {
      await fetch(`${API_URL}/messages/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
      await fetch(`${API_URL}/skills/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
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
        headers: getHeaders(true),
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

  // ─── USER MANAGEMENT ──────────────────────────────────────────────────
  getUsers: async () => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: getHeaders()
      });
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  },

  registerUser: async (userData) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (err) {
      console.error("Error registering user:", err);
      return { success: false, message: "Connection failed" };
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await fetch(`${API_URL}/auth/users/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      console.error("Error deleting user:", err);
      return { success: false, message: "Connection failed" };
    }
  },

  // ─── EXPERIENCE ────────────────────────────────────────────────────────
  getExperience: async () => {
    try {
      const res = await fetch(`${API_URL}/experience`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching experience:", err);
      return [];
    }
  },

  addExperience: async (data) => {
    try {
      const res = await fetch(`${API_URL}/experience`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error adding experience:", err);
      return null;
    }
  },

  deleteExperience: async (id) => {
    try {
      const res = await fetch(`${API_URL}/experience/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
      return res.ok;
    } catch (err) {
      console.error("Error deleting experience:", err);
      return false;
    }
  },

  updateExperience: async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/experience/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error updating experience:", err);
      return null;
    }
  },

  // ─── SERVICES ──────────────────────────────────────────────────────────
  getServices: async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error fetching services:", err);
      return [];
    }
  },

  addService: async (data) => {
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("Error adding service:", err);
      return null;
    }
  },

  deleteService: async (id) => {
    try {
      await fetch(`${API_URL}/services/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
      return true;
    } catch (err) {
      console.error("Error deleting service:", err);
      return false;
    }
  },
};
