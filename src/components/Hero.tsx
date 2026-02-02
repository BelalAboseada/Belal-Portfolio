import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RotatingText from "@/components/ui/rotating-text";
import { motion, AnimatePresence } from "framer-motion";
import Antigravity from "@/components/Antigravity";

function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Antigravity
          count={200}
          magnetRadius={15}
          ringRadius={15}
          waveSpeed={0.9}
          waveAmplitude={1}
          particleSize={1.2}
          lerpSpeed={0.05}
          color="#1eaedb"
          autoAnimate
          particleVariance={3}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {/* Glassy Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-white/90 shadow-lg shadow-white/5 mx-auto hover:bg-white/10 transition-colors cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Freelance
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              Belal Aboseada
            </h1>

            <div className="text-xl md:text-2xl font-light text-muted-foreground flex items-center justify-center gap-2">
              <span>I build</span>
              <RotatingText
                texts={[
                  "Scalable Web Apps",
                  "Modern Interfaces",
                  "Full Stack Solutions",
                ]}
                mainClassName="text-blue-accent font-medium"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Crafting immersive and high-performance digital experiences. Focused
            on clean code, scalability, and pure aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 pt-4">
            <Button
              size="lg"
              className="relative overflow-hidden bg-white text-black hover:bg-white/90 border-0 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-1 rounded-full px-10 py-7 text-lg font-medium tracking-tight"
              asChild
            >
              <Link to="/projects">View Work</Link>
            </Button>

            {/* <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 rounded-full px-10 py-7 text-lg font-medium tracking-tight backdrop-blur-sm"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button> */}

            <Button
              size="lg"
              className="bg-neutral-900/50 hover:bg-neutral-900 text-green-400/80 hover:text-green-400 border border-white/5 hover:border-green-500/20 font-mono transition-all duration-300 hover:-translate-y-1 rounded-full px-8 py-7 text-base backdrop-blur-md"
              asChild
            >
              <Link to="/terminal" className="flex items-center gap-2">
                <span className="text-green-500/50">&gt;</span>
                _terminal
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Gradient Overlay for blending */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
    </section>
  );
}

export default Hero;
