import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiShield, FiActivity, FiHeart, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../utils/api';

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="particle" style={{
          width: `${Math.random() * 4 + 1}px`,
          height: `${Math.random() * 4 + 1}px`,
          left: `${Math.random() * 100}%`,
          background: ['#6d28d9', '#4f46e5', '#8b5cf6', '#a855f7', '#6366f1'][Math.floor(Math.random() * 5)],
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: Math.random() * 0.6 + 0.2,
        }} />
      ))}
    </div>
  );
}

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
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Particles />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full animate-glow" style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.12), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full animate-glow" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.08), transparent 70%)', filter: 'blur(40px)', animationDelay: '1.5s' }} />

      <div className="w-full max-w-[950px] grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10 animate-in">
        {/* Left - Branding */}
        <div className="hidden lg:flex flex-col justify-between rounded-l-3xl p-10" style={{ background: 'linear-gradient(160deg, #1a0533 0%, #0f0a1f 100%)', border: '1px solid rgba(109,40,217,0.15)', borderRight: 'none' }}>
          <div>
            <div className="flex items-center gap-3 mb-14">
              <div className="w-11 h-11 rounded-xl animate-gradient flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5, #6d28d9)', backgroundSize: '200% 200%' }}>
                <FiZap className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CareAI Pro</h1>
                <p className="text-[10px] text-purple-300/50 font-medium tracking-widest uppercase">AI Elder Care</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white leading-tight mb-3">
              AI-Powered<br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Elder Care</span><br />
              Platform
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Predictive health monitoring, smart drug interaction detection, and automated care management for elderly patients.
            </p>
          </div>

          {/* AI Features */}
          <div className="space-y-2.5 mt-8">
            {[
              { icon: FiActivity, text: 'AI Health Risk Prediction', desc: 'Predict falls & emergencies' },
              { icon: FiShield, text: 'Smart Drug Interaction Engine', desc: 'Prevent dangerous combinations' },
              { icon: FiHeart, text: 'Vitals Pattern Recognition', desc: 'Detect anomalies early' },
              { icon: FiZap, text: 'Auto Schedule Optimization', desc: 'AI arranges best timings' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-purple-500/20 transition-all group">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon className="text-purple-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80">{f.text}</p>
                  <p className="text-[10px] text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['#6d28d9','#4f46e5','#7c3aed','#2563eb'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0f0a1f] flex items-center justify-center text-[8px] font-bold text-white" style={{ background: c }}>
                  {['DR','AI','MD','RN'][i]}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">Trusted by <span className="text-white/70 font-semibold">2,500+</span> doctors across India</p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex flex-col justify-center rounded-3xl lg:rounded-l-none p-8 md:p-10" style={{ background: 'rgba(15,10,31,0.8)', border: '1px solid rgba(109,40,217,0.12)', backdropFilter: 'blur(20px)' }}>
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}>
              <FiZap className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">CareAI Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to your AI-powered clinic</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10" placeholder="doctor@clinic.com" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2"><FiZap /> Sign In</span>
              )}
            </button>
          </form>

          {/* Demo */}
          <div className="mt-6 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="ai-badge text-[8px]">Demo</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
            </div>
            <p className="text-[11px] text-gray-400 font-mono">admin@clinic.com / admin123</p>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            New here? <Link to="/register" className="text-purple-400 font-semibold hover:text-purple-300">Start Free Trial</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
