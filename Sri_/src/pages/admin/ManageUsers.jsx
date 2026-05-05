import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserPlus, FiTrash2, FiUser, FiKey, FiMail, FiCheckCircle, FiXCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { adminService } from "../../services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await adminService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    const result = await adminService.registerUser({
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      setShowModal(false);
      setFormData({ email: "", password: "", confirmPassword: "" });
      fetchUsers();
    } else {
      setFormError(result.message || "Failed to register user");
    }
    setSubmitting(false);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await adminService.deleteUser(id);
      if (result.success) {
        fetchUsers();
      }
    }
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "8px", fontFamily: "var(--font-heading)" }}>
            USER <span style={{ color: "rgba(255,255,255,0.4)" }}>MANAGEMENT</span>
          </h2>
          <p style={{ color: "var(--secondary-text)" }}>Manage administrative access to your portfolio</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          style={{
            background: "var(--accent)",
            color: "#000",
            border: "none",
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}
        >
          <FiUserPlus /> Add New User
        </motion.button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px 0", color: "var(--secondary-text)" }}>Loading users...</div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "24px" 
        }}>
          {users.map(user => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  background: "rgba(196, 255, 107, 0.1)", 
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)"
                }}>
                  <FiUser size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px" }}>{user.email}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                    Admin Access • Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteUser(user._id)}
                style={{
                  background: "rgba(255, 0, 0, 0.1)",
                  color: "#ff4d4d",
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >
                <FiTrash2 />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                width: "100%",
                maxWidth: "480px",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "32px",
                padding: "40px",
                position: "relative",
                zIndex: 1001,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
            >
              <h3 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "8px", fontFamily: "var(--font-heading)" }}>ADD <span style={{ color: "var(--accent)" }}>USER</span></h3>
              <p style={{ color: "var(--secondary-text)", marginBottom: "32px" }}>Grant administrative access to a new user</p>

              <form onSubmit={handleAddUser}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: "600", textTransform: "uppercase" }}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <FiMail style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="user@example.com"
                      style={{
                        width: "100%",
                        padding: "14px 14px 14px 48px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        color: "#fff",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: "600", textTransform: "uppercase" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <FiKey style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "14px 48px 14px 48px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        color: "#fff",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.3)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px",
                        zIndex: 2
                      }}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: "600", textTransform: "uppercase" }}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <FiKey style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", zIndex: 1 }} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      style={{
                        width: "100%",
                        padding: "14px 48px 14px 48px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        color: "#fff",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "rgba(255,255,255,0.3)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px",
                        zIndex: 2
                      }}
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {formError && (
                  <div style={{ color: "#ff4d4d", background: "rgba(255, 77, 77, 0.1)", padding: "12px", borderRadius: "10px", marginBottom: "20px", fontSize: "0.85rem", borderLeft: "3px solid #ff4d4d" }}>
                    {formError}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.05)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ flex: 1, padding: "14px", background: "var(--accent)", color: "#000", border: "none", borderRadius: "14px", fontWeight: "700", cursor: submitting ? "not-allowed" : "pointer" }}
                  >
                    {submitting ? "Creating..." : "Create User"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;
