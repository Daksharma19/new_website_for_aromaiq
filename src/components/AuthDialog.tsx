import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle2, AlertCircle, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../lib/supabase";
import { sendWelcomeEmail } from "../lib/resend";
import { toast } from "sonner@2.0.3";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlreadyExists, setShowAlreadyExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Client-side validation
    if (!email || !email.trim()) {
      setError("Email is required");
      setLoading(false);
      toast.error("Please enter your email address");
      return;
    }
    
    if (!name || !name.trim()) {
      setError("Name is required");
      setLoading(false);
      toast.error("Please enter your name");
      return;
    }
    
    if (!source || !source.trim()) {
      setError("Please tell us where you heard about us");
      setLoading(false);
      toast.error("Please select how you heard about us");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      setLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }
    
    try {
      // Check if user already exists in waitlist
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        // Handle table not found error
        if (checkError.code === 'PGRST205') {
          throw new Error('Database table not found. Please contact support.');
        }
        throw checkError;
      }

      if (existingUser) {
        // User already exists
        setShowAlreadyExists(true);
        toast.info("You're already on the waitlist!");
        
        setTimeout(() => {
          setShowAlreadyExists(false);
          onOpenChange(false);
          setName("");
          setEmail("");
          setSource("");
        }, 3000);
      } else {
        // Add new user to waitlist
        const { data: insertData, error: insertError } = await supabase
          .from('waitlist')
          .insert([
            {
              name,
              email,
              source,
              auth_provider: 'waitlist',
            }
          ])
          .select();
        
        // Handle duplicate email error from database constraint
        if (insertError) {
          if (insertError.code === '23505') {
            // Duplicate key violation - user already exists
            setShowAlreadyExists(true);
            toast.info("You're already on the waitlist!");
            
            setTimeout(() => {
              setShowAlreadyExists(false);
              onOpenChange(false);
              setName("");
              setEmail("");
              setSource("");
            }, 3000);
            return;
          }
          throw insertError;
        }
        
        // Log successful insertion
        console.log('✅ Successfully added to waitlist:', { name, email, source });
        
        // Send welcome email using EmailJS
        try {
          const emailResult = await sendWelcomeEmail(email, name);
          console.log('📧 Welcome email sent:', emailResult);
          
          // Show appropriate success message
          if (emailResult.status === 'mock') {
            toast.success("Added to waitlist! (Email in demo mode)");
          } else if (emailResult.status === 'error') {
            toast.success("Added to waitlist! (Email failed to send)");
          } else {
            toast.success("Welcome! Check your email inbox 📧");
          }
        } catch (emailError) {
          // Email failure won't break the signup flow
          console.error('⚠️ Email failed (non-critical):', emailError);
          toast.success("Added to waitlist!");
        }
        
        // Show success animation
        setShowSuccess(true);
        
        // Call onSuccess callback which will handle redirect after 3 seconds
        if (onSuccess) {
          onSuccess();
        }
        
        // Reset form after animation
        setTimeout(() => {
          setShowSuccess(false);
          setName("");
          setEmail("");
          setSource("");
        }, 3500);
      }
      
    } catch (err: any) {
      console.error("Waitlist error:", err);
      setError(err.message || "An error occurred. Please try again.");
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogDescription className="sr-only">
          Join the AromaIQ waitlist
        </DialogDescription>
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <CheckCircle2 className="w-24 h-24 text-primary mb-6" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl mb-3 text-foreground text-center"
              >
                Welcome to AromaIQ!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-muted-foreground text-center"
              >
                You've been added to our waitlist successfully.<br/>
                Check your email for a welcome message!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 flex gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </motion.div>
            </motion.div>
          ) : showAlreadyExists ? (
            <motion.div
              key="already-exists"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Leaf className="w-24 h-24 text-primary mb-6" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl mb-3 text-foreground text-center"
              >
                You're already on the waitlist 🌿
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-muted-foreground text-center"
              >
                We'll keep you updated!
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  Join the Waitlist
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Where did you hear about us?</Label>
                  <Select value={source} onValueChange={setSource} required>
                    <SelectTrigger id="source" className="rounded-xl">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="friend-family">Friend/Family</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Join Waitlist"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
