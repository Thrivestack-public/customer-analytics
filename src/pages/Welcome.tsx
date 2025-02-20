import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  LineChart, 
  ArrowRight,
  Mail,
  CheckCircle2,
  BarChart2
} from 'lucide-react';

export function Welcome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.includes('@gmail.com') && !value.includes('@yahoo.') && !value.includes('@hotmail.'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      navigate('/verify-email', { state: { email } });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)]">
      {/* Left Column - Light Blue Background */}
      <div className="w-3/4 bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-50 rounded-l-2xl p-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 rounded-full mb-8">
            <Rocket className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Trusted by 500+ growing companies
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
            Transform Your Customer Data Into{' '}
            <span className="text-indigo-600">Growth Insights</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            ThriveStack helps you understand your entire customer journey, 
            from first touch to revenue, so you can make data-driven decisions 
            that accelerate growth.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 text-indigo-600 mb-3">
                <LineChart className="w-6 h-6" />
                <h3 className="font-semibold">38% Increase in Marketing ROI</h3>
              </div>
              <p className="text-gray-600">
                Connect every touchpoint to revenue and optimize your marketing spend.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 text-indigo-600 mb-3">
                <BarChart2 className="w-6 h-6" />
                <h3 className="font-semibold">52% Better Product Adoption</h3>
              </div>
              <p className="text-gray-600">
                Understand user behavior and connect product usage to revenue.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div className="text-sm text-gray-600">
              Join 2,847+ professionals already growing with ThriveStack
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-1/4 bg-white p-8">
        <div className="h-full flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign Up / Login
            </h2>

            <p className="text-gray-600 mb-8">
              Start your 14-day free trial. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`
                      block w-full pl-10 pr-3 py-2 
                      border rounded-lg 
                      focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                      ${isValid 
                        ? 'border-gray-300' 
                        : email 
                          ? 'border-red-300' 
                          : 'border-gray-300'
                      }
                    `}
                    placeholder="you@company.com"
                  />
                </div>
                {email && !isValid && (
                  <p className="mt-2 text-sm text-red-600">
                    Please use your work email address
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`
                  w-full inline-flex items-center justify-center space-x-2
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${isValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Stats - Now below the CTA button */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">2,847 signups</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm">4.9/5 rating</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}