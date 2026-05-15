import { useInView } from "../../hooks/useInView";

export function Reveal({ children, delay = 0, dir = "up", style = {} }) {
    const [ref, v] = useInView();
    const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
    return (
        <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : transforms[dir] || transforms.up, transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>
            {children}
        </div>
    );
}
