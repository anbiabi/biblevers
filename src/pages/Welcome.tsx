import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Printer, Smartphone, Users, Star, CheckCircle, Play, Gift, Coffee, Menu, X, Zap, Globe, Download, Palette, Mail } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ContactForm } from '@/components/ContactForm';
import { EmailSignup } from '@/components/EmailSignup';

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Bible Stickers",
      description: "Create colorful sticker sheets with 16 Bible verses each. Perfect for Sunday school, rewards, and children's activities.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Faith Cards",
      description: "Design beautiful declaration cards for encouragement, prayer, and sharing God's promises with others.",
      gradient: "from-pink-500 to-rose-400"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Phone Wallpapers",
      description: "Generate stunning mobile wallpapers with your favorite verses for daily inspiration on your device.",
      gradient: "from-purple-500 to-indigo-400"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Create content in English, Korean, Spanish, French, and German to reach diverse communities.",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "AI-Powered Backgrounds",
      description: "Intelligent background generation that matches your verse themes for professional results.",
      gradient: "from-orange-500 to-amber-400"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Print-Ready Downloads",
      description: "Export high-quality PDFs and PNGs with professional cutting guidelines for perfect results.",
      gradient: "from-teal-500 to-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Bible Verse Creator
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#support" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
              <Button 
                onClick={() => navigate('/app')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900">How It Works</a>
              <a href="#support" className="block text-gray-600 hover:text-gray-900">Support</a>
              <Button 
                onClick={() => navigate('/app')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Floating UI Elements */}
          <div className="absolute -top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl opacity-20 animate-bounce delay-300"></div>
          <div className="absolute -top-10 right-20 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl opacity-20 animate-bounce delay-700"></div>
          <div className="absolute top-40 -left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-3xl opacity-20 animate-bounce delay-1000"></div>

          {/* Main Headline with Gradient Text */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Share God's Word
            </span>
            <br />
            <span className="text-gray-900">Beautifully</span>
          </h1>

          {/* Compelling Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning Bible verse stickers, faith cards, and phone wallpapers in seconds. 
            No design skills needed – just select your verses and let our AI do the magic.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => navigate('/app')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
            >
              Start Creating Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>No Design Skills Required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Print-Ready Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <EmailSignup />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Create</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed to help you share Scripture in beautiful, engaging ways
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google AdSense Ad Placement 1 - Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 text-center">
          <div className="min-h-[90px] flex items-center justify-center">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-5147010217156651"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Simple as
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> 1-2-3</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create professional Bible verse designs in just three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Choose Your Topics",
                description: "Select from 20+ biblical themes like Love, Hope, Peace, or Strength. Our smart system will find the perfect verses for your needs.",
                icon: <Heart className="w-8 h-8" />,
                gradient: "from-pink-500 to-rose-400"
              },
              {
                step: "2",
                title: "Customize & Preview",
                description: "Pick your language, style, and format. Watch as AI generates beautiful backgrounds that perfectly match your verses.",
                icon: <Palette className="w-8 h-8" />,
                gradient: "from-purple-500 to-indigo-400"
              },
              {
                step: "3",
                title: "Download & Share",
                description: "Get print-ready PDFs or high-resolution images instantly. Perfect for printing, sharing, or using as digital wallpapers.",
                icon: <Download className="w-8 h-8" />,
                gradient: "from-blue-500 to-cyan-400"
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-on-scroll" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white shadow-2xl`}>
                  {step.icon}
                </div>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold text-lg mb-4`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Support Our
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"> Ministry</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            This tool is completely free to use! If it has blessed you and you'd like to help cover our 
            server costs and maintenance, any contribution is greatly appreciated.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Coffee className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-blue-800 text-lg">Bible Verse Maintenance Fee</span>
            </div>
            <p className="text-blue-700 mb-6 leading-relaxed">
              Your support helps us maintain servers, add new features, and keep this ministry running for everyone.
            </p>
            
            <form action="https://www.paypal.com/donate" method="post" target="_blank">
              <input type="hidden" name="business" value="anbiabi@yahoo.fr" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="amount" value="1" />
              <input type="hidden" name="item_name" value="Bible Verse Creator - Maintenance Fee" />
              <input type="hidden" name="item_number" value="MAINTENANCE_FEE" />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
              >
                <Heart className="w-5 h-5 mr-2" />
                Pay $1+ Maintenance Fee
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              Secure payment through PayPal • No strings attached • 100% optional
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-green-800 leading-relaxed">
              <strong>🙏 Thank you!</strong> Whether you contribute or not, you're always welcome here. 
              Our goal is to help spread God's Word, and your use of this tool already blesses us!
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Ad Placement 2 - Medium Rectangle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 text-center">
          <div className="min-h-[250px] flex items-center justify-center">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-5147010217156651"
              data-ad-slot="auto"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of believers who are sharing God's Word beautifully
          </p>
          <Button 
            onClick={() => navigate('/app')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Creating Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Bible Verse Creator</span>
          </div>
          <p className="text-gray-400 mb-4">
            Made with ❤️ for spreading God's Word • Free to use • No account required
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Button
              onClick={() => setIsContactOpen(true)}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <a href="mailto:support@bibleversecreatoor.com" className="text-blue-400 hover:underline text-sm">
              support@bibleversecreatoor.com
            </a>
          </div>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactForm open={isContactOpen} onOpenChange={setIsContactOpen} />
    </div>
  );
};

export default Welcome;