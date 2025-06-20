interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium' | 'ministry';
  createdAt: string;
  lastLogin: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    // Check for existing session on initialization
    this.checkExistingSession();
  }

  private checkExistingSession() {
    const savedUser = localStorage.getItem('bible_app_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.authState = {
          user,
          isAuthenticated: true,
          isLoading: false
        };
        this.notifyListeners();
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('bible_app_user');
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    // Immediately call with current state
    listener(this.authState);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data
      const user: User = {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        plan: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false
      };

      localStorage.setItem('bible_app_user', JSON.stringify(user));
      this.notifyListeners();

      return { success: true };
    } catch (error) {
      this.authState.isLoading = false;
      this.notifyListeners();
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        plan: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false
      };

      localStorage.setItem('bible_app_user', JSON.stringify(user));
      this.notifyListeners();

      return { success: true };
    } catch (error) {
      this.authState.isLoading = false;
      this.notifyListeners();
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  }

  logout() {
    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
    localStorage.removeItem('bible_app_user');
    this.notifyListeners();
  }

  updateUserPlan(plan: 'free' | 'premium' | 'ministry') {
    if (this.authState.user) {
      const updatedUser = { ...this.authState.user, plan };
      this.authState.user = updatedUser;
      localStorage.setItem('bible_app_user', JSON.stringify(updatedUser));
      this.notifyListeners();
    }
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  // Usage tracking for free plan limits
  getDailyUsage(): number {
    const today = new Date().toDateString();
    const usage = localStorage.getItem(`usage_${today}`);
    return usage ? parseInt(usage) : 0;
  }

  incrementDailyUsage(): boolean {
    const user = this.getCurrentUser();
    const today = new Date().toDateString();
    const currentUsage = this.getDailyUsage();
    
    // Check limits based on plan
    const limits = {
      free: 5,
      premium: Infinity,
      ministry: Infinity
    };
    
    const userPlan = user?.plan || 'free';
    const limit = limits[userPlan];
    
    if (currentUsage >= limit) {
      return false; // Usage limit exceeded
    }
    
    localStorage.setItem(`usage_${today}`, (currentUsage + 1).toString());
    return true;
  }

  canUseFeature(feature: string): boolean {
    const user = this.getCurrentUser();
    const plan = user?.plan || 'free';
    
    const featureAccess = {
      free: ['basic_creation', 'standard_backgrounds', 'english_only'],
      premium: ['unlimited_creation', 'ai_backgrounds', 'all_languages', 'cloud_storage'],
      ministry: ['bulk_creation', 'custom_branding', 'team_collaboration', 'analytics']
    };
    
    return featureAccess[plan].includes(feature) || 
           (plan === 'premium' && featureAccess.free.includes(feature)) ||
           (plan === 'ministry' && (featureAccess.free.includes(feature) || featureAccess.premium.includes(feature)));
  }
}

export const authService = new AuthService();
export type { User, AuthState };