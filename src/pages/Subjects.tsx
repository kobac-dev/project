import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { adminAPI } from '@/services/api';
import { Subject } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ subjectName: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      toast({
        title: "Error",
        description: "Failed to load subjects data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = async () => {
    if (!newSubject.subjectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject name",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await adminAPI.createSubject(newSubject);
      setSubjects([...subjects, response.data]);
      setNewSubject({ subjectName: '' });
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Subject created successfully",
      });
    } catch (error) {
      console.error('Failed to create subject:', error);
      toast({
        title: "Error",
        description: "Failed to create subject",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: number) => {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;

    try {
      const updatedSubject = { 
        subjectName: subject.subjectName, 
        isActive: !subject.isActive 
      };
      await adminAPI.updateSubject(id, updatedSubject);
      setSubjects(subjects.map(s => 
        s.id === id ? { ...s, isActive: !s.isActive } : s
      ));
      toast({
        title: "Success",
        description: `Subject ${!subject.isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      console.error('Failed to update subject:', error);
      toast({
        title: "Error",
        description: "Failed to update subject",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await adminAPI.deleteSubject(id);
      setSubjects(subjects.filter(subject => subject.id !== id));
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete subject:', error);
      toast({
        title: "Error",
        description: "Failed to delete subject",
        variant: "destructive",
      });
    }
  };

  const activeSubjects = subjects.filter(s => s.isActive).length;
  const inactiveSubjects = subjects.filter(s => !s.isActive).length;

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading subjects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Subjects
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                  Manage available subjects for tutoring sessions.
                </p>
              </div>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Add New Subject</DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-400">
                  Create a new subject that tutors can teach on the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subjectName" className="font-medium">Subject Name</Label>
                  <Input
                    id="subjectName"
                    value={newSubject.subjectName}
                    onChange={(e) => setNewSubject({...newSubject, subjectName: e.target.value})}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                    placeholder="Enter subject name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddSubject} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 rounded-lg">
                  Add Subject
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Subjects</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{subjects.length}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Subjects</p>
                <p className="text-3xl font-bold text-emerald-600">{activeSubjects}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Inactive Subjects</p>
                <p className="text-3xl font-bold text-red-600">{inactiveSubjects}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm"
            />
          </div>
        </div>

        {/* Enhanced Table Section */}
        <div className="w-full rounded-xl overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[80px]">ID</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[250px]">Subject Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[150px]">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[180px]">Created Date</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[120px]">Toggle Status</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => (
                  <TableRow key={subject.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium">
                      <span className="text-slate-700 dark:text-slate-300">#{subject.id}</span>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{subject.subjectName}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Subject ID: {subject.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={subject.isActive 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-sm' 
                          : 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-sm'
                        }
                      >
                        {subject.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {new Date(subject.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={subject.isActive}
                          onCheckedChange={() => handleToggleActive(subject.id)}
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {subject.isActive ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSubject(subject.id)}
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