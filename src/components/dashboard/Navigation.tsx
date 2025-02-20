import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TrendIndicator } from './TrendIndicator';
import { AcquisitionMode, Section } from '../../types';

interface NavigationProps {
  acquisitionMode: AcquisitionMode;
  setAcquisitionMode: (mode: AcquisitionMode) => void;
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function Navigation({
  acquisitionMode,
  setAcquisitionMode,
  sections,
  activeSection,
  onSectionClick
}: NavigationProps) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm z-50 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Logo */}
        <div className="flex items-center space-x-3 text-indigo-600">
          <BarChart2 className="w-8 h-8" />
          <span className="text-xl font-bold">ThriveStack</span>
        </div>

        {/* Acquisition Mode */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Acquisition Mode
          </h2>
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setAcquisitionMode('product-led')}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  w-full text-left flex items-center space-x-2
                  ${acquisitionMode === 'product-led'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className={`w-2 h-2 rounded-full ${acquisitionMode === 'product-led' ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                <span>
                Product-Led
                </span>
              </button>
              <button
                onClick={() => setAcquisitionMode('sales-led')}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  w-full text-left flex items-center space-x-2
                  ${acquisitionMode === 'sales-led'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className={`w-2 h-2 rounded-full ${acquisitionMode === 'sales-led' ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                <span>
                Sales-Led
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Analytics
          </h2>
          <div className="space-y-1">
            {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-lg mr-3
                    ${activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100'
                    }
                  `}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{section.label}</div>
                    <TrendIndicator trend={section.trend} change={section.change} />
                  </div>
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}