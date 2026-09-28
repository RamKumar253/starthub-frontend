import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

export default function FreelancerLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="freelancer" userName="Arjun Sharma" />
      <div className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
