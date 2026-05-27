import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiHome, FiRepeat, FiShield, FiClock, FiZap, FiAlertTriangle, FiTrendingUp, FiActivity, FiHeart } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const queue = [
    { token: 1, name: 'Ramesh Gupta', age: 72, time: '10:00 AM', type: 'Routine Checkup', status: 'done', retainer: true },
    { token: 2, name: 'Savitri Devi', age: 68, time: '10:30 AM', type: 'Medication Review', status: 'done', retainer: true },
    { token: 3, name: 'Mohan Lal', age: 75, time: '11:00 AM', type: 'Home Visit', status: 'active', retainer: false },
    { token: 4, name: 'Kamla Bai', age: 80, time: '11:30 AM', type: 'Insurance Consult', status: 'waiting', retainer: true },
    { token: 5, name: 'Suresh Patel', age: 65, time: '12:00 PM', type: 'Physiotherapy', status: 'waiting', retainer: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="page-title">{greeting}, Dr. Brijesh</h1>
          <p className="page-subtitle">AI has processed 248 patient records — 3 critical alerts detected</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary text-xs py-2"><FiZap className="text-xs" /> AI Insights</button>
          <button className="btn-secondary text-xs py-2"><FaWhatsapp className="text-green-400 text-xs" /> Reminders</button>
        </div>
      </div>

      {/* AI Prediction Banner */}
      <div className="ai-glow flex items-center gap-4">
        <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 animate-gradient" style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5, #7c3aed, #6d28d9)', backgroundSize: '300% 300%' }}>
          <FiActivity className="text-white text-lg" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="ai-badge text-[8px]">AI Prediction</span>
            <span className="text-[9px] text-gray-500">Real-time analysis</span>
          </div>
          <p className="text-sm text-gray-200 font-medium">Kamla Bai (80y) — <span className="text-rose-400">Fall risk elevated 34%</span> due to Warfarin + low BP trend</p>
          <p className="text-[11px] text-gray-500 mt-0.5">AI recommends priority home visit within 48 hours</p>
        </div>
        <button className="relative z-10 btn-ghost text-purple-400">View Analysis</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {[
          { icon: FiUsers, label: 'Total Patients', value: '248', sub: '+12 this month', color: '#6d28d9' },
          { icon: FiCalendar, label: 'Today Appointments', value: '12', sub: '5 remaining', color: '#4f46e5' },
          { icon: FiDollarSign, label: 'Monthly Revenue', value: '₹2.85L', sub: '+18% growth', color: '#059669' },
          { icon: FiRepeat, label: 'Active Retainers', value: '34', sub: '₹1.7L/month', color: '#7c3aed' },
        ].map((s, i) => (
          <div key={i} className="stat-card group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${s.color}15` }}>
                <s.icon style={{ color: s.color }} className="text-base" />
              </div>
              <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">
                <FiTrendingUp className="inline text-[7px] mr-0.5" />{s.sub}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* AI Health Monitoring Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: FiHeart, label: 'Vitals Monitoring', value: '6 abnormal', color: '#ef4444', status: 'Alert' },
          { icon: FaPills, label: 'Drug Interactions', value: '2 critical', color: '#f59e0b', status: 'Warning' },
          { icon: FiShield, label: 'Insurance Claims', value: '₹4.2L filed', color: '#10b981', status: 'Active' },
          { icon: FiHome, label: 'Home Care Queue', value: '3 scheduled', color: '#6d28d9', status: 'Today' },
        ].map((m, i) => (
          <button key={i} className="card text-left p-4 group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${m.color}12` }}>
                <m.icon style={{ color: m.color }} className="text-sm" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: m.color, background: `${m.color}12`, border: `1px solid ${m.color}25` }}>{m.status}</span>
            </div>
            <p className="text-xs font-semibold text-white/80 mt-1">{m.label}</p>
            <p className="text-[10px] text-gray-500">{m.value}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Queue */}
        <div className="lg:col-span-2 card-flat">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><FiClock className="text-purple-400" /> Live Patient Queue</h3>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" /> Live</span>
          </div>
          <div className="space-y-2">
            {queue.map(apt => (
              <div key={apt.token} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:bg-white/[0.02] ${apt.status === 'active' ? 'border-blue-500/15 bg-blue-500/[0.03]' : 'border-white/[0.04]'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${apt.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : apt.status === 'active' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-500'}`}>{apt.token}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white/85">{apt.name}</p>
                      <span className="text-[9px] text-gray-500">({apt.age}y)</span>
                      {apt.retainer && <span className="badge-purple text-[7px]">Retainer</span>}
                    </div>
                    <p className="text-[11px] text-gray-500">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${apt.status === 'done' ? 'badge-green' : apt.status === 'active' ? 'badge-blue' : 'badge-slate'}`}>
                    {apt.status === 'done' ? 'Done' : apt.status === 'active' ? 'Active' : 'Waiting'}
                  </span>
                  {apt.status === 'waiting' && (
                    <button className="text-[9px] font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1 rounded-lg hover:opacity-90">Start</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* AI Drug Alerts */}
          <div className="card border-rose-500/10">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertTriangle className="text-rose-400 text-sm" />
              <h3 className="text-xs font-semibold text-white/85">AI Drug Interaction Engine</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <p className="text-[11px] font-semibold text-rose-300">Kamla Bai — Warfarin + Aspirin</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Bleeding risk: 87% — Immediate review</p>
                <div className="mt-1.5 w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[87%] rounded-full bg-rose-500/60" />
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-[11px] font-semibold text-amber-300">Mohan Lal — Digoxin + Furosemide</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Potassium risk: 62% — Monitor weekly</p>
                <div className="mt-1.5 w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-amber-500/60" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Vitals Pattern */}
          <div className="card">
            <h3 className="text-xs font-semibold text-white/85 flex items-center gap-2 mb-3">
              <FiHeart className="text-rose-400" /> AI Vitals Pattern Recognition
            </h3>
            <div className="space-y-2">
              {[
                { patient: 'Ramesh Gupta', vital: 'BP trending up', risk: 'Medium', color: '#f59e0b' },
                { patient: 'Mohan Lal', vital: 'SpO2 declining', risk: 'High', color: '#ef4444' },
                { patient: 'Savitri Devi', vital: 'Heart rate stable', risk: 'Low', color: '#10b981' },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                  <div>
                    <p className="text-[11px] font-medium text-white/70">{v.patient}</p>
                    <p className="text-[10px] text-gray-500">{v.vital}</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ color: v.color, background: `${v.color}12`, border: `1px solid ${v.color}20` }}>{v.risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Retainers */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.06), rgba(79,70,229,0.03))', borderColor: 'rgba(109,40,217,0.12)' }}>
            <div className="flex items-center gap-2 mb-2">
              <FiRepeat className="text-purple-400 text-sm" />
              <h3 className="text-xs font-semibold text-white/85">Monthly Retainers</h3>
            </div>
            <div className="flex justify-between items-end">
              <div><p className="text-2xl font-bold text-white">34</p><p className="text-[10px] text-gray-500">Active Plans</p></div>
              <div className="text-right"><p className="text-lg font-bold text-emerald-400">₹1.7L</p><p className="text-[10px] text-gray-500">Monthly MRR</p></div>
            </div>
            <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[78%] rounded-full animate-gradient" style={{ background: 'linear-gradient(90deg, #6d28d9, #4f46e5, #6d28d9)', backgroundSize: '200% 100%' }} />
            </div>
            <p className="text-[9px] text-gray-500 mt-1.5">78% of monthly target</p>
          </div>

          {/* Home Care */}
          <div className="card">
            <h3 className="text-xs font-semibold text-white/85 flex items-center gap-2 mb-3">
              <FiHome className="text-amber-400" /> AI-Scheduled Home Visits
            </h3>
            {[
              { p: 'Mohan Lal', addr: 'Sector 12, Dwarka', t: '2:00 PM', priority: true },
              { p: 'Padma Sharma', addr: 'MG Road, Andheri', t: '4:30 PM', priority: false },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                <div>
                  <p className="text-[11px] font-medium text-white/70">{v.p}</p>
                  <p className="text-[9px] text-gray-500">{v.addr}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-amber-400">{v.t}</span>
                  {v.priority && <p className="text-[8px] text-rose-400 font-bold">AI: Priority</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
