import React from 'react';
import { Activity, Users, Clock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { featureData } from '../../../data/sampleData';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export function EngagementSection() {
  return (
    <div id="engagement" className="space-y-6">
      <div className="flex items-center space-x-3">
        <Activity className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Engagement Overview</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Active Users"
          value="1,847"
          change={0.2}
          trend="up"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Session Duration"
          value="24m"
          change={5.8}
          trend="up"
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Actions/Session"
          value="8.3"
          change={-2.1}
          trend="down"
          icon={<Activity className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Feature Usage</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={featureData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {featureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}