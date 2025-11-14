import { Sparkles, Instagram, Linkedin, Facebook, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { EmailStatusBadge } from "./EmailStatusBadge";

export function Footer() {
  const handleGooglePlayClick = () => {
    window.location.hash = "coming-soon";
  };

  return (
    <footer className="bg-foreground text-background py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-xl tracking-tight">AromaIQ</span>
            </div>
            <p className="text-sm text-background/70 mb-6">
              Transform your space with smart, personalized aromatherapy.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                target="_blank"
                href="https://www.instagram.com/aromaiqscents/"
                className="text-background/70 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/aromaiq-scents-6488bb35b/"
                target="_blank"
                className="text-background/70 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              {/* <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-background/70 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </motion.a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-background/70 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#product" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-sm text-background/70 hover:text-accent transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="mb-4">Download App</h4>
            <p className="text-sm text-background/70 mb-4">
              Get the AromaIQ app on your device
            </p>
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  onClick={handleGooglePlayClick}
                  variant="outline"
                  className="w-full justify-start bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background rounded-xl"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center sm:text-left text-sm text-background/70">
              All Rights Reserved © AromaIQ 2025
            </p>
            <EmailStatusBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}
