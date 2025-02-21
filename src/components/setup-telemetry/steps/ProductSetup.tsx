import React from 'react';
import { Building2 } from 'lucide-react';

interface ProductSetupProps {
  productName: string;
  environment: 'development' | 'staging' | 'production';
  onProductNameChange: (name: string) => void;
  onEnvironmentChange: (env: 'development' | 'staging' | 'production') => void;
}

export function ProductSetup({
  productName,
  environment,
  onProductNameChange,
  onEnvironmentChange
}: ProductSetupProps) {
  return (
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
            onChange={(e) => onProductNameChange(e.target.value)}
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
                onClick={() => onEnvironmentChange(env as typeof environment)}
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
  );
}