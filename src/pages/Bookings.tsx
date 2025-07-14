import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Calendar, Clock, Plus } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { mockBookings, mockTutors, mockParents, mockSubjects } from '@/data/mockData';
import { Booking, BookingFormData } from '@/types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'accepted':
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-sm';
    case 'pending':
      return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-sm';
    case 'rejected':
      return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-sm';
    case 'completed':
      return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-sm';
    case 'cancelled':
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-sm';
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-sm';
  }
};

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBooking, setNewBooking] = useState<BookingFormData>({
    parentId: 0,
    tutorId: 0,
    subjectId: 0,
    date: '',
    timeSlot: '',
    status: 'pending'
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.parent?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutor?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.subject?.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus as Booking['status'], updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  const handleAddBooking = () => {
    const selectedParent = mockParents.find(p => p.id === newBooking.parentId);
    const selectedTutor = mockTutors.find(t => t.id === newBooking.tutorId);
    const selectedSubject = mockSubjects.find(s => s.id === newBooking.subjectId);

    const booking: Booking = {
      id: bookings.length + 1,
      ...newBooking,
      parent: selectedParent,
      tutor: selectedTutor,
      subject: selectedSubject,
      amount: selectedTutor?.hourlyRate || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setBookings([...bookings, booking]);
    setNewBooking({
      parentId: 0,
      tutorId: 0,
      subjectId: 0,
      date: '',
      timeSlot: '',
      status: 'pending'
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Bookings
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                  Manage all tutoring session bookings and their comprehensive details.
                </p>
              </div>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Add Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Create New Booking</DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-400">
                  Schedule a new tutoring session between a parent and tutor.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentId" className="font-medium">Parent</Label>
                    <Select value={newBooking.parentId.toString()} onValueChange={(value) => setNewBooking({...newBooking, parentId: parseInt(value)})}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {mockParents.map((parent) => (
                          <SelectItem key={parent.id} value={parent.id.toString()}>
                            {parent.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tutorId" className="font-medium">Tutor</Label>
                    <Select value={newBooking.tutorId.toString()} onValueChange={(value) => setNewBooking({...newBooking, tutorId: parseInt(value)})}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select tutor" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {mockTutors.filter(t => t.status === 'active').map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id.toString()}>
                            {tutor.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjectId" className="font-medium">Subject</Label>
                  <Select value={newBooking.subjectId.toString()} onValueChange={(value) => setNewBooking({...newBooking, subjectId: parseInt(value)})}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {mockSubjects.filter(s => s.isActive).map((subject) => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newBooking.date}
                      onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                      className="rounded-lg border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot" className="font-medium">Time Slot</Label>
                    <Input
                      id="timeSlot"
                      value={newBooking.timeSlot}
                      onChange={(e) => setNewBooking({...newBooking, timeSlot: e.target.value})}
                      className="rounded-lg border-slate-200 dark:border-slate-700"
                      placeholder="e.g., 14:00-15:00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-medium">Status</Label>
                  <Select value={newBooking.status} onValueChange={(value: 'pending' | 'accepted' | 'rejected' | 'completed') => setNewBooking({...newBooking, status: value})}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddBooking} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-lg">
                  Create Booking
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
              placeholder="Search bookings by parent, tutor, or subject..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Parent</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">Tutor</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Subject</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[160px]">Schedule</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 min-w-[140px]">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Created</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 min-w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700">
                          <AvatarImage src={booking.parent?.profileImage} alt={booking.parent?.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-semibold">
                            {booking.parent?.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {booking.parent?.fullName}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            ID: {booking.parentId}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700">
                          <AvatarImage src={booking.tutor?.profileImage} alt={booking.tutor?.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-sm font-semibold">
                            {booking.tutor?.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {booking.tutor?.fullName}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            ${booking.tutor?.hourlyRate}/hr
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {booking.subject?.subjectName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        ${booking.amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className="w-32 border-0 bg-transparent p-0 h-auto">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBooking(booking.id)}
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