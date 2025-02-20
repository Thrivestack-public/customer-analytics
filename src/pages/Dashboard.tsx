import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building2,
  Clock,
  Zap,
  Activity,
  BarChart2,
  Target,
  Rocket,
  UserMinus,
  DollarSign,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { PricingModal } from '../components/PricingModal';
import { TrialBanner } from '../components/dashboard/TrialBanner';
import Navigation from '../components/dashboard/Navigation';
import {
  AcquisitionSection,
  ActivationSection,
  EngagementSection,
  RetentionSection,
  MonetizationSection,
  ExpansionSection
} from '../components/dashboard/sections';
import type { AcquisitionMode, Section } from '../types';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const getSections = (mode: AcquisitionMode): Section[] => mode === 'product-led' ? [
  { 
    id: 'acquisition', 
    label: 'Acquisition', 
    icon: Target,
    trend: 'up',
    change: '+12.5%',
    description: 'Growing steadily'
  },
  {
    id: 'activation', 
    label: 'Activation', 
    icon: Rocket,
    trend: 'up',
    change: '+8.1%',
    description: 'Improving'
  },
  { 
    id: 'engagement', 
    label: 'Engagement', 
    icon: Activity,
    trend: 'flat',
    change: '+0.2%',
    description: 'Stable'
  },
  { 
    id: 'monetization', 
    label: 'Monetization', 
    icon: DollarSign,
    trend: 'up',
    change: '+15.8%',
    description: 'Strong growth'
  },
  { 
    id: 'retention', 
    label: 'Retention', 
    icon: UserMinus,
    trend: 'down',
    change: '-2.4%',
    description: 'Needs attention'
  },
  { 
    id: 'expansion', 
    label: 'Expansion', 
    icon: TrendingUp,
    trend: 'up',
    change: '+24.8%',
    description: 'Rapid growth'
  }
] : [
  { 
    id: 'acquisition', 
    label: 'Acquisition', 
    icon: Target,
    trend: 'up',
    change: '+12.5%',
    description: 'Growing steadily'
  },
  { 
    id: 'monetization', 
    label: 'Monetization', 
    icon: DollarSign,
    trend: 'up',
    change: '+15.8%',
    description: 'Strong growth'
  },
  { 
    id: 'activation', 
    label: 'Activation', 
    icon: Rocket,
    trend: 'up',
    change: '+8.1%',
    description: 'Improving'
  },
  { 
    id: 'engagement', 
    label: 'Engagement', 
    icon: Activity,
    trend: 'flat',
    change: '+0.2%',
    description: 'Stable'
  },
  { 
    id: 'retention', 
    label: 'Retention', 
    icon: UserMinus,
    trend: 'down',
    change: '-2.4%',
    description: 'Needs attention'
  },
  { 
    id: 'expansion', 
    label: 'Expansion', 
    icon: TrendingUp,
    trend: 'up',
    change: '+24.8%',
    description: 'Rapid growth'
  }
];

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm">{title}</span>
        <div className="p-2 bg-indigo-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold mb-1">{value}</div>
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="h-16 w-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { value: 400 },
                { value: 300 },
                { value: 600 },
                { value: 200 },
                { value: 700 },
                { value: 400 },
                { value: 500 }
              ]}
            >
              <Area
                type="monotone"
                dataKey="value"
                stroke={trend === 'up' ? '#10B981' : '#EF4444'}
                fill={trend === 'up' ? '#D1FAE5' : '#FEE2E2'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function TrendIndicator({ trend, change }: { trend: 'up' | 'down' | 'flat', change: string }) {
  if (trend === 'flat') {
    return (
      <div className="flex items-center text-gray-500 text-xs">
        <ArrowRight className="w-3 h-3 mr-1" />
        <span>{change}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-xs ${
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}>
      {trend === 'up' ? (
        <TrendingUp className="w-3 h-3 mr-1" />
      ) : (
        <TrendingDown className="w-3 h-3 mr-1" />
      )}
      <span>{change}</span>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [acquisitionMode, setAcquisitionMode] = useState<AcquisitionMode>('product-led');
  const sections = getSections(acquisitionMode);
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [showPricing, setShowPricing] = useState(false);

  // Enhanced scroll handling with IntersectionObserver
  useEffect(() => {
    const observers = sections.map(section => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0
        }
      );

      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust scroll position to account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrialBanner onUpgrade={() => setShowPricing(true)} />

      <Navigation
        acquisitionMode={acquisitionMode}
        setAcquisitionMode={setAcquisitionMode}
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Content */}
      <div className="ml-64 px-8 py-6 space-y-12">
        {sections.map(section => (
          <React.Fragment key={section.id}>
            {section.id === 'acquisition' && (
              <div id="acquisition">
                <AcquisitionSection />
              </div>
            )}
            {section.id === 'activation' && (
              <div id="activation">
                <ActivationSection />
              </div>
            )}
            {section.id === 'engagement' && (
              <div id="engagement">
                <EngagementSection />
              </div>
            )}
            {section.id === 'monetization' && (
              <div id="monetization">
                <MonetizationSection />
              </div>
            )}
            {section.id === 'retention' && (
              <div id="retention">
                <RetentionSection />
              </div>
            )}
            {section.id === 'expansion' && (
              <div id="expansion">
                <ExpansionSection />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Focus Area Link */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={() => navigate('/customize')}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Target className="w-5 h-5" />
          <span>Change Focus Area</span>
        </button>
      </div>

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={() => setShowPricing(false)}
      />
    </div>
  );
}

export default Dashboard;