import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiSettings, FiLogOut, FiMenu, FiBell, FiZap, FiSearch, FiActivity } from 'react-icons/fi';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: '#0d0b14', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="w-9 h-9 rounded-lg animate-gradient flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5, #6d28d9)', backgroundSize: '200% 200%' }}>
            <FiZap className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">CareAI Pro</h1>
            <p className="text-[9px] text-purple-400/50 font-semibold tracking-widest uppercase">Elder Care</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
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
        <div className="px-3 pb-3">
          <div className="ai-glow">
            <div className="relative z-10 flex items-center gap-2 mb-1.5">
              <FiActivity className="text-purple-400 text-xs" />
              <span className="text-[11px] font-semibold text-white/80">AI Engine</span>
              <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
            </div>
            <p className="relative z-10 text-[10px] text-gray-500 leading-relaxed">6 modules active · 3 alerts pending</p>
          </div>
        </div>

        {/* User */}
        <div className="px-3 pb-4 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(79,70,229,0.2))' }}>
              <span className="text-white text-[10px] font-bold">B</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Dr. Brijesh</p>
              <p className="text-[10px] text-gray-500 truncate">LifeCare Clinic</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-xs mt-1">
            <FiLogOut className="text-xs" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-5 py-3 flex items-center justify-between border-b border-white/[0.04]" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400">
              <FiMenu />
            </button>
            <div className="hidden md:flex relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input type="text" placeholder="Search patients, medications..." className="pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg w-72 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <FiZap className="text-purple-400 text-[10px]" />
              <span className="text-[10px] font-semibold text-purple-300">AI Active</span>
            </div>
            <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiBell className="text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <div className="animate-in max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
