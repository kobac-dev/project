import React from 'react';
import { Search, Calendar, Users, BookOpen, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ParentDashboard() {
  const stats = [
    {
      title: 'Active Tutors',
      value: '3',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      change: 'Mathematics, Physics, English'
    },
    {
      title: 'This Month Sessions',
      value: '12',
      icon: Calendar,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      change: '8 completed, 4 upcoming'
    },
    {
      title: 'Total Spent',
      value: '$540',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      change: 'This month'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: Star,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      change: 'From your tutors'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      tutor: 'Sarah Johnson',
      subject: 'Mathematics',
      time: '2:00 PM - 3:00 PM',
      date: 'Today',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      tutor: 'Michael Chen',
      subject: 'Physics',
      time: '4:00 PM - 5:30 PM',
      date: 'Tomorrow',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const recommendedTutors = [
    {
      id: 1,
      name: 'Emily Rodriguez',
      subject: 'English Literature',
      rating: 4.9,
      rate: 40,
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      name: 'David Kim',
      subject: 'Computer Science',
      rating: 4.7,
      rate: 55,
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            Parent Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Welcome back! Here's your children's learning progress overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {stat.title}
                  </CardTitle>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{stat.change}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Sessions */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Upcoming Sessions
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your scheduled tutoring sessions
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                      <AvatarImage src={session.avatar} alt={session.tutor} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                        {session.tutor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">{session.tutor}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{session.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{session.time}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{session.date}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Tutors */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Recommended
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    New tutors for you
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedTutors.map((tutor) => (
                <div key={tutor.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700">
                      <AvatarImage src={tutor.avatar} alt={tutor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold text-sm">
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{tutor.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{tutor.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tutor.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">${tutor.rate}/hr</span>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0">
                    Book Session
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}