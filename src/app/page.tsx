import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContentCreator from "@/components/ContentCreator";
import Clients from "@/components/Clients";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-clip">
      <Cursor />
      <Navbar />
      <HeroSection />
      <About />
      <Projects />
      <Skills />
      {/* <ContentCreator /> */}
      {/* <Clients /> */}
      {/* <SocialFeed /> */}

      <Contact />
      <Footer />
    </main>
  );
}
