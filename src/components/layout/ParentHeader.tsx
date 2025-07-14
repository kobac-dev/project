import React, { useState } from 'react';
import { Search, Moon, Sun, Bell, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function ParentHeader() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-6 flex-shrink-0">
      <div className="flex items-center flex-1 max-w-md">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search tutors, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-sm">
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-white" />
            ) : (
              <Sun className="h-4 w-4 text-white" />
            )}
          </div>
        </Button>

        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
            <Bell className="h-4 w-4 text-white" />
          </div>
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-br from-red-500 to-pink-500 border-0 shadow-lg"
          >
            1
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300">
                {user?.name}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg">Account Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400 cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={logout}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}