import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { motion } from "framer-motion";

export const AdminLayout = () => {
  return (
    <div style={{ 
      display: "flex", 
      background: "var(--bg)", 
      minHeight: "100vh",
      color: "var(--text)"
    }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: "320px", // Increased to clear the floating sidebar + its margin
        padding: "32px 40px",
        minHeight: "100vh",
        background: "radial-gradient(circle at top right, rgba(255, 255, 255, 0.02), transparent)"
      }}>

        <AdminHeader />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

