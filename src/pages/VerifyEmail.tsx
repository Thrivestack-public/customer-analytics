import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleResend = () => {
    setCountdown(60);
  };

  // Simulating email verification for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/enrichment', { state: { email } });
    }, 3000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
        <Mail className="w-8 h-8 text-indigo-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Check your email
      </h1>

      <p className="text-gray-600 mb-6">
        We sent a verification link to <strong>{email}</strong>. 
        Click the link to continue setting up your account.
      </p>

      <button
        onClick={() => navigate('/enrichment', { state: { email } })}
        className="w-full mb-4 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        <span>Continue Setup</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="text-sm text-gray-500">
        {countdown > 0 ? (
          <p>Resend email in {countdown}s</p>
        ) : (
          <button
            onClick={handleResend}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Resend verification email
          </button>
        )}
      </div>

      <BackButton to="/" label="Back to Home" />
    </div>
  );
}