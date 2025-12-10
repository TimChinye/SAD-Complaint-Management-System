import authService from './authService';

const API_URL = 'http://localhost:8002/api/users/';

const getAuthHeader = () => {
  const user = authService.getCurrentUser();
  if (user && user.token) {
    return { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    };
  } else {
    return { 'Content-Type': 'application/json' };
  }
};

const onboardTenant = async (companyName, managerName, managerEmail) => {
  const response = await fetch(API_URL + 'tenants', {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ companyName, managerName, managerEmail }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred during onboarding.' }));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const userService = {
  onboardTenant,
};

export default userService;