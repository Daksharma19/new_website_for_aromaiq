import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Leaf, Home } from "lucide-react";
import { motion } from "motion/react";
import ayushImage from "figma:asset/b69920b738da061ebe15873ba39bb5df3b70d1c9.png";
import dakshImage from "../assets/myImage.png";
import scents from "../assets/scents.png";
export function AboutSection() {
  const values = [
    {
      icon: Sparkles,
      title: "Smart Technology",
      description: "Innovative features designed to enhance your daily rituals"
    },
    {
      icon: Leaf,
      title: "Natural Wellness",
      description: "100% pure essential oils sourced from sustainable farms"
    },
    {
      icon: Home,
      title: "Modern Living",
      description: "Seamlessly integrated into your connected home"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-muted to-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">About AromaIQ</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We blend technology with wellness to create personalized aromatic
            experiences that adapt to your mood, preferences, and lifestyle.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-8 rounded-3xl bg-gradient-to-b from-card to-muted border border-border hover:border-accent transition-all group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl text-center mb-12 text-foreground">Meet Our Team</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-3xl p-8 text-center hover:border-accent transition-all group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/30 group-hover:border-accent transition-all">
                <img
                  src={ayushImage}
                  alt="Ayush Raj"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-2xl mb-2 text-foreground">Ayush Raj</h4>
              <p className="text-accent mb-3">CEO</p>
              <p className="text-muted-foreground text-sm">
                Visionary leader driving innovation in smart wellness technology
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-3xl p-8 text-center hover:border-accent transition-all group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/30 group-hover:border-accent transition-all">
                <img
                  src={dakshImage}
                  alt="Daksh Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-2xl mb-2 text-foreground">Daksh Sharma</h4>
              <p className="text-accent mb-3">CTO</p>
              <p className="text-muted-foreground text-sm">
                Technical mastermind crafting intelligent aroma experiences
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
        >
          <ImageWithFallback
            src={scents}
            alt="Essential Oils Wellness"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end">
            <div className="p-12 text-primary-foreground">
              <h3 className="text-3xl mb-3">Our Mission</h3>
              <p className="text-lg opacity-95 max-w-2xl">
                To transform the way people experience aromatherapy by combining
                ancient wellness practices with modern smart technology.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
