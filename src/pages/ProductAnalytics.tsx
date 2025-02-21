import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  Mail,
  ArrowRight,
  ArrowLeft,
  BarChart2,
  Users,
  Building2,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Bell,
  Gauge,
  Sparkles,
  LineChart,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';
import { SetupCard } from '../components/SetupCard';
import { InviteTeamModal } from '../components/InviteTeamModal';
import { Team } from '../types';

export function ProductAnalytics() {
  const navigate = useNavigate();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const setupCards = [
    {
      id: 'telemetry',
      title: 'Setup Product Telemetry',
      icon: <Terminal className="w-8 h-8" />,
      shortDesc: 'Track page visits, user, account, and billing events',
      challenge:
        'Need to track product usage but lack proper guidance for instrumentation',
      solution: 'Implement comprehensive event tracking with minimal code',
      benefitIcon: <Zap className="w-5 h-5" />,
      benefit: '90% reduction in analytics setup time',
      features: [
        'Page and User activity tracking',
        'Account-level analytics',
        'Billing event monitoring',
        'Automated data validation',
      ],
      teams: ['Engineering teams'] as Team[],
      setupStatus: 'not_started' as const,
      setupTime: 15,
      steps: 8,
      completedSteps: 0
    },
    {
      id: 'reports',
      title: 'Customize Analytics Reports',
      icon: <LineChart className="w-8 h-8" />,
      shortDesc: 'Create custom reports without SQL',
      challenge: 'Need insights but lack technical SQL expertise',
      solution: 'Visual report builder with guided analytics',
      benefitIcon: <Wrench className="w-5 h-5" />,
      benefit: '60% faster report creation',
      features: [
        'Visual query builder',
        'Automatic Customer Journey Reports',
        'Customized based on events',
        'Guided setup',
      ],
      teams: ['Product Management', 'Growth Team'] as Team[],
      setupStatus: 'in_progress' as const,
      setupTime: 10,
      steps: 5,
      completedSteps: 2,
    },
    {
      id: 'alerts',
      title: 'Configure Customer Journey Alerts',
      icon: <Bell className="w-8 h-8" />,
      shortDesc:
        'Stay informed about key customer journey successes and struggles',
      challenge: 'Need proactive notifications for important changes',
      solution: 'Smart alerts with threshold monitoring',
      benefitIcon: <Gauge className="w-5 h-5" />,
      benefit: '45% faster response to changes',
      features: [
        'Custom thresholds',
        'Successes and Struggle notifications',
        'Alert grouping',
        'Anomaly detection',
      ],
      teams: [
        'Product teams',
        'Customer Success teams',
        'GTM Leaders'
      ] as Team[],
      setupStatus: 'not_started' as const,
      setupTime: 8,
      steps: 4,
      completedSteps: 0
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedCard(id);
  };

  const handleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleInviteTeam = (team: Team) => {
    setSelectedTeam(team);
    setShowInviteModal(true);
  };

  const handleSendInvites = async (emails: string[]) => {
    // In a real app, this would call your API to send invites
    console.log('Sending invites to:', emails);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleContinue = () => {
    if (selectedCard === 'telemetry') {
      navigate('/setup-telemetry');
    } else if (selectedCard === 'alerts') {
      navigate('/setup-alerts');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/customize')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Use Cases</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Analytics Setup
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these steps to start tracking product usage and understand
            how your features drive value for customers.
          </p>
        </div>

        {/* How It Works Accordion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button
            onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50"
          >
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="font-semibold text-gray-900">
                Learn How Product Analytics Work
              </span>
            </div>
            {isHowItWorksOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          <div
            className={`
              grid transition-all duration-300 ease-in-out
              ${isHowItWorksOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
            `}
          >
            <div className="overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Animated Illustration */}
                <div className="relative h-64 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-xl overflow-hidden">
                  <div className="absolute inset-0">
                    {/* Entity Icons with Pulse Effect */}
                    <div className="absolute top-1/4 left-1/4 animate-pulse">
                      <Users className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="absolute top-1/4 right-1/4 animate-pulse">
                      <Building2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 animate-pulse">
                      <CreditCard className="w-8 h-8 text-purple-400" />
                    </div>

                    {/* Connecting Lines */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full">
                        <line
                          x1="25%"
                          y1="25%"
                          x2="75%"
                          y2="25%"
                          stroke="rgba(99, 102, 241, 0.4)"
                          strokeWidth="2"
                          strokeDasharray="4"
                          className="animate-dash"
                        />
                        <line
                          x1="25%"
                          y1="25%"
                          x2="50%"
                          y2="75%"
                          stroke="rgba(99, 102, 241, 0.4)"
                          strokeWidth="2"
                          strokeDasharray="4"
                          className="animate-dash"
                        />
                        <line
                          x1="75%"
                          y1="25%"
                          x2="50%"
                          y2="75%"
                          stroke="rgba(99, 102, 241, 0.4)"
                          strokeWidth="2"
                          strokeDasharray="4"
                          className="animate-dash"
                        />
                      </svg>
                    </div>

                    {/* Central Analytics Icon */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                        <div className="relative bg-indigo-600 p-4 rounded-full">
                          <BarChart2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Developer Integration
                    </h3>
                    <p className="text-sm text-gray-600">
                      Developers send telemetry events for users, accounts, and
                      billing. Telemetry guidance and Event Studio verifications
                      reduces setup time by 90%.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Growth Team Customization
                    </h3>
                    <p className="text-sm text-gray-600">
                      Growth and Product teams customize reports without
                      technical skills. No SQL or data warehouse needed.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Leadership Insights
                    </h3>
                    <p className="text-sm text-gray-600">
                      Leadership teams access insights and set up alerts for key
                      metrics and business outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 gap-3">
          {setupCards.map((card) => (
            <SetupCard
              key={card.id}
              {...card}
              isSelected={selectedCard === card.id}
              isExpanded={expandedCard === card.id}
              onSelect={handleSelect}
              onExpand={handleExpand}
              onInviteTeam={handleInviteTeam}
            />
          ))}
        </div>

        {/* Invite Modal */}
        {selectedTeam && (
          <InviteTeamModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            team={selectedTeam}
            onInvite={handleSendInvites}
          />
        )}

        {selectedCard && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleContinue}
              disabled={
                setupCards.find((card) => card.id === selectedCard)
                  ?.setupStatus === 'coming_soon'
              }
              className={`
                inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors
                shadow-lg hover:shadow-xl
                ${
                  setupCards.find((card) => card.id === selectedCard)
                    ?.setupStatus === 'coming_soon'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }
              `}
            >
              <span>
                {setupCards.find((card) => card.id === selectedCard)
                  ?.setupStatus === 'coming_soon'
                  ? 'Coming Soon'
                  : 'Continue Setup'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
