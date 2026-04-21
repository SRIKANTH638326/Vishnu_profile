export function MarqueeStrip() {
    const items = ["Figma", "React", "Power BI", "Python", "SQL", "Tailwind CSS", "Adobe XD", "Excel", "Azure Data Lake", "JavaScript", "ETL", "EDA"];
    const doubled = [...items, ...items];
    return (
        <div style={{ padding: "28px 0", background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ display: "flex", width: "max-content", animation: "marquee 22s linear infinite" }}>
                {doubled.map((item, i) => (
                    <span key={i} className="marquee-text" style={{ padding: "0 28px", fontSize: 12, fontWeight: 700, color: "var(--secondary-text)", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 24 }}>
                        {item}<span style={{ color: "var(--accent)", fontSize: 8 }}>◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
