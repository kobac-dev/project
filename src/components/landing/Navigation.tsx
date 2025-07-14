import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                TutorHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                How it Works
              </a>
              <a href="#tutors" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Tutors
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Reviews
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/signup')}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                Join as Tutor
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Sign In
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Home
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  How it Works
                </a>
                <a href="#tutors" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Tutors
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Reviews
                </a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/signup')}
                    className="justify-start"
                  >
                    Join as Tutor
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="justify-start"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}