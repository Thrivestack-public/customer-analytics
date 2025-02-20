import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TrialBannerProps {
  onUpgrade: () => void;
}

export function TrialBanner({ onUpgrade }: TrialBannerProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-3 flex items-center justify-between relative">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              Trial Period: <span className="font-bold">14 days remaining</span>
            </span>
            <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
              Starter Plan Trial
            </span>
          </div>
          <button
            onClick={onUpgrade}
            className="inline-flex items-center px-4 py-1.5 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            <span>Upgrade to Pro</span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full bg-indigo-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
            Upgrade now to unlock all features
          </div>
        </div>
      </div>
    </div>
  );
}