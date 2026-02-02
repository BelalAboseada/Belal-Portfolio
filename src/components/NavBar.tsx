import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
  { name: "Resume", path: "/resume" },
];

function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleDownload = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded successfully.",
    });
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "py-2 bg-darker-bg/90 backdrop-blur-md shadow-md"
          : "py-4 bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="text-2xl font-poppins font-bold text-glow">
            {/* <span className="text-blue-accent">B</span>elal */}
            <img
              src={Logo}
              alt="Logo"
              className={cn("md:w-10 md:h-10 w-8  h-8 object-cover")}
              loading="lazy"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-blue-accent"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button
            onClick={handleDownload}
            variant="default"
            size="sm"
            className="ml-4 bg-blue-accent hover:bg-blue-accent/80"
            asChild
          >
            <a
              href="https://drive.google.com/uc?export=download&id=1wsTXzmI736TrNq_zMCQPLb3YbUHzkzCs"
              download
            >
              Download Cv
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          title={isMenuOpen ? "Close menu" : "Open menu"}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-darker-bg/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-blue-accent bg-muted/10"
                    : "text-muted-foreground hover:text-white hover:bg-muted/10",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={handleDownload}
              className="bg-blue-accent hover:bg-blue-accent/80"
              asChild
            >
              <a
                href="https://drive.google.com/uc?export=download&id=1wsTXzmI736TrNq_zMCQPLb3YbUHzkzCs"
                download
              >
                Download Cv
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default React.memo(NavBar);
