import React, { useState } from 'react';
import { Clock, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTutorProfile } from '@/hooks/useTutorData';

export function TutorAvailability() {
  const { profile, loading } = useTutorProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleAddSlot = () => {
    // In a real app, this would call an API to add the availability slot
    console.log('Adding new availability slot:', newSlot);
    setNewSlot({ dayOfWeek: '', startTime: '', endTime: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteSlot = (slotId: number) => {
    // In a real app, this would call an API to delete the availability slot
    console.log('Deleting availability slot:', slotId);
  };

  const getAvailabilityByDay = () => {
    const availabilityByDay: { [key: string]: any[] } = {};
    
    daysOfWeek.forEach(day => {
      availabilityByDay[day] = profile?.availability?.filter(slot => slot.dayOfWeek === day) || [];
    });
    
    return availabilityByDay;
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading availability...</span>
        </div>
      </div>
    );
  }

  const availabilityByDay = getAvailabilityByDay();

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              My Availability
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Manage your teaching schedule and available time slots.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Add Time Slot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Add Availability Slot</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Day of Week</Label>
                  <Select value={newSlot.dayOfWeek} onValueChange={(value) => setNewSlot({...newSlot, dayOfWeek: value})}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSlot} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                  Add Slot
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Availability Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {daysOfWeek.map((day) => (
            <Card key={day} className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg font-bold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>{day}</span>
                  </div>
                  <span className="text-sm font-normal text-slate-500">
                    {availabilityByDay[day].length} slot{availabilityByDay[day].length !== 1 ? 's' : ''}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availabilityByDay[day].length > 0 ? (
                  availabilityByDay[day].map((slot, index) => (
                    <div key={index} className="group relative">
                      <Badge 
                        variant="outline" 
                        className="w-full justify-between py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                      >
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-emerald-200 dark:hover:bg-emerald-800"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="h-6 w-6 p-0 hover:bg-red-200 dark:hover:bg-red-800 text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">No availability</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      onClick={() => {
                        setNewSlot({...newSlot, dayOfWeek: day});
                        setIsAddDialogOpen(true);
                      }}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add slot
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Availability Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {profile?.availability?.length || 0}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Slots</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {daysOfWeek.filter(day => availabilityByDay[day].length > 0).length}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Days</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {Math.round((profile?.availability?.length || 0) * 1.5)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Hours/Week</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  ${Math.round((profile?.availability?.length || 0) * 1.5 * (profile?.hourlyRate || 45))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Potential/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}