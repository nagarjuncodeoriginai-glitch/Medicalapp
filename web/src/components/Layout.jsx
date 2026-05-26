import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, 
  FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiSearch
} from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';

const navItems = [
  { path: '/', icon: FiHome, label: 'Dashboard' },
  { path: '/patients', icon: FiUsers, label: 'Patients' },
  { path: '/appointments', icon: FiCalendar, label: 'Appointments' },
  { path: '/prescriptions', icon: FiFileText, label: 'Medications' },
  { path: '/billing', icon: FiDollarSign, label: 'Billing' },
  { path: '/settings', icon: FiSettings, label: 'Settings' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col glass-sidebar transition-all duration-300
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
            <FaHeartbeat className="text-white text-lg" />
          </div>
          {sidebarOpen && (
            <div className="animate-slide-in">
              <h1 className="text-base font-bold text-white">DocClinic</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Pro • Elder Care</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="text-lg flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {(user.name || 'D').charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0 animate-slide-in">
                <p className="text-sm font-semibold text-white truncate">Dr. {user.name || 'Doctor'}</p>
                <p className="text-[11px] text-white/40 truncate capitalize">{user.specialty || 'General'}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 mt-2 w-full rounded-xl text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300 text-sm font-medium"
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white/70 transition-colors">
              <FiMenu className="text-xl" />
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-2 rounded-xl hover:bg-white/10 text-white/60 transition-colors">
              {sidebarOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl w-72 focus:w-80 focus:bg-white/10 focus:border-violet-500/30 outline-none text-sm text-white placeholder-white/30 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <FiBell className="text-lg text-white/60" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#1a1744]"></span>
            </button>
            <div className="hidden sm:block pl-3 border-l border-white/10">
              <p className="text-sm font-semibold text-white">{user.clinicName || 'My Clinic'}</p>
              <p className="text-[11px] text-emerald-400 font-medium">
                {user.plan === 'pro' ? 'Pro Plan' : '30-Day Free Trial'}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
