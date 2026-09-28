export const adminStats = {
  totalUsers: 1284,
  totalFreelancers: 342,
  totalClients: 942,
  totalServices: 876,
  totalBookings: 2341,
  activeBookings: 187,
  revenue: 1284500,
  monthlyGrowth: {
    users: 12.4,
    services: 18.2,
    bookings: 9.7,
    revenue: 15.6,
  },
};

export const adminUsers = [
  { id: 'u1', name: 'Rohit Kumar', email: 'rohit@student.com', role: 'client', status: 'active', joinedAt: '2026-08-10' },
  { id: 'u2', name: 'Meera Joshi', email: 'meera@student.com', role: 'client', status: 'active', joinedAt: '2026-09-01' },
  { id: 'u3', name: 'Arjun Sharma', email: 'arjun@starthub.com', role: 'freelancer', status: 'active', joinedAt: '2026-07-15' },
  { id: 'u4', name: 'Priya Nair', email: 'priya@starthub.com', role: 'freelancer', status: 'active', joinedAt: '2026-07-22' },
  { id: 'u5', name: 'Ananya Verma', email: 'ananya@student.com', role: 'client', status: 'inactive', joinedAt: '2026-09-10' },
  { id: 'u6', name: 'Deepak Rao', email: 'deepak@student.com', role: 'client', status: 'active', joinedAt: '2026-08-05' },
];

export const recentActivity = [
  { id: 'a1', type: 'new_user', message: 'Ananya Verma joined as a client', time: '5 minutes ago' },
  { id: 'a2', type: 'new_booking', message: 'New booking for React Frontend service', time: '12 minutes ago' },
  { id: 'a3', type: 'new_service', message: 'Karan Mehta added a new Logo Design service', time: '1 hour ago' },
  { id: 'a4', type: 'completed', message: 'Library Management project marked complete', time: '2 hours ago' },
  { id: 'a5', type: 'new_user', message: 'Ravi Patel joined as a freelancer', time: '3 hours ago' },
];
