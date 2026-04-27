import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { CaseStudies } from "../components/sections/CaseStudies";
import { Projects } from "../components/sections/Projects";
import { Blogs } from "../components/sections/Blogs";
import { Services } from "../components/sections/Services";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <CaseStudies />
      <Projects />
      <Blogs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

