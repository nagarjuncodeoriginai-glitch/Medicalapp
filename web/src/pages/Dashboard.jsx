import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiHome, FiRepeat, FiShield, FiClock, FiZap, FiAlertTriangle, FiTrendingUp, FiActivity, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const queue = [
    { token: 1, name: 'Ramesh Gupta', age: 72, time: '10:00 AM', type: 'Routine Checkup', status: 'done', retainer: true },
    { token: 2, name: 'Savitri Devi', age: 68, time: '10:30 AM', type: 'Medication Review', status: 'done', retainer: true },
    { token: 3, name: 'Mohan Lal', age: 75, time: '11:00 AM', type: 'Home Visit', status: 'active', retainer: false },
    { token: 4, name: 'Kamla Bai', age: 80, time: '11:30 AM', type: 'Insurance Consultation', status: 'waiting', retainer: true },
    { token: 5, name: 'Suresh Patel', age: 65, time: '12:00 PM', type: 'Physiotherapy', status: 'waiting', retainer: false },
  ];

  const statusBadge = { done: 'badge-green', active: 'badge-blue', waiting: 'badge-slate' };
  const statusLabel = { done: 'Done', active: 'In Progress', waiting: 'Waiting' };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title text-3xl">{greeting}, Dr. Brijesh</h1>
          <p className="page-subtitle text-sm">AI has analysed 248 patients — <span className="text-indigo-400">3 alerts</span> need your attention</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary"><FiZap className="text-sm" /> AI Insights</button>
          <button className="btn-secondary"><FaWhatsapp className="text-green-400" /> Send Reminders</button>
        </div>
      </div>

      {/* AI Prediction Banner */}
      <div className="ai-glow rounded-3xl p-5 flex items-center gap-5">
        <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 animate-gradient" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899, #6366f1)', backgroundSize: '300% 300%' }}>
          <FiZap className="text-white text-xl" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="ai-badge">AI Prediction</span>
            <span className="text-[10px] text-white/30">Updated 2 min ago</span>
          </div>
          <p className="text-sm text-white/90 font-medium">Kamla Bai (80y) — <span className="text-rose-400">Elevated fall risk</span> detected this week</p>
          <p className="text-xs text-white/40 mt-0.5">Based on medication interaction + age + recent vital trends. Recommend priority home visit.</p>
        </div>
        <button className="relative z-10 btn-secondary text-xs py-2.5">Review <FiActivity className="text-xs" /></button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {[
          { icon: FiUsers, label: 'Total Patients', value: '248', trend: '+12 this month', color: '#6366f1', glow: 'rgba(99,102,241,0.15)' },
          { icon: FiCalendar, label: "Today's Appointments", value: '12', trend: '5 remaining', color: '#3b82f6', glow: 'rgba(59,130,246,0.15)' },
          { icon: FiDollarSign, label: 'Monthly Revenue', value: '₹2,85,000', trend: '+18% growth', color: '#10b981', glow: 'rgba(16,185,129,0.15)' },
          { icon: FiRepeat, label: 'Active Retainers', value: '34', trend: '₹1.7L recurring', color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)' },
        ].map((s, i) => (
          <div key={i} className="stat-card group animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500" style={{ background: s.glow, boxShadow: `0 8px 25px ${s.glow}` }}>
                <s.icon style={{ color: s.color }} className="text-lg" />
              </div>
              <span className="badge-green text-[9px]"><FiTrendingUp className="text-[8px]" /> {s.trend}</span>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/35 mt-1">{s.label}</p>
            {/* Mini sparkline visual */}
            <div className="flex items-end gap-0.5 mt-3 h-5">
              {[40,65,45,80,55,90,70,95,60,85].map((h,j) => (
                <div key={j} className="flex-1 rounded-full transition-all duration-500 group-hover:opacity-100 opacity-60" style={{ height: `${h}%`, background: `linear-gradient(to top, ${s.color}40, ${s.color})` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Modules */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { icon: FiCalendar, label: 'Appointments', sub: '12 today', color: '#6366f1' },
          { icon: FaPills, label: 'Medications', sub: '86 active', color: '#3b82f6' },
          { icon: FiShield, label: 'Insurance', sub: '₹4.2L claimed', color: '#10b981' },
          { icon: FiHome, label: 'Home Care', sub: '8 visits', color: '#f59e0b' },
          { icon: FiRepeat, label: 'Retainers', sub: '34 plans', color: '#8b5cf6' },
          { icon: FiZap, label: 'AI Alerts', sub: '3 critical', color: '#ef4444' },
        ].map((m, i) => (
          <button key={i} className="card text-center p-4 group hover:border-indigo-500/20">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" style={{ background: `${m.color}15`, boxShadow: `0 0 0 ${m.color}00` }}>
              <m.icon style={{ color: m.color }} className="text-lg" />
            </div>
            <p className="text-[11px] font-semibold text-white/70">{m.label}</p>
            <p className="text-[9px] text-white/30 mt-0.5">{m.sub}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue */}
        <div className="lg:col-span-2 card-flat">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title flex items-center gap-2"><FiClock className="text-indigo-400" /> Live Patient Queue</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" />
              <span className="text-[10px] text-white/30">Live</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {queue.map(apt => (
              <div key={apt.token} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-500 hover:translate-x-1 ${apt.status === 'active' ? 'border-blue-500/20 bg-blue-500/5 shadow-lg shadow-blue-500/5' : 'border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02]'}`}>
                <div className="flex items-center gap-4">
                  {/* Token with gradient */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${apt.status === 'done' ? 'bg-emerald-500/15 text-emerald-400' : apt.status === 'active' ? 'text-blue-400' : 'bg-white/5 text-white/40'}`} style={apt.status === 'active' ? { background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))', boxShadow: '0 4px 15px rgba(59,130,246,0.2)' } : {}}>
                    {apt.token}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white/90">{apt.name}</p>
                      <span className="text-[10px] text-white/25">({apt.age}y)</span>
                      {apt.retainer && <span className="badge-purple text-[8px]">Retainer</span>}
                    </div>
                    <p className="text-xs text-white/30 mt-0.5">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`badge ${statusBadge[apt.status]}`}>{statusLabel[apt.status]}</span>
                  {apt.status === 'waiting' && (
                    <button className="text-[10px] font-semibold text-white/80 bg-gradient-to-r from-indigo-600/80 to-violet-600/80 px-3 py-1.5 rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/20">
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          {/* AI Drug Alert */}
          <div className="card border-rose-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center"><FiAlertTriangle className="text-rose-400 text-sm" /></div>
              <h3 className="text-sm font-semibold text-white/90">AI Drug Interactions</h3>
              <span className="ml-auto badge-red text-[8px]">2 Critical</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                <p className="text-xs font-semibold text-rose-300">Kamla Bai — Warfarin + Aspirin</p>
                <p className="text-[10px] text-white/30 mt-0.5">High bleeding risk. Immediate review needed.</p>
                <div className="mt-2 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-rose-500 to-red-500 animate-pulse-soft" />
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs font-semibold text-amber-300">Mohan Lal — Digoxin + Furosemide</p>
                <p className="text-[10px] text-white/30 mt-0.5">Monitor potassium weekly.</p>
                <div className="mt-2 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Insurance with Progress Ring */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-4"><FiShield className="text-emerald-400" /> Insurance Claims</h3>
            <div className="flex items-center gap-5">
              {/* Visual Ring */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="72 100" strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                  <defs><linearGradient id="gradient"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">72%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1">
                <div className="text-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/10"><p className="text-base font-bold text-emerald-400">18</p><p className="text-[8px] text-white/30 uppercase tracking-wider">Approved</p></div>
                <div className="text-center p-2 rounded-xl bg-amber-500/10 border border-amber-500/10"><p className="text-base font-bold text-amber-400">5</p><p className="text-[8px] text-white/30 uppercase tracking-wider">Pending</p></div>
                <div className="text-center p-2 rounded-xl bg-rose-500/10 border border-rose-500/10"><p className="text-base font-bold text-rose-400">2</p><p className="text-[8px] text-white/30 uppercase tracking-wider">Rejected</p></div>
              </div>
            </div>
          </div>

          {/* Monthly Retainers - Visual */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))', borderColor: 'rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-2 mb-3">
              <FiRepeat className="text-indigo-400" />
              <h3 className="text-sm font-semibold text-white/90">Monthly Retainers</h3>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-white">34</p>
                <p className="text-[10px] text-white/30 mt-1">Active Plans</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-400">₹1,70,000</p>
                <p className="text-[10px] text-white/30 mt-1">Monthly Recurring</p>
              </div>
            </div>
            {/* Revenue bar */}
            <div className="mt-4 w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[78%] rounded-full animate-gradient" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)', backgroundSize: '200% 100%' }} />
            </div>
            <p className="text-[10px] text-white/25 mt-2">78% of target reached this month</p>
          </div>

          {/* Home Care */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-4"><FiHome className="text-amber-400" /> Home Visits Today</h3>
            {[
              { p: 'Mohan Lal', addr: 'Sector 12, Dwarka', t: '2:00 PM', urgent: true },
              { p: 'Padma Sharma', addr: 'MG Road, Andheri', t: '4:30 PM', urgent: false },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${v.urgent ? 'bg-rose-500/10' : 'bg-amber-500/10'}`}>
                    <FiHome className={`text-xs ${v.urgent ? 'text-rose-400' : 'text-amber-400'}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/80">{v.p}</p>
                    <p className="text-[10px] text-white/25">{v.addr}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-amber-400">{v.t}</span>
                  {v.urgent && <p className="text-[9px] text-rose-400 mt-0.5">AI: Priority</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
