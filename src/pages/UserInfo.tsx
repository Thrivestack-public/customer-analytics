import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

type Role = 'marketing' | 'product' | 'revenue' | 'success' | 'other';
type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '500+';
type Goal = 'attribution' | 'usage' | 'revenue' | 'retention' | 'other';

export function UserInfo() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | ''>('');
  const [otherRole, setOtherRole] = useState('');
  const [companySize, setCompanySize] = useState<CompanySize | ''>('');
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [otherGoal, setOtherGoal] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleGoalToggle = (goal: Goal) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // In a real app, we'd save this data to Supabase
      navigate('/customize');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return role && (role !== 'other' || otherRole.trim());
      case 2:
        return companySize;
      case 3:
        return selectedGoals.length > 0 && 
          (selectedGoals.includes('other') ? otherGoal.trim() : true);
      default:
        return false;
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(step => (
          <div
            key={step}
            className="flex items-center"
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${step === currentStep
                  ? 'bg-indigo-600 text-white'
                  : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {step < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div
                className={`w-24 h-1 mx-2 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">What's your role?</h2>
            <div className="space-y-3">
              {[
                { id: 'marketing', label: 'Marketing' },
                { id: 'product', label: 'Product Management' },
                { id: 'revenue', label: 'Revenue/Sales' },
                { id: 'success', label: 'Customer Success' },
                { id: 'other', label: 'Other' }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center">
                  <button
                    onClick={() => setRole(id as Role)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg border-2 transition-colors
                      ${role === id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                      }
                    `}
                  >
                    {label}
                  </button>
                </div>
              ))}
              {role === 'other' && (
                <input
                  type="text"
                  placeholder="Please specify your role"
                  value={otherRole}
                  onChange={(e) => setOtherRole(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              )}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">What's your company size?</h2>
            <div className="space-y-3">
              {[
                '1-10',
                '11-50',
                '51-200',
                '201-500',
                '500+'
              ].map((size) => (
                <div key={size} className="flex items-center">
                  <button
                    onClick={() => setCompanySize(size as CompanySize)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg border-2 transition-colors
                      ${companySize === size
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                      }
                    `}
                  >
                    {size} employees
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">
              What are your primary goals with ThriveStack?
            </h2>
            <p className="text-gray-600 mb-4">Select all that apply</p>
            <div className="space-y-3">
              {[
                { id: 'attribution', label: 'Understand attribution (Marketing)' },
                { id: 'usage', label: 'Connect product usage to revenue impact (Product)' },
                { id: 'revenue', label: 'Optimize conversion and upsells (Revenue)' },
                { id: 'retention', label: 'Improve retention and reduce churn (Customer Success)' },
                { id: 'other', label: 'Other' }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center">
                  <button
                    onClick={() => handleGoalToggle(id as Goal)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg border-2 transition-colors
                      ${selectedGoals.includes(id as Goal)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                      }
                    `}
                  >
                    {label}
                  </button>
                </div>
              ))}
              {selectedGoals.includes('other') && (
                <input
                  type="text"
                  placeholder="Please specify your goal"
                  value={otherGoal}
                  onChange={(e) => setOtherGoal(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              )}
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className={`
              px-6 py-2 rounded-lg font-medium
              ${currentStep === 1
                ? 'invisible'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`
              px-6 py-2 rounded-lg font-medium
              ${isStepValid()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {currentStep === 3 ? 'Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}