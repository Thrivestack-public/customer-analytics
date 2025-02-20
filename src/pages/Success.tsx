import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  Bell,
  Target,
  LineChart,
  DollarSign,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  driftX: number;
  color: string;
  rotation: number;
  scale: number;
  speed: number;
}

const COUNTDOWN_DURATION = 10000; // 10 seconds
const PARTICLE_COUNT = 100;

export function Success() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const generateParticles = useCallback(() => {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        driftX: (Math.random() - 0.5) * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        speed: 1 + Math.random() * 2
      });
    }

    setParticles(newParticles);
  }, []);

  useEffect(() => {
    generateParticles();
    const interval = setInterval(generateParticles, 3000);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          clearInterval(timer);
          setShouldNavigate(true);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [generateParticles]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/dashboard');
    }
  }, [shouldNavigate, navigate]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / COUNTDOWN_DURATION) * circumference;

  const handleSkip = () => {
    setShouldNavigate(true);
  };

  return (
    <div className="flex h-[600px]">
      {/* Left Section - Black Background */}
      <div className="w-3/4 bg-black text-white p-8 rounded-l-2xl relative overflow-hidden">
        {/* Confetti */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float-particle"
            style={{
              '--x': `${particle.x}%`,
              '--y': `${particle.y}%`,
              '--drift-x': `${particle.driftX}px`,
              '--rotation': `${particle.rotation}deg`,
              transform: `scale(${particle.scale})`,
              animationDuration: `${2 / particle.speed}s`,
              animationDelay: `${Math.random() * -2}s`
            } as React.CSSProperties}
          >
            <Sparkles 
              className="w-4 h-4"
              style={{ color: particle.color }}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20" />
              <div className="relative bg-indigo-600 text-white p-3 rounded-full">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Congratulations! You're All Set! 🎉
              </h1>
              <p className="text-gray-400 mt-1">
                Your ThriveStack workspace is ready to go
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
              <div className="flex items-center space-x-3 text-indigo-400 mb-2">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold">Marketing</h3>
              </div>
              <p className="text-gray-300 text-sm">
                See which campaigns bring in high-value customers and optimize spend.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
              <div className="flex items-center space-x-3 text-green-400 mb-2">
                <LineChart className="w-5 h-5" />
                <h3 className="font-semibold">Product</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Identify usage patterns that lead to paid upgrades.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
              <div className="flex items-center space-x-3 text-amber-400 mb-2">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-semibold">Revenue</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Track top-performing conversion paths and optimize pricing.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/15 transition-colors">
              <div className="flex items-center space-x-3 text-red-400 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold">Success</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Spot early churn signals and take proactive action.
              </p>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="fixed-cta"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Section - White Background */}
      <div className="w-1/4 bg-white p-6 rounded-r-2xl">
        <div className="h-full flex flex-col">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Get the most out of ThriveStack
            </h2>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <Calendar className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Join live onboarding</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <BookOpen className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Read best practices</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <Bell className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Set up alerts</span>
              </button>
            </div>
          </div>

          <div className="relative mt-4">
            {/* Progress Ring */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2">
              <svg className="progress-ring" width="36" height="36">
                <circle
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r={radius}
                  cx="18"
                  cy="18"
                />
                <circle
                  className="progress-ring__circle text-indigo-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="transparent"
                  r={radius}
                  cx="18"
                  cy="18"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference - progress
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}