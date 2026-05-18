import React, { useState, useEffect } from "react";
import { 
  FiSave, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiGlobe, 
  FiPlus, 
  FiTrash2, 
  FiEdit2, 
  FiExternalLink, 
  FiTwitter, 
  FiGithub, 
  FiInstagram, 
  FiYoutube, 
  FiBookOpen 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../../components/common/Toast";
import { useWindowSize } from "../../hooks/useWindowSize";
import { adminService } from "../../services/adminService";

const ProfileSection = ({ title, icon: Icon, children, width }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: width < 640 ? "24px 20px" : "32px",
    marginBottom: "24px"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <div style={{ color: "var(--accent)" }}><Icon size={20} /></div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{title}</h3>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type = "text", value, onChange }) => (
  <div>
    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>{label}</label>
    <input 
      type={type} 
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder} 
      style={{
        width: "100%",
        padding: "12px 16px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        color: "#fff",
        outline: "none"
      }} 
    />
  </div>
);

export const Profile = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Profile updated successfully!");
  const [activeTab, setActiveTab] = useState("personal");
  const { width } = useWindowSize();
  const isMobile = width < 640;

  // Profile General Info State
  const [profile, setProfile] = useState({
    fullName: "",
    jobTitle: "",
    bio: "",
    yearsOfExperience: "",
    completedProjects: "",
    clientsWorldwide: "",
    phone: "",
    email: "",
    location: "",
    profileImage: ""
  });
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Social Connections State
  const [socials, setSocials] = useState([]);
  const [socialForm, setSocialForm] = useState({ platform: "LinkedIn", url: "", icon: "Linkedin" });
  const [editingSocialId, setEditingSocialId] = useState(null);
  const [loadingSocials, setLoadingSocials] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoadingProfile(true);
      const data = await adminService.getProfile();
      if (data) {
        setProfile(data);
      }
      setLoadingProfile(false);
    };
    loadProfileData();
  }, []);

  useEffect(() => {
    if (activeTab === "socials") {
      const load = async () => {
        setLoadingSocials(true);
        const data = await adminService.getSocials();
        setSocials(data);
        setLoadingSocials(false);
      };
      load();
    }
  }, [activeTab]);

  const handleSave = async () => {
    const res = await adminService.updateProfile(profile);
    if (res) {
      setProfile(res);
      setToastMessage("Profile settings updated!");
      setShowToast(true);
    } else {
      setToastMessage("Failed to save profile settings");
      setShowToast(true);
    }
  };

  const getFirstName = () => {
    const parts = (profile.fullName || "").split(" ");
    return parts[0] || "";
  };

  const getLastName = () => {
    const parts = (profile.fullName || "").split(" ");
    return parts.slice(1).join(" ") || "";
  };

  const handleNameChange = (first, last) => {
    setProfile(prev => ({
      ...prev,
      fullName: `${first} ${last}`.trim()
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setToastMessage("Image must be less than 2MB");
        setShowToast(true);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformChange = (p) => {
    let icon = "Globe";
    if (p === "LinkedIn") icon = "Linkedin";
    else if (p === "GitHub") icon = "Github";
    else if (p === "Twitter (X)") icon = "Twitter";
    else if (p === "Instagram") icon = "Instagram";
    else if (p === "Behance") icon = "Behance";
    else if (p === "Dribbble") icon = "Dribbble";
    else if (p === "YouTube") icon = "Youtube";
    else if (p === "Email") icon = "Mail";
    
    setSocialForm({ ...socialForm, platform: p, icon });
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    if (!socialForm.url) return;

    if (editingSocialId) {
      const res = await adminService.updateSocial(editingSocialId, socialForm);
      if (res) {
        setSocials(prev => prev.map(s => (s._id === editingSocialId || s.id === editingSocialId) ? res : s));
        setEditingSocialId(null);
        setSocialForm({ platform: "LinkedIn", url: "", icon: "Linkedin" });
        setToastMessage("Social connection updated!");
        setShowToast(true);
      }
    } else {
      const res = await adminService.addSocial(socialForm);
      if (res) {
        setSocials(prev => [...prev, res]);
        setSocialForm({ platform: "LinkedIn", url: "", icon: "Linkedin" });
        setToastMessage("Social connection added!");
        setShowToast(true);
      }
    }
  };

  const handleSocialEdit = (social) => {
    setEditingSocialId(social._id || social.id);
    setSocialForm({ platform: social.platform, url: social.url, icon: social.icon || "Linkedin" });
  };

  const handleSocialDelete = async (id) => {
    const success = await adminService.deleteSocial(id);
    if (success) {
      setSocials(prev => prev.filter(s => (s._id || s.id) !== id));
      setToastMessage("Social connection removed!");
      setShowToast(true);
    }
  };

  const getPlatformIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case "linkedin": return <FiSave size={18} />;
      case "github": return <FiGithub size={18} />;
      case "twitter": return <FiTwitter size={18} />;
      case "instagram": return <FiInstagram size={18} />;
      case "youtube": return <FiYoutube size={18} />;
      case "mail": return <FiMail size={18} />;
      case "behance": return <FiBookOpen size={18} />;
      default: return <FiGlobe size={18} />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case "linkedin": return "#0077b5";
      case "github": return "#333";
      case "twitter (x)": return "#1da1f2";
      case "instagram": return "#e1306c";
      case "youtube": return "#ff0000";
      case "email": return "var(--accent)";
      default: return "#4f46e5";
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: FiUser },
    { id: "contact", label: "Contact Details", icon: FiMail },
    { id: "socials", label: "Social Connections", icon: FiGlobe }
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "flex",
        flexDirection: width < 640 ? "column" : "row",
        justifyContent: "space-between",
        alignItems: width < 640 ? "flex-start" : "center",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <div>
          <h2 style={{ 
            fontSize: width < 640 ? "1.6rem" : "2rem", 
            fontFamily: "Antonio, sans-serif", 
            marginBottom: "8px" 
          }}>
            My Profile
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Manage your personal details, contact information, and dynamic social connections.
          </p>
        </div>
        {activeTab !== "socials" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              width: width < 640 ? "100%" : "auto"
            }}
          >
            <FiSave size={20} />
            Save Profile
          </motion.button>
        )}
      </div>

      {/* Tabs Header */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        marginBottom: "32px", 
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: "8px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              background: activeTab === tab.id ? "rgba(196, 255, 107, 0.1)" : "transparent",
              color: activeTab === tab.id ? "var(--accent)" : "rgba(255,255,255,0.4)",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s",
              whiteSpace: "nowrap",
              fontSize: "0.95rem",
              fontWeight: "600"
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "personal" && (
          <ProfileSection title="Personal Information" icon={FiUser} width={width}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.5)" }}>Profile Image</label>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  border: "2px dashed rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <FiUser size={30} color="rgba(255,255,255,0.2)" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    style={{
                      padding: "8px 16px",
                      background: "var(--accent)",
                      color: "#000",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "inline-block"
                    }}
                  >
                    Upload New Image
                  </label>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
                    Recommended: Square image, max 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 480 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup 
                label="First Name" 
                value={getFirstName()} 
                onChange={e => handleNameChange(e.target.value, getLastName())} 
              />
              <InputGroup 
                label="Last Name" 
                value={getLastName()} 
                onChange={e => handleNameChange(getFirstName(), e.target.value)} 
              />
            </div>
            <InputGroup 
              label="Professional Bio" 
              placeholder="Short bio for your profile..." 
              value={profile.bio} 
              onChange={e => setProfile({ ...profile, bio: e.target.value })} 
            />
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 480 ? "1fr" : "1fr 1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup 
                label="Years of Experience" 
                placeholder="12" 
                value={profile.yearsOfExperience} 
                onChange={e => setProfile({ ...profile, yearsOfExperience: e.target.value })} 
              />
              <InputGroup 
                label="Completed Projects" 
                placeholder="270" 
                value={profile.completedProjects} 
                onChange={e => setProfile({ ...profile, completedProjects: e.target.value })} 
              />
              <InputGroup 
                label="Clients Worldwide" 
                placeholder="50+" 
                value={profile.clientsWorldwide} 
                onChange={e => setProfile({ ...profile, clientsWorldwide: e.target.value })} 
              />
            </div>
          </ProfileSection>
        )}

        {activeTab === "contact" && (
          <ProfileSection title="Contact Details" icon={FiMail} width={width}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: width < 480 ? "1fr" : "1fr 1fr", 
              gap: "20px" 
            }}>
              <InputGroup 
                label="Email Address" 
                value={profile.email} 
                onChange={e => setProfile({ ...profile, email: e.target.value })} 
              />
              <InputGroup 
                label="Phone Number" 
                value={profile.phone} 
                onChange={e => setProfile({ ...profile, phone: e.target.value })} 
              />
            </div>
            <InputGroup 
              label="Location" 
              icon={FiMapPin} 
              value={profile.location} 
              onChange={e => setProfile({ ...profile, location: e.target.value })} 
            />
          </ProfileSection>
        )}

        {activeTab === "socials" && (
          <div style={{ display: "grid", gridTemplateColumns: width < 992 ? "1fr" : "380px 1fr", gap: "32px", alignItems: "flex-start" }}>
            {/* Social Link Form */}
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              padding: "28px",
            }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "20px", fontFamily: "Antonio, sans-serif" }}>
                {editingSocialId ? "✏️ Edit Connection" : "➕ Add Social Connection"}
              </h3>
              <form onSubmit={handleSocialSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Platform</label>
                  <select 
                    value={socialForm.platform} 
                    onChange={e => handlePlatformChange(e.target.value)} 
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "#161616",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Twitter (X)">Twitter (X)</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Behance">Behance</option>
                    <option value="Dribbble">Dribbble</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Email">Email</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Profile / Connection URL</label>
                  <input 
                    type="url" 
                    value={socialForm.url} 
                    onChange={e => setSocialForm({ ...socialForm, url: e.target.value })} 
                    placeholder={socialForm.platform === "Email" ? "mailto:name@example.com" : `https://${socialForm.platform.toLowerCase().replace(/\s/g, "")}.com/username`}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      outline: "none"
                    }} 
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  {editingSocialId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingSocialId(null);
                        setSocialForm({ platform: "LinkedIn", url: "", icon: "Linkedin" });
                      }}
                      style={{
                        flex: 1,
                        padding: "12px",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    style={{
                      flex: 2,
                      padding: "12px",
                      background: "var(--accent)",
                      color: "#000",
                      border: "none",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    {editingSocialId ? "Update Connection" : "Add Connection"}
                  </button>
                </div>
              </form>
            </div>

            {/* Social List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", fontFamily: "Antonio, sans-serif" }}>
                Connected Social Profiles ({socials.length})
              </h3>
              
              {loadingSocials ? (
                <div style={{ padding: "40px", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Loading profiles...</div>
              ) : socials.length === 0 ? (
                <div style={{ 
                  padding: "48px", 
                  background: "rgba(255,255,255,0.01)", 
                  border: "1px dashed rgba(255,255,255,0.1)", 
                  borderRadius: "24px",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.4)"
                }}>
                  <FiGlobe size={32} style={{ marginBottom: "16px", color: "rgba(255,255,255,0.2)" }} />
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>No social connections configured yet.</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>Use the form on the left to connect your first social profile!</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  {socials.map(social => (
                    <motion.div 
                      key={social._id || social.id} 
                      whileHover={{ y: -2 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "20px",
                        padding: "20px",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        justifyContent: "space-between"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: `${getPlatformColor(social.platform)}20`,
                            color: getPlatformColor(social.platform),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {getPlatformIcon(social.icon)}
                          </div>
                          <div>
                            <h4 style={{ fontSize: "1rem", fontWeight: "600", margin: 0 }}>{social.platform}</h4>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button 
                            onClick={() => handleSocialEdit(social)} 
                            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", transition: "0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button 
                            onClick={() => handleSocialDelete(social._id || social.id)} 
                            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", transition: "0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#ff4d4d"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.4)",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          width: "fit-content"
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                      >
                        Visit Profile <FiExternalLink size={12} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showToast && (
          <Toast 
            message={toastMessage} 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
