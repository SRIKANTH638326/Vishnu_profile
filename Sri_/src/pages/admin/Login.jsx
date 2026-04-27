import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "20px"
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h2 style={{ 
          fontSize: "2rem", 
          marginBottom: "10px", 
          fontFamily: "Antonio, sans-serif",
          color: "var(--text)"
        }}>
          Admin Access
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "30px" }}>
          Please enter your credentials to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)"
            }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ff4d4d", fontSize: "0.85rem", marginBottom: "20px" }}>
              {error}
            </p>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--accent)", // Assuming lime green from context
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
