import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Check, Star, Crown, Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Pricing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(null);
      toast.success('Payment successful! Welcome to Premium!');
      navigate('/app');
    }, 2000);
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Create up to 5 sheets per day',
        'Basic Bible verse collection',
        'Standard backgrounds',
        'PNG & PDF downloads',
        'English language only'
      ],
      limitations: [
        'Limited daily usage',
        'Basic customization',
        'Standard support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'For regular creators and families',
      features: [
        'Unlimited sheet creation',
        'Complete Bible verse library',
        'AI-powered backgrounds',
        'All 5 languages supported',
        'Premium wallpaper templates',
        'Cloud storage for creations',
        'Priority support',
        'Early access to new features'
      ],
      limitations: [],
      buttonText: 'Start Premium',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      id: 'ministry',
      name: 'Ministry',
      price: '$29.99',
      period: 'month',
      description: 'For churches and organizations',
      features: [
        'Everything in Premium',
        'Bulk creation tools',
        'Custom branding options',
        'Team collaboration',
        'Advanced analytics',
        'White-label options',
        'Dedicated support',
        'Training sessions',
        'Commercial usage rights'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'default' as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Bible Verse Creator</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/app')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to App
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Start free and upgrade when you're ready. All plans include our core features 
          to help you share God's Word beautifully.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex items-center text-green-600">
            <Check className="w-5 h-5 mr-2" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center text-green-600">
            <Check className="w-5 h-5 mr-2" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center text-green-600">
            <Check className="w-5 h-5 mr-2" />
            <span>30-day money back</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg scale-105' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  {plan.id === 'free' && <Heart className="w-8 h-8 text-gray-500" />}
                  {plan.id === 'premium' && <Zap className="w-8 h-8 text-blue-500" />}
                  {plan.id === 'ministry' && <Crown className="w-8 h-8 text-purple-500" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-500">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                      : ''
                  }`}
                  variant={plan.buttonVariant}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading === plan.id || plan.id === 'free'}
                >
                  {isLoading === plan.id ? 'Processing...' : plan.buttonText}
                </Button>
                
                {plan.id === 'free' && (
                  <p className="text-xs text-gray-500 text-center">
                    You're currently on the free plan
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes! You can cancel your subscription at any time. You'll continue to have access 
                to premium features until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                Our free plan lets you try the core features immediately. Premium plans come 
                with a 30-day money-back guarantee.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for Ministry plans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for commercial purposes?</h3>
              <p className="text-gray-600 text-sm">
                Personal and church use is included in all plans. Commercial usage rights 
                are included with the Ministry plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:support@bibleversecreatoor.com" className="text-blue-600 hover:underline">
              support@bibleversecreatoor.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;