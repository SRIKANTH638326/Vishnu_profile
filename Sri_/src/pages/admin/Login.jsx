import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login: contextLogin } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        contextLogin(data.user, data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError("Connection failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(196, 255, 107, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "32px",
          padding: "50px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          style={{
            width: "64px",
            height: "64px",
            background: "var(--accent)",
            borderRadius: "18px",
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            fontSize: "1.5rem",
            fontWeight: "bold",
            boxShadow: "0 0 20px rgba(196, 255, 107, 0.3)"
          }}
        >
          S
        </motion.div>

        <h2 style={{ 
          fontSize: "2.5rem", 
          marginBottom: "8px", 
          fontFamily: "var(--font-heading)",
          color: "var(--text)",
          letterSpacing: "-1px"
        }}>
          Welcome Back
        </h2>
        <p style={{ color: "var(--secondary-text)", marginBottom: "40px", fontSize: "0.95rem" }}>
          Enter your credentials to manage your portfolio
        </p>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: "100%",
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
                outline: "none",
                fontSize: "1rem",
                transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.background = "rgba(196, 255, 107, 0.02)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.03)";
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <label style={{ 
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Password
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "1rem",
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.background = "rgba(196, 255, 107, 0.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.03)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
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
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ 
                  color: "#ff4d4d", 
                  fontSize: "0.85rem", 
                  marginBottom: "20px",
                  padding: "10px 15px",
                  background: "rgba(255, 77, 77, 0.1)",
                  borderRadius: "10px",
                  borderLeft: "3px solid #ff4d4d"
                }}>
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(196, 255, 107, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "16px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderTopColor: "#000",
                  borderRadius: "50%"
                }}
              />
            ) : "Sign In to Dashboard"}
          </motion.button>
        </form>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: "30px", 
            fontSize: "0.8rem", 
            color: "rgba(255,255,255,0.3)",
            cursor: "default"
          }}
        >
          &copy; {new Date().getFullYear()} Srikanth Portfolio • Protected Session
        </motion.p>
      </motion.div>
    </div>
  );
};

