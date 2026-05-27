import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: 'admin@clinic.com', password: 'admin123' });
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
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-white/10 animate-float" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <FiZap className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CareAI Pro</h1>
              <p className="text-xs text-white/60">AI-Powered Elder Care</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Complete Care<br />for Your Elderly<br />Patients
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Manage appointments, medications, insurance, home care visits and monthly retainers — all powered by AI.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {['AI Drug Interaction Alerts', 'Smart Appointment Scheduling', 'Insurance Claim Management', 'Home Care Visit Tracking', 'Monthly Retainer Billing'].map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-white/80">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiCheck className="text-[10px]" />
              </div>
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
              <FiZap className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">CareAI Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to your clinic dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10" placeholder="doctor@clinic.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10" placeholder="Enter password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Box */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <FiZap className="text-indigo-600 text-xs" />
              <span className="text-xs font-semibold text-indigo-700">Demo Access</span>
            </div>
            <p className="text-[11px] text-gray-600">
              Email: <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">admin@clinic.com</code> / 
              Password: <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono">admin123</code>
            </p>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            New here? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Start Free Trial</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
