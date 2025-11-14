import { motion } from "motion/react";
import { Sparkles, ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

interface ComingSoonPageProps {
  onGoHome: () => void;
}

export function ComingSoonPage({ onGoHome }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/20 rounded-3xl flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-6xl mb-6 text-foreground"
        >
          Coming Soon
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          The AromaIQ mobile app is under development. Join our waitlist to be notified when it launches!
        </motion.p>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center gap-3 mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-3 h-3 bg-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="w-3 h-3 bg-accent rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="w-3 h-3 bg-primary rounded-full"
          />
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            onClick={onGoHome}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 transition-all hover:shadow-lg hover:shadow-primary/20 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-20 left-20 text-accent/20"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-20 right-20 text-primary/20"
        >
          <Sparkles className="w-20 h-20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
