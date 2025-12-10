import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const OnboardTenantPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleOnboard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await userService.onboardTenant(companyName, managerName, managerEmail);
      setSuccess(`Successfully onboarded ${companyName}! Redirecting...`);
      // Reset form
      setCompanyName('');
      setManagerName('');
      setManagerEmail('');
      // Redirect back to dashboard after a short delay
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Re-using the same header style */}
      <header className="bg-white shadow-sm">
         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <Link to="/admin/dashboard" className="text-sm text-primary-600 hover:underline">&larr; Back to Dashboard</Link>
         </div>
      </header>

      <main className="max-w-2xl mx-auto py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Onboard New Tenant</h1>
            <form onSubmit={handleOnboard} className="space-y-6">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Initial Manager Account</h2>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="managerName" className="block text-sm font-medium text-gray-700">Manager's Full Name</label>
                            <input type="text" id="managerName" value={managerName} onChange={e => setManagerName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
                        </div>
                        <div>
                            <label htmlFor="managerEmail" className="block text-sm font-medium text-gray-700">Manager's Email</label>
                            <input type="email" id="managerEmail" value={managerEmail} onChange={e => setManagerEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
                        </div>
                    </div>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}

                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-500/50">
                    {loading ? 'Onboarding...' : 'Create Tenant'}
                </button>
            </form>
        </div>
      </main>
    </div>
  );
};

export default OnboardTenantPage;