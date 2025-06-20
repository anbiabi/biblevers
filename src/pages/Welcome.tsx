import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Printer, Smartphone, Users, Star, CheckCircle, Play, Gift, Coffee } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to Bible Verse Creator! 🙏",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Share God's Word Beautifully</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Create stunning Bible verse stickers, faith cards, and phone wallpapers in just a few clicks. 
            No design skills needed!
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>Easy to use</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span>Print ready</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              <span>Faith focused</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What Can You Create?",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Three Amazing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Bible Stickers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Perfect for kids! Create sheets of 16 colorful Bible verse stickers for Sunday school, 
                  rewards, or decorating.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Faith Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Beautiful declaration cards for encouragement, prayer, and sharing God's promises 
                  with friends and family.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Phone Wallpapers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Daily inspiration on your phone! Create beautiful wallpapers with your favorite 
                  Bible verses and stunning backgrounds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "How It Works (Super Simple!)",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Just 3 Easy Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Choose Your Topics</h3>
                <p className="text-gray-600">Pick themes like Love, Hope, Peace, or Strength. We have 20+ topics to choose from!</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Select Language & Type</h3>
                <p className="text-gray-600">Choose from English, Korean, Spanish, French, or German. Pick stickers, cards, or wallpapers.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Generate & Print</h3>
                <p className="text-gray-600">Click generate and download your beautiful creations as PDF or high-quality images!</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Perfect For Everyone",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Who Will Love This?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Parents & Families</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Sunday School Teachers</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Youth Group Leaders</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Church Volunteers</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Bible Study Groups</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Homeschool Families</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Anyone Who Loves God's Word</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium">Gift Makers</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Support Our Ministry (Optional)",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Help Us Keep This Free</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            This tool is completely free to use! If it has blessed you and you'd like to support our ministry, 
            any donation helps us keep the lights on and continue serving the community.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Coffee className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Buy us a coffee?</span>
            </div>
            <p className="text-sm text-blue-700 mb-4">
              Your support helps us maintain servers, add new features, and keep this ministry running.
            </p>
            
            {/* PayPal Donation Button */}
            <div className="space-y-3">
              <form action="https://www.paypal.com/donate" method="post" target="_blank">
                <input type="hidden" name="business" value="anbiabi@yahoo.fr" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="amount" value="1" />
                <input type="hidden" name="item_name" value="Bible Verse Creator Ministry Support" />
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate $1+ via PayPal
                </Button>
              </form>
              
              <p className="text-xs text-gray-500">
                Secure donation through PayPal • No strings attached • 100% optional
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-green-800">
              <strong>🙏 Thank you!</strong> Whether you donate or not, you're always welcome here. 
              Our goal is to help spread God's Word, and your use of this tool already blesses us!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Start Creating?",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Let's Create Something Beautiful!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            You're all set! Click the button below to start creating your first Bible verse masterpiece.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>💡 Pro Tip:</strong> Start with the "Love" or "Hope" topics - they're perfect for beginners!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/app');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipToApp = () => {
    navigate('/app');
  };

  const skipDonation = () => {
    if (currentStep === steps.length - 2) { // If on donation step
      navigate('/app');
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Bible Verse Creator</span>
          </div>
          <Button variant="ghost" onClick={skipToApp} className="text-gray-600">
            Skip Tutorial
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="min-h-[400px] flex flex-col justify-center">
              {steps[currentStep].content}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-500' 
                    : index < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* Show skip button on donation step */}
            {currentStep === steps.length - 2 && (
              <Button 
                variant="ghost"
                onClick={skipDonation}
                className="text-gray-600"
              >
                Skip
              </Button>
            )}
            
            <Button 
              onClick={nextStep}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <span>{currentStep === steps.length - 1 ? 'Start Creating!' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            Made with ❤️ for spreading God's Word • Free to use • No account required
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;