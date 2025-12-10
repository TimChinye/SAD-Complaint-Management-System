import React from 'react';
import authService from '../services/authService';

const ManagerDashboard = () => {
  const currentUser = authService.getCurrentUser();
  const userEmail = currentUser ? JSON.parse(atob(currentUser.token.split('.')[1])).email : 'manager@tenant.com';

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">NatWest Tenant Dashboard</h1>
          <div>
            <span className="text-sm text-gray-500 mr-4">User: {userEmail}</span>
            <button onClick={handleLogout} className="text-sm text-primary-600 hover:underline">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <a href="#" className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Dashboard</a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">All Complaints</a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Team Management</a>
            </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-8">
            {/* Performance Overview Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">Average Time to Resolution</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">8.2 hours</p>
                        <p className="text-sm text-green-600">+5% vs last period</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm font-medium text-gray-500">Open vs Closed (Last 30 Days)</p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">2,104 / 1,895</p>
                        <p className="text-sm text-gray-500">90% resolution rate</p>
                    </div>
                </div>
            </div>

            {/* Agent Leaderboard */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Agent Performance Leaderboard</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Resolution Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alice Smith</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6.8 hours</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bob Johnson</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">41</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7.5 hours</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Charlie Brown</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">29</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8.1 hours</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;