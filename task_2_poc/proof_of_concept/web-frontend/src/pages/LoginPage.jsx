import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// In a real app, this would come from an API call, but we'll mock it for the PoC.
const SSO_CONFIG = {
  // 'natwest.com': 'microsoft',
  'hsbc.com': 'google microsoft',
  // 'abclimited.com' is NOT in this list, so it will use password auth.
  // consumer emails like 'gmail.com' are also not in this list.
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [ssoProviders, setSsoProviders] = useState([]); // Changed to an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.token) {
      const role = authService.getUserRole();
      if (role === 'system_admin') {
        navigate('/admin/dashboard');
      } else if (role === 'manager') {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    const domain = email.split('@')[1];
    
    if (domain && SSO_CONFIG[domain]) {
      const providers = SSO_CONFIG[domain].split(' ');
      setSsoProviders(providers);
    } else {
      setSsoProviders([]);
    }
    
    setStep(2);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authService.login(email, password);
      if (data && data.token) {
        localStorage.setItem('user', JSON.stringify(data));
        const role = authService.getUserRole();
        
        if (role === 'system_admin') navigate('/admin/dashboard');
        else if (role === 'manager') navigate('/dashboard');
        else navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSsoRedirect = (provider) => {
    setError(`SSO with ${provider} is not implemented in this PoC.`);
    console.log(`Redirecting to backend for ${provider} SSO...`);
  };

  const resetStep = () => {
    setStep(1);
    setPassword('');
    setError('');
    setSsoProviders([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign in to CMS
        </h1>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" placeholder="you@company.com" autoFocus />
            </div>
            <button type="submit" className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700">Continue</button>
          </form>
        )}

        {/* Step 2: Password or SSO */}
        {step === 2 && (
          <div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600">{email}</span>
              <button onClick={resetStep} className="ml-auto text-sm text-primary-600 hover:underline">Change</button>
            </div>
            
            {ssoProviders.length > 0 ? (
              // SSO Flow - Now dynamically renders buttons
              <div className="space-y-3">
                <p className="text-sm text-center text-gray-600 mb-2">Continue with your company's provider:</p>
                {ssoProviders.map((provider) => (
                  <button 
                    key={provider}
                    onClick={() => handleSsoRedirect(provider)} 
                    className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 capitalize"
                  >
                    Continue with {provider}
                </button>
                ))}
              </div>
            ) : (
              // Password Flow
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" placeholder="••••••••" autoFocus />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700 disabled:bg-primary-500/50">
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            )}

            {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;