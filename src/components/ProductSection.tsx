import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Wifi, Sparkles, Layers, Heart } from "lucide-react";
import { motion } from "motion/react";
import diffuser from "../assets/diffuser.png"
export function ProductSection() {
  const features = [
    {
      icon: Wifi,
      title: "Remote Control",
      description: "Control your diffuser from anywhere using our mobile app"
    },
    {
      icon: Sparkles,
      title: "Smart Technology",
      description: "Intelligent features that adapt to your preferences"
    },
    {
      icon: Layers,
      title: "Multi-Scent Chamber",
      description: "Seamlessly blend up to 6 different essential oils"
    },
    {
      icon: Heart,
      title: "Wellness Focus",
      description: "Designed to enhance your daily well-being"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="product" className="py-24 bg-gradient-to-b from-card to-muted transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Our Smart Diffuser</h2>
          <p className="text-xl text-muted-foreground">
            Where technology meets tranquility
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 rounded-3xl blur-2xl" />
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl shadow-primary/10">
              <ImageWithFallback
                src={diffuser}
                alt="AromaIQ Smart Diffuser"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-2xl p-6 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-accent/20 transition-all border border-border group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  );
}
