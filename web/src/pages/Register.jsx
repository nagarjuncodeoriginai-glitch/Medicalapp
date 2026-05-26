import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../utils/api';

const specialties = [
  { value: 'general', label: 'General Physician' },
  { value: 'geriatric', label: 'Geriatric Medicine' },
  { value: 'cardiology', label: 'Cardiologist' },
  { value: 'ortho', label: 'Orthopedic' },
  { value: 'neuro', label: 'Neurologist' },
  { value: 'dental', label: 'Dentist' },
  { value: 'eye', label: 'Ophthalmologist' },
  { value: 'pediatric', label: 'Pediatrician' },
  { value: 'dermatology', label: 'Dermatologist' },
  { value: 'other', label: 'Other' },
];

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    specialty: 'general', clinicName: '', clinicCity: '', qualification: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Welcome! 30-day free trial activated.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-0 relative z-10">
        
        {/* Left Panel - Branding (2 cols) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col justify-between glass-card rounded-l-3xl p-8">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse-glow">
                <FaHeartbeat className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">DocClinic Pro</h1>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Elder Care Platform</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Start Your<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Free Trial</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              No credit card needed. Full access for 30 days.
            </p>
          </div>

          {/* What you get */}
          <div className="mt-8 space-y-3">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">Everything Included:</p>
            {[
              { icon: '📅', text: 'Elderly Appointment Management' },
              { icon: '💊', text: 'Medication Tracking & Reminders' },
              { icon: '🛡️', text: 'Insurance Claim Management' },
              { icon: '🏠', text: 'Home Care Visit Scheduling' },
              { icon: '💎', text: 'Monthly Retainer Billing' },
              { icon: '📱', text: 'WhatsApp Notifications' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-white/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Form (3 cols) */}
        <div className="lg:col-span-3 glass-card rounded-3xl lg:rounded-l-none lg:rounded-r-3xl p-8 md:p-10 overflow-y-auto max-h-[90vh]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaHeartbeat className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">DocClinic Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
          <p className="text-white/50 mb-6 text-sm">Join healthcare professionals managing elderly care digitally</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="input-field pl-10 py-3" placeholder="Dr. Name" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Phone</label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="input-field pl-10 py-3" placeholder="+91 98765 43210" required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                  className="input-field pl-10 py-3" placeholder="doctor@clinic.com" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
                  className="input-field pl-10 py-3" placeholder="Min 6 characters" required minLength={6} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Specialty</label>
                <select value={form.specialty} onChange={(e) => setForm({...form, specialty: e.target.value})}
                  className="input-field py-3">
                  {specialties.map(s => <option key={s.value} value={s.value} className="bg-[#1a1744] text-white">{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Qualification</label>
                <input type="text" value={form.qualification} onChange={(e) => setForm({...form, qualification: e.target.value})}
                  className="input-field py-3" placeholder="MBBS, MD" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Clinic Name</label>
                <input type="text" value={form.clinicName} onChange={(e) => setForm({...form, clinicName: e.target.value})}
                  className="input-field py-3" placeholder="Health Plus Clinic" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">City</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  <input type="text" value={form.clinicCity} onChange={(e) => setForm({...form, clinicCity: e.target.value})}
                    className="input-field pl-10 py-3" placeholder="Mumbai" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-sm mt-6">
              {loading ? 'Creating Account...' : <>Start 30-Day Free Trial <FiArrowRight /></>}
            </button>
          </form>

          <p className="text-center mt-6 text-white/40 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
