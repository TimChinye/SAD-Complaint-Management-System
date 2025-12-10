// import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

// This component checks if a user is logged in and has the required role.
// If not, it redirects them to the login page.
const ProtectedRoute = ({ requiredRole }) => {
  const currentUser = authService.getCurrentUser();
  const userRole = authService.getUserRole();

  // Check 1: Is there a logged-in user?
  if (!currentUser || !currentUser.token) {
    // If not, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Check 2: Does the route require a specific role, and does the user have it?
  if (requiredRole && userRole !== requiredRole) {
    // If the role doesn't match, redirect to a "forbidden" or home page.
    // For this PoC, redirecting to their own dashboard is a good UX.
    const dashboardPath = userRole === 'system_admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // If all checks pass, render the child component using the <Outlet>.
  return <Outlet />;
};

export default ProtectedRoute;