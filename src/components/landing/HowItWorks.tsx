import React from 'react';
import { Search, Calendar, GraduationCap } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Find Your Tutor',
      description: 'Browse through our verified tutors and find the perfect match for your learning needs and schedule.',
      number: '01'
    },
    {
      icon: Calendar,
      title: 'Book a Session',
      description: 'Schedule a convenient time that works for both you and your chosen tutor with our easy booking system.',
      number: '02'
    },
    {
      icon: GraduationCap,
      title: 'Start Learning',
      description: 'Begin your personalized learning journey and achieve your academic goals with expert guidance.',
      number: '03'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started with TutorHub is simple. Follow these three easy steps to begin your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-8 z-0"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="text-center">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6 text-xl font-bold">
                      {step.number}
                    </div>
                    
                    <div className="mb-6">
                      <Icon className="h-8 w-8 text-blue-600 mx-auto" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}