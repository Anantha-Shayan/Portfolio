// app/page.tsx
// Root page — composes all sections in order.
// Each section is a separate component; data flows from profile.ts.

import { Loader }      from "@/components/ui/Loader";
import { Navbar }      from "@/components/ui/Navbar";
import { ScrollBar }   from "@/components/ui/ScrollBar";
import { Hero }        from "@/components/sections/Hero";
import { About }       from "@/components/sections/About";
import { Skills }      from "@/components/sections/Skills";
import { Projects }    from "@/components/sections/Projects";
import { Experience }  from "@/components/sections/Experience";
import { Education }   from "@/components/sections/Education";
import { Contact }     from "@/components/sections/Contact";
import { Footer }      from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      {/* Loading screen — fades out after 1.4 s */}
      <Loader />

      {/* Scroll progress indicator fixed at top of viewport */}
      <ScrollBar />

      {/* Sticky navigation */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
