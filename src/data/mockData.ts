import { Tutor, Parent, Booking, Subject, DashboardStats, Address, Status, User } from '@/types';

// Mock addresses
export const mockAddresses: Address[] = [
  {
    id: 1,
    country: 'United States',
    district: 'Manhattan',
    location: 'Upper East Side',
    area: 'Central Park Area'
  },
  {
    id: 2,
    country: 'United States',
    district: 'Brooklyn',
    location: 'Park Slope',
    area: 'Prospect Park'
  },
  {
    id: 3,
    country: 'United States',
    district: 'Queens',
    location: 'Astoria',
    area: 'Ditmars'
  }
];

// Mock statuses
export const mockStatuses: Status[] = [
  { id: 1, statusName: 'Active', description: 'Currently active' },
  { id: 2, statusName: 'Graduated', description: 'Successfully graduated' },
  { id: 3, statusName: 'In Progress', description: 'Currently studying' },
  { id: 4, statusName: 'Suspended', description: 'Temporarily suspended' }
];

// Mock users
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'sarah.johnson',
    role: 'tutor',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    username: 'michael.chen',
    role: 'tutor',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    username: 'emily.rodriguez',
    role: 'tutor',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 4,
    username: 'david.kim',
    role: 'tutor',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 5,
    username: 'jennifer.williams',
    role: 'parent',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 6,
    username: 'robert.davis',
    role: 'parent',
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z'
  }
];

export const mockSubjects: Subject[] = [
  {
    id: 1,
    subjectName: 'Mathematics',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    subjectName: 'Physics',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    subjectName: 'Chemistry',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    subjectName: 'Biology',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    subjectName: 'English Literature',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    subjectName: 'Computer Science',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    subjectName: 'History',
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockTutors: Tutor[] = [
  {
    id: 1,
    fullName: 'Sarah Johnson',
    sex: 'female',
    phoneNumber: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    addressId: 1,
    maxNumber: 10,
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 1,
    address: mockAddresses[0],
    user: mockUsers[0],
    education: {
      id: 1,
      tutorId: 1,
      highestDegree: 'PhD in Mathematics',
      graduateYear: 2018,
      statusId: 2,
      status: mockStatuses[1]
    },
    subjects: [mockSubjects[0], mockSubjects[1]], // Mathematics, Physics
    availability: [
      { id: 1, tutorId: 1, dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00' },
      { id: 2, tutorId: 1, dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { id: 3, tutorId: 1, dayOfWeek: 'Friday', startTime: '09:00', endTime: '17:00' }
    ],
    rating: 4.8,
    hourlyRate: 45,
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    fullName: 'Michael Chen',
    sex: 'male',
    phoneNumber: '+1 (555) 234-5678',
    email: 'michael.chen@email.com',
    addressId: 2,
    maxNumber: 8,
    profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 2,
    address: mockAddresses[1],
    user: mockUsers[1],
    education: {
      id: 2,
      tutorId: 2,
      highestDegree: 'Master of Science in Chemistry',
      graduateYear: 2020,
      statusId: 2,
      status: mockStatuses[1]
    },
    subjects: [mockSubjects[2], mockSubjects[3]], // Chemistry, Biology
    availability: [
      { id: 4, tutorId: 2, dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00' },
      { id: 5, tutorId: 2, dayOfWeek: 'Thursday', startTime: '10:00', endTime: '18:00' },
      { id: 6, tutorId: 2, dayOfWeek: 'Saturday', startTime: '09:00', endTime: '15:00' }
    ],
    rating: 4.9,
    hourlyRate: 50,
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    fullName: 'Emily Rodriguez',
    sex: 'female',
    phoneNumber: '+1 (555) 345-6789',
    email: 'emily.rodriguez@email.com',
    addressId: 3,
    maxNumber: 12,
    profileImage: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 3,
    address: mockAddresses[2],
    user: mockUsers[2],
    education: {
      id: 3,
      tutorId: 3,
      highestDegree: 'Master of Arts in English Literature',
      graduateYear: 2019,
      statusId: 2,
      status: mockStatuses[1]
    },
    subjects: [mockSubjects[4]], // English Literature
    availability: [
      { id: 7, tutorId: 3, dayOfWeek: 'Monday', startTime: '14:00', endTime: '20:00' },
      { id: 8, tutorId: 3, dayOfWeek: 'Wednesday', startTime: '14:00', endTime: '20:00' },
      { id: 9, tutorId: 3, dayOfWeek: 'Friday', startTime: '14:00', endTime: '20:00' }
    ],
    rating: 4.7,
    hourlyRate: 40,
    status: 'active',
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 4,
    fullName: 'David Kim',
    sex: 'male',
    phoneNumber: '+1 (555) 456-7890',
    email: 'david.kim@email.com',
    addressId: 1,
    maxNumber: 6,
    profileImage: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 4,
    address: mockAddresses[0],
    user: mockUsers[3],
    education: {
      id: 4,
      tutorId: 4,
      highestDegree: 'Bachelor of Science in Computer Science',
      graduateYear: 2021,
      statusId: 2,
      status: mockStatuses[1]
    },
    subjects: [mockSubjects[5], mockSubjects[0]], // Computer Science, Mathematics
    availability: [
      { id: 10, tutorId: 4, dayOfWeek: 'Tuesday', startTime: '16:00', endTime: '21:00' },
      { id: 11, tutorId: 4, dayOfWeek: 'Thursday', startTime: '16:00', endTime: '21:00' },
      { id: 12, tutorId: 4, dayOfWeek: 'Sunday', startTime: '10:00', endTime: '16:00' }
    ],
    rating: 4.6,
    hourlyRate: 55,
    status: 'inactive',
    createdAt: '2024-01-05T00:00:00Z'
  }
];

export const mockParents: Parent[] = [
  {
    id: 1,
    fullName: 'Jennifer Williams',
    phoneNumber: '+1 (555) 987-6543',
    addressId: 1,
    sex: 'female',
    profileImage: 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 5,
    address: mockAddresses[0],
    user: mockUsers[4],
    children: 2,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 2,
    fullName: 'Robert Davis',
    phoneNumber: '+1 (555) 876-5432',
    addressId: 2,
    sex: 'male',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 6,
    address: mockAddresses[1],
    user: mockUsers[5],
    children: 1,
    createdAt: '2024-02-05T00:00:00Z'
  },
  {
    id: 3,
    fullName: 'Lisa Thompson',
    phoneNumber: '+1 (555) 765-4321',
    addressId: 3,
    sex: 'female',
    profileImage: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    userId: 7,
    address: mockAddresses[2],
    user: { id: 7, username: 'lisa.thompson', role: 'parent', createdAt: '2024-02-10T00:00:00Z', updatedAt: '2024-02-10T00:00:00Z' },
    children: 3,
    createdAt: '2024-02-10T00:00:00Z'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    parentId: 1,
    tutorId: 1,
    subjectId: 1,
    date: '2024-12-20',
    timeSlot: '14:00-15:00',
    status: 'accepted',
    amount: 45,
    parent: mockParents[0],
    tutor: mockTutors[0],
    subject: mockSubjects[0],
    createdAt: '2024-12-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  },
  {
    id: 2,
    parentId: 2,
    tutorId: 2,
    subjectId: 3,
    date: '2024-12-21',
    timeSlot: '16:00-17:30',
    status: 'pending',
    amount: 75,
    parent: mockParents[1],
    tutor: mockTutors[1],
    subject: mockSubjects[2],
    createdAt: '2024-12-16T00:00:00Z',
    updatedAt: '2024-12-16T00:00:00Z'
  },
  {
    id: 3,
    parentId: 3,
    tutorId: 3,
    subjectId: 5,
    date: '2024-12-22',
    timeSlot: '10:00-11:00',
    status: 'completed',
    amount: 40,
    parent: mockParents[2],
    tutor: mockTutors[2],
    subject: mockSubjects[4],
    createdAt: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-22T11:00:00Z'
  },
  {
    id: 4,
    parentId: 1,
    tutorId: 4,
    subjectId: 6,
    date: '2024-12-23',
    timeSlot: '15:00-17:00',
    status: 'rejected',
    amount: 110,
    parent: mockParents[0],
    tutor: mockTutors[3],
    subject: mockSubjects[5],
    createdAt: '2024-12-17T00:00:00Z',
    updatedAt: '2024-12-17T00:00:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalTutors: mockTutors.length,
  totalParents: mockParents.length,
  totalBookings: mockBookings.length,
  totalSubjects: mockSubjects.filter(s => s.isActive).length,
  monthlyBookings: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 19 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 22 },
    { month: 'May', count: 18 },
    { month: 'Jun', count: 25 },
    { month: 'Jul', count: 28 },
    { month: 'Aug', count: 32 },
    { month: 'Sep', count: 29 },
    { month: 'Oct', count: 35 },
    { month: 'Nov', count: 31 },
    { month: 'Dec', count: 38 }
  ],
  recentBookings: mockBookings
};