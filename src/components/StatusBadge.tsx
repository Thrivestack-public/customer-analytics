import React from 'react';
import { CheckCircle2, Sparkles, Rocket, AlertCircle, Clock, CircleDot } from 'lucide-react';
import { SetupStatus } from '../types';

interface StatusBadgeProps {
  status: SetupStatus;
  setupTime: number;
  steps: number;
  completedSteps?: number;
}

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function StatusBadge({ status, setupTime, steps, completedSteps }: StatusBadgeProps) {
  const setupInfo = (
    <div className="flex items-center text-xs text-gray-500 ml-2">
      <Clock className="w-3.5 h-3.5 mr-1" />
      <span>{setupTime} mins</span>      
      {status !== 'in_progress' && (
        <>
          <span className="mx-1">•</span>
          <span>{steps} steps</span>
        </>
      )}
      {status === 'in_progress' && completedSteps !== undefined && (
        <>
          <span className="mx-1">•</span>
          <CircleDot className="w-3.5 h-3.5 mr-1" />
          <span>{completedSteps}/{steps} completed</span>
        </>
      )}
    </div>
  );

  switch (status) {
    case 'completed':
      return (
        <div className="flex items-center">
          {setupInfo}
          {completedSteps !== undefined && <ProgressBar progress={(completedSteps / steps) * 100} />}
          <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Setup Complete
          </div>
        </div>
      );
    case 'in_progress':
      return (
        <div className="flex items-center">
          {setupInfo}
          {completedSteps !== undefined && <ProgressBar progress={(completedSteps / steps) * 100} />}
          <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            In Progress
          </div>
        </div>
      );
    case 'coming_soon':
      return (
        <div className="flex items-center">
          {setupInfo}
          <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            <Rocket className="w-3.5 h-3.5 mr-1" />
            Coming Soon
          </div>
        </div>
      );
    case 'not_started':
      return (
        <div className="flex items-center">
          {setupInfo}
          <div className="ml-3 flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <AlertCircle className="w-3.5 h-3.5 mr-1" />
            Setup Required
          </div>
        </div>
      );
  }
}