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

  const statusBadge = { done: 'badge-green', active: 'badge-blue', waiting: 'badge-slate' };
  const statusLabel = { done: 'Done', active: 'In Progress', waiting: 'Waiting' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">{greeting}, Dr. Brijesh</h1>
          <p className="page-subtitle">AI has analysed your schedule — here's your clinic summary</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary"><FiZap className="text-xs" /> AI Insights</button>
          <button className="btn-secondary"><FaWhatsapp className="text-green-600" /> Reminders</button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="ai-glow rounded-2xl border border-indigo-100 p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <FiZap className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">AI Prediction: Kamla Bai (80y) shows elevated fall risk this week</p>
          <p className="text-xs text-slate-500 mt-0.5">Based on medication interaction analysis + age + recent vitals. Suggest home visit priority.</p>
        </div>
        <button className="btn-ghost text-indigo-600 text-xs">View Details</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FiUsers, label: 'Patients', value: '248', trend: '+12 this month', color: 'text-indigo-600 bg-indigo-50' },
          { icon: FiCalendar, label: 'Today\'s Appointments', value: '12', trend: '5 remaining', color: 'text-blue-600 bg-blue-50' },
          { icon: FiDollarSign, label: 'Monthly Revenue', value: '₹2,85,000', trend: '+18% vs last month', color: 'text-emerald-600 bg-emerald-50' },
          { icon: FiRepeat, label: 'Active Retainers', value: '34', trend: '₹1.7L recurring', color: 'text-violet-600 bg-violet-50' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="text-base" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            <p className="text-[10px] text-emerald-600 font-medium mt-1">{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Service Modules */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { icon: FiCalendar, label: 'Appointments', sub: '12 today', color: 'text-indigo-600 bg-indigo-50' },
          { icon: FaPills, label: 'Medications', sub: '86 active', color: 'text-blue-600 bg-blue-50' },
          { icon: FiShield, label: 'Insurance', sub: '₹4.2L claimed', color: 'text-emerald-600 bg-emerald-50' },
          { icon: FiHome, label: 'Home Care', sub: '8 visits', color: 'text-amber-600 bg-amber-50' },
          { icon: FiRepeat, label: 'Retainers', sub: '34 plans', color: 'text-violet-600 bg-violet-50' },
          { icon: FiZap, label: 'AI Alerts', sub: '3 new', color: 'text-rose-600 bg-rose-50' },
        ].map((m, i) => (
          <button key={i} className="card text-center p-4 hover:border-indigo-200">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${m.color}`}><m.icon /></div>
            <p className="text-xs font-semibold text-slate-700">{m.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Queue */}
        <div className="lg:col-span-2 card-flat">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><FiClock className="text-indigo-500" /> Today's Queue</h3>
            <span className="text-xs text-slate-400">{new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="space-y-2">
            {queue.map(apt => (
              <div key={apt.token} className={`flex items-center justify-between p-3.5 rounded-xl border ${apt.status === 'active' ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 hover:bg-slate-50/50'} transition-all`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${apt.status === 'done' ? 'bg-emerald-100 text-emerald-700' : apt.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{apt.token}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-800">{apt.name}</p>
                      <span className="text-[10px] text-slate-400">({apt.age}y)</span>
                      {apt.retainer && <span className="badge badge-purple text-[9px]">Retainer</span>}
                    </div>
                    <p className="text-xs text-slate-400">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${statusBadge[apt.status]}`}>{statusLabel[apt.status]}</span>
                  {apt.status === 'waiting' && <button className="text-[11px] bg-indigo-600 text-white px-2.5 py-1 rounded-lg hover:bg-indigo-700 font-medium">Start</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* AI Drug Alert */}
          <div className="card border-rose-100">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertTriangle className="text-rose-500" />
              <h3 className="section-title text-sm">AI Drug Interactions</h3>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-xs font-medium text-rose-800">Kamla Bai — Warfarin + Aspirin</p>
                <p className="text-[10px] text-rose-600 mt-0.5">High bleeding risk. AI recommends review.</p>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs font-medium text-amber-800">Mohan Lal — Digoxin + Furosemide</p>
                <p className="text-[10px] text-amber-600 mt-0.5">Monitor potassium levels weekly.</p>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiShield className="text-emerald-500" /> Insurance Claims</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-emerald-50 rounded-lg"><p className="text-base font-bold text-emerald-700">18</p><p className="text-[9px] text-slate-500">Approved</p></div>
              <div className="text-center p-2 bg-amber-50 rounded-lg"><p className="text-base font-bold text-amber-700">5</p><p className="text-[9px] text-slate-500">Pending</p></div>
              <div className="text-center p-2 bg-rose-50 rounded-lg"><p className="text-base font-bold text-rose-700">2</p><p className="text-[9px] text-slate-500">Rejected</p></div>
            </div>
          </div>

          {/* Retainers */}
          <div className="card border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-violet-50/50">
            <h3 className="section-title flex items-center gap-2 mb-2"><FiRepeat className="text-indigo-500" /> Monthly Retainers</h3>
            <div className="flex justify-between items-center">
              <div><p className="text-xl font-bold text-slate-900">34</p><p className="text-[10px] text-slate-500">Active Plans</p></div>
              <div className="text-right"><p className="text-lg font-bold text-emerald-600">₹1,70,000</p><p className="text-[10px] text-slate-500">Monthly Recurring</p></div>
            </div>
          </div>

          {/* Home Care */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiHome className="text-amber-500" /> Home Visits Today</h3>
            {[{ p: 'Mohan Lal', addr: 'Sector 12, Dwarka', t: '2:00 PM' }, { p: 'Padma Sharma', addr: 'MG Road, Andheri', t: '4:30 PM' }].map((v, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
                <div><p className="text-xs font-medium text-slate-700">{v.p}</p><p className="text-[10px] text-slate-400">{v.addr}</p></div>
                <span className="text-xs text-amber-600 font-medium">{v.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
