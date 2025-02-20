import React from 'react';
import { DollarSign, Users, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { revenueData } from '../../../data/sampleData';

export function MonetizationSection() {
  return (
    <div id="monetization" className="space-y-6">
      <div className="flex items-center space-x-3">
        <DollarSign className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Revenue Metrics</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="MRR"
          value="$48.2k"
          change={15.8}
          trend="up"
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="ARPU"
          value="$108"
          change={4.2}
          trend="up"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="LTV"
          value="$2,847"
          change={8.4}
          trend="up"
          icon={<Activity className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="mrr"
                stackId="1"
                stroke="#4F46E5"
                fill="#4F46E5"
              />
              <Area
                type="monotone"
                dataKey="expansion"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}