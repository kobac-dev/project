import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Star, Calendar, Edit, Save, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTutorProfile } from '@/hooks/useTutorData';

export function TutorProfile() {
  const { profile, loading, updateProfile } = useTutorProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    phoneNumber: '',
    hourlyRate: 0,
    maxNumber: 0
  });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (profile) {
      setEditData({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
        hourlyRate: profile.hourlyRate || 0,
        maxNumber: profile.maxNumber || 0
      });
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditData({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
        hourlyRate: profile.hourlyRate || 0,
        maxNumber: profile.maxNumber || 0
      });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Profile not found</h3>
          <p className="text-slate-500 dark:text-slate-400">Unable to load profile data</p>
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
            My Profile
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Manage your tutor profile and information.
          </p>
        </div>

        {/* Profile Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto ring-4 ring-slate-200 dark:ring-slate-700">
                <AvatarImage src={profile.profileImage} alt={profile.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-2xl font-bold">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.fullName}</h3>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{profile.rating?.toFixed(1) || '4.8'}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">(reviews)</span>
                </div>
                <Badge className={`${profile.status === 'ACTIVE' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-gray-500 to-slate-500'} text-white border-0`}>
                  {profile.status === 'ACTIVE' ? 'Active Tutor' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg"
                    >
                      {saving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{profile.phoneNumber}</span>
                </div>
                {profile.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {profile.address.area}, {profile.address.location}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Tutor since 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                  <User className="h-6 w-6 text-emerald-600" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={editData.fullName}
                        onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={editData.phoneNumber}
                        onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={editData.hourlyRate}
                        onChange={(e) => setEditData({...editData, hourlyRate: parseFloat(e.target.value)})}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxNumber">Max Students</Label>
                      <Input
                        id="maxNumber"
                        type="number"
                        value={editData.maxNumber}
                        onChange={(e) => setEditData({...editData, maxNumber: parseInt(e.target.value)})}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">Hourly Rate</h4>
                      <p className="text-2xl font-bold text-emerald-600">${profile.hourlyRate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">Max Students</h4>
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{profile.maxNumber}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education & Experience */}
            {profile.education && (
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                    <GraduationCap className="h-6 w-6 text-emerald-600" />
                    <span>Education & Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{profile.education.highestDegree}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Graduated {profile.education.graduateYear}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Status</h4>
                    <Badge variant="outline" className="mt-1">
                      {profile.education.status.statusName}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Teaching Subjects & Availability */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                  <span>Teaching Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Teaching Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.subjects?.map((subject, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                        {subject.subjectName}
                      </Badge>
                    )) || (
                      <p className="text-slate-500 dark:text-slate-400">No subjects assigned</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Availability</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profile.availability?.map((slot, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{slot.dayOfWeek}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{slot.startTime} - {slot.endTime}</div>
                      </div>
                    )) || (
                      <p className="text-slate-500 dark:text-slate-400">No availability set</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}