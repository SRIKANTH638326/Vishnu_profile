import { useEffect, useRef } from "react";

export function Particles({ count = 45 }) {
    const canvas = useRef(null);
    useEffect(() => {
        const c = canvas.current; if (!c) return;
        const ctx = c.getContext("2d");
        let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
        const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
        window.addEventListener("resize", onResize);

        const pts = Array.from({ length: count }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.6 + 0.4,
            op: Math.random() * 0.5 + 0.2,
            col: Math.random() > 0.5 ? "#6366f1" : "#8b5cf6",
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.col + Math.floor(p.op * 255).toString(16).padStart(2, "0");
                ctx.fill();
            });
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 130) * 0.12})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
    }, [count]);

    return <canvas ref={canvas} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.65 }} />;
}
