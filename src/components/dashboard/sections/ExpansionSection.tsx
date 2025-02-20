import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { expansionData } from '../../../data/sampleData';

export function ExpansionSection() {
  return (
    <div id="expansion" className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Expansion Revenue</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Expansion MRR"
          value="$12.4k"
          change={24.8}
          trend="up"
          icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Upgrade Rate"
          value="18%"
          change={5.2}
          trend="up"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Expansion Revenue"
          value="$148k"
          change={12.4}
          trend="up"
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Expansion Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={expansionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="upgrades"
                stroke="#4F46E5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="addOns"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}