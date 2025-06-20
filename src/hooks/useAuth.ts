import { useState, useEffect } from 'react';
import { authService, type AuthState, type User } from '@/services/AuthService';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    return await authService.login(email, password);
  };

  const signup = async (name: string, email: string, password: string) => {
    return await authService.signup(name, email, password);
  };

  const logout = () => {
    authService.logout();
  };

  const canUseFeature = (feature: string): boolean => {
    return authService.canUseFeature(feature);
  };

  const getDailyUsage = (): number => {
    return authService.getDailyUsage();
  };

  const incrementUsage = (): boolean => {
    return authService.incrementDailyUsage();
  };

  const getRemainingUsage = (): number => {
    const user = authState.user;
    const plan = user?.plan || 'free';
    const currentUsage = getDailyUsage();
    
    const limits = {
      free: 5,
      premium: Infinity,
      ministry: Infinity
    };
    
    const limit = limits[plan];
    return limit === Infinity ? Infinity : Math.max(0, limit - currentUsage);
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    canUseFeature,
    getDailyUsage,
    incrementUsage,
    getRemainingUsage
  };
};