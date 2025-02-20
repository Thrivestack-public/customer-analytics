import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  features: string[];
  setupSteps: string[];
}

export function DataSources() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [connecting, setConnecting] = React.useState<string | null>(null);

  const integrations: Integration[] = [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic, user behavior, and campaign performance',
      logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg',
      category: 'Analytics',
      status: 'disconnected',
      features: [
        'Website traffic data',
        'Campaign tracking',
        'User behavior analysis',
        'Conversion tracking'
      ],
      setupSteps: [
        'Sign in to your Google Analytics account',
        'Select the property you want to connect',
        'Authorize ThriveStack to access your data',
        'Choose the metrics you want to import'
      ]
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Connect your CRM data for complete customer journey tracking',
      logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
      category: 'CRM',
      status: 'connected',
      features: [
        'Contact data sync',
        'Deal pipeline tracking',
        'Marketing campaign data',
        'Sales activity metrics'
      ],
      setupSteps: [
        'Log in to your HubSpot account',
        'Generate API credentials',
        'Configure data sync settings',
        'Map custom fields'
      ]
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Sync your sales data for revenue attribution',
      logo: 'https://c1.sfdcstatic.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg',
      category: 'CRM',
      status: 'error',
      features: [
        'Opportunity tracking',
        'Account data sync',
        'Revenue metrics',
        'Sales pipeline analysis'
      ],
      setupSteps: [
        'Log in to Salesforce',
        'Create a connected app',
        'Configure OAuth settings',
        'Set up data sync preferences'
      ]
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Track revenue and payment metrics',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
      category: 'Payments',
      status: 'pending',
      features: [
        'Revenue tracking',
        'Subscription metrics',
        'Payment analytics',
        'Customer lifetime value'
      ],
      setupSteps: [
        'Access your Stripe dashboard',
        'Generate API keys',
        'Configure webhook endpoints',
        'Set up event tracking'
      ]
    },
    {
      id: 'segment',
      name: 'Segment',
      description: 'Centralize your customer data collection',
      logo: 'https://segment.com/newsroom/content/images/2021/08/Segment-Logo-Primary.svg',
      category: 'Data Platform',
      status: 'disconnected',
      features: [
        'Event tracking',
        'User identification',
        'Data transformation',
        'Real-time syncing'
      ],
      setupSteps: [
        'Create a Segment source',
        'Install tracking code',
        'Configure data destinations',
        'Set up tracking plan'
      ]
    }
  ];

  const handleConnect = async (integration: Integration) => {
    setConnecting(integration.id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnecting(null);
    // In a real app, we'd handle the OAuth flow here
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Not Connected';
      case 'pending':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'disconnected':
        return 'bg-gray-50 text-gray-600 ring-gray-500/20';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'error':
        return 'bg-red-50 text-red-700 ring-red-600/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/customize')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Use Cases</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Connect Your Data Sources
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ThriveStack works best when connected to your existing tools. 
          Select the integrations you'd like to set up to get started.
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div
              onClick={() => setExpandedId(expandedId === integration.id ? null : integration.id)}
              className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200">
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`
                  px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset
                  flex items-center space-x-2
                  ${getStatusColor(integration.status)}
                `}>
                  {getStatusIcon(integration.status)}
                  <span>{getStatusText(integration.status)}</span>
                </div>
                <ChevronDown
                  className={`
                    w-5 h-5 text-gray-400 transition-transform duration-200
                    ${expandedId === integration.id ? 'rotate-180' : ''}
                  `}
                />
              </div>
            </div>

            <div
              className={`
                grid transition-all duration-200 ease-in-out
                ${expandedId === integration.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
              `}
            >
              <div className="overflow-hidden">
                <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                      <ul className="space-y-2">
                        {integration.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Setup Process</h4>
                      <ol className="space-y-2">
                        {integration.setupSteps.map((step, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <span className="font-medium text-indigo-600 mr-2">
                              {index + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleConnect(integration)}
                      disabled={connecting === integration.id || integration.status === 'connected'}
                      className={`
                        inline-flex items-center space-x-2 px-4 py-2 rounded-lg
                        font-medium transition-colors duration-200
                        ${integration.status === 'connected'
                          ? 'bg-green-50 text-green-700 cursor-not-allowed'
                          : connecting === integration.id
                            ? 'bg-indigo-100 text-indigo-700 cursor-wait'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }
                      `}
                    >
                      {connecting === integration.id && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>
                        {integration.status === 'connected'
                          ? 'Connected'
                          : connecting === integration.id
                            ? 'Connecting...'
                            : 'Connect'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/success')}
        className="fixed-cta"
      >
        <span>Continue to Dashboard</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}