import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import AdminLayout from './pages/admin/AdminLayout';
import UserLayout from './pages/user/UserLayout';

// Admin Pages
import AdminDashboardHome from './pages/admin/DashboardHome';
import UsersList from './pages/admin/UsersList';

// User Pages
import UserDashboardHome from './pages/user/DashboardHome';

// Shared Components
import PlaceholderPage from './components/layout/PlaceholderPage';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} />
        <Route path="users" element={<UsersList />} />
        <Route path="overview" element={<PlaceholderPage title="Overview" />} />
        <Route path="chat" element={<PlaceholderPage title="Chat" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboardHome />} />
        <Route path="overview" element={<PlaceholderPage title="Overview" />} />
        <Route path="chat" element={<PlaceholderPage title="Chat" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App