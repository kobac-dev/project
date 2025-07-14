import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/types';

interface BookingChartProps {
  stats: DashboardStats;
}

export function BookingChart({ stats }: BookingChartProps) {
  return (
    <Card className="col-span-4 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Booking Trends
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monthly booking activity over the past year
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={stats.monthlyBookings}>
            <defs>
              <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="url(#gradient)"
              strokeWidth={3}
              dot={{ 
                fill: "#3b82f6", 
                strokeWidth: 2, 
                stroke: "#ffffff",
                r: 6,
                filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"
              }}
              activeDot={{ 
                r: 8, 
                fill: "#3b82f6",
                stroke: "#ffffff",
                strokeWidth: 3,
                filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))"
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}