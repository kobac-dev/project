import React from 'react';
import { Calendar, Users, Clock, DollarSign, Star, BookOpen, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTutorStats, useTutorBookings, useTutorProfile } from '@/hooks/useTutorData';

export function TutorDashboard() {
  const { stats, loading: statsLoading } = useTutorStats();
  const { bookings, loading: bookingsLoading } = useTutorBookings();
  const { profile, loading: profileLoading } = useTutorProfile();

  // Get upcoming sessions from bookings
  const upcomingSessions = bookings
    .filter(booking => 
      new Date(booking.date) > new Date() && 
      ['pending', 'accepted'].includes(booking.status)
    )
    .slice(0, 3);

  const statsCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents?.toString() || '0',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      change: `+${Math.floor((stats?.totalStudents || 0) * 0.1)} this month`
    },
    {
      title: 'Upcoming Sessions',
      value: stats?.upcomingSessions?.toString() || '0',
      icon: Calendar,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      change: upcomingSessions.length > 0 ? `Next: ${new Date(upcomingSessions[0]?.date).toLocaleDateString()}` : 'No upcoming sessions'
    },
    {
      title: 'Hours This Week',
      value: Math.round(stats?.hoursThisWeek || 0).toString(),
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      change: `${Math.max(0, 40 - Math.round(stats?.hoursThisWeek || 0))} hours remaining`
    },
    {
      title: 'Earnings This Month',
      value: `$${stats?.earningsThisMonth?.toLocaleString() || '0'}`,
      icon: DollarSign,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      change: '+12% from last month'
    }
  ];

  if (statsLoading || bookingsLoading || profileLoading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            Welcome back, {profile?.fullName?.split(' ')[0] || 'Tutor'}!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Here's your teaching overview for today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => {
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
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">{stat.change}</span>
                  </div>
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
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                        <AvatarImage src={session.parent.profileImage} alt={session.parent.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                          {session.parent.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{session.parent.fullName}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{session.subject.subjectName}</p>
                        <Badge className={`mt-1 ${
                          session.status === 'accepted' 
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-700 dark:text-slate-300">{session.timeSlot}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(session.date).toLocaleDateString()}</p>
                      <p className="text-sm font-semibold text-emerald-600">${session.amount}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">No upcoming sessions</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">New bookings will appear here</p>
                </div>
              )}
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Performance
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your teaching metrics
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{stats?.averageRating?.toFixed(1) || '4.8'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Reviews</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{stats?.totalReviews || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Completion Rate</span>
                  <span className="font-bold text-emerald-600">{Math.round(stats?.completionRate || 98)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Response Time</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{stats?.responseTime || '< 2 hours'}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 mb-3">
                  <BookOpen className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Teaching Subjects</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile?.subjects?.map((subject, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                      {subject.subjectName}
                    </Badge>
                  )) || (
                    <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0">
                      No subjects assigned
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}