import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Import the components
import App from './App.jsx';

import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import OnboardTenantPage from './pages/OnboardTenantPage.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Define the application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />, // Add a top-level error boundary
    children: [
      // Public Routes
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },

      // --- Admin Protected Routes ---
      {
        element: <ProtectedRoute requiredRole="system_admin" />,
        children: [
          {
            path: 'admin/dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'admin/onboard-tenant',
            element: <OnboardTenantPage />,
          },
        ],
      },

      // --- Manager Protected Routes ---
      {
        element: <ProtectedRoute requiredRole="manager" />,
        children: [
          {
            path: 'dashboard',
            element: <ManagerDashboard />,
          },
        ],
      },

      // Catch-all 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);