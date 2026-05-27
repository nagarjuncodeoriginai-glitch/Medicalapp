import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiHome, FiRepeat, FiShield, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const todayQueue = [
    { token: 1, name: 'Ramesh Gupta', age: 72, time: '10:00 AM', type: 'Routine Checkup', status: 'completed', retainer: true },
    { token: 2, name: 'Savitri Devi', age: 68, time: '10:30 AM', type: 'Medication Review', status: 'completed', retainer: true },
    { token: 3, name: 'Mohan Lal', age: 75, time: '11:00 AM', type: 'Home Visit Follow-up', status: 'in-progress', retainer: false },
    { token: 4, name: 'Kamla Bai', age: 80, time: '11:30 AM', type: 'Insurance Consultation', status: 'waiting', retainer: true },
    { token: 5, name: 'Suresh Patel', age: 65, time: '12:00 PM', type: 'Physiotherapy', status: 'waiting', retainer: false },
    { token: 6, name: 'Padma Sharma', age: 71, time: '12:30 PM', type: 'Monthly Retainer Visit', status: 'waiting', retainer: true },
  ];

  const statusBadge = {
    completed: 'badge-green',
    'in-progress': 'badge-blue',
    waiting: 'badge-slate',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">{greeting}, Dr. {user.name || 'Doctor'}</h1>
          <p className="page-subtitle">Here's your clinic overview for today</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-1.5"><FiUsers className="text-sm" /> New Patient</button>
          <button className="btn-secondary flex items-center gap-1.5"><FaWhatsapp className="text-green-600" /> Send Reminders</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center"><FiUsers className="text-indigo-600" /></div>
            <span className="badge badge-green">+12 new</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">248</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Patients</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center"><FiCalendar className="text-blue-600" /></div>
            <span className="badge badge-blue">5 left</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-slate-500 mt-0.5">Today's Appointments</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center"><FiDollarSign className="text-emerald-600" /></div>
            <span className="badge badge-green">+12%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">₹2,85,000</p>
          <p className="text-xs text-slate-500 mt-0.5">Monthly Revenue</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center"><FiRepeat className="text-amber-600" /></div>
            <span className="badge badge-amber">₹1.7L/mo</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">34</p>
          <p className="text-xs text-slate-500 mt-0.5">Active Retainers</p>
        </div>
      </div>

      {/* Service Modules */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { icon: FiCalendar, label: 'Appointments', count: '12 today', color: 'bg-indigo-50 text-indigo-600' },
          { icon: FaPills, label: 'Medications', count: '86 active', color: 'bg-blue-50 text-blue-600' },
          { icon: FiShield, label: 'Insurance', count: '₹4.2L claimed', color: 'bg-emerald-50 text-emerald-600' },
          { icon: FiHome, label: 'Home Care', count: '8 visits', color: 'bg-amber-50 text-amber-600' },
          { icon: FiRepeat, label: 'Retainers', count: '34 plans', color: 'bg-purple-50 text-purple-600' },
          { icon: FaWhatsapp, label: 'Reminders', count: '5 pending', color: 'bg-green-50 text-green-600' },
        ].map((mod, i) => (
          <button key={i} className="card text-center hover:shadow-md transition-shadow p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${mod.color}`}>
              <mod.icon className="text-lg" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{mod.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{mod.count}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's Queue */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><FiClock className="text-indigo-500" /> Today's Queue</h3>
            <span className="text-xs text-slate-400">{new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="space-y-2">
            {todayQueue.map((apt) => (
              <div key={apt.token} className={`flex items-center justify-between p-3 rounded-lg border ${apt.status === 'in-progress' ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : apt.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    {apt.token}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-800">{apt.name}</p>
                      <span className="text-[10px] text-slate-400">({apt.age}y)</span>
                      {apt.retainer && <span className="badge badge-purple text-[9px] py-0">Retainer</span>}
                    </div>
                    <p className="text-xs text-slate-400">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${statusBadge[apt.status]}`}>
                    {apt.status === 'in-progress' ? 'In Progress' : apt.status === 'completed' ? 'Done' : 'Waiting'}
                  </span>
                  {apt.status === 'waiting' && (
                    <button className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded hover:bg-indigo-700">Start</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Medication Alerts */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FaPills className="text-blue-500" /> Medication Alerts</h3>
            <div className="space-y-2">
              {[
                { patient: 'Ramesh Gupta', med: 'Amlodipine 5mg', status: 'Taken', color: 'badge-green' },
                { patient: 'Kamla Bai', med: 'Pantoprazole 40mg', status: 'Missed', color: 'badge-red' },
                { patient: 'Savitri Devi', med: 'Metformin 500mg', status: 'Due', color: 'badge-amber' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-slate-700">{m.patient}</p>
                    <p className="text-[10px] text-slate-400">{m.med}</p>
                  </div>
                  <span className={`badge ${m.color}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Claims */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiShield className="text-emerald-500" /> Insurance Claims</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 bg-emerald-50 rounded-lg">
                <p className="text-base font-bold text-emerald-700">18</p>
                <p className="text-[9px] text-slate-500">Approved</p>
              </div>
              <div className="text-center p-2 bg-amber-50 rounded-lg">
                <p className="text-base font-bold text-amber-700">5</p>
                <p className="text-[9px] text-slate-500">Pending</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-lg">
                <p className="text-base font-bold text-red-700">2</p>
                <p className="text-[9px] text-slate-500">Rejected</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Total claimed: <span className="font-semibold text-slate-700">₹4,20,000</span></p>
          </div>

          {/* Home Care */}
          <div className="card">
            <h3 className="section-title flex items-center gap-2 mb-3"><FiHome className="text-amber-500" /> Home Visits Today</h3>
            {[
              { patient: 'Mohan Lal', address: 'Sector 12, Dwarka', time: '2:00 PM' },
              { patient: 'Padma Sharma', address: 'MG Road, Andheri', time: '4:30 PM' },
            ].map((v, i) => (
              <div key={i} className="flex justify-between items-start py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-xs font-medium text-slate-700">{v.patient}</p>
                  <p className="text-[10px] text-slate-400">{v.address}</p>
                </div>
                <span className="text-xs text-amber-600 font-medium">{v.time}</span>
              </div>
            ))}
          </div>

          {/* Monthly Retainers */}
          <div className="card border-indigo-100 bg-indigo-50/30">
            <h3 className="section-title flex items-center gap-2 mb-2"><FiRepeat className="text-indigo-500" /> Monthly Retainers</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-slate-900">34</p>
                <p className="text-xs text-slate-500">Active Plans</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">₹1,70,000</p>
                <p className="text-xs text-slate-500">Monthly Recurring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
