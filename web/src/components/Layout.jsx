import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiZap, FiMessageCircle } from 'react-icons/fi';

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
    <div className="flex h-screen bg-slate-50/50">
      {mobileOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-white border-r border-slate-100 flex flex-col transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-50">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-sm">
            <FiZap className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">CareAI Pro</h1>
            <p className="text-[10px] text-slate-400 font-medium">Elder Care · AI Powered</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
              onClick={() => setMobileOpen(false)}>
              <item.icon className="text-[15px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* AI Assistant */}
        <div className="px-3 pb-2">
          <div className="ai-glow rounded-xl p-3 border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <FiMessageCircle className="text-indigo-500 text-xs" />
              <span className="text-[11px] font-semibold text-indigo-700">AI Assistant</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft"></span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">3 AI insights ready for review</p>
          </div>
        </div>

        {/* User */}
        <div className="p-3 border-t border-slate-50">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-700 text-xs font-bold">B</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">Dr. Brijesh</p>
              <p className="text-[10px] text-slate-400">{user.clinicName || 'LifeCare Clinic'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors text-xs mt-1">
            <FiLogOut className="text-xs" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-5 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            <FiMenu className="text-lg text-slate-600" />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <span className="ai-badge"><FiZap className="text-[8px]" /> AI Active</span>
            <span className="text-xs text-slate-400">All systems operational</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <FiBell className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <div className="animate-in"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
