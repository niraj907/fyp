import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { adminMenuItems } from '../../constants/menuItems';
import { useAuthStore } from '../../components/store/authStore';

const AdminDashboard = () => {
    const { user } = useAuthStore();

    return (
        <DashboardLayout menuItems={adminMenuItems}>
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
                <p className="text-gray-500 text-sm mb-6">Welcome back, {user?.name}!</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-gray-800">128</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Active Sessions</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Reports</p>
                        <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-gray-800 font-medium">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800 font-medium">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-0.5 rounded-full text-sm font-medium capitalize">{user?.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
