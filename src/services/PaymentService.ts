interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

class PaymentService {
  private plans: PaymentPlan[] = [
    {
      id: 'premium_monthly',
      name: 'Premium Monthly',
      price: 9.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'Unlimited sheet creation',
        'AI-powered backgrounds',
        'All languages',
        'Cloud storage',
        'Priority support'
      ]
    },
    {
      id: 'premium_yearly',
      name: 'Premium Yearly',
      price: 99.99,
      currency: 'USD',
      interval: 'year',
      features: [
        'Unlimited sheet creation',
        'AI-powered backgrounds',
        'All languages',
        'Cloud storage',
        'Priority support',
        '2 months free'
      ]
    },
    {
      id: 'ministry_monthly',
      name: 'Ministry Monthly',
      price: 29.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'Everything in Premium',
        'Bulk creation tools',
        'Custom branding',
        'Team collaboration',
        'Advanced analytics',
        'Dedicated support'
      ]
    }
  ];

  async getPlans(): Promise<PaymentPlan[]> {
    return this.plans;
  }

  async createCheckoutSession(planId: string): Promise<{ url: string; sessionId: string }> {
    // Simulate API call to create checkout session
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      url: `https://checkout.stripe.com/pay/cs_test_${planId}_${Date.now()}`,
      sessionId: `cs_test_${planId}_${Date.now()}`
    };
  }

  async createSubscription(planId: string, paymentMethodId: string): Promise<Subscription> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const now = new Date();
    const plan = this.plans.find(p => p.id === planId);
    const endDate = new Date(now);
    
    if (plan?.interval === 'month') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    return {
      id: `sub_${Date.now()}`,
      planId,
      status: 'active',
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: endDate.toISOString(),
      cancelAtPeriodEnd: false
    };
  }

  async getSubscription(userId: string): Promise<Subscription | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock subscription data
    const mockSubscription = localStorage.getItem(`subscription_${userId}`);
    return mockSubscription ? JSON.parse(mockSubscription) : null;
  }

  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  }

  async updateSubscription(subscriptionId: string, planId: string): Promise<Subscription> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const now = new Date();
    const plan = this.plans.find(p => p.id === planId);
    const endDate = new Date(now);
    
    if (plan?.interval === 'month') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    return {
      id: subscriptionId,
      planId,
      status: 'active',
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: endDate.toISOString(),
      cancelAtPeriodEnd: false
    };
  }

  async addPaymentMethod(paymentData: any): Promise<PaymentMethod> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4: paymentData.number?.slice(-4) || '4242',
      brand: 'visa',
      expiryMonth: paymentData.expiryMonth || 12,
      expiryYear: paymentData.expiryYear || 2025
    };
  }

  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock payment methods
    return [
      {
        id: 'pm_1',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025
      }
    ];
  }

  async processPayment(amount: number, paymentMethodId: string): Promise<{ success: boolean; transactionId?: string }> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 95% success rate
    const success = Math.random() > 0.05;
    
    if (success) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}`
      };
    } else {
      return {
        success: false
      };
    }
  }

  formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  }

  calculateDiscount(planId: string): number {
    if (planId.includes('yearly')) {
      // 2 months free on yearly plans
      return 2 / 12; // ~16.67% discount
    }
    return 0;
  }
}

export const paymentService = new PaymentService();
export type { PaymentPlan, PaymentMethod, Subscription };