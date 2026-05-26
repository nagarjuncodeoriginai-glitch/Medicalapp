import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, 
  FiClock, FiAlertCircle, FiUserPlus, FiActivity,
  FiHeart, FiShield, FiHome, FiRepeat
} from 'react-icons/fi';
import { FaWhatsapp, FaPills, FaHandHoldingMedical, FaFileInvoiceDollar } from 'react-icons/fa';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const stats = [
    { label: 'Total Patients', value: '248', icon: FiUsers, color: 'from-violet-500 to-indigo-500', trend: '+18 this month' },
    { label: 'Today\'s Appointments', value: '12', icon: FiCalendar, color: 'from-blue-500 to-cyan-500', trend: '7 completed' },
    { label: 'Monthly Revenue', value: '₹85K', icon: FiDollarSign, color: 'from-emerald-500 to-teal-500', trend: '+12% growth' },
    { label: 'Active Retainers', value: '34', icon: FiRepeat, color: 'from-amber-500 to-orange-500', trend: '₹1.7L/month' },
  ];

  const elderCareModules = [
    { icon: FiCalendar, label: 'Appointments', desc: 'Elderly visit scheduling', color: 'from-violet-500/20 to-violet-600/20', border: 'border-violet-500/20', text: 'text-violet-400', count: '12 today' },
    { icon: FaPills, label: 'Medications', desc: 'Track & remind meds', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/20', text: 'text-blue-400', count: '86 active' },
    { icon: FiShield, label: 'Insurance', desc: 'Claims & coverage', color: 'from-emerald-500/20 to-emerald-600/20', border: 'border-emerald-500/20', text: 'text-emerald-400', count: '₹4.2L claimed' },
    { icon: FiHome, label: 'Home Care', desc: 'Home visit tracking', color: 'from-amber-500/20 to-amber-600/20', border: 'border-amber-500/20', text: 'text-amber-400', count: '8 scheduled' },
    { icon: FiRepeat, label: 'Monthly Retainer', desc: 'Recurring care plans', color: 'from-rose-500/20 to-rose-600/20', border: 'border-rose-500/20', text: 'text-rose-400', count: '34 active' },
    { icon: FaWhatsapp, label: 'WhatsApp', desc: 'Patient reminders', color: 'from-green-500/20 to-green-600/20', border: 'border-green-500/20', text: 'text-green-400', count: '5 pending' },
  ];

  const todayQueue = [
    { id: 1, name: 'Ramesh Gupta', age: 72, time: '10:00 AM', type: 'Routine Checkup', status: 'completed', token: 1, retainer: true },
    { id: 2, name: 'Savitri Devi', age: 68, time: '10:30 AM', type: 'Medication Review', status: 'completed', token: 2, retainer: true },
    { id: 3, name: 'Mohan Lal', age: 75, time: '11:00 AM', type: 'Home Care Follow-up', status: 'in-progress', token: 3, retainer: false },
    { id: 4, name: 'Kamla Bai', age: 80, time: '11:30 AM', type: 'Insurance Consultation', status: 'scheduled', token: 4, retainer: true },
    { id: 5, name: 'Suresh Patel', age: 65, time: '12:00 PM', type: 'Joint Pain Review', status: 'scheduled', token: 5, retainer: false },
    { id: 6, name: 'Padma Sharma', age: 71, time: '12:30 PM', type: 'Monthly Retainer Visit', status: 'scheduled', token: 6, retainer: true },
  ];

  const medications = [
    { patient: 'Ramesh Gupta', med: 'Amlodipine 5mg', time: 'Morning', status: 'taken' },
    { patient: 'Savitri Devi', med: 'Metformin 500mg', time: 'After lunch', status: 'pending' },
    { patient: 'Mohan Lal', med: 'Atorvastatin 10mg', time: 'Night', status: 'pending' },
    { patient: 'Kamla Bai', med: 'Pantoprazole 40mg', time: 'Before breakfast', status: 'missed' },
  ];

  const statusColors = {
    'completed': 'bg-emerald-500/20 text-emerald-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    'scheduled': 'bg-white/10 text-white/60',
  };

  const medStatusColors = {
    'taken': 'bg-emerald-500/20 text-emerald-400',
    'pending': 'bg-amber-500/20 text-amber-400',
    'missed': 'bg-rose-500/20 text-rose-400',
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {greeting}, Dr. {user.name || 'Doctor'}
          </h1>
          <p className="text-white/50 mt-1 text-sm">Managing elderly care with compassion & technology</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2 text-sm py-2.5">
            <FiUserPlus className="text-lg" />
            New Patient
          </button>
          <button className="btn-glass flex items-center gap-2 text-sm">
            <FaWhatsapp className="text-green-400" />
            Reminders
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-lg" />
              </div>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Elder Care Modules */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FiHeart className="text-rose-400" />
          Elder Care Modules
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 stagger-children">
          {elderCareModules.map((mod, i) => (
            <button key={i} className={`glass-card rounded-2xl p-4 text-left hover:scale-105 transition-all duration-300 border ${mod.border} group`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <mod.icon className={`${mod.text} text-lg`} />
              </div>
              <p className="text-sm font-semibold text-white">{mod.label}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{mod.desc}</p>
              <p className={`text-[11px] ${mod.text} font-medium mt-2`}>{mod.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Queue */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiClock className="text-violet-400" />
              Today's Patient Queue
            </h3>
            <span className="text-xs text-white/40">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="space-y-2.5">
            {todayQueue.map((apt) => (
              <div key={apt.id} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 hover:bg-white/5 ${apt.status === 'in-progress' ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${statusColors[apt.status]}`}>
                    #{apt.token}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white text-sm">{apt.name}</p>
                      <span className="text-[10px] text-white/40">({apt.age}y)</span>
                      {apt.retainer && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium">RETAINER</span>
                      )}
                    </div>
                    <p className="text-xs text-white/40">{apt.time} — {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${statusColors[apt.status]}`}>
                    {apt.status === 'in-progress' ? 'Active' : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                  {apt.status === 'scheduled' && (
                    <button className="text-[10px] bg-violet-500/20 text-violet-300 px-2.5 py-1 rounded-lg hover:bg-violet-500/30 transition-colors font-medium">
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Medication Tracking */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <FaPills className="text-blue-400" />
              Medication Tracker
            </h3>
            <div className="space-y-2.5">
              {medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div>
                    <p className="text-xs font-semibold text-white">{med.patient}</p>
                    <p className="text-[11px] text-white/40">{med.med} — {med.time}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-lg ${medStatusColors[med.status]}`}>
                    {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">
              View All Medications →
            </button>
          </div>

          {/* Insurance Overview */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <FiShield className="text-emerald-400" />
              Insurance Claims
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/50">This Month Claims</span>
                <span className="text-sm font-bold text-white">₹4,20,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm font-bold text-emerald-400">18</p>
                  <p className="text-[9px] text-white/40">Approved</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm font-bold text-amber-400">5</p>
                  <p className="text-[9px] text-white/40">Pending</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <p className="text-sm font-bold text-rose-400">2</p>
                  <p className="text-[9px] text-white/40">Rejected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Home Care */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <FiHome className="text-amber-400" />
              Home Care Visits
            </h3>
            <div className="space-y-2.5">
              {[
                { patient: 'Kamla Bai', address: 'Sector 12, Dwarka', time: '2:00 PM', nurse: 'Nurse Priya' },
                { patient: 'Suresh Patel', address: 'MG Road, Andheri', time: '4:30 PM', nurse: 'Nurse Rajan' },
              ].map((visit, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-white">{visit.patient}</p>
                      <p className="text-[10px] text-white/40">{visit.address}</p>
                    </div>
                    <span className="text-[10px] text-amber-400 font-medium">{visit.time}</span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-1">Assigned: {visit.nurse}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Retainer */}
          <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <FiRepeat className="text-amber-400" />
              Monthly Retainers
            </h3>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-2xl font-bold text-white">34</p>
                <p className="text-[11px] text-white/40">Active Plans</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">₹1,70,000</p>
                <p className="text-[11px] text-white/40">Monthly Recurring</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-[11px] bg-amber-500/20 text-amber-300 py-2 rounded-lg font-medium hover:bg-amber-500/30 transition-colors">
                View Plans
              </button>
              <button className="flex-1 text-[11px] bg-white/10 text-white/70 py-2 rounded-lg font-medium hover:bg-white/15 transition-colors">
                + New Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
