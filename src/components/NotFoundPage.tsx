import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Home, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface NotFoundPageProps {
  onGoHome: () => void;
}

export function NotFoundPage({ onGoHome }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary flex items-center justify-center px-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-2xl" />
              <div className="relative bg-card rounded-full p-8 shadow-2xl shadow-primary/10 border border-border">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649675603179-ef3d38142ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBtaW5pbWFsfGVufDF8fHx8MTc2MDk4MTUxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="404 - Page Not Found"
                  className="w-full h-full object-cover rounded-full opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-accent animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-8xl mb-4 text-primary">404</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">Page Not Found</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          >
            Oops! It seems you've wandered into unscented territory. 
            Let's get you back to a place that smells like home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={onGoHome}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Back Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
