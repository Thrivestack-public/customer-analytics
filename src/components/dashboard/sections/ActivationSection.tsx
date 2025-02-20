import React from 'react';
import { Rocket, Zap, Clock, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../MetricCard';
import { activationData } from '../../../data/sampleData';

export function ActivationSection() {
  return (
    <div id="activation" className="space-y-6">
      <div className="flex items-center space-x-3">
        <Rocket className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Activation Metrics</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Activation Rate"
          value="68%"
          change={8.1}
          trend="up"
          icon={<Zap className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Time to Value"
          value="2.4 days"
          change={-15.3}
          trend="up"
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
        />
        <MetricCard
          title="Key Actions"
          value="3.8"
          change={4.2}
          trend="up"
          icon={<Activity className="w-5 h-5 text-indigo-600" />}
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Activation Funnel</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}