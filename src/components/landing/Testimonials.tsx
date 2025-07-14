import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Williams',
      role: 'Parent of Emma, Grade 10',
      rating: 5,
      content: 'TutorHub helped my daughter improve her math grades from C to A+ in just 3 months. The tutors are incredibly patient and knowledgeable. Highly recommend!',
      avatar: 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      name: 'Robert Davis',
      role: 'Parent of Alex, Grade 11',
      rating: 5,
      content: 'The flexibility of scheduling and quality of tutors is outstanding. My son now looks forward to his chemistry sessions and his confidence has grown tremendously.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      role: 'Parent of 3 students',
      rating: 5,
      content: 'Three of my children use TutorHub for different subjects. The personalized approach has made a huge difference in their academic performance and confidence.',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Parents Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what parents and students have to say about their TutorHub experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}