import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Crown } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UsageLimitBanner = () => {
  const { user, getDailyUsage, getRemainingUsage } = useAuth();
  const navigate = useNavigate();

  if (!user || user.plan !== 'free') {
    return null;
  }

  const dailyUsage = getDailyUsage();
  const remaining = getRemainingUsage();
  const isNearLimit = remaining <= 1;
  const isAtLimit = remaining === 0;

  if (dailyUsage === 0) {
    return null; // Don't show banner if user hasn't used the app yet
  }

  return (
    <Alert className={`mb-4 ${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}`}>
      <AlertCircle className={`h-4 w-4 ${isAtLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-blue-600'}`} />
      <AlertDescription className="flex items-center justify-between">
        <div>
          {isAtLimit ? (
            <span className="text-red-800">
              You've reached your daily limit of 5 creations. Upgrade to continue creating!
            </span>
          ) : (
            <span className={isNearLimit ? 'text-yellow-800' : 'text-blue-800'}>
              You have {remaining} creation{remaining !== 1 ? 's' : ''} remaining today ({dailyUsage}/5 used)
            </span>
          )}
        </div>
        <Button 
          size="sm" 
          onClick={() => navigate('/pricing')}
          className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Crown className="w-4 h-4 mr-1" />
          Upgrade
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default UsageLimitBanner;