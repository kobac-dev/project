// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedTutors } from '@/components/landing/FeaturedTutors';
import { Testimonials } from '@/components/landing/Testimonials';
import { SignupSection } from '@/components/landing/SignupSection';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  // const { user, isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect authenticated users to their appropriate dashboard
  //   if (isAuthenticated && user) {
  //     switch (user.role) {
  //       case 'admin':
  //         navigate('/admin');
  //         break;
  //       case 'tutor':
  //         navigate('/tutor');
  //         break;
  //       case 'parent':
  //         navigate('/parent');
  //         break;
  //       default:
  //         // Stay on landing page for unknown roles
  //         break;
  //     }
  //   }
  // }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <HowItWorks />
      <FeaturedTutors />
      <Testimonials />
      <SignupSection />
      <Footer />
    </div>
  );
}