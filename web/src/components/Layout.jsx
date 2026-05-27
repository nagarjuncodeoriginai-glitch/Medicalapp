import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiSettings, FiLogOut, FiMenu, FiBell, FiZap, FiSearch } from 'react-icons/fi';

const navItems = [
  { path: '/', icon: FiHome, label: 'Dashboard' },
  { path: '/patients', icon: FiUsers, label: 'Patients' },
  { path: '/appointments', icon: FiCalendar, label: 'Appointments' },
  { path: '/prescriptions', icon: FiFileText, label: 'Medications' },
  { path: '/billing', icon: FiDollarSign, label: 'Billing' },
  { path: '/settings', icon: FiSettings, label: 'Settings' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {mobileOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[250px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
            <FiZap className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">CareAI Pro</h1>
            <p className="text-[10px] text-gray-400 font-medium">Elder Care Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
              onClick={() => setMobileOpen(false)}>
              <item.icon className="text-[15px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* AI Status */}
        <div className="px-4 pb-3">
          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <FiZap className="text-indigo-600 text-xs" />
              <span className="text-[11px] font-semibold text-indigo-700">AI Assistant</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-auto animate-pulse-soft" />
            </div>
            <p className="text-[10px] text-gray-500">3 insights ready</p>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pb-4 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-700 text-xs font-bold">B</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">Dr. Brijesh</p>
              <p className="text-[10px] text-gray-400">LifeCare Clinic</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs mt-1">
            <FiLogOut className="text-xs" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <FiMenu className="text-lg" />
            </button>
            <div className="hidden md:flex items-center gap-2.5">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="text" placeholder="Search patients..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-64 text-sm text-gray-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 transition-all" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 rounded-lg">
              <FiZap className="text-indigo-600 text-xs" />
              <span className="text-[11px] font-semibold text-indigo-700">AI Active</span>
            </div>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiBell className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-in max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
