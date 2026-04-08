import { LayoutDashboard, MessageSquare, Users, Settings, BarChart3, Tags, ReceiptText, Wallet } from './icons';

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
    { label: 'Categories', icon: Tags, path: '/user/categories' },
    { label: 'Transactions', icon: ReceiptText, path: '/user/transactions' },
    { label: 'Budget', icon: Wallet, path: '/user/budgets' },
    { label: 'Receipts', icon: ReceiptText, path: '/user/receipts' },
    { label: 'Analytics', icon: BarChart3, path: '/user/analytics' },
];
