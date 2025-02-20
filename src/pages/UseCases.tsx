import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  BarChart2, 
  DollarSign, 
  Users, 
  ArrowRight,
  Sparkles,
  LineChart,
  TrendingUp,
  Rocket,
  ChevronDown,
  CheckCircle2,
  Users2,
  ArrowLeft,
  X,
  AlertCircle,
  Clock
} from 'lucide-react';

import { Team } from '../types';
import { UseCase } from '../components/UseCase';

export function UseCases() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = React.useState<string | null>(null);
  const [expandedCase, setExpandedCase] = React.useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = React.useState<Team[]>([]);

  const teams: Team[] = [
    'Marketing teams',
    'Product teams',
    'Sales teams',
    'RevOps teams',
    'Engineering teams',
    'Customer Success teams'
  ];

  const useCases = [
    {
      id: 'marketing',
      title: 'Marketing Attribution',
      icon: <Target className="w-8 h-8" />,
      shortDesc: 'Connect every touchpoint to revenue',
      metrics: ['Lead Sources', 'Conversion Paths', 'Campaign ROI'],
      challenge: 'Measure attribution but don\'t know which leads convert',
      solution: 'Track the complete journey from first touch to revenue',
      benefitIcon: <LineChart className="w-5 h-5" />,
      benefit: '38% improvement in campaign ROI on average',
      features: [
        'Multi-touch attribution modeling',
        'Campaign performance analytics',
        'Revenue impact tracking',
        'Custom attribution models'
      ],
      teams: ['Marketing teams'],
      setupStatus: 'not_started' as const,
      setupTime: 10,
      steps: 5
    },
    {
      id: 'product',
      title: 'Product Analytics',
      icon: <BarChart2 className="w-8 h-8" />,
      shortDesc: 'Turn usage data into revenue insights',
      metrics: ['Feature Usage', 'User Engagement', 'Revenue Impact'],
      challenge: 'Track usage but lack visibility into revenue impact',
      solution: 'Connect product usage directly to revenue metrics',
      benefitIcon: <Sparkles className="w-5 h-5" />,
      benefit: '52% better feature adoption rates',
      features: [
        'Feature usage tracking',
        'User journey mapping',
        'Engagement scoring',
        'Revenue correlation'
      ],
      teams: ['Product teams', 'Engineering teams'],
      setupStatus: 'in_progress' as const,
      setupTime: 10,
      steps: 3
    },
    {
      id: 'revenue',
      title: 'Revenue Optimization',
      icon: <DollarSign className="w-8 h-8" />,
      shortDesc: 'Maximize conversion and revenue',
      metrics: ['Conversion Drivers', 'Upgrade Patterns', 'Revenue Forecasting'],
      challenge: 'Focus on Revenue ($) but don\'t know what drives conversions',
      solution: 'Identify key behaviors that lead to upgrades',
      benefitIcon: <TrendingUp className="w-5 h-5" />,
      benefit: '45% increase in upgrade conversion rate',
      features: [
        'Conversion path analysis',
        'Upgrade trigger identification',
        'Revenue forecasting',
        'Pricing optimization'
      ],
      teams: ['Sales teams', 'RevOps teams'],
      setupStatus: 'coming_soon' as const,
      setupTime: 12,
      steps: 4
    },
    {
      id: 'success',
      title: 'Predict and prevent churn',
      icon: <Users className="w-8 h-8" />,
      shortDesc: 'Retention and Expansion',
      metrics: ['Health Scores', 'Engagement Trends', 'Churn Predictors'],
      challenge: 'Focus on retention but don\'t know the \'why\' behind churn',
      solution: 'Predict and prevent churn before it happens',
      benefitIcon: <Rocket className="w-5 h-5" />,
      benefit: '64% reduction in customer churn',
      features: [
        'Customer health scoring',
        'Early warning system',
        'Engagement analytics',
        'Automated interventions'
      ],
      teams: ['Customer Success teams'],
      setupStatus: 'coming_soon' as const,
      setupTime: 18,
      steps: 6
    }
  ];

  const handleContinue = () => {
    // Only allow continue for non-coming-soon items
    if (selectedCase) {
      const selectedUseCase = useCases.find(uc => uc.id === selectedCase);
      if (selectedUseCase && selectedUseCase.setupStatus !== 'coming_soon') {
        if (selectedCase === 'marketing') {
          navigate('/setup-acquisition');
        } else if (selectedCase === 'product') {
          navigate('/setup-product');
        } else {
          navigate('/connect');
        }
      }
    }
  };

  const handleSelect = (id: string) => {
    setSelectedCase(id);
  };

  const handleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCase(expandedCase === id ? null : id);
  };

  const handleTeamToggle = (team: Team) => {
    setSelectedTeams(prev => 
      prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
    setSelectedCase(null);
  };

  const filteredUseCases = selectedTeams.length === 0
    ? useCases
    : useCases.filter(useCase => 
        useCase.teams.some(team => selectedTeams.includes(team as Team))
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Panel */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-50 text-gray-900 p-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/enrichment-results')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Profile</span>
          </button>

          <div className="flex justify-between items-start">
            <div className="max-w-2xl">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
                  Choose Your Focus Area
                </h1>
                <p className="text-xl text-gray-600">
                  ThriveStack helps teams like yours solve specific challenges. 
                  Select the use case that best matches your needs, and we'll personalize 
                  your experience accordingly.
                </p>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-md">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="font-medium">Personalized Setup</span>
                </div>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md">
                <Target className="w-4 h-4 mr-2" />
                <span className="font-medium">Targeted Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by Team</h2>
              {selectedTeams.length > 0 && (
                <button
                  onClick={() => setSelectedTeams([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => handleTeamToggle(team)}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                    transition-colors duration-200
                    ${selectedTeams.includes(team)
                      ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <Users2 className="w-4 h-4 mr-1.5" />
                  {team}
                  {selectedTeams.includes(team) && (
                    <X className="w-4 h-4 ml-1.5 hover:text-indigo-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Use Cases Grid - More Compact */}
          <div className="grid grid-cols-1 gap-3">
            {filteredUseCases.map((useCase) => (
              <UseCase
                key={useCase.id}
                useCase={useCase}
                isSelected={selectedCase === useCase.id}
                isExpanded={expandedCase === useCase.id}
                onSelect={handleSelect}
                onExpand={handleExpand}
              />
            ))}
          </div>
        </div>

        {selectedCase && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleContinue}
              disabled={useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'}
              className={`
                inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors
                shadow-lg hover:shadow-xl
                ${useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }
              `}
            >
              <span>
                {useCases.find(uc => uc.id === selectedCase)?.setupStatus === 'coming_soon'
                  ? 'Coming Soon'
                  : 'Continue Setup'
                }
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
    </div>
  );
}