import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiCalendar, FiTrendingUp, FiClock,
  FiAlertCircle, FiUserPlus, FiActivity, FiDollarSign, FiRefreshCw
} from 'react-icons/fi';
import { FaWhatsapp, FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';
import { getUser } from '../utils/auth';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import RevenueChart from '../components/RevenueChart';

const greetingForHour = (h) => (h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening');

const statusColors = {
  completed: 'bg-emerald-100 text-emerald-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  scheduled: 'bg-gray-100 text-gray-600',
  confirmed: 'bg-indigo-100 text-indigo-700',
  cancelled: 'bg-red-100 text-red-700'
};

export default function Dashboard() {
  const user = getUser();
  const [greeting, setGreeting] = useState('');
  const [sendingReminders, setSendingReminders] = useState(false);

  useEffect(() => setGreeting(greetingForHour(new Date().getHours())), []);

  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi('/dashboard/stats');
  const { data: queue, loading: queueLoading, refetch: refetchQueue } = useApi('/appointments/queue/today');
  const { data: analytics } = useApi('/dashboard/analytics');

  const formatINR = (n) => `₹${(Number(n || 0)).toLocaleString('en-IN')}`;

  const sendReminders = async () => {
    setSendingReminders(true);
    try {
      const { data } = await api.post('/whatsapp/run-reminders');
      toast.success(`Sent ${data.sent}/${data.processed} reminders`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reminders');
    } finally {
      setSendingReminders(false);
    }
  };

  const startAppt = async (id) => {
    try {
      await api.put(`/appointments/${id}`, { status: 'in-progress' });
      refetchQueue();
      refetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const cards = [
    {
      icon: FiUsers,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      label: 'Total Patients',
      value: stats?.totalPatients ?? 0,
      badge: stats ? `+${stats.newPatientsThisMonth} new` : null,
      badgeClass: 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: FiCalendar,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      label: "Today's Appointments",
      value: stats?.todayAppointments ?? 0,
      badge: stats ? `${stats.todayCompleted} done` : null,
      badgeClass: 'text-blue-600 bg-blue-50'
    },
    {
      icon: FaRupeeSign,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      label: 'This Month Revenue',
      value: stats ? formatINR(stats.monthRevenue) : '₹0',
      badge: '+12%',
      badgeClass: 'text-emerald-600 bg-emerald-50',
      isRevenue: true
    },
    {
      icon: FiAlertCircle,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      label: 'Unpaid Bills',
      value: stats?.pendingPayments ?? 0,
      badge: 'Pending',
      badgeClass: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {greeting}, Dr. {user.name || 'Doctor'}
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening at your clinic today</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { refetchStats(); refetchQueue(); }}
            className="btn-secondary flex items-center gap-2 text-sm"
            aria-label="Refresh dashboard"
          >
            <FiRefreshCw />
          </button>
          <Link to="/patients" className="btn-primary flex items-center gap-2 text-sm">
            <FiUserPlus className="text-lg" /> New Patient
          </Link>
          <button
            onClick={sendReminders}
            disabled={sendingReminders}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <FaWhatsapp className="text-lg text-green-500" />
            {sendingReminders ? 'Sending...' : 'Send Reminders'}
          </button>
        </div>
      </div>

      {statsError && (
        <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-sm">
          Could not load stats: {statsError}
        </div>
      )}

      {statsLoading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.label} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${c.iconBg} rounded-xl flex items-center justify-center`}>
                  <c.icon className={`${c.iconColor} text-xl`} />
                </div>
                {c.badge && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.badgeClass}`}>
                    {c.isRevenue ? <><FiTrendingUp className="inline" /> {c.badge}</> : c.badge}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{c.value}</p>
              <p className="text-sm text-gray-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiClock className="text-blue-600" />
              Today's Patient Queue
            </h3>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
              })}
            </span>
          </div>

          {queueLoading ? (
            <Loader label="Loading queue..." />
          ) : !queue || queue.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No appointments today"
              message="Once patients book for today, they'll appear here."
              action={<Link to="/appointments" className="btn-primary text-sm">Book Appointment</Link>}
            />
          ) : (
            <div className="space-y-3">
              {queue.map((apt) => (
                <div
                  key={apt._id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                    apt.status === 'in-progress'
                      ? 'border-blue-200 bg-blue-50/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        apt.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : apt.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      #{apt.tokenNumber}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{apt.patientId?.name || 'Patient'}</p>
                      <p className="text-sm text-gray-500">
                        {apt.timeSlot} - {apt.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status] || ''}`}>
                      {apt.status === 'in-progress'
                        ? 'In Progress'
                        : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                    {apt.status === 'scheduled' && (
                      <button
                        onClick={() => startAppt(apt._id)}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/patients" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                <FiUserPlus className="text-2xl text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Add Patient</span>
              </Link>
              <Link to="/appointments" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group">
                <FiCalendar className="text-2xl text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Book Appt</span>
              </Link>
              <Link to="/prescriptions" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                <FiActivity className="text-2xl text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Prescribe</span>
              </Link>
              <Link to="/billing" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group">
                <FiDollarSign className="text-2xl text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Create Bill</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Revenue (last 6 months)</h3>
            <RevenueChart monthly={analytics?.monthlyRevenue || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
