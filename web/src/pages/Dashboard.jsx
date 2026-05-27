import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiHome, FiRepeat, FiShield, FiClock, FiZap, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">{greeting}, Dr. Brijesh</h1>
          <p className="page-subtitle">AI has analysed your schedule — 3 alerts need attention</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary"><FiZap className="text-sm" /> AI Insights</button>
          <button className="btn-secondary"><FaWhatsapp className="text-green-600" /> Reminders</button>
        </div>
      </div>

      {/* AI Alert */}
      <div className="ai-glow p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <FiZap className="text-indigo-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="ai-badge">AI Alert</span>
          </div>
          <p className="text-sm text-gray-700 font-medium">Kamla Bai (80y) — Elevated fall risk detected. Medication timing conflict with afternoon slot.</p>
        </div>
        <button className="btn-ghost text-indigo-600">Review</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {[
          { icon: FiUsers, label: 'Total Patients', value: '248', trend: '+12 this month', color: '#4f46e5', bg: '#eef2ff' },
          { icon: FiCalendar, label: "Today's Appointments", value: '12', trend: '5 remaining', color: '#2563eb', bg: '#eff6ff' },
          { icon: FiDollarSign, label: 'Monthly Revenue', value: '₹2,85,000', trend: '+18% growth', color: '#059669', bg: '#ecfdf5' },
          { icon: FiRepeat, label: 'Active Retainers', value: '34', trend: '₹1.7L recurring', color: '#7c3aed', bg: '#f5f3ff' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon style={{ color: s.color }} className="text-lg" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <FiTrendingUp className="inline text-[8px] mr-0.5" />{s.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { icon: FiCalendar, label: 'Appointments', count: '12 today', color: '#4f46e5', bg: '#eef2ff' },
          { icon: FaPills, label: 'Medications', count: '86 active', color: '#2563eb', bg: '#eff6ff' },
          { icon: FiShield, label: 'Insurance', count: '₹4.2L', color: '#059669', bg: '#ecfdf5' },
          { icon: FiHome, label: 'Home Care', count: '8 visits', color: '#d97706', bg: '#fffbeb' },
          { icon: FiRepeat, label: 'Retainers', count: '34 plans', color: '#7c3aed', bg: '#f5f3ff' },
          { icon: FiZap, label: 'AI Alerts', count: '3 new', color: '#dc2626', bg: '#fef2f2' },
        ].map((m, i) => (
          <button key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform" style={{ background: m.bg }}>
              <m.icon style={{ color: m.color }} />
            </div>
            <p className="text-[11px] font-semibold text-gray-700">{m.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{m.count}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Queue */}
        <div className="lg:col-span-2 card-flat">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><FiClock className="text-indigo-500" /> Live Patient Queue</h3>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" /> Live</span>
          </div>
          <div className="space-y-2">
            {queue.map(apt => (
              <div key={apt.token} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:shadow-sm ${apt.status === 'active' ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${apt.status === 'done' ? 'bg-emerald-100 text-emerald-700' : apt.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{apt.token}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{apt.name}</p>
                      <span className="text-[10px] text-gray-400">({apt.age}y)</span>
                      {apt.retainer && <span className="badge-purple text-[8px]">Retainer</span>}
                    </div>
                    <p className="text-xs text-gray-400">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${apt.status === 'done' ? 'badge-green' : apt.status === 'active' ? 'badge-blue' : 'badge-slate'}`}>
                    {apt.status === 'done' ? 'Done' : apt.status === 'active' ? 'In Progress' : 'Waiting'}
                  </span>
                  {apt.status === 'waiting' && <button className="text-[10px] font-semibold text-white bg-indigo-600 px-2.5 py-1 rounded-lg hover:bg-indigo-700">Start</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Drug Alerts */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertTriangle className="text-red-500 text-sm" />
              <h3 className="text-sm font-semibold text-gray-800">AI Drug Alerts</h3>
              <span className="badge-red text-[8px] ml-auto">2 Critical</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs font-semibold text-red-800">Kamla Bai — Warfarin + Aspirin</p>
                <p className="text-[10px] text-red-600 mt-0.5">High bleeding risk detected</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs font-semibold text-amber-800">Mohan Lal — Digoxin + Furosemide</p>
                <p className="text-[10px] text-amber-600 mt-0.5">Monitor potassium weekly</p>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiShield className="text-emerald-500" /> Insurance Claims</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2.5 bg-emerald-50 rounded-xl border border-emerald-100"><p className="text-lg font-bold text-emerald-700">18</p><p className="text-[9px] text-gray-500 uppercase">Approved</p></div>
              <div className="text-center p-2.5 bg-amber-50 rounded-xl border border-amber-100"><p className="text-lg font-bold text-amber-700">5</p><p className="text-[9px] text-gray-500 uppercase">Pending</p></div>
              <div className="text-center p-2.5 bg-red-50 rounded-xl border border-red-100"><p className="text-lg font-bold text-red-700">2</p><p className="text-[9px] text-gray-500 uppercase">Rejected</p></div>
            </div>
          </div>

          {/* Retainers */}
          <div className="card bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-2"><FiRepeat className="text-indigo-500" /> Monthly Retainers</h3>
            <div className="flex justify-between items-end">
              <div><p className="text-2xl font-bold text-gray-900">34</p><p className="text-[10px] text-gray-500">Active Plans</p></div>
              <div className="text-right"><p className="text-lg font-bold text-emerald-600">₹1,70,000</p><p className="text-[10px] text-gray-500">Monthly Recurring</p></div>
            </div>
          </div>

          {/* Home Care */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiHome className="text-amber-500" /> Home Visits Today</h3>
            {[{ p: 'Mohan Lal', addr: 'Sector 12, Dwarka', t: '2:00 PM' }, { p: 'Padma Sharma', addr: 'MG Road, Andheri', t: '4:30 PM' }].map((v, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                <div><p className="text-xs font-medium text-gray-700">{v.p}</p><p className="text-[10px] text-gray-400">{v.addr}</p></div>
                <span className="text-xs font-semibold text-amber-600">{v.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
