import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing
import Landing from './pages/landing/Landing';
import SelectRole from './pages/landing/SelectRole';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminFreelancers from './pages/admin/AdminFreelancers';
import AdminServices from './pages/admin/AdminServices';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// Freelancer
import FreelancerRegister from './pages/freelancer/FreelancerRegister';
import FreelancerLogin from './pages/freelancer/FreelancerLogin';
import FreelancerLayout from './pages/freelancer/FreelancerLayout';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import FreelancerProfile from './pages/freelancer/FreelancerProfile';
import FreelancerServices from './pages/freelancer/FreelancerServices';
import CreateService from './pages/freelancer/CreateService';
import FreelancerBookings from './pages/freelancer/FreelancerBookings';

// Client
import ClientRegister from './pages/client/ClientRegister';
import ClientLogin from './pages/client/ClientLogin';
import ClientLayout from './pages/client/ClientLayout';
import ClientDashboard from './pages/client/ClientDashboard';
import BrowseFreelancers from './pages/client/BrowseFreelancers';
import BrowseServices from './pages/client/BrowseServices';
import ServiceDetails from './pages/client/ServiceDetails';
import Booking from './pages/client/Booking';
import ClientBookings from './pages/client/ClientBookings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/select-role" element={<SelectRole />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="freelancers" element={<AdminFreelancers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Freelancer Auth */}
        <Route path="/freelancer/register" element={<FreelancerRegister />} />
        <Route path="/freelancer/login" element={<FreelancerLogin />} />

        {/* Freelancer Dashboard */}
        <Route path="/freelancer" element={<FreelancerLayout />}>
          <Route index element={<Navigate to="/freelancer/dashboard" replace />} />
          <Route path="dashboard" element={<FreelancerDashboard />} />
          <Route path="profile" element={<FreelancerProfile />} />
          <Route path="services" element={<FreelancerServices />} />
          <Route path="services/create" element={<CreateService />} />
          <Route path="bookings" element={<FreelancerBookings />} />
        </Route>

        {/* Client Auth */}
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client/login" element={<ClientLogin />} />

        {/* Client Dashboard */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/dashboard" replace />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="freelancers" element={<BrowseFreelancers />} />
          <Route path="freelancers/:id" element={<BrowseFreelancers />} />
          <Route path="services" element={<BrowseServices />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="book/:serviceId" element={<Booking />} />
          <Route path="bookings" element={<ClientBookings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
