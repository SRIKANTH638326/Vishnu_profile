import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

export function Counter({ to, suffix = "" }) {
    const [ref, v] = useInView();
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!v) return;
        let val = 0; const dur = 1400; const step = 14; const inc = to / (dur / step);
        const t = setInterval(() => { val += inc; if (val >= to) { setN(to); clearInterval(t); } else setN(Math.floor(val)); }, step);
        return () => clearInterval(t);
    }, [v, to]);
    return <span ref={ref}>{n}{suffix}</span>;
}
