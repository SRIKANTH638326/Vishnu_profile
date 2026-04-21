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
