import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, GraduationCap, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'tutor' | 'parent' | 'admin';
}

export function LoginModal({ isOpen, onClose, role }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      onClose();
      
      // Navigate to appropriate dashboard based on role
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'tutor':
          navigate('/tutor');
          break;
        case 'parent':
          navigate('/parent');
          break;
        default:
          navigate('/');
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'tutor':
        return <GraduationCap className="h-6 w-6 text-white" />;
      case 'parent':
        return <Users className="h-6 w-6 text-white" />;
      case 'admin':
        return <Shield className="h-6 w-6 text-white" />;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'tutor':
        return 'from-emerald-500 to-teal-500';
      case 'parent':
        return 'from-purple-500 to-pink-500';
      case 'admin':
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-2xl">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${getRoleColor()} shadow-lg`}>
              {getRoleIcon()}
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {role.charAt(0).toUpperCase() + role.slice(1)} Login
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Sign in to access your {role} dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border-slate-200"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border-slate-200"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col space-y-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${getRoleColor()} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-full rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-500 mt-4">
          Don't have an account?{' '}
          <a href="#signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up here
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}