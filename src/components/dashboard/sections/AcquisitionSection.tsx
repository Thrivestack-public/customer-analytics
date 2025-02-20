import React from 'react';
import { Target, Users, DollarSign } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { acquisitionData } from '../../../data/sampleData';

export function AcquisitionSection() {
  return (
    <div id="acquisition" className="space-y-6">
      <div className="flex items-center space-x-3">
        <Target className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Acquisition Insights</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Signups"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change={-0.8}
          trend="down"
          icon={<Target className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="CAC"
          value="$42"
          change={-5.2}
          trend="up"
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Acquisition Channels</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={acquisitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="organic"
                stackId="1"
                stroke="#4F46E5"
                fill="#4F46E5"
              />
              <Area
                type="monotone"
                dataKey="paid"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
              />
              <Area
                type="monotone"
                dataKey="referral"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}