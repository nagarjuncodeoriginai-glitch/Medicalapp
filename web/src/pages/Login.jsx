import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiShield, FiCpu, FiActivity } from 'react-icons/fi';
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-glow" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)' }} />

      {/* Orbiting Dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
        <div className="absolute w-2 h-2 bg-indigo-400/60 rounded-full animate-orbit" />
        <div className="absolute w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-orbit" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
        <div className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-orbit" style={{ animationDuration: '15s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10 animate-in">
        {/* Left - Features */}
        <div className="hidden lg:flex flex-col justify-between card rounded-r-none border-r-0 p-10">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-gradient" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #6366f1)', backgroundSize: '200% 200%' }}>
                <FiZap className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CareAI Pro</h1>
                <p className="text-[11px] text-white/40 font-medium tracking-wider">ELDER CARE • AI POWERED</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              The Future of<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Elder Care</span><br />
              is Here
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              AI-powered platform that predicts health risks, prevents drug interactions, and automates care for elderly patients.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              { icon: FiCpu, label: 'AI Drug Alerts', desc: 'Detects interactions' },
              { icon: FiActivity, label: 'Risk Scoring', desc: 'Predicts fall risk' },
              { icon: FiShield, label: 'Insurance AI', desc: 'Auto-claims filing' },
              { icon: FiZap, label: 'Smart Schedule', desc: 'Optimises timing' },
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                <f.icon className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-white/80">{f.label}</p>
                <p className="text-[10px] text-white/30">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#6366f1','#8b5cf6','#a855f7','#ec4899'].map((c,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] flex items-center justify-center text-[9px] font-bold text-white" style={{ background: c }}>
                    {['DR','MD','RN','AI'][i]}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-white/40">Trusted by <span className="text-white/70 font-semibold">2,500+</span> doctors</p>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="card rounded-3xl lg:rounded-l-none p-8 md:p-10 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              <FiZap className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">CareAI Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-white/40 text-sm mb-8">Sign in to your AI-powered clinic</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-11" placeholder="doctor@clinic.com" required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-11 pr-11" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FiZap className="text-base" /> Sign In with AI
                </span>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 ai-glow rounded-2xl p-4">
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center border border-indigo-500/20">
                <FiZap className="text-indigo-400 text-xs" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/70">AI Demo Mode</p>
                <p className="text-[10px] text-white/40 mt-0.5 font-mono">admin@clinic.com / admin123</p>
              </div>
              <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" />
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-white/30">
            New here? <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Start Free Trial</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
