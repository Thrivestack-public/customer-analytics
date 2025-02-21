import React from 'react';
import { Clock, Users2, ChevronDown, UserPlus } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SetupStatus, Team } from '../types';

interface TeamMember {
  name: string;
  avatar: string;
}

interface SetupCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  challenge: string;
  solution: string;
  benefitIcon: React.ReactNode;
  benefit: string;
  features: string[];
  teams: Team[];
  setupStatus: SetupStatus;
  setupTime: number;
  steps: number;
  completedSteps?: number;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onExpand: (id: string, e: React.MouseEvent) => void;
  onInviteTeam?: (team: Team) => void;
  teamMembers?: TeamMember[];
}

export function SetupCard({
  id,
  title,
  icon,
  shortDesc,
  challenge,
  solution,
  benefitIcon,
  benefit,
  features,
  teams,
  setupStatus,
  setupTime,
  steps,
  teamMembers,
  completedSteps,
  isSelected,
  isExpanded,
  onSelect,
  onExpand,
  onInviteTeam
}: SetupCardProps) {
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
        onClick={() => onSelect(id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`
              p-3 rounded-lg transition-colors duration-200 flex-shrink-0
              ${isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}
              group-hover:${!isSelected ? 'bg-indigo-100' : ''}
            `}>
              {icon}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
              <p className="text-gray-600 mb-2">{shortDesc}</p>
              <div className="flex flex-wrap gap-2">
                {teams.map((team) => (
                  <div key={team} className="relative group">
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Users2 className="w-3 h-3 mr-1" />
                      <span>{team}</span>
                      {onInviteTeam && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInviteTeam(team);
                          }}
                          className="ml-2 p-0.5 hover:bg-indigo-100 rounded transition-colors"
                        >
                          <UserPlus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    
                    {/* Team Members */}
                    {teamMembers && teamMembers.length > 0 && (
                      <div className="absolute -bottom-2 left-2 flex -space-x-2">
                        {teamMembers.slice(0, 3).map((member, idx) => (
                          <img
                            key={idx}
                            src={member.avatar}
                            alt={member.name}
                            className="w-5 h-5 rounded-full border-2 border-white"
                            title={member.name}
                          />
                        ))}
                        {teamMembers.length > 3 && (
                          <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-600 font-medium">
                            +{teamMembers.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge 
              status={setupStatus} 
              setupTime={setupTime} 
              steps={steps}
              completedSteps={completedSteps}
            />
            <button
              onClick={(e) => onExpand(id, e)}
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
                  <p className="text-gray-600 text-sm">{challenge}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600 text-sm">{solution}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-indigo-600 font-medium">
                {benefitIcon}
                <span className="ml-2">{benefit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}