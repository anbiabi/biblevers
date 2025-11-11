import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";
import { z } from "zod";

const emailSignupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters")
});

export const EmailSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = emailSignupSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.errors.map(err => err.message).join(', ');
      toast({
        title: "Validation Error",
        description: errors,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams({
        name: formData.name,
        email: formData.email
      });

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzWkizbUWUybQGQ_h6sCQRnnPbcz1iMIRSYB4CM1KDm2sOqYR2xLYT-fPym8q4_Q9md/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formBody.toString(),
          mode: 'no-cors'
        }
      );

      toast({
        title: "Welcome to Our Community!",
        description: "Thank you for joining. We'll keep you updated with new features and inspiration.",
      });

      // Reset form
      setFormData({ name: '', email: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get inspired with new verse ideas, updates, and tips for sharing God's Word beautifully
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-white">Name</Label>
                <Input
                  id="signup-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  maxLength={100}
                  className="bg-white/90 border-white/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  maxLength={255}
                  className="bg-white/90 border-white/30"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Join the Community
                </>
              )}
            </Button>
            <p className="text-white/70 text-sm text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
