import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome back, Dr. ${data.user.name}!`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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

      {/* Main Card */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
        
        {/* Left - Branding */}
        <div className="hidden lg:flex flex-col justify-between glass-card rounded-l-3xl p-10">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 animate-pulse-glow">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DocClinic Pro</h1>
                <p className="text-xs text-white/50">Elder Care Management</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Complete Care<br />for Your<br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Elderly Patients</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Manage appointments, medications, insurance, home care visits & monthly retainers — all in one beautiful platform.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="space-y-3 mt-8">
            <div className="flex flex-wrap gap-2">
              {['Appointments', 'Medications', 'Insurance', 'Home Care', 'Retainer'].map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 border-2 border-[#1a1744] flex items-center justify-center text-white text-[10px] font-bold">
                    {['DR','MD','RN','PT'][i-1]}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs">Trusted by 2,500+ healthcare professionals</p>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="glass-card rounded-3xl lg:rounded-l-none lg:rounded-r-3xl p-8 md:p-10 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaHeartbeat className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">DocClinic Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-white/50 mb-8 text-sm">Sign in to manage your clinic</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-11"
                  placeholder="doctor@clinic.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-11 pr-11"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500" />
                <span className="text-xs text-white/50">Remember me</span>
              </label>
              <a href="#" className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
              {loading ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              New to DocClinic?{' '}
              <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Start Free Trial</Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <p className="text-[11px] text-violet-300 text-center">
              Demo: <span className="font-mono">admin@clinic.com</span> / <span className="font-mono">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
