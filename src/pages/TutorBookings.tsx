import React, { useState } from 'react';
import { Calendar, Clock, User, BookOpen, Filter, Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTutorBookings } from '@/hooks/useTutorData';

export function TutorBookings() {
  const { bookings, loading, updateBookingStatus } = useTutorBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingBooking, setUpdatingBooking] = useState<number | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.parent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (bookingId: number, newStatus: string) => {
    try {
      setUpdatingBooking(bookingId);
      await updateBookingStatus(bookingId, newStatus);
    } catch (error) {
      console.error('Failed to update booking status:', error);
    } finally {
      setUpdatingBooking(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0';
      case 'cancelled':
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0';
    }
  };

  const getStatusActions = (booking: any) => {
    switch (booking.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleStatusUpdate(booking.id, 'accepted')}
              disabled={updatingBooking === booking.id}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusUpdate(booking.id, 'rejected')}
              disabled={updatingBooking === booking.id}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Reject
            </Button>
          </div>
        );
      case 'accepted':
        return (
          <Button
            size="sm"
            onClick={() => handleStatusUpdate(booking.id, 'completed')}
            disabled={updatingBooking === booking.id}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Mark Complete
          </Button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            My Bookings
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Manage your tutoring sessions and student bookings.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by student name or subject..."
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

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                        <AvatarImage src={booking.parent.profileImage} alt={booking.parent.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                          {booking.parent.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{booking.parent.fullName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                          <BookOpen className="h-4 w-4" />
                          <span>{booking.subject.subjectName}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                            <Clock className="h-4 w-4" />
                            <span>{booking.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">${booking.amount}</div>
                        <Badge className={getStatusColor(booking.status)}>
                          {updatingBooking === booking.id ? (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          ) : null}
                          {booking.status}
                        </Badge>
                      </div>
                      
                      {getStatusActions(booking)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No bookings found</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'New booking requests will appear here'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}