import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Cursor } from "./components/common/Cursor";
import { Particles } from "./components/common/Particles";
import Loader from "./components/common/Loader";
import { ThemeToggle } from "./components/common/ThemeToggle";
import "./styles/global.css";

// Admin Imports
import { AdminProvider } from "./context/AdminContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { ManageProjects } from "./pages/admin/ManageProjects";
import { ManageBlogs } from "./pages/admin/ManageBlogs";
import { Messages } from "./pages/admin/Messages";
import { Settings } from "./pages/admin/Settings";
import { ManageExperience } from "./pages/admin/ManageExperience";
import { ManageSkills } from "./pages/admin/ManageSkills";
import { ManageServices } from "./pages/admin/ManageServices";
import ManageUsers from "./pages/admin/ManageUsers";
import { Profile } from "./pages/admin/Profile";
import { ManageImages } from "./pages/admin/ManageImages";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
        <Loader />
      </div>
    );
  }

  return (
    <AdminProvider>
      <BrowserRouter>
        <div style={{ background: "var(--bg)", color: "var(--text)" }}>
          <Cursor />
          <Particles count={24} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Routes>
              {/* Redirect root '/' to '/admin/login' */}
              <Route path="/" element={<Navigate to="/admin/login" replace />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects" element={<ManageProjects />} />
                  <Route path="skills" element={<ManageSkills />} />
                  <Route path="experience" element={<ManageExperience />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="services" element={<ManageServices />} />
                  <Route path="users" element={<ManageUsers />} />
                  <Route path="images" element={<ManageImages />} />
                </Route>
              </Route>
            </Routes>

            {/* Fixed Theme Toggle */}
            <div style={{ 
              position: "fixed", 
              bottom: "32px", 
              left: "50%", 
              transform: "translateX(-50%)", 
              zIndex: 9999 
            }}>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AdminProvider>
  );
}
