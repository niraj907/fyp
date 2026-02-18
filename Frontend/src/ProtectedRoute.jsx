import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, token } = useAuthStore();

    // Not logged in → go to login
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    // Role check (if allowedRoles is provided)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;