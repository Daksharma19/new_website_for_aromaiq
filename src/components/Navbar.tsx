import { Button } from "./ui/button";
import { Sparkles, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  onAuthClick: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Navbar({ onAuthClick, theme, onToggleTheme }: NavbarProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleScrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            <img src="" alt="" />
            {/* <Sparkles className="w-6 h-6 text-accent" /> */}
            <span className="text-xl tracking-tight text-foreground">AromaIQ</span>
          </button>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors text-lg">
              Product
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-lg">
              About
            </a>
            <a href="#faqs" className="text-muted-foreground hover:text-foreground transition-colors text-lg">
              FAQs
            </a>
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>
            
            <Button
              onClick={onAuthClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 transition-all hover:shadow-lg hover:shadow-primary/20"
            > 
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
