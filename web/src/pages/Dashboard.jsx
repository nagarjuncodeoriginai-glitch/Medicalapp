import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, 
  FiClock, FiAlertCircle, FiUserPlus, FiActivity
} from 'react-icons/fi';
import { FaWhatsapp, FaRupeeSign } from 'react-icons/fa';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Demo stats for UI showcase
  const stats = {
    totalPatients: 248,
    todayAppointments: 12,
    monthRevenue: 85000,
    todayCompleted: 7,
    pendingPayments: 5,
    newPatientsThisMonth: 18
  };

  const todayQueue = [
    { id: 1, name: 'Rahul Sharma', time: '10:00 AM', type: 'Consultation', status: 'completed', token: 1 },
    { id: 2, name: 'Priya Patel', time: '10:30 AM', type: 'Follow-up', status: 'completed', token: 2 },
    { id: 3, name: 'Amit Kumar', time: '11:00 AM', type: 'Procedure', status: 'in-progress', token: 3 },
    { id: 4, name: 'Sneha Gupta', time: '11:30 AM', type: 'Consultation', status: 'scheduled', token: 4 },
    { id: 5, name: 'Rajesh Iyer', time: '12:00 PM', type: 'Emergency', status: 'scheduled', token: 5 },
    { id: 6, name: 'Meera Singh', time: '12:30 PM', type: 'Checkup', status: 'scheduled', token: 6 },
  ];

  const statusColors = {
    'completed': 'bg-emerald-100 text-emerald-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'scheduled': 'bg-gray-100 text-gray-600',
    'cancelled': 'bg-red-100 text-red-700',
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {greeting}, Dr. {user.name || 'Doctor'} 
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening at your clinic today</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2 text-sm">
            <FiUserPlus className="text-lg" />
            New Patient
          </button>
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <FaWhatsapp className="text-lg text-green-500" />
            Send Reminders
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+18 new</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPatients}</p>
          <p className="text-sm text-gray-500 mt-1">Total Patients</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FiCalendar className="text-purple-600 text-xl" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{stats.todayCompleted} done</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.todayAppointments}</p>
          <p className="text-sm text-gray-500 mt-1">Today's Appointments</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FaRupeeSign className="text-emerald-600 text-xl" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <FiTrendingUp className="inline" /> +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">&#8377;{(stats.monthRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500 mt-1">This Month Revenue</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <FiAlertCircle className="text-orange-600 text-xl" />
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Pending</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingPayments}</p>
          <p className="text-sm text-gray-500 mt-1">Unpaid Bills</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Queue */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiClock className="text-blue-600" />
              Today's Patient Queue
            </h3>
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="space-y-3">
            {todayQueue.map((apt) => (
              <div key={apt.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${apt.status === 'in-progress' ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : apt.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    #{apt.token}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{apt.name}</p>
                    <p className="text-sm text-gray-500">{apt.time} - {apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                    {apt.status === 'in-progress' ? 'In Progress' : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                  {apt.status === 'scheduled' && (
                    <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                <FiUserPlus className="text-2xl text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Add Patient</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group">
                <FiCalendar className="text-2xl text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Book Appt</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                <FiActivity className="text-2xl text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Prescribe</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group">
                <FiDollarSign className="text-2xl text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Create Bill</span>
              </button>
            </div>
          </div>

          {/* Upcoming */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sneha Gupta - 11:30 AM</p>
                  <p className="text-xs text-gray-500">Consultation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Rajesh Iyer - 12:00 PM</p>
                  <p className="text-xs text-gray-500">Emergency</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Meera Singh - 12:30 PM</p>
                  <p className="text-xs text-gray-500">Checkup</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Status */}
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <FaWhatsapp className="text-2xl text-green-600" />
              <h3 className="font-bold text-gray-900">WhatsApp Reminders</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Auto-remind tomorrow's patients</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">5 reminders pending</span>
              <button className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">
                Send Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
