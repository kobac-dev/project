import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function FeaturedTutors() {
  const tutors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      subjects: ['Mathematics', 'Physics'],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'PhD in Mathematics with 8+ years of teaching experience. Specialized in calculus and advanced algebra.',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      subjects: ['Chemistry', 'Biology'],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 50,
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Former research scientist with expertise in organic chemistry and molecular biology.',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      subjects: ['English', 'Literature'],
      rating: 4.9,
      reviews: 156,
      hourlyRate: 40,
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Master\'s in English Literature. Passionate about helping students develop strong writing skills.',
      verified: true
    },
    {
      id: 4,
      name: 'David Kim',
      subjects: ['Computer Science', 'Programming'],
      rating: 4.7,
      reviews: 203,
      hourlyRate: 55,
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Senior software engineer at tech company. Specializes in Python, JavaScript, and data structures.',
      verified: true
    }
  ];

  return (
    <section id="tutors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Top Tutors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified expert tutors who are passionate about helping you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {tutor.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{tutor.rating}</span>
                    <span className="text-sm text-gray-500">({tutor.reviews})</span>
                  </div>

                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{tutor.location}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tutor.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {tutor.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${tutor.hourlyRate}
                      <span className="text-sm font-normal text-gray-500">/hr</span>
                    </span>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg"
          >
            View All Tutors
          </Button>
        </div>
      </div>
    </section>
  );
}