import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'flat';
  change: string;
}

export function TrendIndicator({ trend, change }: TrendIndicatorProps) {
  if (trend === 'flat') {
    return (
      <div className="flex items-center text-gray-500 text-xs">
        <ArrowRight className="w-3 h-3 mr-1" />
        <span>{change}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-xs ${
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}>
      {trend === 'up' ? (
        <TrendingUp className="w-3 h-3 mr-1" />
      ) : (
        <TrendingDown className="w-3 h-3 mr-1" />
      )}
      <span>{change}</span>
    </div>
  );
}