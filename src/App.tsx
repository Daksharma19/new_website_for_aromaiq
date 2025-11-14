import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProductSection } from "./components/ProductSection";
import { AboutSection } from "./components/AboutSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { AuthDialog } from "./components/AuthDialog";
import { NotFoundPage } from "./components/NotFoundPage";
import { ComingSoonPage } from "./components/ComingSoonPage";
import { Toaster } from "./components/ui/sonner";
import { supabase } from "./lib/supabase";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    // Log email system status on app load
    console.log('🌿 AromaIQ - Smart Aroma Diffuser Waitlist');
    console.log('📧 Email System: Check /SOLUTION_SUMMARY.md for details');
    console.log('⚡ Quick Setup: See /EMAIL_QUICK_START.md (5 minutes)');
  }, []);

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "coming-soon") {
        setCurrentPage("coming-soon");
      } else if (hash === "404" || (hash && hash !== "product" && hash !== "about" && hash !== "faqs")) {
        setCurrentPage("404");
      } else {
        setCurrentPage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleAuthClick = () => {
    setAuthOpen(true);
  };

  const handleJoinWaitlist = () => {
    setAuthOpen(true);
  };

  const handleGoHome = () => {
    window.location.hash = "";
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleWaitlistSuccess = () => {
    setTimeout(() => {
      setAuthOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  };

  if (currentPage === "404") {
    return <NotFoundPage onGoHome={handleGoHome} />;
  }

  if (currentPage === "coming-soon") {
    return <ComingSoonPage onGoHome={handleGoHome} />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar onAuthClick={handleAuthClick} theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection onJoinWaitlist={handleJoinWaitlist} />
      <ProductSection />
      <AboutSection />
      <FAQSection />
      <Footer />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onSuccess={handleWaitlistSuccess} />
      <Toaster 
        position="top-right" 
        richColors 
        theme={theme}
        toastOptions={{
          style: {
            background: theme === "dark" ? "#2A2318" : "#FFFFFF",
            color: theme === "dark" ? "#F5F0E8" : "#3D3026",
            border: `1px solid ${theme === "dark" ? "rgba(201, 169, 110, 0.2)" : "rgba(139, 111, 71, 0.15)"}`,
          },
        }}
      />
    </div>
  );
}
