export function GlowBlob({ style = {} }) {
    return <div className="blob-anim" style={{ position: "absolute", filter: "blur(80px)", pointerEvents: "none", ...style }} />;
}
