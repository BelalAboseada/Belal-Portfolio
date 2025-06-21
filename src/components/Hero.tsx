import React from "react";
import { Button } from "@/components/ui/button";
import ThreeScene from "@/components/ThreeScene";
import { Link } from "react-router-dom";
import RotatingText from "@/components/ui/rotating-text";
import { motion, AnimatePresence } from "framer-motion";

function Hero(): JSX.Element {
  return (
    <section className="min-h-screen relative flex items-center overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-8 items-center pt-20">
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins">
            Hello, I'm{" "}
            <span className="text-blue-accent text-glow">Belal Aboseada</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-muted-foreground flex items-center gap-2">
            <RotatingText
              texts={["Front-End", "Web", "React"]}
              mainClassName="text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-block"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.01}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.5,
              }}
              rotationInterval={2000}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key="developer"
                className="text-white whitespace-nowrap inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  mass: 0.5,
                  delay: 0.01,
                }}
              >
                developer
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            I build responsive and interactive web experiences with modern
            technologies and a focus on clean, maintainable code.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-blue-accent hover:bg-blue-accent/80 animate-glow"
              asChild
            >
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-accent text-blue-accent hover:bg-blue-accent/10"
              asChild
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square">
            <ThreeScene className="w-full h-full" />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-accent/10 via-transparent to-blue-accent/10 blur-3xl opacity-30" />
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-accent/10 rounded-full blur-[100px] z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-accent/10 rounded-full blur-[100px] z-0" />
    </section>
  );
}

export default Hero;
