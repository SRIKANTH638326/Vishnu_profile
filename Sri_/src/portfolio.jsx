import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { Cursor } from "./components/common/Cursor";
import { Particles } from "./components/common/Particles";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import { ThemeToggle } from "./components/common/ThemeToggle";
import "./styles/global.css";

// Pages
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { ContactPage } from "./pages/ContactPage";

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
import { Profile } from "./pages/admin/Profile";



// Simple wrapper to check if we are in admin mode to hide public layout
const PublicLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Navbar />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
};


// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]);

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
        <ScrollToTop />

      <div style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Cursor />
        <Particles count={24} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <PublicLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/contact-us" element={<ContactPage />} />

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
                </Route>
              </Route>
            </Routes>
          </PublicLayout>

          
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


