import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/portfolioData";

export function useScrollSpy() {
    const [active, setActive] = useState(NAV_LINKS[0]);
    useEffect(() => {
        const h = () => {
            let cur = NAV_LINKS[0];
            for (const id of NAV_LINKS) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 130) cur = id;
            }
            setActive(cur);
        };
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);
    return active;
}
