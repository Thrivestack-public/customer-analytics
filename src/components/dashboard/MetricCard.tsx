import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
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