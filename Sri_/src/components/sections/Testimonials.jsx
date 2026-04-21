import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "../../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-card, .testimonial-stat-card", {
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
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
                <p className="text-label" style={{ marginBottom: 12 }}>What Clients Say</p>
                <h2 className="heading-lg" style={{ marginBottom: 16 }}>
                    Client <span className="accent">Testimonials</span>
                </h2>
                <p className="text-body" style={{ maxWidth: 600, marginBottom: 60 }}>
                    Here's what people say about working with me. Their trust and satisfaction motivate me to keep delivering work that makes an impact.
                </p>

                <div className="testimonials-grid">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j}>★</span>
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{t.initials}</div>
                                <div>
                                    <div className="testimonial-name">{t.name}</div>
                                    <div className="testimonial-role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Satisfaction stat card */}
                    <div className="testimonial-stat-card">
                        <div className="testimonial-stat-number">98%</div>
                        <div className="testimonial-stat-label">Client Satisfaction Rate</div>
                    </div>

                    {/* Clients worked with stat card */}
                    <div className="testimonial-stat-card">
                        <div className="testimonial-stat-number">5+</div>
                        <div className="testimonial-stat-label">Happy Clients Worldwide</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
