import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80, pause = 1800) {
    const [idx, setIdx] = useState(0);
    const [sub, setSub] = useState(0);
    const [del, setDel] = useState(false);
    const [text, setText] = useState("");
    useEffect(() => {
        const word = words[idx];
        if (!del && sub < word.length) {
            const t = setTimeout(() => { setText(word.slice(0, sub + 1)); setSub(s => s + 1); }, speed);
            return () => clearTimeout(t);
        }
        if (!del && sub === word.length) {
            const t = setTimeout(() => setDel(true), pause);
            return () => clearTimeout(t);
        }
        if (del && sub > 0) {
            const t = setTimeout(() => { setText(word.slice(0, sub - 1)); setSub(s => s - 1); }, speed / 2);
            return () => clearTimeout(t);
        }
        if (del && sub === 0) { setDel(false); setIdx(i => (i + 1) % words.length); }
    }, [sub, del, idx, words, speed, pause]);
    return text;
}
