import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Target,
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  Sparkles,
  BarChart2,
  Copy,
  Bell,
  Slack,
  MessageSquare,
  Mail,
  MousePointer,
  Gauge,
  AlertTriangle,
  Rocket,
  UserPlus,
  Users,
  Building2,
  Link
} from 'lucide-react';
import { PricingModal } from '../components/PricingModal';
import { InviteTeamModal } from '../components/InviteTeamModal';
import { Team } from '../types';
import { SetupHeader } from '../components/SetupHeader';

const teamMembers = {
  'Marketing teams': [
    { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' },
    { name: 'Alex Kim', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120' }
  ],
  'RevOps teams': [
    { name: 'Emily Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120' },
    { name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120' }
  ]
};

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
    site: '{{WEBSITE_NAME}}' // Your website name
  });var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

const IDENTITY_RESOLUTION = `// Identity Resolution - Add to your signup/login flow
thrivestack.identify(userId, {
  email: user.email,
  name: user.name,
  signupDate: new Date().toISOString(),
  // Add any other user properties
});

// Link anonymous visitor to identified user
thrivestack.alias({
  anonymousId: 'prev_anonymous_id',
  userId: 'identified_user_id'
});`;

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  configured: boolean;
}

function SetupAcquisition() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [skipIdentity, setSkipIdentity] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    { id: 'email', name: 'Email Notifications', icon: <Mail className="w-5 h-5" />, configured: false },
    { id: 'slack', name: 'Slack Integration', icon: <Slack className="w-5 h-5" />, configured: false },
    { id: 'teams', name: 'Microsoft Teams', icon: <MessageSquare className="w-5 h-5" />, configured: false }
  ]);
  const [emails, setEmails] = useState('');
  const [showPricing, setShowPricing] = useState(false);

  const steps = [
    { id: 1, title: 'Website Setup', icon: <Building2 className="w-6 h-6" /> },
    { id: 2, title: 'Track Visitors', icon: <Code2 className="w-6 h-6" /> },
    { id: 3, title: 'Identity Resolution', icon: <UserPlus className="w-6 h-6" /> },
    { id: 4, title: 'Setup Alerts', icon: <Bell className="w-6 h-6" /> },
    { id: 5, title: 'Verify Setup', icon: <CheckCircle2 className="w-6 h-6" /> }
  ];

  const handleCopyCode = (code: string) => {
    const finalCode = code.replace('{{WEBSITE_NAME}}', websiteName);
    navigator.clipboard.writeText(finalCode);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowPricing(true);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) setCurrentStep(stepId);
  };

  const handleConfigureChannel = (channelId: string) => {
    setNotificationChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, configured: true }
        : channel
    ));
  };

  const handleInviteTeam = () => {
    // Placeholder for team invitation logic
  };

  const renderCodeBlock = (code: string, title: string) => (
    <div className="relative">
      <div className="absolute right-4 top-4 flex items-center space-x-2">
        <button
          onClick={() => handleCopyCode(code)}
          className="inline-flex items-center space-x-1 px-3 py-1 bg-white rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>{scriptCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">{title}</div>
        <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
          {code}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/connect')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Integrations</span>
          </button>
        </div>

        <SetupHeader
          icon={<Target className="w-8 h-8 text-indigo-600" />}
          title="Setup Visitor Analytics"
          description="Track and analyze visitor behavior on your website, and connect it with user signups and conversions."
          teams={['Marketing teams', 'RevOps teams']}
          teamMembers={teamMembers}
          setupTime={20}
          totalSteps={steps.length}
          completedSteps={currentStep + 1}
          onInviteTeam={handleInviteTeam}
        />

        <div className="flex gap-8">
          {/* Left Sidebar - Progress */}
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
                        ? 'text-indigo-600 cursor-pointer'
                        : 'text-gray-400'
                    }
                  `}
                  onClick={() => handleStepClick(step.id)}
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
                    <span className="text-sm font-medium">
                      {step.title}
                    </span>
                    {step.id === currentStep && (
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
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Name Your Website
                      </h2>
                      <p className="text-gray-600">
                        Provide a name for your website to identify it in analytics.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website Name
                    </label>
                    <input
                      type="text"
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      placeholder="e.g. Company Website"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Code2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Track Visitors
                      </h2>
                      <p className="text-gray-600">
                        Copy and paste the following script in the <code>&lt;head&gt;</code> section 
                        of your website's HTML.
                      </p>
                    </div>
                  </div>

                  {renderCodeBlock(TRACKING_SCRIPT, 'Base Tracking Script')}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Terminal className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div className="text-sm text-amber-800">
                        <strong>Important:</strong> Place the script in the <code>&lt;head&gt;</code> section 
                        before any other scripts to ensure proper tracking.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && !skipIdentity && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <UserPlus className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Identity Resolution
                      </h2>
                      <p className="text-gray-600">
                        Connect anonymous visitors with their post-signup identity.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <UserPlus className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <div className="space-y-3">
                        <div className="text-sm text-indigo-800">
                          <strong>Developer Setup Required</strong>
                          <p className="mt-1">
                            Identity Resolution requires integration with your product's signup flow.
                            Set this up in Product Analytics to connect visitor data with user accounts.
                          </p>
                        </div>
                        <button
                          onClick={() => navigate('/setup-product')}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <span>Setup Product Analytics</span>
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSkipIdentity(true)}
                    className="text-gray-500 hover:text-gray-700 mt-4"
                  >
                    Skip this step for now
                  </button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Bell className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Setup Notifications
                      </h2>
                      <p className="text-gray-600">
                        Configure alerts for your marketing and product teams.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Recipients
                      </label>
                      <input
                        type="text"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                        placeholder="Enter comma-separated email addresses"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {notificationChannels.map(channel => (
                        <div
                          key={channel.id}
                          className={`
                            p-4 rounded-lg border-2 transition-colors
                            ${channel.configured
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 hover:border-indigo-200'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {channel.icon}
                              <span className="font-medium">{channel.name}</span>
                            </div>
                            {channel.configured && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <button
                            onClick={() => handleConfigureChannel(channel.id)}
                            disabled={channel.configured}
                            className={`
                              w-full px-3 py-1.5 rounded text-sm font-medium
                              ${channel.configured
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }
                            `}
                          >
                            {channel.configured ? 'Configured' : 'Configure'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Verify Setup
                      </h2>
                      <p className="text-gray-600">
                        Let's verify that visitor analytics is working correctly.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-medium text-gray-900">Verification Steps:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Navigate to your website in a new tab</li>
                      <li>Perform some actions (click links, scroll pages)</li>
                      <li>Return here and click "Check Events" below</li>
                    </ol>
                  </div>

                  <button
                    onClick={() => setIsVerified(true)}
                    className={`
                      inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                      ${isVerified
                        ? 'bg-green-100 text-green-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }
                    `}
                  >
                    {isVerified ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Events Verified
                      </>
                    ) : (
                      <>
                        <Terminal className="w-5 h-5 mr-2" />
                        Check Events
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>Previous</span>
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !websiteName.trim()}
                  className="fixed-cta"
                >
                  <span>{currentStep === steps.length ? 'Go to Dashboard' : 'Next Step'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <PricingModal
            isOpen={showPricing}
            onClose={() => setShowPricing(false)}
            onUpgrade={() => {
              setShowPricing(false);
              navigate('/dashboard');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { SetupAcquisition }