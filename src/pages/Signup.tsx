import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

export function Signup() {
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
      // In a real app, we'd call the Supabase auth signup here
      navigate('/verify-email', { state: { email } });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Welcome</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Get Started with ThriveStack
        </h1>
        <p className="text-gray-600">
          Join thousands of companies using ThriveStack to understand their customers better.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
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
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          By signing up, you agree to our{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}