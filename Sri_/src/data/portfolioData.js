export const NAV_LINKS = ["Home", "About us", "Projects", "Blogs", "Contact us"];
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
    { 
        tag: "Insights", 
        date: "Apr 30, 2025",
        title: "5 DESIGN TRENDS THAT WILL DEFINE 2024", 
        desc: "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
        accent: "var(--accent)", 
        image: "design-trends.png"
    },
    { 
        tag: "Tutorials", 
        date: "Apr 30, 2025",
        title: "HOW TO STREAMLINE YOUR DESIGN WORKFLOW", 
        desc: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
        accent: "rgba(255,255,255,0.6)", 
        image: "workflow.png"
    },
];

export const PROJECTS = [
    { 
        title: "SUMMER VIBES FESTIVAL CAMPAIGN", 
        desc: "Created promotional materials for the \"Summer Vibes Festival,\" including posters, flyers, and social media graphics.", 
        tag: "Graphic Design",
        image: "festival.png",
        color: "#ffbf48"
    },
    { 
        title: "CORAL SPIRAL ABSTRACT", 
        desc: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background.", 
        tag: "Branding",
        image: "abstract.png",
        color: "#f43f5e"
    },
    { 
        title: "CYBERPUNK INTERFACE HUD", 
        desc: "Futuristic user interface design with holographic blueprints and intricate data visualizations for a mission-critical tech platform.", 
        tag: "UI/UX",
        image: "cyberpunk.png",
        color: "#06b6d4"
    },
    { 
        title: "MINIMALIST VOGUE PACKAGING", 
        desc: "High-end cosmetic packaging design focusing on elegant typography, neutral palettes, and a sophisticated minimalist aesthetic.", 
        tag: "Product Design",
        image: "packaging.png",
        color: "#a78bfa"
    },
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

export const BLOG_DATA = [
    {
        id: 1,
        title: "The Future of AI in UI/UX Design",
        date: "May 15, 2025",
        category: "AI & Design",
        image: "blog-ai.png",
        desc: "How artificial intelligence is reshaping the way we create and interact with digital interfaces."
    },
    {
        id: 2,
        title: "Data Visualization Best Practices",
        date: "May 10, 2025",
        category: "Analytics",
        image: "blog-data.png",
        desc: "Transforming complex datasets into clear, actionable insights through effective visual storytelling."
    },
    {
        id: 3,
        title: "Mastering Figma for Faster Workflows",
        date: "May 5, 2025",
        category: "Productivity",
        image: "blog-figma.png",
        desc: "Advanced tips and tricks to optimize your design process and collaborate more effectively in Figma."
    }
];
