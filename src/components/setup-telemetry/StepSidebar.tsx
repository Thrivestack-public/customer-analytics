import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Step } from '../../types/setup';

interface StepSidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepSidebar({ steps, currentStep, onStepClick }: StepSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-8 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`
              relative flex items-center p-3 rounded-lg transition-all duration-200
              ${step.id === currentStep
                ? 'bg-white shadow-md border border-gray-200'
                : step.id < currentStep
                  ? 'text-indigo-600'
                  : 'text-gray-400'
              }
            `}
            onClick={() => onStepClick(step.id)}
          >
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  absolute left-5 top-12 w-0.5 h-8 -z-10
                  ${step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}
                `}
              />
            )}

            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                ${step.id === currentStep
                  ? 'bg-indigo-600 text-white'
                  : step.id < currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }
              `}
            >
              {step.id < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{step.title}</span>
              {step.id === currentStep && (
                <span className="text-xs text-indigo-600">Current Step</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}