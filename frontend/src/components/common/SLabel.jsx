export function SLabel({ children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,var(--accent),transparent)" }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>{children}</span>
        </div>
    );
}
