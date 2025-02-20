import React from 'react';
import { UserMinus, Users, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { retentionData } from '../../../data/sampleData';

export function RetentionSection() {
  return (
    <div id="retention" className="space-y-6">
      <div className="flex items-center space-x-3">
        <UserMinus className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Retention Analysis</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Churn Rate"
          value="2.4%"
          change={0.8}
          trend="down"
          icon={<UserMinus className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Retention Rate"
          value="84%"
          change={-2.4}
          trend="down"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="At Risk"
          value="124"
          change={15.7}
          trend="down"
          icon={<AlertTriangle className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Cohort Retention</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#4F46E5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="previous"
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