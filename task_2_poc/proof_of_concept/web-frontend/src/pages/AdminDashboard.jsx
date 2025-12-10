// import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const AdminDashboard = () => {
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching your wireframe style */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">System Administration</h1>
          <div>
            <span className="text-sm text-gray-500 mr-4">User: admin@abclimited.com</span>
            <button onClick={handleLogout} className="text-sm text-primary-600 hover:underline">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
            <p className="text-gray-600 mb-8">Welcome to the CMS administration panel. From here you can manage tenants and system settings.</p>
            
            <Link 
              to="/admin/onboard-tenant" 
              className="inline-block bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700 transition"
            >
              Onboard New Tenant
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;