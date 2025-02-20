import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Terminal,
  Sparkles,
  BarChart2,
  ArrowLeft,
  Copy,
  Bell,
  Slack,
  MessageSquare,
  Mail,
  MousePointer2,
  Gauge,
  AlertTriangle,
  Rocket,
  UserPlus,
  Users,
  Building2,
  Link
} from 'lucide-react';
import { PricingModal } from '../components/PricingModal';

const TRACKING_SCRIPT = `<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://cdn.thrivestack.io/ts.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','tsLayer','TS-XXXXX');
</script>`;

const FEATURE_TRACKING = `// Track feature usage
thrivestack.track('feature_used', {
  companyId: 'company_123', // Required
  featureName: 'export_report',
  userId: 'user_456',
  userRole: 'admin',
  planTier: 'enterprise',
  success: true,
  duration: 45, // seconds
  customAttributes: {
    reportType: 'analytics',
    exportFormat: 'csv',
    rowCount: 1000
  }
});`;

const VERIFY_EVENT = `// Send a test event
thrivestack.track('feature_used', {
  companyId: 'your_company_id',
  featureName: 'test_event',
  userId: 'current_user_id'
});`;

const SIGNUP_TRACKING = `// Track user signup
thrivestack.track('user_signup', {
  userId: 'new_user_id',
  email: 'user@example.com',
  source: 'landing_page',
  referralChannel: 'linkedin_ad'
});`;

const USER_IDENTIFY = `// Identify user
thrivestack.identify('user_id', {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'developer',
  plan: 'pro'
});`;

const COMPANY_IDENTIFY = `// Identify company
thrivestack.identify('company_id', {
  name: 'Acme Inc',
  industry: 'Software',
  size: '50-100 employees',
  foundedYear: 2020
});`;

const USER_COMPANY_LINK = `// Link user to company
thrivestack.track('user_company_link', {
  userId: 'user_id',
  companyId: 'company_id',
  role: 'admin'
});`;

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  configured: boolean;
}

export function SetupProductAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    { id: 'email', name: 'Email Notifications', icon: <Mail className="w-5 h-5" />, configured: false },
    { id: 'slack', name: 'Slack Integration', icon: <Slack className="w-5 h-5" />, configured: false },
    { id: 'teams', name: 'Microsoft Teams', icon: <MessageSquare className="w-5 h-5" />, configured: false }
  ]);
  const [emails, setEmails] = useState('');
  const [showPricing, setShowPricing] = useState(false);

  const [productName, setProductName] = useState('');
  const [environment, setEnvironment] = useState<'development' | 'staging' | 'production'>('development');
  const [selectedEnrichmentFields, setSelectedEnrichmentFields] = useState<string[]>([]);

  const enrichmentFields = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'location', label: 'Location' },
    { id: 'linkedin', label: 'LinkedIn Profile' },
    { id: 'title', label: 'Job Title' },
    { id: 'company', label: 'Recent Company' }
  ];

  const steps = [
    { id: 1, title: 'Product Setup', icon: <Building2 className="w-6 h-6" />, path: '' },
    { id: 2, title: 'Track Page Visits', icon: <Code2 className="w-6 h-6" />, path: 'track-page-visits' },
    { id: 3, title: 'Track Signups & Identity', icon: <Users className="w-6 h-6" />, path: 'track-signups' },
    { id: 4, title: 'Account add User', icon: <Building2 className="w-6 h-6" />, path: 'account-add-user' },
    { id: 5, title: 'Track Logins', icon: <UserPlus className="w-6 h-6" />, path: 'track-login' },
    { id: 6, title: 'Track Features', icon: <Gauge className="w-6 h-6" />, path: 'track-features' },
    { id: 7, title: 'Other SaaS Events', icon: <Sparkles className="w-6 h-6" />, path: 'other-events' },
    { id: 8, title: 'Setup Alerts', icon: <Bell className="w-6 h-6" />, path: 'setup-alerts' }
  ];

  // Get current step from URL
  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    const stepIndex = steps.findIndex(step => step.path === currentPath);
    if (stepIndex >= 0) {
      setCurrentStep(stepIndex + 1);
    } else if (location.pathname === '/setup-product') {
      setCurrentStep(1);
    }
  }, [location]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const handleVerifyEvent = () => {
    setIsVerified(true);
  };

  const handleConfigureChannel = (channelId: string) => {
    setNotificationChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, configured: true }
        : channel
    ));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = steps[currentStep];
      if (nextStep) {
        navigate(`/setup-product/${nextStep.path}`);
      }
    } else {
      setShowPricing(true);
    }
  };

  const handleStepClick = (stepId: number) => {
    const step = steps[stepId - 1];
    if (step && stepId <= currentStep) {
      navigate(`/setup-product/${step.path}`);
    }
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
            Setup Product Analytics
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these steps to start tracking product usage and understand how your 
            features drive value for customers.
          </p>
        </div>

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
                        ? 'text-indigo-600'
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
              <Routes>
                <Route path="/" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Product Setup
                        </h2>
                        <p className="text-gray-600">
                          Configure your product details for analytics setup.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="e.g. My SaaS Product"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Environment
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {['development', 'staging', 'production'].map((env) => (
                            <button
                              key={env}
                              onClick={() => setEnvironment(env as typeof environment)}
                              className={`
                                px-4 py-2 rounded-lg text-sm font-medium
                                ${environment === env
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                              `}
                            >
                              {env.charAt(0).toUpperCase() + env.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="/track-page-visits" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Code2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Install Base Tracking Script
                        </h2>
                        <p className="text-gray-600">
                          Copy and paste the following script in the <code>&lt;head&gt;</code> section 
                          of your product's HTML.
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
                } />

                <Route path="/track-signups" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Track Signups & Identity
                        </h2>
                        <p className="text-gray-600">
                          Track user signups and resolve their identity.
                        </p>
                      </div>
                    </div>

                    {renderCodeBlock(SIGNUP_TRACKING, 'Signup Tracking Code')}
                    {renderCodeBlock(USER_IDENTIFY, 'User Identity Code')}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          Tracking signups and resolving identity helps you:
                          <ul className="list-disc ml-4 mt-2 space-y-1">
                            <li>Understand your acquisition funnel</li>
                            <li>Connect pre and post-signup behavior</li>
                            <li>Enrich user profiles automatically</li>
                            <li>Enable personalized analytics</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="/track-login" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <UserPlus className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Track Login Events
                        </h2>
                        <p className="text-gray-600">
                          Track user logins to measure account and user retention.
                        </p>
                      </div>
                    </div>

                    {renderCodeBlock(`// Track user login event
thrivestack.track('user_login', {
  userId: user.id,
  email: user.email,
  loginMethod: 'email', // or 'sso', 'oauth', etc.
  deviceType: 'web', // or 'mobile', 'desktop'
  timestamp: new Date().toISOString()
});`, 'Login Tracking Code')}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          Tracking login events helps you understand:
                          <ul className="list-disc ml-4 mt-2 space-y-1">
                            <li>Daily/Monthly Active Users (DAU/MAU)</li>
                            <li>User engagement patterns</li>
                            <li>Account retention metrics</li>
                            <li>Login success/failure rates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="/resolve-identity" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Resolve User Identity
                        </h2>
                        <p className="text-gray-600">
                          Select which user attributes to automatically enrich.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {enrichmentFields.map((field) => (
                        <button
                          key={field.id}
                          onClick={() => setSelectedEnrichmentFields(prev =>
                            prev.includes(field.id)
                              ? prev.filter(f => f !== field.id)
                              : [...prev, field.id]
                          )}
                          className={`
                            flex items-center justify-between p-4 rounded-lg border-2 transition-colors
                            ${selectedEnrichmentFields.includes(field.id)
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-200'
                            }
                          `}
                        >
                          <span className="font-medium">{field.label}</span>
                          {selectedEnrichmentFields.includes(field.id) && (
                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          Selected attributes will be automatically enriched when users are identified.
                          This data helps you better understand your user base and improve targeting.
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="/account-add-user" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Associate Companies
                        </h2>
                        <p className="text-gray-600">
                          Use group analytics to track company-level engagement.
                        </p>
                      </div>
                    </div>

                    {renderCodeBlock(`// Associate user with company using group analytics
thrivestack.group('company', companyId, {
  name: company.name,
  industry: company.industry,
  size: company.employeeCount,
  plan: company.subscriptionTier
});`, 'Company Association Code')}

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <div className="text-sm text-purple-800">
                          Companies will be automatically enriched with firmographic data including
                          industry, size, funding, and technology stack information.
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="/track-features" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Gauge className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Track Feature Usage
                        </h2>
                        <p className="text-gray-600">
                          Add this code to track specific feature usage in your application.
                        </p>
                      </div>
                    </div>

                    {renderCodeBlock(FEATURE_TRACKING, 'Feature Tracking Code')}

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div className="text-sm text-amber-800">
                          <strong>Important:</strong> Always include the <code>companyId</code> parameter 
                          to enable account-level analytics.
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Verify Your Implementation
                      </h3>
                      {renderCodeBlock(VERIFY_EVENT, 'Test Event')}
                      
                      <button
                        onClick={handleVerifyEvent}
                        className={`
                          mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium
                          ${isVerified
                            ? 'bg-green-100 text-green-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }
                        `}
                      >
                        {isVerified ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Event Verified
                          </>
                        ) : (
                          <>
                            <Terminal className="w-5 h-5 mr-2" />
                            Verify Event
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                } />

                <Route path="/other-events" element={
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Track Other SaaS Events
                        </h2>
                        <p className="text-gray-600">
                          Configure additional SaaS events tracking in Event Studio.
                        </p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 space-y-4">
                      <h3 className="font-medium text-indigo-900">Available Event Types:</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-indigo-800">User Events</h4>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• User Invited</li>
                            <li>• Account Removed User</li>
                            <li>• User Role Changed</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-indigo-800">Account Events</h4>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Account Deleted</li>
                            <li>• Account Blocked</li>
                            <li>• Settings Updated</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-indigo-800">Subscription Events</h4>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Trial Started/Expired</li>
                            <li>• Plan Upgraded/Downgraded</li>
                            <li>• Payment Failed</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4">
                        <a
                          href="/event-studio"
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <span>Open Event Studio</span>
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Skip this step
                    </button>
                  </div>
                } />

                <Route path="/setup-alerts" element={
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
                          Configure alerts for your product management team.
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

                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                      <div className="flex items-start space-x-3">
                        <Rocket className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="text-sm text-green-800">
                          <strong className="font-medium block mb-1">
                            Congratulations! 🎉
                          </strong>
                          <p>
                            Your product analytics setup is complete. Engagement and Feature Usage 
                            reports are now ready to use in your dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
              </Routes>

              {/* Navigation */}
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !productName.trim()}
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
              