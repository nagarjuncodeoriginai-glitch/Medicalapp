import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiDollarSign, FiSettings, FiLogOut, FiMenu, FiBell, FiZap, FiMessageCircle, FiSearch, FiChevronRight } from 'react-icons/fi';

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
    <div className="flex h-screen overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)' }} />
      </div>

      {mobileOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(10,10,30,0.98) 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center animate-gradient relative" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #6366f1)', backgroundSize: '200% 200%' }}>
            <FiZap className="text-white text-lg" />
            <div className="absolute inset-0 rounded-2xl animate-glow" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', filter: 'blur(12px)', opacity: 0.4 }} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">CareAI Pro</h1>
            <p className="text-[9px] text-indigo-300/60 font-semibold tracking-[0.2em] uppercase">AI Elder Care</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-white/[0.03] border border-white/[0.06] text-white/60 placeholder-white/20 outline-none focus:border-indigo-500/30 focus:bg-white/[0.05] transition-all" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] px-4 mb-2">Main Menu</p>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
              onClick={() => setMobileOpen(false)}>
              <item.icon className="text-[15px]" />
              <span className="flex-1">{item.label}</span>
              <FiChevronRight className="text-[10px] opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* AI Assistant Card */}
        <div className="px-4 pb-3">
          <div className="ai-glow rounded-2xl p-4">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/30 to-violet-500/30 flex items-center justify-center border border-indigo-500/20">
                  <FiMessageCircle className="text-indigo-400 text-xs" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-white/80">AI Assistant</p>
                </div>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft shadow-lg shadow-emerald-400/50" />
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">3 health insights detected. 1 drug interaction alert pending review.</p>
              <button className="mt-2.5 w-full py-2 rounded-xl text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
                Open AI Chat
              </button>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' }}>
              <span className="text-white text-xs font-bold">B</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a1e]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Dr. Brijesh</p>
              <p className="text-[10px] text-white/30 truncate">LifeCare Clinic</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 w-full rounded-xl text-white/30 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-xs mt-1">
            <FiLogOut className="text-xs" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-white/[0.04]" style={{ background: 'rgba(5,8,22,0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-white/60">
              <FiMenu className="text-lg" />
            </button>
            <div className="hidden lg:flex items-center gap-3">
              <span className="ai-badge"><FiZap className="text-[8px]" /> AI Active</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
                <span className="text-[11px] text-white/30">All 6 AI modules operational</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification */}
            <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
              <FiBell className="text-white/40 group-hover:text-white/70 transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping opacity-50" />
            </button>
            {/* AI Status */}
            <div className="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-white/5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <FiZap className="text-emerald-400 text-[10px]" />
              </div>
              <div>
                <p className="text-[11px] text-white/60 font-medium">AI Score: <span className="text-emerald-400 font-bold">98%</span></p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="animate-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
