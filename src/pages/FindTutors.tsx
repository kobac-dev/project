import React from 'react';
import { Search, Star, MapPin, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FindTutors() {
  const tutors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      subjects: ['Mathematics', 'Physics'],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      description: 'PhD in Mathematics with 8+ years of teaching experience.',
      availability: 'Available today'
    },
    {
      id: 2,
      name: 'Michael Chen',
      subjects: ['Chemistry', 'Biology'],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 50,
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      description: 'Former research scientist with expertise in organic chemistry.',
      availability: 'Available tomorrow'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      subjects: ['English', 'Literature'],
      rating: 4.9,
      reviews: 156,
      hourlyRate: 40,
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      description: 'Master\'s in English Literature with passion for writing.',
      availability: 'Available today'
    },
    {
      id: 4,
      name: 'David Kim',
      subjects: ['Computer Science', 'Programming'],
      rating: 4.7,
      reviews: 203,
      hourlyRate: 55,
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      description: 'Senior software engineer specializing in Python and JavaScript.',
      availability: 'Available this week'
    }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              Find Tutors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Discover expert tutors for your learning needs.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by subject or tutor name..."
              className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm"
            />
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-slate-200 dark:ring-slate-700">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{tutor.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tutor.rating}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">({tutor.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3 w-3" />
                      <span>{tutor.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border-0">
                      {subject}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tutor.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      ${tutor.hourlyRate}
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/hr</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <Clock className="h-3 w-3" />
                      <span>{tutor.availability}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg">
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}