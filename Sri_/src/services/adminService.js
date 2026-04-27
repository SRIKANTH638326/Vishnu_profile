// Service to handle data persistence using LocalStorage
// This can be easily swapped for Firebase/Supabase later

const STORAGE_KEYS = {
  PROJECTS:     "portfolio_projects",
  BLOGS:        "portfolio_blogs",
  MESSAGES:     "portfolio_messages",
  EXPERIENCE:   "portfolio_experience",
  TESTIMONIALS: "portfolio_testimonials",
  SKILLS:       "portfolio_skills",
  SERVICES:     "portfolio_services",
};

// Initial Data
const DEFAULT_DATA = {
  PROJECTS: [
    { id: 1, title: "Modern Portfolio", category: "Web Design", date: "2024-03-20", description: "A sleek, dark-themed portfolio." },
    { id: 2, title: "E-commerce App",   category: "Full Stack", date: "2024-02-15", description: "Built with React and Node.js." },
  ],
  BLOGS: [
    { id: 1, title: "How to master Framer Motion",  status: "Published", views: 452,  date: "2024-03-15" },
    { id: 2, title: "Building premium React UIs",   status: "Draft",     views: 0,    date: "2024-03-22" },
  ],
  MESSAGES: [
    { id: 1, name: "John Doe",    email: "john@example.com",   subject: "Project Inquiry", date: "2024-03-27", status: "New",  body: "Hi Srikanth, I saw your portfolio and I'm really impressed. I have a project to discuss — are you available for a quick call?" },
    { id: 2, name: "Sarah Smith", email: "sarah@design.co",    subject: "Collaboration",   date: "2024-03-25", status: "Read", body: "Hey! I'm a UI designer and love your development style. Want to collaborate on some open-source projects?" }
  ],
  EXPERIENCE: [
    { id: 1, role: "Full Stack Developer", company: "Tech Corp",       duration: "2023 – Present", description: "Built scalable web apps using React and Node.js." },
    { id: 2, role: "Frontend Intern",      company: "Creative Studio", duration: "2022 – 2023",    description: "Developed UI components and improved performance." },
  ],
  TESTIMONIALS: [
    { id: 1, name: "Alex Johnson", role: "Product Manager at Acme",  rating: 5, quote: "Srikanth delivered exceptional work! His attention to detail and speed were remarkable." },
    { id: 2, name: "Priya Nair",   role: "CEO at StartupX",          rating: 5, quote: "A true professional. The admin panel he built exceeded our expectations." },
  ],
  SKILLS: [
    { id: 1, name: "React",        level: 90, category: "Frontend" },
    { id: 2, name: "Node.js",      level: 80, category: "Backend"  },
    { id: 3, name: "MongoDB",      level: 75, category: "Database" },
    { id: 4, name: "TypeScript",   level: 70, category: "Frontend" },
    { id: 5, name: "Tailwind CSS", level: 85, category: "Frontend" },
  ],
  SERVICES: [
    { id: 1, title: "Web Development", description: "Responsive, performant websites using React and modern standards.", icon: "🌐" },
    { id: 2, title: "UI/UX Design",    description: "Crafting beautiful, intuitive interfaces that prioritize user experience.", icon: "🎨" },
    { id: 3, title: "Backend APIs",    description: "Scalable REST APIs with Node.js, Express, and MongoDB.", icon: "⚙️" },
  ],
};

const getItems  = (key, defaultData) => { const d = localStorage.getItem(key); return d ? JSON.parse(d) : defaultData; };
const setItems  = (key, items) => localStorage.setItem(key, JSON.stringify(items));
const makeId    = () => Date.now();
const today     = () => new Date().toISOString().split('T')[0];

export const adminService = {
  // ── Projects ──────────────────────────────────────────────
  getProjects:   () => getItems(STORAGE_KEYS.PROJECTS, DEFAULT_DATA.PROJECTS),
  addProject:    (p) => { const items = adminService.getProjects(); const n = { ...p, id: makeId(), date: today() }; setItems(STORAGE_KEYS.PROJECTS, [n, ...items]); return n; },
  deleteProject: (id) => setItems(STORAGE_KEYS.PROJECTS, adminService.getProjects().filter(i => i.id !== id)),
  updateProject: (id, data) => setItems(STORAGE_KEYS.PROJECTS, adminService.getProjects().map(i => i.id === id ? { ...i, ...data } : i)),

  // ── Blogs ─────────────────────────────────────────────────
  getBlogs:   () => getItems(STORAGE_KEYS.BLOGS, DEFAULT_DATA.BLOGS),
  addBlog:    (b) => { const items = adminService.getBlogs(); const n = { ...b, id: makeId(), views: 0, date: today() }; setItems(STORAGE_KEYS.BLOGS, [n, ...items]); return n; },
  deleteBlog: (id) => setItems(STORAGE_KEYS.BLOGS, adminService.getBlogs().filter(i => i.id !== id)),
  updateBlog: (id, data) => setItems(STORAGE_KEYS.BLOGS, adminService.getBlogs().map(i => i.id === id ? { ...i, ...data } : i)),

  // ── Messages ──────────────────────────────────────────────
  getMessages:      () => getItems(STORAGE_KEYS.MESSAGES, DEFAULT_DATA.MESSAGES),
  deleteMessage:    (id) => setItems(STORAGE_KEYS.MESSAGES, adminService.getMessages().filter(i => i.id !== id)),
  markMessageRead:  (id) => setItems(STORAGE_KEYS.MESSAGES, adminService.getMessages().map(i => i.id === id ? { ...i, status: "Read" } : i)),

  // ── Experience ────────────────────────────────────────────
  getExperience:   () => getItems(STORAGE_KEYS.EXPERIENCE, DEFAULT_DATA.EXPERIENCE),
  addExperience:   (e) => { const items = adminService.getExperience(); const n = { ...e, id: makeId() }; setItems(STORAGE_KEYS.EXPERIENCE, [n, ...items]); return n; },
  deleteExperience:(id) => setItems(STORAGE_KEYS.EXPERIENCE, adminService.getExperience().filter(i => i.id !== id)),

  // ── Testimonials ──────────────────────────────────────────
  getTestimonials:   () => getItems(STORAGE_KEYS.TESTIMONIALS, DEFAULT_DATA.TESTIMONIALS),
  addTestimonial:    (t) => { const items = adminService.getTestimonials(); const n = { ...t, id: makeId() }; setItems(STORAGE_KEYS.TESTIMONIALS, [n, ...items]); return n; },
  deleteTestimonial: (id) => setItems(STORAGE_KEYS.TESTIMONIALS, adminService.getTestimonials().filter(i => i.id !== id)),

  // ── Skills ────────────────────────────────────────────────
  getSkills:   () => getItems(STORAGE_KEYS.SKILLS, DEFAULT_DATA.SKILLS),
  addSkill:    (s) => { const items = adminService.getSkills(); const n = { ...s, id: makeId(), level: Number(s.level) }; setItems(STORAGE_KEYS.SKILLS, [n, ...items]); return n; },
  deleteSkill: (id) => setItems(STORAGE_KEYS.SKILLS, adminService.getSkills().filter(i => i.id !== id)),

  // ── Services ──────────────────────────────────────────────
  getServices:   () => getItems(STORAGE_KEYS.SERVICES, DEFAULT_DATA.SERVICES),
  addService:    (s) => { const items = adminService.getServices(); const n = { ...s, id: makeId() }; setItems(STORAGE_KEYS.SERVICES, [n, ...items]); return n; },
  deleteService: (id) => setItems(STORAGE_KEYS.SERVICES, adminService.getServices().filter(i => i.id !== id)),
};
