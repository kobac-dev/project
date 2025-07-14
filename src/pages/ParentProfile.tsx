import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ParentProfile() {
  const children = [
    { name: 'Emma Wilson', age: 16, grade: '11th Grade', subjects: ['Mathematics', 'Physics'] },
    { name: 'James Wilson', age: 14, grade: '9th Grade', subjects: ['English', 'History'] }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Manage your account and family information.
          </p>
        </div>

        {/* Profile Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto ring-4 ring-slate-200 dark:ring-slate-700">
                <AvatarImage src="https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="Jane Parent" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                  JP
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Jane Parent</h3>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Parent Account
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg">
                Edit Profile
              </Button>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">jane.parent@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">New York, NY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Member since 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Children Information */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                  <Users className="h-6 w-6 text-purple-600" />
                  <span>My Children</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {children.map((child, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{child.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Age {child.age} • {child.grade}</p>
                      </div>
                      <Avatar className="h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-sm">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Current Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {child.subjects.map((subject, subIndex) => (
                          <Badge key={subIndex} variant="outline" className="bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Summary */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                  <User className="h-6 w-6 text-purple-600" />
                  <span>Account Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">3</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Tutors</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">24</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Sessions</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">$1,080</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Spent</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">4.8</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}