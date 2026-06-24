import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import type { RootState } from '../store';
import { LogOut, User, Settings, LayoutDashboard, FileText, Calendar, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getSidebarLinks = () => {
    if (user?.role === 'STUDENT') {
      return [
        { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard /> },
        { name: 'Profile', path: '/student/profile', icon: <User /> },
        { name: 'Results', path: '/student/results', icon: <FileText /> },
        { name: 'Timetable', path: '/student/timetable', icon: <Calendar /> },
      ];
    }
    if (user?.role === 'FACULTY') {
      return [
        { name: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard /> },
        { name: 'Attendance', path: '/faculty/attendance', icon: <FileText /> },
        { name: 'Results Entry', path: '/faculty/results', icon: <FileText /> },
      ];
    }
    return [
      { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard /> },
      { name: 'Users', path: '/admin/users', icon: <User /> },
      { name: 'Settings', path: '/admin/settings', icon: <Settings /> },
    ];
  };

  const links = getSidebarLinks();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-sm shadow-blue-600/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">TKRCET Portal</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="w-5 h-5 text-slate-400 dark:text-slate-500">{link.icon}</div>
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
              {user?.email[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
