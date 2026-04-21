import { useState, useEffect, useRef } from "react";
import { FAQ_DATA } from "../../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
    const [openIdx, setOpenIdx] = useState(-1);
    const sectionRef = useRef(null);
    const answerRefs = useRef([]);

    const toggle = (i) => {
        setOpenIdx(prev => prev === i ? -1 : i);
    };

    useEffect(() => {
        answerRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === openIdx) {
                el.style.maxHeight = el.scrollHeight + "px";
            } else {
                el.style.maxHeight = "0px";
            }
        });
    }, [openIdx]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-item", {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" ref={sectionRef}>
            <div className="container">
                <div className="faq-grid">
                    <div>
                        <p className="text-label" style={{ marginBottom: 12 }}>FAQ</p>
                        <h2 className="heading-lg" style={{ marginBottom: 16 }}>
                            Frequently Asked<br />
                            <span className="accent">Questions</span>
                        </h2>
                        <p className="text-body" style={{ maxWidth: 400 }}>
                            Here are answers to some of the most common questions. If yours isn't listed, feel free to reach out!
                        </p>
                    </div>

                    <div className="faq-list">
                        {FAQ_DATA.map((item, i) => (
                            <div key={i} className={`faq-item ${openIdx === i ? "open" : ""}`}>
                                <button className="faq-question" onClick={() => toggle(i)}>
                                    <span className="faq-num">{i + 1}.</span>
                                    <span className="faq-q-text">{item.q}</span>
                                    <span className="faq-toggle">+</span>
                                </button>
                                <div
                                    className="faq-answer"
                                    ref={el => answerRefs.current[i] = el}
                                >
                                    <div className="faq-answer-inner">{item.a}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
