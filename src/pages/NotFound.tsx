import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-24">
        <section className="section container">
          <div className="relative">
            <div className="text-center p-12 rounded-2xl  backdrop-blur-md border border-slate-800/50 shadow-lg">
              <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-blue-accent to-purple-accent text-transparent bg-clip-text text-glow">
                404
              </h1>
              <p className="text-2xl text-muted-foreground mb-8 font-light">
                Page not found
              </p>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>
              <Link
                to="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-accent to-purple-accent text-white rounded-xl transition-all duration-500 hover:opacity-90 hover:scale-[1.02] animate-glow"
              >
                Back to Home
              </Link>
            </div>

            {/* Background Elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-accent/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-accent/10 rounded-full blur-[100px] -z-10" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
