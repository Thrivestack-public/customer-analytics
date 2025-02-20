import React from 'react';
import { Outlet } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-200">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center">
              <BarChart2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ThriveStack
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}