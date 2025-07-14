import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/context/AdminContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Tutors',
    href: '/admin/tutors',
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Parents',
    href: '/admin/parents',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Subjects',
    href: '/admin/subjects',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    gradient: 'from-gray-500 to-slate-500'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={cn("flex h-full w-full flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700", className)}>
      {/* Logo/Brand section */}
      <div className="flex items-center px-6 py-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <div className="ml-3">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            TeachHome
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Panel</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-md",
                  isActive
                    ? "bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-white"
                )
              }
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                `bg-gradient-to-br ${item.gradient}`,
                "shadow-sm group-hover:shadow-md group-hover:scale-105"
              )}>
                <Icon className="h-4 w-4 text-white flex-shrink-0" />
              </div>
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Logout section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg mr-3 bg-gradient-to-br from-red-500 to-pink-500 shadow-sm">
            <LogOut className="h-4 w-4 text-white flex-shrink-0" />
          </div>
          Logout
        </Button>
      </div>
    </div>
  );
}