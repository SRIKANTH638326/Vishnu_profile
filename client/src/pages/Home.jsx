import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Projects } from "../components/sections/Projects";
import { Services } from "../components/sections/Services";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <About isHome={true} />
      <Services />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

