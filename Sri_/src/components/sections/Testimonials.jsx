import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "../../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-bento-item", {
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
        <section className="section-pad" ref={sectionRef} style={{ position: "relative" }}>
            <div className="container">
                <div style={{ marginBottom: 48, maxWidth: 600 }}>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(48px, 6vw, 64px)", lineHeight: 1, textTransform: "uppercase", marginBottom: 16 }}>
                        WHAT MY CLIENTS SAY
                    </h2>
                    <p style={{ color: "var(--secondary-text)", fontSize: "16px", lineHeight: 1.6 }}>
                        Here's what my clients have shared about their experiences working with me. Their trust and satisfaction motivate me to continue delivering designs that make an impact.
                    </p>
                </div>

                <div className="testimonials-bento-grid">
                    {/* Item 1: Testimonial 1 */}
                    <div className="testimonial-bento-item t-card-dark">
                        <div>
                            <div className="stars">★★★★★</div>
                            <p className="t-text">"{TESTIMONIALS[0].text}"</p>
                        </div>
                        <div className="t-author">
                            <div className="t-avatar"><img src={`https://ui-avatars.com/api/?name=${TESTIMONIALS[0].name.replace(' ', '+')}&background=random`} alt={TESTIMONIALS[0].name} /></div>
                            <div>
                                <div className="t-name">{TESTIMONIALS[0].name}</div>
                                <div className="t-role">{TESTIMONIALS[0].role}</div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2: Testimonial 2 */}
                    <div className="testimonial-bento-item t-card-dark">
                        <div>
                            <div className="stars">★★★★★</div>
                            <p className="t-text">"{TESTIMONIALS[1].text}"</p>
                        </div>
                        <div className="t-author">
                            <div className="t-avatar"><img src={`https://ui-avatars.com/api/?name=${TESTIMONIALS[1].name.replace(' ', '+')}&background=random`} alt={TESTIMONIALS[1].name} /></div>
                            <div>
                                <div className="t-name">{TESTIMONIALS[1].name}</div>
                                <div className="t-role">{TESTIMONIALS[1].role}</div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3: Stat 1 (White) */}
                    <div className="testimonial-bento-item t-card-white">
                        <p className="t-stat-desc" style={{ color: "#666" }}>I've worked with 50+ happy clients</p>
                        <div>
                            <div className="t-stat-num">98%</div>
                            <div className="t-stat-label">Satisfaction Rate</div>
                        </div>
                    </div>

                    {/* Item 4: Stat 2 (Lime) */}
                    <div className="testimonial-bento-item t-card-lime">
                        <p className="t-stat-desc">My work helped clients grow their revenue by 200%</p>
                        <div>
                            <div className="t-stat-num">200%</div>
                            <div className="t-stat-label">Growth</div>
                        </div>
                    </div>

                    {/* Item 5: Testimonial 3 */}
                    <div className="testimonial-bento-item t-card-dark">
                        <div>
                            <div className="stars">★★★★★</div>
                            <p className="t-text">"{TESTIMONIALS[2].text}"</p>
                        </div>
                        <div className="t-author">
                            <div className="t-avatar"><img src={`https://ui-avatars.com/api/?name=${TESTIMONIALS[2].name.replace(' ', '+')}&background=random`} alt={TESTIMONIALS[2].name} /></div>
                            <div>
                                <div className="t-name">{TESTIMONIALS[2].name}</div>
                                <div className="t-role">{TESTIMONIALS[2].role}</div>
                            </div>
                        </div>
                    </div>

                    {/* Item 6: Testimonial 4 */}
                    <div className="testimonial-bento-item t-card-dark">
                        <div>
                            <div className="stars">★★★★★</div>
                            <p className="t-text">"{TESTIMONIALS[3].text}"</p>
                        </div>
                        <div className="t-author">
                            <div className="t-avatar"><img src={`https://ui-avatars.com/api/?name=${TESTIMONIALS[3].name.replace(' ', '+')}&background=random`} alt={TESTIMONIALS[3].name} /></div>
                            <div>
                                <div className="t-name">{TESTIMONIALS[3].name}</div>
                                <div className="t-role">{TESTIMONIALS[3].role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator Dot - purely decorative following the image design */}
            <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", display: "none" }} className="decorative-dot">
                <div style={{ width: 12, height: 12, backgroundColor: "var(--accent)", borderRadius: "50%" }}></div>
            </div>
            <style>
                {`
                @media (min-width: 1400px) {
                    .decorative-dot { display: block !important; }
                }
                `}
            </style>
        </section>
    );
}
