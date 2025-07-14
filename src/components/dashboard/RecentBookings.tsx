import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import { Booking } from '@/types';

interface RecentBookingsProps {
  bookings: Booking[];
}

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

export function RecentBookings({ bookings }: RecentBookingsProps) {
  const recentBookings = bookings.slice(0, 5);

  return (
    <Card className="col-span-3 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Recent Bookings
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Latest tutoring session requests
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Parent</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Tutor</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Subject</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Date</TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700">
                        <AvatarImage src={booking.parent?.profileImage} alt={booking.parent?.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-semibold">
                          {booking.parent?.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-slate-800 dark:text-slate-200">{booking.parent?.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700">
                        <AvatarImage src={booking.tutor?.profileImage} alt={booking.tutor?.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-semibold">
                          {booking.tutor?.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-slate-800 dark:text-slate-200">{booking.tutor?.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {booking.subject?.subjectName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4" />
                      <div className="text-sm">
                        <div>{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-500">{booking.timeSlot}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(booking.status)} font-medium`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">${booking.amount}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}