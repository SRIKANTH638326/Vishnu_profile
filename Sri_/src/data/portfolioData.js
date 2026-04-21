export const NAV_LINKS = ["Hero", "About", "Skills", "Case Studies", "Projects", "Services", "Contact"];
export const ROLES = ["UI/UX Designer", "Data Analyst", "Frontend Developer", "Power BI Analyst", "Problem Solver"];

export const SKILLS_DATA = {
    "Design Tools": [
        { name: "Figma", pct: 92, color: "#6366f1" },
        { name: "Adobe XD", pct: 80, color: "#8b5cf6" },
        { name: "Photoshop", pct: 70, color: "#a78bfa" },
        { name: "Illustrator", pct: 65, color: "#c4b5fd" },
    ],
    "Frontend": [
        { name: "React", pct: 78, color: "#06b6d4" },
        { name: "Tailwind CSS", pct: 85, color: "#0ea5e9" },
        { name: "JavaScript", pct: 72, color: "#f59e0b" },
        { name: "HTML / CSS", pct: 90, color: "#10b981" },
    ],
    "Data & Analytics": [
        { name: "Python", pct: 80, color: "#6366f1" },
        { name: "SQL", pct: 82, color: "#8b5cf6" },
        { name: "Power BI", pct: 85, color: "#f43f5e" },
        { name: "Excel", pct: 75, color: "#10b981" },
    ],
};

export const CASE_STUDIES = [
    { tag: "Data Analytics", title: "Churn Analysis Dashboard", desc: "End-to-end churn prediction pipeline using Python & Power BI. Identified key churn drivers, reducing projected churn rate by 23%.", metrics: ["23% churn reduction", "15K+ records", "Power BI"], accent: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
    { tag: "Risk Analytics", title: "Banking Risk Analysis", desc: "Built a comprehensive risk scoring model with SQL & Python. Delivered executive dashboards highlighting high-risk segments.", metrics: ["SQL + Python", "Risk Scoring", "EDA"], accent: "#06b6d4", bg: "rgba(6,182,212,0.08)" },
    { tag: "UI/UX Design", title: "ZikraByte Design System", desc: "Created a scalable design system in Figma for ZikraByte Solutions — components, tokens, responsive layouts, and interaction specs.", metrics: ["Figma", "60+ components", "Design Tokens"], accent: "#f43f5e", bg: "rgba(244,63,94,0.08)" },
];

export const PROJECTS = [
    { title: "Sales Intelligence Dashboard", desc: "Interactive Power BI dashboard tracking revenue KPIs, regional performance, and product trends across 12 months.", tags: ["Power BI", "DAX", "SQL"], emoji: "📈", color: "#6366f1" },
    { title: "Data Cleaning & EDA Suite", desc: "Automated Python pipeline — outlier detection, null imputation, and visual EDA reports from messy datasets.", tags: ["Python", "Pandas", "Matplotlib"], emoji: "🧹", color: "#8b5cf6" },
    { title: "FITA Academy UI Redesign", desc: "Full UX overhaul of the FITA Academy learning portal — improved navigation, responsive layouts, and accessibility.", tags: ["Figma", "React", "Tailwind"], emoji: "🎓", color: "#06b6d4" },
    { title: "Banking Risk Portal", desc: "Web dashboard surfacing real-time risk metrics from SQL backend — built with React and REST APIs.", tags: ["React", "SQL", "Python"], emoji: "🏦", color: "#f59e0b" },
];

export const SERVICES = [
    { 
        id: "01",
        title: "UI/UX DESIGN", 
        desc: "As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.",
        features: [
            "Wireframing and prototyping",
            "User Interface design for web and mobile apps",
            "Usability testing and user feedback analysis",
            "Interaction design and micro-animations"
        ],
        accent: "var(--accent)"
    },
    { 
        id: "02",
        title: "GRAPHIC DESIGN", 
        desc: "Creating compelling visual identities and assets that communicate your brand's unique message effectively.",
        features: [
            "Visual identity and branding systems",
            "Marketing materials and social assets",
            "Typography and layout design",
            "Custom illustration and iconography"
        ],
        accent: "var(--accent)"
    },
    { 
        id: "03",
        title: "WEB DESIGN", 
        desc: "Combining aesthetics with functionality to build high-performance, responsive websites that convert.",
        features: [
            "Responsive layout architecture",
            "Modern frontend implementation",
            "Performance optimization",
            "Content management integration"
        ],
        accent: "var(--accent)"
    },
    { 
        id: "04",
        title: "BRANDING", 
        desc: "Developing consistent and memorable brand experiences that resonate with your target audience.",
        features: [
            "Brand strategy and positioning",
            "Logo design and development",
            "Brand voice and messaging",
            "Style guides and documentation"
        ],
        accent: "var(--accent)"
    },
];

export const FAQ_DATA = [
    { q: "WHAT SERVICES DO YOU OFFER?", a: "I offer UI/UX design, web design, graphic design, and brand identity development." },
    { q: "HOW DOES THE DESIGN PROCESS WORK?", a: "We start with discovery and research, move into wireframing and prototyping, and finish with high-fidelity visual design and testing." },
    { q: "HOW LONG DOES A PROJECT USUALLY TAKE?", a: "Most projects take between 2 to 6 weeks, depending on the scope and complexity." },
    { q: "WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?", a: "I'll need a project brief, any existing brand guidelines or assets, and your goals for the project." },
    { q: "DO YOU OFFER REVISIONS?", a: "Yes, standard projects include two rounds of revisions to ensure you're completely satisfied with the final result." },
    { q: "HOW DO I GET STARTED?", a: "Simply reach out via the contact form or email, and we'll schedule a discovery call to discuss your needs." }
];

export const TESTIMONIALS = [
    {
        id: 1,
        text: "Duncan truly understood my vision and turned it into impactful designs. The results went beyond my expectations!",
        name: "John Harris",
        role: "Marketing Director",
        initials: "JH",
    },
    {
        id: 2,
        text: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
        name: "Michael Lee",
        role: "Product Manager",
        initials: "ML",
    },
    {
        id: 3,
        text: "His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.",
        name: "Sarah Johnson",
        role: "CEO",
        initials: "SJ",
    },
    {
        id: 4,
        text: "As a small business owner, I appreciated how stress-free Duncan made the process.",
        name: "Laura Bennett",
        role: "Small Business Owner",
        initials: "LB",
    }
];
