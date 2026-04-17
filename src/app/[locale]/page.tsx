import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Playground from "@/components/sections/Playground";
import About from "@/components/sections/About";
import SocialProof from "@/components/sections/SocialProof";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <Playground />
      <About />
      <SocialProof />
      <Contact />
    </>
  );
}
