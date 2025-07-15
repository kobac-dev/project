import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Users, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminAPI } from '@/services/api';
import { Parent } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function Parents() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getParents();
      setParents(response.data);
    } catch (error) {
      console.error('Failed to fetch parents:', error);
      toast({
        title: "Error",
        description: "Failed to load parents data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredParents = parents.filter(parent =>
    parent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.phoneNumber.includes(searchTerm) ||
    parent.user?.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading parents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Parents
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                  Manage parent accounts and their comprehensive information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search parents by name, phone, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Enhanced Table Section */}
        <div className="w-full rounded-xl overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[250px]">Parent Profile</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Contact Information</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Address</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Account Details</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Children</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Member Since</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.map((parent) => (
                  <TableRow key={parent.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                          <AvatarImage src={parent.profileImage} alt={parent.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                            {parent.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{parent.fullName}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            ID: {parent.id} • {parent.sex}
                          </div>
                          {parent.user && (
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              @{parent.user.username}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{parent.phoneNumber}</span>
                        </div>
                        {parent.user && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {parent.user.username}@platform.com
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {parent.address && (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{parent.address.area}</span>
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {parent.address.location}, {parent.address.district}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {parent.address.country}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          User ID: {parent.userId}
                        </div>
                        {parent.user && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Role: {parent.user.role}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{parent.children || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-700 dark:text-slate-300">
                        {new Date(parent.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}