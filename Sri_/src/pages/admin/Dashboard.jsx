import React, { useState, useEffect } from "react";
import { FiUsers, FiBriefcase, FiFileText, FiMessageSquare, FiAward, FiStar, FiZap, FiLayers } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, to }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: `0 12px 30px ${color}22` }}
      onClick={() => navigate(to)}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        cursor: "pointer",
        transition: "0.3s"
      }}
    >
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: `${color}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        flexShrink: 0
      }}>
        <Icon size={26} />
      </div>
      <div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "4px", margin: 0 }}>{title}</p>
        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "4px 0 0" }}>{value}</h3>
      </div>
    </motion.div>
  );
};

const ActivityRow = ({ label, time, color }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>{label}</span>
    </div>
    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>{time}</span>
  </div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const [views, setViews] = useState(1284);

  useEffect(() => {
    const interval = setInterval(() => {
      setViews(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "Total Views",    value: views.toLocaleString(), icon: FiUsers,       color: "#a3e635", to: "/admin/dashboard"  },
    { title: "Projects",       value: "12",                   icon: FiBriefcase,   color: "#60a5fa", to: "/admin/projects"   },
    { title: "Blog Posts",     value: "8",                    icon: FiFileText,    color: "#f472b6", to: "/admin/blogs"      },
    { title: "Messages",       value: "3",                    icon: FiMessageSquare, color: "#fbbf24", to: "/admin/messages" },
    { title: "Experience",     value: "2 yrs",                icon: FiAward,       color: "#34d399", to: "/admin/experience" },
    { title: "Testimonials",   value: "8",                    icon: FiStar,        color: "#f97316", to: "/admin/testimonials" },
    { title: "Skills",         value: "14",                   icon: FiZap,         color: "#a78bfa", to: "/admin/skills"    },
    { title: "Services",       value: "5",                    icon: FiLayers,      color: "#38bdf8", to: "/admin/services"  },
  ];

  const recentActivity = [
    { label: "New message from John Doe",           time: "2h ago",  color: "#fbbf24" },
    { label: "Project 'AI Dashboard' added",        time: "5h ago",  color: "#60a5fa" },
    { label: "Skill 'TypeScript' updated",          time: "1d ago",  color: "#a78bfa" },
    { label: "Testimonial from Priya Nair added",   time: "2d ago",  color: "#f97316" },
    { label: "Service 'UI/UX Design' updated",      time: "3d ago",  color: "#34d399" },
    { label: "Blog post published: Framer Motion",  time: "4d ago",  color: "#f472b6" },
  ];

  const quickActions = [
    { label: "Add New Project",   to: "/admin/projects",     bg: "var(--accent)", color: "#000" },
    { label: "Write Blog Post",   to: "/admin/blogs",        bg: "rgba(255,255,255,0.05)", color: "#fff" },
    { label: "Add Experience",    to: "/admin/experience",   bg: "rgba(255,255,255,0.05)", color: "#fff" },
    { label: "Add Testimonial",   to: "/admin/testimonials", bg: "rgba(255,255,255,0.05)", color: "#fff" },
    { label: "Update Skills",     to: "/admin/skills",       bg: "rgba(255,255,255,0.05)", color: "#fff" },
    { label: "Manage Services",   to: "/admin/services",     bg: "rgba(255,255,255,0.05)", color: "#fff" },
  ];

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
          Welcome back, Srikanth 👋
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          Here's an overview of your portfolio today.
        </p>
      </header>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>

        {/* Recent Activity */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px" }}>Recent Activity</h4>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginBottom: "20px" }}>Latest updates across your portfolio</p>
          {recentActivity.map((a, i) => <ActivityRow key={i} {...a} />)}
        </div>

        {/* Quick Actions */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px" }}>Quick Actions</h4>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginBottom: "20px" }}>Jump straight into editing</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quickActions.map(a => (
              <motion.button
                key={a.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(a.to)}
                style={{ padding: "11px 16px", background: a.bg, color: a.color, border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", fontWeight: "600", cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}
              >
                {a.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
