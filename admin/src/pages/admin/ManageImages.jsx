import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSave, FiTrash2, FiUpload, FiImage,
  FiMonitor, FiUser, FiMail, FiLayers,
  FiZap, FiAward, FiGlobe
} from "react-icons/fi";
import { Toast } from "../../components/common/Toast";
import { useWindowSize } from "../../hooks/useWindowSize";
import { adminService } from "../../services/adminService";

// All sections with their profile field and metadata
const SECTIONS = [
  {
    id: "hero",
    label: "Hero Portrait",
    icon: FiMonitor,
    field: "profileImage",
    description: "Main portrait shown in the hero banner on the home page.",
    hint: "Best: tall portrait (4:5 ratio). Max 2MB.",
    page: "Home → Hero",
  },
  {
    id: "about",
    label: "About Section",
    icon: FiUser,
    field: "aboutImage",
    description: "Image shown in the About Me section (home & about-us page).",
    hint: "Best: portrait or square. Max 2MB.",
    page: "Home & About Us → About",
  },
  {
    id: "contact",
    label: "Contact Section",
    icon: FiMail,
    field: "contactImage",
    description: "Portrait shown next to the contact form.",
    hint: "Best: portrait (4:5). Max 2MB.",
    page: "Contact Us",
  },
  {
    id: "services",
    label: "Services Section",
    icon: FiLayers,
    field: "servicesImage",
    description: "Workspace image displayed alongside the services accordion.",
    hint: "Best: landscape or portrait. Max 2MB.",
    page: "About Us → Services",
  },
  {
    id: "skills",
    label: "Tech Stack Section",
    icon: FiZap,
    field: "skillsImage",
    description: "Image displayed beside the My Tech Stack skills list.",
    hint: "Best: landscape or portrait. Max 2MB.",
    page: "About Us → Tech Stack",
  },
  {
    id: "experience",
    label: "Experience Section",
    icon: FiAward,
    field: "experienceImage",
    description: "Workspace/studio image beside the experience timeline.",
    hint: "Best: portrait or square. Max 2MB.",
    page: "About Us → Experience",
  },
  {
    id: "og",
    label: "OG / Social Share",
    icon: FiGlobe,
    field: "ogImage",
    description: "Preview image when your site is shared on social media.",
    hint: "Best: 1200×630px landscape. Max 2MB.",
    page: "Meta / Social preview",
  },
];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const ManageImages = () => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await adminService.getProfile();
      if (data) setProfile(data);
      setLoading(false);
    };
    load();
  }, []);

  const currentSection = SECTIONS.find((s) => s.id === activeSection);
  const currentImage = profile[currentSection?.field];

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToastMessage("Please select a valid image file.");
      setShowToast(true);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setToastMessage("Image must be less than 2MB.");
      setShowToast(true);
      return;
    }
    const base64 = await toBase64(file);
    setProfile((prev) => ({ ...prev, [currentSection.field]: base64 }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setProfile((prev) => ({ ...prev, [currentSection.field]: "" }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await adminService.updateProfile(profile);
    setSaving(false);
    if (res) {
      setProfile(res);
      setToastMessage(`${currentSection.label} image saved!`);
    } else {
      setToastMessage("Failed to save. Please try again.");
    }
    setShowToast(true);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: "20px",
        marginBottom: "40px",
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? "1.6rem" : "2rem", fontFamily: "Antonio, sans-serif", marginBottom: "8px" }}>
            Images Manager
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Upload images for each section of your portfolio. Changes save to the database instantly.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "12px 28px",
            background: saving ? "rgba(196,255,107,0.4)" : "var(--accent)",
            color: "#000", border: "none", borderRadius: "12px",
            fontWeight: "bold", cursor: saving ? "not-allowed" : "pointer",
            width: isMobile ? "100%" : "auto", fontSize: "0.95rem",
            transition: "0.2s"
          }}
        >
          <FiSave size={18} />
          {saving ? "Saving..." : "Save Image"}
        </motion.button>
      </div>

      {loading ? (
        <div style={{ padding: "80px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
          Loading profile...
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          gap: "28px",
          alignItems: "flex-start"
        }}>

          {/* ── Left: Section list ── */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            overflow: "hidden",
          }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Page Sections
              </p>
            </div>
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const hasImg = !!profile[sec.field];
              const isActive = activeSection === sec.id;
              return (
                <motion.button
                  key={sec.id}
                  whileHover={{ x: 3 }}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    width: "100%", padding: "14px 18px",
                    background: isActive ? "rgba(196,255,107,0.07)" : "transparent",
                    border: "none",
                    borderLeft: isActive ? "3px solid var(--accent)" : "3px solid transparent",
                    color: isActive ? "var(--accent)" : "rgba(255,255,255,0.55)",
                    cursor: "pointer", textAlign: "left", transition: "0.2s",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: "600", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {sec.label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
                      {sec.page}
                    </div>
                  </div>
                  {hasImg && (
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ── Right: Upload panel ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: isMobile ? "24px 20px" : "36px",
              }}
            >
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                <div style={{ color: "var(--accent)" }}><currentSection.icon size={22} /></div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", margin: 0 }}>{currentSection.label}</h3>
              </div>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
                {currentSection.description}
              </p>
              <div style={{ marginBottom: "28px" }}>
                <span style={{
                  background: "rgba(196,255,107,0.08)", color: "var(--accent)",
                  padding: "3px 10px", borderRadius: "6px",
                  fontSize: "0.75rem", fontWeight: "600"
                }}>
                  📍 {currentSection.page}
                </span>
              </div>

              {/* Drop zone */}
              <label
                htmlFor={`img-upload-${activeSection}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  display: "block",
                  border: `2px dashed ${dragOver ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "18px",
                  padding: "40px 20px",
                  textAlign: "center",
                  background: dragOver ? "rgba(196,255,107,0.04)" : "transparent",
                  transition: "0.25s",
                  marginBottom: "28px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id={`img-upload-${activeSection}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <FiUpload size={30} style={{ color: "rgba(255,255,255,0.25)", marginBottom: "12px", display: "block", margin: "0 auto 12px" }} />
                <p style={{ margin: "0 0 4px", fontWeight: "600", color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
                  Drop an image here, or <span style={{ color: "var(--accent)" }}>browse</span>
                </p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                  {currentSection.hint}
                </p>
              </label>

              {/* Preview */}
              {currentImage ? (
                <div>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginBottom: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Current Image Preview
                  </p>
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{
                      width: "150px", height: "188px",
                      borderRadius: "16px", overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0
                    }}>
                      <img
                        src={currentImage}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <label
                        htmlFor={`img-upload-${activeSection}`}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "10px 20px", background: "var(--accent)",
                          color: "#000", borderRadius: "10px", fontWeight: "600",
                          cursor: "pointer", fontSize: "0.88rem"
                        }}
                      >
                        <FiImage size={15} /> Replace Image
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRemove}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "10px 20px",
                          background: "rgba(255,60,60,0.08)", color: "#ff6b6b",
                          border: "1px solid rgba(255,60,60,0.2)", borderRadius: "10px",
                          fontWeight: "600", cursor: "pointer", fontSize: "0.88rem"
                        }}
                      >
                        <FiTrash2 size={15} /> Remove
                      </motion.button>
                      <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
                        Click "Save Image" above to apply changes to the website.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.01)",
                  border: "1px dashed rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.2)"
                }}>
                  <FiImage size={26} style={{ marginBottom: "8px", display: "block", margin: "0 auto 8px" }} />
                  <p style={{ margin: 0, fontSize: "0.88rem" }}>No image uploaded for this section yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Overview grid: all section thumbnails */}
      <div style={{ marginTop: "48px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "20px", fontFamily: "Antonio, sans-serif" }}>
          All Sections Overview
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? "140px" : "160px"}, 1fr))`,
          gap: "16px"
        }}>
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const img = profile[sec.field];
            const isActive = activeSection === sec.id;
            return (
              <motion.div
                key={sec.id}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => { setActiveSection(sec.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: isActive ? "2px solid var(--accent)" : "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.02)",
                  transition: "border 0.2s"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "4/5", position: "relative", background: "#111" }}>
                  {img ? (
                    <img src={img} alt={sec.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)" }}>
                      <Icon size={28} />
                    </div>
                  )}
                  {img && (
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      width: 10, height: 10, borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow: "0 0 8px var(--accent)"
                    }} />
                  )}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "600", color: isActive ? "var(--accent)" : "rgba(255,255,255,0.7)" }}>
                    {sec.label}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
                    {img ? "✓ Uploaded" : "No image"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
