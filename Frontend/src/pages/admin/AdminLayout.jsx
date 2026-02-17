import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { adminMenuItems } from '../../constants/menuItems';

const AdminLayout = () => {
    return (
        <DashboardLayout menuItems={adminMenuItems}>
            <Outlet />
        </DashboardLayout>
    );
};

export default AdminLayout;
