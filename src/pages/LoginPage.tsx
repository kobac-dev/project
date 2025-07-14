import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, GraduationCap, Users, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'tutor' | 'parent'>('parent');
  const [showPassword, setShowPassword] = useState(false);
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

    console.log('Login form submitted:', { email, role });
    
    const success = await login(email, password, role);
    console.log('Login result:', success);
    
    if (success) {
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      console.log('Navigating to dashboard for role:', role);
      // Navigate to appropriate dashboard based on role
      switch (role) {
        case 'admin':
          console.log('Navigating to /admin');
          navigate('/admin');
          break;
        case 'tutor':
          console.log('Navigating to /tutor');
          navigate('/tutor');
          break;
        case 'parent':
          console.log('Navigating to /parent');
          navigate('/parent');
          break;
        default:
          console.log('Unknown role, navigating to /');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-600 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-teal-600 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-600 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Main Container - Perfectly Centered */}
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            TutorHub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="flex justify-center mb-6">
              <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${getRoleColor()} shadow-lg transform hover:scale-105 transition-transform duration-200`}>
                {getRoleIcon()}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
              Access your {role} dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="font-medium text-slate-700 dark:text-slate-300">I am a:</Label>
                <Select value={role} onValueChange={(value: 'admin' | 'tutor' | 'parent') => setRole(value)}>
                  <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-700 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-2xl">
                    <SelectItem value="parent" className="rounded-lg">
                      <div className="flex items-center space-x-3 py-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Parent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="tutor" className="rounded-lg">
                      <div className="flex items-center space-x-3 py-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Tutor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin" className="rounded-lg">
                      <div className="flex items-center space-x-3 py-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">Administrator</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-slate-700 dark:text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-slate-700 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium text-slate-700 dark:text-slate-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-slate-200 dark:border-slate-700 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 pr-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r ${getRoleColor()} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl font-semibold text-base`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-8 p-6 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">Demo Credentials:</h3>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Admin:</span>
              <span className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded">admin@demo.com / password</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Tutor:</span>
              <span className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded">tutor@demo.com / password</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Parent:</span>
              <span className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded">parent@demo.com / password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}