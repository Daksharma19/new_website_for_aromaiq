import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "motion/react";

export function FAQSection() {
  const faqs = [
    {
      question: "How does AromaIQ work?",
      answer:
        "AromaIQ is a smart diffuser that learns your scent preferences and daily routines. Simply set your preferences through our mobile app, and the diffuser will automatically adjust fragrance combinations to match your mood and time of day."
    },
    {
      question: "When is the launch?",
      answer:
        "We're planning to launch in Q3 2025! Join our waitlist to get exclusive early bird pricing and be among the first to experience AromaIQ. Early supporters will receive up to 30% off the retail price."
    },
    {
      question: "What essential oils are compatible?",
      answer:
        "AromaIQ works with any pure essential oils. We also offer our own curated collection of premium, sustainably-sourced essential oils. Our starter kit includes 6 mood-enhancing blends: Focus, Relax, Energize, Sleep, Balance, and Refresh."
    },
    {
      question: "Can I control it remotely?",
      answer:
        "Absolutely! The AromaIQ mobile app (iOS and Android) gives you full control from anywhere. Schedule diffusion times, adjust intensity, create custom scent profiles, and access personalized recommendations."
    }
  ];

  return (
    <section id="faqs" className="py-24 bg-gradient-to-b from-background to-muted transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about AromaIQ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-3xl shadow-xl shadow-primary/10 p-8 border border-border"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
