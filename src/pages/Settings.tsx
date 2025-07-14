import React, { useState } from 'react';
import { Save, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    platformName: 'TeachHome',
    platformDescription: 'Connect students with qualified tutors for personalized learning experiences.',
    adminEmail: 'admin@teachhome.com',
    supportEmail: 'support@teachhome.com',
    defaultCurrency: 'USD',
    defaultTimeZone: 'America/New_York',
    emailNotifications: true,
    pushNotifications: false,
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    defaultSessionDuration: 60,
    commissionRate: 15,
    maxBookingAdvance: 30
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your platform settings have been updated successfully.",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-slate-500 shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                Settings
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                Manage your platform settings and preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="w-full max-w-none space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span>Platform Information</span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Basic information about your teaching platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="platformName" className="font-medium">Platform Name</Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) => handleInputChange('platformName', e.target.value)}
                  className="rounded-lg border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platformDescription" className="font-medium">Platform Description</Label>
                <Textarea
                  id="platformDescription"
                  value={settings.platformDescription}
                  onChange={(e) => handleInputChange('platformDescription', e.target.value)}
                  rows={3}
                  className="rounded-lg border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="adminEmail" className="font-medium">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supportEmail" className="font-medium">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <span>Regional Settings</span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Configure currency, timezone, and regional preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="currency" className="font-medium">Default Currency</Label>
                  <Select
                    value={settings.defaultCurrency}
                    onValueChange={(value) => handleInputChange('defaultCurrency', value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone" className="font-medium">Default Timezone</Label>
                  <Select
                    value={settings.defaultTimeZone}
                    onValueChange={(value) => handleInputChange('defaultTimeZone', value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Berlin">Berlin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-sm">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Configure how and when notifications are sent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Send email notifications for important events
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Send push notifications to users' devices
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 shadow-sm">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span>Security & Access</span>
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Manage platform security and user access settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Temporarily disable platform access for maintenance
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Allow New Registrations</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Allow new users to register on the platform
                  </p>
                </div>
                <Switch
                  checked={settings.allowRegistrations}
                  onCheckedChange={(checked) => handleInputChange('allowRegistrations', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Require Email Verification</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Require users to verify their email before accessing the platform
                  </p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleInputChange('requireEmailVerification', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Business Settings</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Configure business rules and default values.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="sessionDuration" className="font-medium">Default Session Duration (minutes)</Label>
                  <Input
                    id="sessionDuration"
                    type="number"
                    value={settings.defaultSessionDuration}
                    onChange={(e) => handleInputChange('defaultSessionDuration', parseInt(e.target.value))}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="commissionRate" className="font-medium">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) => handleInputChange('commissionRate', parseInt(e.target.value))}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxBookingAdvance" className="font-medium">Max Booking Advance (days)</Label>
                  <Input
                    id="maxBookingAdvance"
                    type="number"
                    value={settings.maxBookingAdvance}
                    onChange={(e) => handleInputChange('maxBookingAdvance', parseInt(e.target.value))}
                    className="rounded-lg border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-32 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}