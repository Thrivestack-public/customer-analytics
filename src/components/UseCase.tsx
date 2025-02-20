import React from 'react';
import { Users2, ChevronDown } from 'lucide-react';
import { Team, SetupStatus } from '../types';
import { StatusBadge } from './StatusBadge';

interface UseCaseProps {
  useCase: {
    id: string;
    title: string;
    icon: React.ReactNode;
    shortDesc: string;
    metrics: string[];
    challenge: string;
    solution: string;
    benefitIcon: React.ReactNode;
    benefit: string;
    features: string[];
    teams: Team[];
    setupStatus: SetupStatus;
    setupTime: number;
    steps: number;
  };
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onExpand: (id: string, e: React.MouseEvent) => void;
}

export function UseCase({ useCase, isSelected, isExpanded, onSelect, onExpand }: UseCaseProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm transition-all duration-300
        ${isSelected ? 'ring-2 ring-indigo-600' : 'hover:shadow-md'}
        cursor-pointer group
      `}
    >
      <div 
        className="p-4"
        onClick={() => onSelect(useCase.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`
              p-3 rounded-lg transition-colors duration-200 flex-shrink-0
              ${isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}
              group-hover:${!isSelected ? 'bg-indigo-100' : ''}
            `}>
              {useCase.icon}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-2">{useCase.shortDesc}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.teams.map((team, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    <Users2 className="w-3 h-3 mr-1" />
                    {team}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge status={useCase.setupStatus} setupTime={useCase.setupTime} steps={useCase.steps} />
            <button
              onClick={(e) => onExpand(useCase.id, e)}
              className={`
                p-1 rounded-full hover:bg-gray-100 transition-transform duration-200
                ${isExpanded ? 'rotate-180' : ''}
              `}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className={`
          grid transition-all duration-300 ease-in-out
          ${isExpanded ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}
        `}>
          <div className="overflow-hidden">
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-600 text-sm">{useCase.challenge}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600 text-sm">{useCase.solution}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {useCase.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-indigo-600 font-medium">
                {useCase.benefitIcon}
                <span className="ml-2">{useCase.benefit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}