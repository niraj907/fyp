import { LayoutDashboard, FileText, MessageSquare, Users, Settings, BarChart3 } from 'lucide-react';

// Admin sidebar menu
export const adminMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Overview', icon: BarChart3, path: '/admin/overview' },
    { label: 'Chat', icon: MessageSquare, path: '/admin/chat' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

// User sidebar menu
export const userMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/user' },
    { label: 'Overview', icon: FileText, path: '/user/overview' },
    { label: 'Chat', icon: MessageSquare, path: '/user/chat' },
    { label: 'Settings', icon: Settings, path: '/user/settings' },
];
