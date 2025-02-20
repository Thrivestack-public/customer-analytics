import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PricingModal({ isOpen, onClose, onUpgrade }: PricingModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      description: 'Perfect for growing companies',
      features: [
        'Up to 10,000 tracked events/mo',
        'Basic analytics dashboard',
        'Email support',
        '3 team members',
        'Data retention: 3 months'
      ]
    },
    {
      name: 'Pro',
      price: '$149',
      description: 'For scaling businesses',
      features: [
        'Up to 100,000 tracked events/mo',
        'Advanced analytics & reporting',
        'Priority support',
        'Unlimited team members',
        'Data retention: 12 months',
        'Custom event properties',
        'API access',
        'Custom dashboards'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited tracked events',
        'Dedicated success manager',
        'SLA guarantee',
        'SSO authentication',
        'Custom data retention',
        'Advanced security features',
        'Custom integrations',
        'On-premise deployment option'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-6xl w-full p-6 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required.
              Upgrade or downgrade anytime.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  relative bg-white rounded-xl border-2 p-6
                  ${plan.popular
                    ? 'border-indigo-600 shadow-lg scale-105'
                    : 'border-gray-200'
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && (
                      <span className="text-base font-normal text-gray-500">/mo</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onUpgrade}
                  className={`
                    w-full inline-flex items-center justify-center space-x-2
                    px-4 py-2 rounded-lg font-medium transition-colors
                    ${plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}