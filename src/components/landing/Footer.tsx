import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TutorHub</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting students with expert tutors for personalized learning experiences that drive academic success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#tutors" className="text-gray-300 hover:text-white transition-colors">Find Tutors</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#signup" className="text-gray-300 hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Subjects</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mathematics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Science</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">English</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Computer Science</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Languages</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">support@tutorhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">123 Education St, Learning City, LC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 TutorHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}