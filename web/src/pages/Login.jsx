import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/30">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg shadow-indigo-200/60 mb-4">
            <FiZap className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CareAI Pro</h1>
          <p className="text-sm text-slate-500 mt-1">AI-Powered Elder Care Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-6">Sign in to your clinic dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10" placeholder="doctor@clinic.com" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10" placeholder="Enter password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Signing in...</span>
              ) : (
                <span className="flex items-center gap-2"><FiZap className="text-sm" /> Sign In with AI</span>
              )}
            </button>
          </form>

          {/* Demo */}
          <div className="mt-5 p-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="ai-badge">AI Demo</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Pre-filled: <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono text-[10px]">admin@clinic.com</code> / <code className="bg-white px-1.5 py-0.5 rounded text-indigo-700 font-mono text-[10px]">admin123</code>
            </p>
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-slate-500">
          New here? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">Start Free Trial</Link>
        </p>

        {/* AI Features Preview */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['AI Scheduling', 'Drug Alerts', 'Risk Scoring', 'Smart Billing'].map(f => (
            <span key={f} className="text-[10px] font-medium text-slate-400 bg-white border border-slate-100 px-2.5 py-1 rounded-lg">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
