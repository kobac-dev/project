import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Star, GraduationCap, MapPin, Clock, Users, BookOpen } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mockTutors, mockSubjects, mockAddresses, mockStatuses } from '@/data/mockData';
import { Tutor, TutorFormData } from '@/types';

export function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTutor, setNewTutor] = useState<TutorFormData>({
    fullName: '',
    sex: 'male',
    phoneNumber: '',
    email: '',
    addressId: 1,
    maxNumber: 10,
    profileImage: '',
    userId: 0,
    highestDegree: '',
    graduateYear: new Date().getFullYear(),
    statusId: 1,
    subjectIds: [],
    availability: []
  });

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = 
      tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects?.some(subject => 
        subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || tutor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddTutor = () => {
    const tutor: Tutor = {
      id: tutors.length + 1,
      ...newTutor,
      subjects: mockSubjects.filter(s => newTutor.subjectIds.includes(s.id)),
      address: mockAddresses.find(a => a.id === newTutor.addressId),
      education: {
        id: tutors.length + 1,
        tutorId: tutors.length + 1,
        highestDegree: newTutor.highestDegree,
        graduateYear: newTutor.graduateYear,
        statusId: newTutor.statusId,
        status: mockStatuses.find(s => s.id === newTutor.statusId)
      },
      rating: 4.5,
      hourlyRate: 45,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setTutors([...tutors, tutor]);
    setNewTutor({
      fullName: '',
      sex: 'male',
      phoneNumber: '',
      email: '',
      addressId: 1,
      maxNumber: 10,
      profileImage: '',
      userId: 0,
      highestDegree: '',
      graduateYear: new Date().getFullYear(),
      statusId: 1,
      subjectIds: [],
      availability: []
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTutor = (id: number) => {
    setTutors(tutors.filter(tutor => tutor.id !== id));
  };

  const handleSubjectChange = (subjectId: number, checked: boolean) => {
    if (checked) {
      setNewTutor(prev => ({
        ...prev,
        subjectIds: [...prev.subjectIds, subjectId]
      }));
    } else {
      setNewTutor(prev => ({
        ...prev,
        subjectIds: prev.subjectIds.filter(id => id !== subjectId)
      }));
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Tutors
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                  Manage your platform's tutors and their comprehensive profiles.
                </p>
              </div>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Add Tutor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto rounded-xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Add New Tutor</DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-400">
                  Enter comprehensive tutor information including personal details, education, and subjects.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        value={newTutor.fullName}
                        onChange={(e) => setNewTutor({...newTutor, fullName: e.target.value})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sex" className="font-medium">Gender</Label>
                      <Select value={newTutor.sex} onValueChange={(value: 'male' | 'female' | 'other') => setNewTutor({...newTutor, sex: value})}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTutor.email}
                        onChange={(e) => setNewTutor({...newTutor, email: e.target.value})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="font-medium">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={newTutor.phoneNumber}
                        onChange={(e) => setNewTutor({...newTutor, phoneNumber: e.target.value})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressId" className="font-medium">Address</Label>
                      <Select value={newTutor.addressId.toString()} onValueChange={(value) => setNewTutor({...newTutor, addressId: parseInt(value)})}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {mockAddresses.map((address) => (
                            <SelectItem key={address.id} value={address.id.toString()}>
                              {address.area}, {address.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxNumber" className="font-medium">Max Students</Label>
                      <Input
                        id="maxNumber"
                        type="number"
                        min="1"
                        max="50"
                        value={newTutor.maxNumber}
                        onChange={(e) => setNewTutor({...newTutor, maxNumber: parseInt(e.target.value)})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Education</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="highestDegree" className="font-medium">Highest Degree</Label>
                      <Input
                        id="highestDegree"
                        value={newTutor.highestDegree}
                        onChange={(e) => setNewTutor({...newTutor, highestDegree: e.target.value})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                        placeholder="e.g., PhD in Mathematics"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduateYear" className="font-medium">Graduate Year</Label>
                      <Input
                        id="graduateYear"
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        value={newTutor.graduateYear}
                        onChange={(e) => setNewTutor({...newTutor, graduateYear: parseInt(e.target.value)})}
                        className="rounded-lg border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statusId" className="font-medium">Education Status</Label>
                    <Select value={newTutor.statusId.toString()} onValueChange={(value) => setNewTutor({...newTutor, statusId: parseInt(value)})}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {mockStatuses.map((status) => (
                          <SelectItem key={status.id} value={status.id.toString()}>
                            {status.statusName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Teaching Subjects</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockSubjects.filter(s => s.isActive).map((subject) => (
                      <div key={subject.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject.id}`}
                          checked={newTutor.subjectIds.includes(subject.id)}
                          onCheckedChange={(checked) => handleSubjectChange(subject.id, checked as boolean)}
                        />
                        <Label htmlFor={`subject-${subject.id}`} className="text-sm font-medium">
                          {subject.subjectName}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddTutor} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-lg">
                  Add Tutor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search tutors by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 rounded-xl border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[250px]">Tutor Profile</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Contact & Location</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[180px]">Education</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Teaching Subjects</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[150px]">Availability</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Performance</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTutors.map((tutor) => (
                  <TableRow key={tutor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                          <AvatarImage src={tutor.profileImage} alt={tutor.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                            {tutor.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{tutor.fullName}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            ID: {tutor.id} • {tutor.sex}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Users className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-500">Max {tutor.maxNumber} students</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-slate-700 dark:text-slate-300">{tutor.email}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{tutor.phoneNumber}</div>
                        {tutor.address && (
                          <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                            <MapPin className="h-3 w-3" />
                            <span>{tutor.address.area}, {tutor.address.location}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {tutor.education && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {tutor.education.highestDegree}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Graduated: {tutor.education.graduateYear}
                          </div>
                          <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {tutor.education.status?.statusName}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects?.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border-0">
                            {subject.subjectName}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {tutor.availability?.slice(0, 2).map((slot, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs text-slate-600 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span>{slot.dayOfWeek}: {slot.startTime}-{slot.endTime}</span>
                          </div>
                        ))}
                        {tutor.availability && tutor.availability.length > 2 && (
                          <div className="text-xs text-slate-500">+{tutor.availability.length - 2} more</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-slate-700 dark:text-slate-300">{tutor.rating}</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          ${tutor.hourlyRate}/hr
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={tutor.status === 'active' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-sm' 
                          : 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-sm'
                        }
                      >
                        {tutor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTutor(tutor.id)}
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