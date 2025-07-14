// Updated types based on OpenAPI specification
export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface User {
  id: number;
  username: string;
  role: 'tutor' | 'parent' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  country: string;
  district: string;
  location: string;
  area: string;
}

export interface Subject {
  id: number;
  subjectName: string;
  isActive: boolean;
  createdAt: string;
}

export interface Status {
  id: number;
  statusName: string;
  description?: string;
}

export interface Education {
  id: number;
  tutorId: number;
  highestDegree: string;
  graduateYear: number;
  statusId: number;
  status?: Status;
}

export interface Tutor {
  id: number;
  fullName: string;
  sex: 'male' | 'female' | 'other';
  phoneNumber: string;
  email: string;
  addressId: number;
  maxNumber: number;
  profileImage?: string;
  userId: number;
  address?: Address;
  user?: User;
  education?: Education;
  subjects?: Subject[];
  availability?: Availability[];
  rating?: number;
  hourlyRate?: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Parent {
  id: number;
  fullName: string;
  phoneNumber: string;
  addressId: number;
  sex: 'male' | 'female' | 'other';
  profileImage?: string;
  userId: number;
  address?: Address;
  user?: User;
  children?: number;
  createdAt: string;
}

export interface Availability {
  id: number;
  tutorId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: number;
  parentId: number;
  tutorId: number;
  subjectId: number;
  date: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  amount?: number;
  parent?: Parent;
  tutor?: Tutor;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

export interface TutorSubject {
  id: number;
  tutorId: number;
  subjectId: number;
  tutor?: Tutor;
  subject?: Subject;
}

export interface DashboardStats {
  totalTutors: number;
  totalParents: number;
  totalBookings: number;
  totalSubjects: number;
  monthlyBookings: { month: string; count: number }[];
  recentBookings: Booking[];
}

// Form types
export interface TutorFormData {
  fullName: string;
  sex: 'male' | 'female' | 'other';
  phoneNumber: string;
  email: string;
  addressId: number;
  maxNumber: number;
  profileImage?: string;
  userId: number;
  // Education details
  highestDegree: string;
  graduateYear: number;
  statusId: number;
  // Subject assignments
  subjectIds: number[];
  // Availability
  availability: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface ParentFormData {
  fullName: string;
  phoneNumber: string;
  addressId: number;
  sex: 'male' | 'female' | 'other';
  profileImage?: string;
  userId: number;
}

export interface BookingFormData {
  parentId: number;
  tutorId: number;
  subjectId: number;
  date: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
}

export interface AddressFormData {
  country: string;
  district: string;
  location: string;
  area: string;
}

export interface SubjectFormData {
  subjectName: string;
}