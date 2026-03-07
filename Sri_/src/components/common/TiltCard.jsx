import { useRef } from "react";

export function TiltCard({ children, style = {}, onMouseEnter, onMouseLeave }) {
    const ref = useRef(null);
    const onMove = e => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    };
    const onLeave = e => {
        if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
        onMouseLeave && onMouseLeave(e);
    };
    const onEnter = e => { onMouseEnter && onMouseEnter(e); };
    return (
        <div ref={ref} style={{ transition: "transform 0.18s ease", ...style }}
            onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onEnter}>
            {children}
        </div>
    );
}
