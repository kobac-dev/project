import React from 'react';
import { Users, GraduationCap, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';

interface OverviewCardsProps {
  stats: DashboardStats;
}

export function OverviewCards({ stats }: OverviewCardsProps) {
  const cards = [
    {
      title: 'Total Tutors',
      value: stats.totalTutors,
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Parents',
      value: stats.totalParents,
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Active Subjects',
      value: stats.totalSubjects,
      icon: BookOpen,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {card.title}
              </CardTitle>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{card.value}</div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">{card.change}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">from last month</span>
              </div>
            </CardContent>
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full" />
          </Card>
        );
      })}
    </div>
  );
}