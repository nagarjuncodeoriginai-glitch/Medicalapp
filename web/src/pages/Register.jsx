import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', specialty: 'general', clinicName: '', clinicCity: '', qualification: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Welcome! 30-day free trial started.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">DC</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-sm text-slate-500 mt-1">Start 30-day free trial — no card needed</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Full Name *</label><input className="input-field" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Dr. Name" required /></div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Phone *</label><input className="input-field" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" required /></div>
            </div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Email *</label><input className="input-field" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="doctor@clinic.com" required /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Password *</label><input className="input-field" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Minimum 6 characters" required minLength={6} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Specialty</label><select className="input-field" value={form.specialty} onChange={(e) => setForm({...form, specialty: e.target.value})}><option value="general">General Physician</option><option value="geriatric">Geriatric Medicine</option><option value="cardiology">Cardiologist</option><option value="ortho">Orthopedic</option><option value="neuro">Neurologist</option></select></div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Qualification</label><input className="input-field" value={form.qualification} onChange={(e) => setForm({...form, qualification: e.target.value})} placeholder="MBBS, MD" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Clinic Name</label><input className="input-field" value={form.clinicName} onChange={(e) => setForm({...form, clinicName: e.target.value})} placeholder="My Clinic" /></div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">City</label><input className="input-field" value={form.clinicCity} onChange={(e) => setForm({...form, clinicCity: e.target.value})} placeholder="Mumbai" /></div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">{loading ? 'Creating...' : 'Start Free Trial'}</button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm text-slate-500">Already have an account? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
}
