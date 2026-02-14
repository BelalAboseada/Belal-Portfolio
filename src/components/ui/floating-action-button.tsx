import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Instagram,
  Plus,
  X,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
  delay: number;
}

const socialLinks: SocialLink[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/+201060074246",
    color: "bg-green-500 hover:bg-green-600",
    delay: 0.1,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:bealalaboseada@gmail.com",
    color: "bg-blue-500 hover:bg-blue-600",
    delay: 0.2,
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/belal_aboseada?igsh=c3R1MmVrNHd5bnpp&utm_source=qr",
    color:
      "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600  hover:to-pink-600",
    delay: 0.3,
  },
];

// Context to share FAB state
interface FABContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FABContext = React.createContext<FABContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useFABState() {
  return React.useContext(FABContext);
}

export function FABStateProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <FABContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </FABContext.Provider>
  );
}

export function FloatingActionButton(): JSX.Element {
  const { isOpen, setIsOpen } = useFABState();

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-auto"
            onClick={toggleMenu}
            style={{ zIndex: 40 }}
          />
        )}
      </AnimatePresence>

      {/* FAB and Social Links */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {/* Social Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 flex flex-col space-y-3 z-[101]"
              onClick={(e) => e.stopPropagation()}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: link.delay,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    y: 20,
                    transition: {
                      delay: (socialLinks.length - index - 1) * 0.1,
                      duration: 0.2,
                    },
                  }}
                  className="flex items-center space-x-3 group glare-hover"
                >
                  {/* Label - only visible on hover */}
                  <motion.div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-2 py-2 shadow-lg opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 transition-all duration-200">
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">
                      {link.label}
                    </span>
                  </motion.div>

                  {/* Icon Button */}
                  <Button
                    size="sm"
                    className={`w-12 h-12 rounded-full shadow-lg ${link.color} text-white border-0 hover:shadow-xl cursor-pointer transition-all duration-300 z-100`}
                    asChild
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <div className="relative z-[102]">
          <button
            onClick={toggleMenu}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 border-0 pointer-events-auto"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </motion.div>
          </button>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
            initial={{ scale: 1, opacity: 0 }}
            animate={
              isOpen ? { scale: 1.5, opacity: 0.3 } : { scale: 1, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </>
  );
}
