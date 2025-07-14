import React from 'react';
import { ArrowRight, Play, CheckCircle, Users, Star, Clock, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-600 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-teal-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-600 rounded-full"></div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - 5 columns */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium border border-blue-200">
                🎓 Trusted by 10,000+ students worldwide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find the Perfect{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tutor
                </span>{' '}
                for You
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Connect with expert tutors who will help you achieve your academic goals. 
                Personalized learning, flexible scheduling, and proven results.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Verified Expert Tutors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Flexible Scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Personalized Learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-gray-700 font-medium">Proven Results</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">5,000+</div>
                <div className="text-sm text-gray-600">Expert Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - 7 columns - Full Image with Overlays */}
          <div className="lg:col-span-7 relative">
            {/* Main Hero Image - Full Width */}
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2"
                alt="Student learning with tutor"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Floating UI Elements */}
              
              {/* Session Complete Badge - Top Left */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 max-w-[220px]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Session Complete!</p>
                    <p className="text-xs text-gray-600">Math - Algebra</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-green-600 font-semibold">+15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Count Card - Top Right */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">2,500+</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Happy Students</p>
                </div>
              </div>

              {/* Live Session Indicator - Middle Left */}
              <div className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Live Session</p>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <p className="text-xs text-gray-600">45 min remaining</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Card - Bottom Left */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">4.9/5 Rating</p>
                    <p className="text-xs text-gray-600">From 1,200+ reviews</p>
                  </div>
                </div>
              </div>

              {/* Tutor Profile - Bottom Right */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                      alt="Tutor Sarah"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-xs text-gray-600">Math Expert</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 font-medium">4.9 • $45/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Tags - Middle Right */}
              <div className="absolute top-1/2 right-6 transform -translate-y-1/2 space-y-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
                  <span className="text-xs font-semibold text-blue-600">Mathematics</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
                  <span className="text-xs font-semibold text-purple-600">Physics</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
                  <span className="text-xs font-semibold text-green-600">Chemistry</span>
                </div>
              </div>
            </div>

            {/* Additional Floating Stats - Outside Image */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-2xl hidden lg:block">
              <div className="text-center">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm opacity-90">Support Available</p>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow-2xl hidden lg:block">
              <div className="text-center">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm opacity-90">Subjects Available</p>
              </div>
            </div>

            <div className="absolute top-1/4 -right-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-4 shadow-2xl hidden xl:block">
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs opacity-90">Top Rated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}