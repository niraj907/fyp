import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { userMenuItems } from '../../constants/menuItems';

const UserLayout = () => {
    return (
        <DashboardLayout menuItems={userMenuItems}>
            <Outlet />
        </DashboardLayout>
    );
};

export default UserLayout;
