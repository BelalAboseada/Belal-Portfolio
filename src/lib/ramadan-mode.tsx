import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// --- Context & Hook ---

interface RamadanContextType {
  isRamadanMode: boolean;
  toggleRamadanMode: () => void;
}

const RamadanContext = createContext<RamadanContextType | undefined>(undefined);

export function RamadanProvider({ children }: { children: React.ReactNode }) {
  const [isRamadanMode, setIsRamadanMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("ramadan-mode-enabled");
    const isEnabled = savedMode === "true";
    setIsRamadanMode(isEnabled);
    if (isEnabled) {
      document.documentElement.classList.add("ramadan");
    } else {
      document.documentElement.classList.remove("ramadan");
    }
  }, []);

  const toggleRamadanMode = () => {
    setIsRamadanMode((prev) => {
      const newState = !prev;
      localStorage.setItem("ramadan-mode-enabled", String(newState));
      if (newState) {
        document.documentElement.classList.add("ramadan");
      } else {
        document.documentElement.classList.remove("ramadan");
      }
      return newState;
    });
  };

  return (
    <RamadanContext.Provider value={{ isRamadanMode, toggleRamadanMode }}>
      {children}
    </RamadanContext.Provider>
  );
}

export function useRamadanMode() {
  const context = useContext(RamadanContext);
  if (context === undefined) {
    throw new Error("useRamadanMode must be used within a RamadanProvider");
  }
  return context;
}

// --- Components ---

export function RamadanToggle({ className }: { className?: string }) {
  const { isRamadanMode, toggleRamadanMode } = useRamadanMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleRamadanMode}
      className={cn(
        "relative transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden",
        isRamadanMode
          ? "text-yellow-400 bg-white/5"
          : "text-muted-foreground hover:text-white",
        className,
      )}
      title={isRamadanMode ? "Disable Ramadan Mode" : "Enable Ramadan Mode 🌙"}
      aria-label="Toggle Ramadan Mode"
    >
      <AnimatePresence mode="wait">
        {isRamadanMode ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            className="text-lg drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            className="text-lg opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
          >
            🌙
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}

export function RamadanToast() {
  const { isRamadanMode } = useRamadanMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isRamadanMode) {
      // Show toast when mode is enabled
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isRamadanMode]);

  return (
    <AnimatePresence>
      {isRamadanMode && isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          dir="rtl"
          className="fixed bottom-24 right-10 -translate-x-1/2 z-[100] flex items-center gap-4 px-8 py-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shadow-yellow-500/10 group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-purple-500/10 opacity-50 blur-xl -z-10 group-hover:opacity-75 transition-opacity duration-500" />

          <div className="text-4xl filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
            🌙
          </div>

          <div className="flex flex-col items-start min-w-[200px]">
            <span
              dir="rtl"
              className="font-ar text-2xl font-medium text-yellow-100 drop-shadow-[0_0_15px_rgba(253,224,71,0.4)] leading-tight"
            >
              رمضان كريم
            </span>
            <span
              dir="rtl"
              className="font-ar text-base text-white/80 font-light leading-tight mt-1"
            >
              كل عام وأنتم بخير
            </span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RamadanOverlay() {
  const { isRamadanMode } = useRamadanMode();
  const [stars] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    })),
  );

  return (
    <AnimatePresence>
      {isRamadanMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
        >
          {/* Subtle Particles/Stars */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [0, -30],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
              }}
              className="absolute rounded-full bg-yellow-200/40 blur-[1px]"
            />
          ))}

          {/* Watermark Decoration */}
          <div className="absolute top-[5%] right-[2%] opacity-[0.03] transform rotate-[15deg] blur-sm pointer-events-none text-[16rem] md:text-[24rem] leading-none text-yellow-500 font-sans">
            🌙
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default {
  Provider: RamadanProvider,
  Toggle: RamadanToggle,
  Toast: RamadanToast,
  Overlay: RamadanOverlay,
  useRamadanMode,
};
