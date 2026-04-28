import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiShoppingBag, FiActivity, FiArrowUpRight, FiClock } from "react-icons/fi";
import { useWindowSize } from "../hooks/useWindowSize";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    style={{
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: `${color}15`,
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon size={24} />
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        color: "#c4ff6b",
        fontSize: "0.85rem",
        fontWeight: "600"
      }}>
        {change} <FiArrowUpRight size={14} />
      </div>
    </div>
    <div>
      <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem", marginBottom: "4px" }}>{title}</p>
      <h3 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { width } = useWindowSize();

  const stats = [
    { title: "Total Views", value: "12.5k", change: "+12%", icon: FiActivity, color: "#c4ff6b" },
    { title: "Projects", value: "48", change: "+4", icon: FiShoppingBag, color: "#6bafff" },
    { title: "Active Clients", value: "12", change: "+2", icon: FiUsers, color: "#ff6bd6" },
    { title: "Avg. Engagement", value: "84%", change: "+5%", icon: FiClock, color: "#ffb36b" }
  ];

  return (
    <div>
      <header style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: width < 640 ? "1.6rem" : "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
          Dashboard Overview
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>Welcome back! Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
        gap: "20px",
        marginBottom: "40px"
      }}>
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Bottom Row */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: width < 1024 ? "1fr" : "2fr 1fr", 
        gap: "24px" 
      }}>
        {/* Recent Activity */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "32px" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "24px" }}>Recent Activity</h3>
          {[1,2,3].map(i => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiActivity size={20} color="#c4ff6b" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "500" }}>New project inquiry from Tesla</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>2 hours ago</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div style={{ background: "rgba(196, 255, 107, 0.1)", border: "1px solid rgba(196, 255, 107, 0.2)", borderRadius: "24px", padding: "32px", color: "#c4ff6b" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "16px" }}>Pro Tip</h3>
          <p style={{ lineHeight: "1.6", color: "rgba(196, 255, 107, 0.8)" }}>
            Keep your portfolio fresh by updating your projects once a month. High engagement is linked to recent activity!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{ marginTop: "16px", background: "#000", color: "#c4ff6b", border: "none", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}
          >
            Update Projects
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
