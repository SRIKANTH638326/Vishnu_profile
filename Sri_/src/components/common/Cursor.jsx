import { useEffect, useRef } from "react";

export function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const rpos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const move = e => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
        };
        window.addEventListener("mousemove", move);
        let raf;
        const lerp = (a, b, t) => a + (b - a) * t;
        const loop = () => {
            rpos.current.x = lerp(rpos.current.x, pos.current.x, 0.11);
            rpos.current.y = lerp(rpos.current.y, pos.current.y, 0.11);
            if (ring.current) {
                ring.current.style.left = rpos.current.x + "px";
                ring.current.style.top = rpos.current.y + "px";
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
    }, []);

    return (
        <>
            <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: "#6366f1", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", boxShadow: "0 0 10px #6366f1" }} />
            <div ref={ring} style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(99,102,241,0.55)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", transition: "width 0.3s,height 0.3s" }} />
        </>
    );
}
