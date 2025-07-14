import React from 'react';
import { Calendar, Clock, User, BookOpen, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ParentBookings() {
  const bookings = [
    {
      id: 1,
      tutor: 'Sarah Johnson',
      subject: 'Mathematics',
      date: '2024-12-20',
      time: '2:00 PM - 3:00 PM',
      status: 'confirmed',
      amount: 45,
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      tutor: 'Michael Chen',
      subject: 'Physics',
      date: '2024-12-21',
      time: '4:00 PM - 5:30 PM',
      status: 'pending',
      amount: 75,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 3,
      tutor: 'Emily Rodriguez',
      subject: 'English',
      date: '2024-12-19',
      time: '10:00 AM - 11:00 AM',
      status: 'completed',
      amount: 40,
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0';
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              My Bookings
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Manage your tutoring sessions and appointments.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Book New Session
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                      <AvatarImage src={booking.avatar} alt={booking.tutor} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                        {booking.tutor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{booking.tutor}</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                        <BookOpen className="h-4 w-4" />
                        <span>{booking.subject}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">${booking.amount}</div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}