import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SignupSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'parent'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Thank you for signing up! We'll be in touch soon.",
    });

    setFormData({ name: '', email: '', role: 'parent' });
  };

  return (
    <section id="signup" className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of students and parents who have already transformed their academic experience with TutorHub.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">Personalized matching with expert tutors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">Flexible scheduling that fits your lifestyle</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-blue-100">Proven track record of academic improvement</span>
              </div>
            </div>
          </div>

          {/* Right Content - Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get Started Today
              </h3>
              <p className="text-gray-600">
                Create your account and find the perfect tutor
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-lg border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-lg border-gray-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium text-gray-700">I am a:</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({...formData, role: value})}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent" className="flex items-center space-x-2 cursor-pointer">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>Parent</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <RadioGroupItem value="tutor" id="tutor" />
                    <Label htmlFor="tutor" className="flex items-center space-x-2 cursor-pointer">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      <span>Tutor</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}