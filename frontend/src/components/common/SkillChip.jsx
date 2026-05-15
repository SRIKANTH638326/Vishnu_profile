import { motion } from "framer-motion";

export function SkillChip({ name, color, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.4, 
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -5, scale: 1.05 }}
            style={{ 
                padding: "8px 16px",
                borderRadius: "100px",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "default",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.boxShadow = `0 10px 20px -10px ${color}44`;
                e.currentTarget.style.background = `${color}11`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "var(--card-bg)";
            }}
        >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{name}</span>
        </motion.div>
    );
}
