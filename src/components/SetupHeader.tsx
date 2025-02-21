import React from 'react';
import { Clock, Users, UserPlus } from 'lucide-react';
import { Team } from '../types';

interface TeamMember {
  name: string;
  avatar: string;
}

interface SetupHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  teams: Team[];
  setupTime: number;
  totalSteps: number;
  completedSteps: number;
  teamMembers?: Record<Team, TeamMember[]>;
  onInviteTeam?: (team: Team) => void;
}

function TeamBadge({ 
  team, 
  members,
  onInvite 
}: { 
  team: Team; 
  members?: TeamMember[];
  onInvite?: (team: Team) => void 
}) {
  return (
    <div className="relative group">
      <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
        <Users className="w-3 h-3 mr-1" />
        <span>{team}</span>
        {onInvite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInvite(team);
            }}
            className="ml-2 p-0.5 hover:bg-indigo-100 rounded transition-colors"
          >
            <UserPlus className="w-3 h-3" />
          </button>
        )}
      </div>
      
      {/* Team Members */}
      {members && members.length > 0 && (
        <div className="absolute -bottom-2 left-2 flex -space-x-2">
          {members.slice(0, 3).map((member, idx) => (
            <img
              key={idx}
              src={member.avatar}
              alt={member.name}
              className="w-5 h-5 rounded-full border-2 border-white"
              title={member.name}
            />
          ))}
          {members.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-600 font-medium">
              +{members.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export function SetupHeader({
  icon,
  title,
  description,
  teams,
  setupTime,
  totalSteps,
  completedSteps,
  teamMembers,
  onInviteTeam
}: SetupHeaderProps) {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            <p className="text-gray-600 mb-4">
              {description}
            </p>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm border border-gray-200 text-gray-700">
                <Clock className="w-3 h-3 mr-1" />
                <span>~{setupTime} mins setup</span>
                <span className="mx-2">•</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs">
                    {completedSteps}/{totalSteps}
                  </span>
                </div>
              </div>
              {teams.map((team) => (
                <TeamBadge
                  key={team}
                  team={team}
                  members={teamMembers?.[team]}
                  onInvite={onInviteTeam}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}