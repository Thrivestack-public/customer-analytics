import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Clock,
  Rocket,
  Activity,
  DollarSign,
  UserMinus,
  TrendingUp,
  Plus,
  Trash2,
  Bell,
  Mail,
  MessageSquare,
  Slack,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Users,
  UserPlus,
  CreditCard
} from 'lucide-react';
import { InviteTeamModal } from '../components/InviteTeamModal';
import { Team } from '../types';
import { SetupHeader } from '../components/SetupHeader';

const teamMembers = {
  'Product teams': [
    { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' },
    { name: 'Alex Kim', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120' },
    { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120' }
  ],
  'Customer Success teams': [
    { name: 'Emily Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120' },
    { name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120' }
  ],
  'GTM Leaders': [
    { name: 'Lisa Wang', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120' },
    { name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=120' }
  ]
};

type AlertType = 'acquisition' | 'activation' | 'engagement' | 'monetization' | 'retention' | 'expansion';
type Channel = 'slack' | 'teams' | 'email';

interface AlertRule {
  id: string;
  metric: string;
  condition: 'above' | 'below';
  threshold: number;
  channels: {
    type: Channel;
    target: string;
  }[];
}

interface StepConfig {
  id: AlertType;
  title: string;
  icon: React.ReactNode;
  description: string;
  metrics: {
    id: string;
    name: string;
    unit: string;
    defaultThreshold: number;
  }[];
}

const steps: StepConfig[] = [
  {
    id: 'acquisition',
    title: 'Acquisition Alerts',
    icon: <Target className="w-6 h-6" />,
    description: 'Monitor your customer acquisition funnel and marketing performance',
    metrics: [
      { id: 'visitor_conversion', name: 'Visitor Conversion Rate', unit: '%', defaultThreshold: 2 },
      { id: 'cac', name: 'Customer Acquisition Cost', unit: '$', defaultThreshold: 100 },
      { id: 'signup_rate', name: 'Signup Rate', unit: '%', defaultThreshold: 30 }
    ]
  },
  {
    id: 'activation',
    title: 'Activation Alerts',
    icon: <Rocket className="w-6 h-6" />,
    description: 'Track how effectively new users are reaching key milestones',
    metrics: [
      { id: 'activation_rate', name: 'Activation Rate', unit: '%', defaultThreshold: 40 },
      { id: 'time_to_value', name: 'Time to Value', unit: 'hours', defaultThreshold: 24 },
      { id: 'onboarding_completion', name: 'Onboarding Completion', unit: '%', defaultThreshold: 70 }
    ]
  },
  {
    id: 'engagement',
    title: 'Engagement Alerts',
    icon: <Activity className="w-6 h-6" />,
    description: 'Monitor user activity and feature adoption trends',
    metrics: [
      { id: 'dau', name: 'Daily Active Users', unit: 'users', defaultThreshold: 100 },
      { id: 'feature_adoption', name: 'Feature Adoption Rate', unit: '%', defaultThreshold: 50 },
      { id: 'session_duration', name: 'Avg Session Duration', unit: 'minutes', defaultThreshold: 15 }
    ]
  },
  {
    id: 'monetization',
    title: 'Monetization Alerts',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Track revenue metrics and billing events',
    metrics: [
      { id: 'mrr', name: 'Monthly Recurring Revenue', unit: '$', defaultThreshold: 10000 },
      { id: 'arpu', name: 'Average Revenue Per User', unit: '$', defaultThreshold: 50 },
      { id: 'payment_failure', name: 'Payment Failure Rate', unit: '%', defaultThreshold: 5 }
    ]
  },
  {
    id: 'retention',
    title: 'Retention Alerts',
    icon: <UserMinus className="w-6 h-6" />,
    description: 'Monitor customer churn and retention metrics',
    metrics: [
      { id: 'churn_rate', name: 'Monthly Churn Rate', unit: '%', defaultThreshold: 5 },
      { id: 'retention_rate', name: 'User Retention Rate', unit: '%', defaultThreshold: 80 },
      { id: 'dormant_users', name: 'Dormant Users', unit: 'users', defaultThreshold: 100 }
    ]
  },
  {
    id: 'expansion',
    title: 'Expansion Alerts',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Track account expansion and upsell opportunities',
    metrics: [
      { id: 'expansion_mrr', name: 'Expansion MRR', unit: '$', defaultThreshold: 5000 },
      { id: 'upgrade_rate', name: 'Plan Upgrade Rate', unit: '%', defaultThreshold: 10 },
      { id: 'feature_usage', name: 'Premium Feature Usage', unit: '%', defaultThreshold: 80 }
    ]
  }
];

export function SetupAlerts() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [rules, setRules] = useState<Record<AlertType, AlertRule[]>>(
    Object.fromEntries(steps.map(step => [step.id, []])) as Record<AlertType, AlertRule[]>
  );
  const [activeRuleIds, setActiveRuleIds] = useState<Record<AlertType, string | null>>(
    Object.fromEntries(steps.map(step => [step.id, null])) as Record<AlertType, string | null>
  );

  const handleAddRule = (type: AlertType) => {
    const newRule: AlertRule = {
      id: `${type}_${Date.now()}`,
      metric: steps.find(s => s.id === type)?.metrics[0].id || '',
      condition: 'below',
      threshold: steps.find(s => s.id === type)?.metrics[0].defaultThreshold || 0,
      channels: []
    };

    setRules(prev => ({
      ...prev,
      [type]: [...prev[type], newRule]
    }));
    setActiveRuleIds(prev => ({
      ...prev,
      [type]: newRule.id
    }));
  };

  const handleDeleteRule = (type: AlertType, ruleId: string) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].filter(rule => rule.id !== ruleId)
    }));
    setActiveRuleIds(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const handleUpdateRule = (type: AlertType, ruleId: string, updates: Partial<AlertRule>) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].map(rule =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }));
  };

  const handleAddChannel = (type: AlertType, ruleId: string, channelType: Channel) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].map(rule =>
        rule.id === ruleId
          ? {
              ...rule,
              channels: [
                ...rule.channels,
                { type: channelType, target: '' }
              ]
            }
          : rule
      )
    }));
  };

  const handleUpdateChannel = (
    type: AlertType,
    ruleId: string,
    index: number,
    updates: Partial<{ type: Channel; target: string }>
  ) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].map(rule =>
        rule.id === ruleId
          ? {
              ...rule,
              channels: rule.channels.map((channel, i) =>
                i === index ? { ...channel, ...updates } : channel
              )
            }
          : rule
      )
    }));
  };

  const handleDeleteChannel = (type: AlertType, ruleId: string, index: number) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].map(rule =>
        rule.id === ruleId
          ? {
              ...rule,
              channels: rule.channels.filter((_, i) => i !== index)
            }
          : rule
      )
    }));
  };

  const handleRuleClick = (ruleId: string) => {
    // Don't collapse if clicking inside the expanded content
    const expandedContent = document.querySelector(`[data-rule-id="${ruleId}"] .expanded-content`);
    const isClickInside = event?.target instanceof Node && expandedContent?.contains(event.target);
    if (isClickInside) return;

    const type = steps[currentStep].id;
    setActiveRuleIds(prev => ({
      ...prev,
      [type]: prev[type] === ruleId ? null : ruleId
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/success');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const currentStepConfig = steps[currentStep];
  const currentRules = rules[currentStepConfig.id];

  const handleInviteTeam = (team: Team) => {
    setSelectedTeam(team);
    setShowInviteModal(true);
  };

  const handleSendInvites = async (emails: string[]) => {
    // In a real app, this would call your API to send invites
    console.log('Sending invites to:', emails);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        <SetupHeader
          icon={<Bell className="w-8 h-8 text-indigo-600" />}
          title="Configure Customer Journey Alerts"
          description="Set up alerts to monitor key metrics across your customer journey. Get notified when metrics need attention."
          teams={['Product teams', 'Customer Success teams', 'GTM Leaders']}
          teamMembers={teamMembers}
          setupTime={30}
          totalSteps={steps.length}
          completedSteps={currentStep + 1}
          onInviteTeam={handleInviteTeam}
        />

        <div className="flex gap-8 mt-12">
          {/* Left Sidebar - Progress */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                    relative flex items-center p-3 rounded-lg transition-all duration-200
                    ${index === currentStep
                      ? 'bg-white shadow-md border border-gray-200'
                      : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
                    }
                  `}
                  onClick={() => setCurrentStep(index)}
                >
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        absolute left-5 top-12 w-0.5 h-8 -z-10
                        ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}
                      `}
                    />
                  )}

                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                      ${index === currentStep
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}
                  >
                    {step.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{step.title}</span>
                      {rules[step.id].length > 0 ? (
                        <div className={`
                          inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full
                          ${index === currentStep
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-green-100 text-green-600'
                          }
                        `}>
                          {rules[step.id].length} alert{rules[step.id].length !== 1 ? 's' : ''}
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 text-gray-400">
                          No alerts
                        </div>
                      )}
                    </div>
                    {index === currentStep && (
                      <span className="text-xs text-indigo-600">Current Step</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {currentStepConfig.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {currentStepConfig.title}
                  </h2>
                  <p className="text-gray-600">
                    {currentStepConfig.description}
                  </p>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {currentRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    data-rule-id={rule.id}
                    onClick={(e) => handleRuleClick(rule.id)}
                  >
                    <div
                      className={`
                        flex items-center justify-between p-4 cursor-pointer
                        ${activeRuleIds[currentStepConfig.id] === rule.id ? 'bg-indigo-50' : 'bg-gray-50'}
                        transition-colors duration-200
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-gray-900">
                          Alert when{" "}
                          <span>{currentStepConfig.metrics.find(m => m.id === rule.metric)?.name}</span>
                          {" "}is{" "}
                          <span>{rule.condition}</span>
                          {" "}
                          <span className="text-lg font-bold text-indigo-600">
                            {rule.threshold}
                            <span className="text-sm ml-0.5">
                              {currentStepConfig.metrics.find(m => m.id === rule.metric)?.unit}
                            </span>
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {rule.channels.map((channel, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm"
                              title={channel.type}
                            >
                              {channel.type === 'slack' && <Slack className="w-4 h-4 text-[#4A154B]" />}
                              {channel.type === 'teams' && <MessageSquare className="w-4 h-4 text-[#6264A7]" />}
                              {channel.type === 'email' && <Mail className="w-4 h-4 text-gray-600" />}
                            </div>
                          ))}
                        </div>
                        {activeRuleIds[currentStepConfig.id] === rule.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {activeRuleIds[currentStepConfig.id] === rule.id && (
                      <div 
                        className="p-4 border-t border-gray-200 space-y-4 expanded-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Metric
                            </label>
                            <select
                              value={rule.metric}
                              onChange={(e) => handleUpdateRule(currentStepConfig.id, rule.id, { metric: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                            >
                              {currentStepConfig.metrics.map((metric) => (
                                <option key={metric.id} value={metric.id}>
                                  {metric.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Condition
                            </label>
                            <select
                              value={rule.condition}
                              onChange={(e) => handleUpdateRule(currentStepConfig.id, rule.id, { condition: e.target.value as 'above' | 'below' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                            >
                              <option value="below">Below</option>
                              <option value="above">Above</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Threshold
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={rule.threshold}
                                onChange={(e) => handleUpdateRule(currentStepConfig.id, rule.id, { 
                                  threshold: parseFloat(e.target.value) 
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                  focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                                  text-lg font-bold text-indigo-600"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                {currentStepConfig.metrics.find(m => m.id === rule.metric)?.unit}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notification Channels */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notification Channels
                          </label>
                          <div className="space-y-3">
                            {rule.channels.map((channel, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <select
                                  value={channel.type}
                                  onChange={(e) => handleUpdateChannel(currentStepConfig.id, rule.id, index, { type: e.target.value as Channel })}
                                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                >
                                  <option value="slack">Slack</option>
                                  <option value="teams">Teams</option>
                                  <option value="email">Email</option>
                                </select>
                                <input
                                  type="text"
                                  value={channel.target}
                                  onChange={(e) => handleUpdateChannel(currentStepConfig.id, rule.id, index, { target: e.target.value })}
                                  placeholder={
                                    channel.type === 'slack'
                                      ? '#channel'
                                      : channel.type === 'teams'
                                        ? '#channel'
                                        : 'email@company.com'
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                />
                                <button
                                  onClick={() => handleDeleteChannel(currentStepConfig.id, rule.id, index)}
                                  className="p-2 text-gray-400 hover:text-gray-600"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleAddChannel(currentStepConfig.id, rule.id, 'slack')}
                            className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Channel
                          </button>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDeleteRule(currentStepConfig.id, rule.id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete Rule
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => handleAddRule(currentStepConfig.id)}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center justify-center"><Plus className="w-5 h-5 mr-2" /> Add Alert Rule</div>
                </button>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <span>Finish Setup</span>
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      <span>Next Step</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}

export default SetupAlerts;