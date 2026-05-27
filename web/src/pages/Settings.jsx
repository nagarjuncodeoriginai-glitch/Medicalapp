import React, { useState } from 'react';
import { FiUser, FiSave, FiClock, FiShield, FiRepeat } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [profile, setProfile] = useState({
    name: user.name || '', email: user.email || '', phone: '', specialty: 'general',
    clinicName: user.clinicName || '', clinicAddress: '', qualification: '', registrationNo: '',
    consultationFee: 500, retainerFee: 5000, workStart: '09:00', workEnd: '18:00'
  });

  return (
    <div className="space-y-5 max-w-3xl">
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Manage clinic profile, plans, and integrations</p></div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success('Saved!'); }} className="space-y-5">
        {/* Profile */}
        <div className="card">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiUser className="text-indigo-500" /> Doctor Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Full Name</label><input className="input-field" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Email</label><input className="input-field" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Phone</label><input className="input-field" placeholder="+91 98765 43210" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Specialty</label><select className="input-field" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})}><option value="general">General Physician</option><option value="geriatric">Geriatric Medicine</option><option value="cardiology">Cardiologist</option><option value="ortho">Orthopedic</option></select></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Qualification</label><input className="input-field" placeholder="MBBS, MD" value={profile.qualification} onChange={(e) => setProfile({...profile, qualification: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Registration No.</label><input className="input-field" placeholder="MCI-12345" value={profile.registrationNo} onChange={(e) => setProfile({...profile, registrationNo: e.target.value})} /></div>
          </div>
        </div>

        {/* Clinic */}
        <div className="card">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiClock className="text-blue-500" /> Clinic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Clinic Name</label><input className="input-field" value={profile.clinicName} onChange={(e) => setProfile({...profile, clinicName: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Consultation Fee (₹)</label><input className="input-field" type="number" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Start Time</label><input type="time" className="input-field" value={profile.workStart} onChange={(e) => setProfile({...profile, workStart: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">End Time</label><input type="time" className="input-field" value={profile.workEnd} onChange={(e) => setProfile({...profile, workEnd: e.target.value})} /></div>
            <div className="md:col-span-2"><label className="text-xs font-medium text-slate-600 mb-1 block">Address</label><input className="input-field" placeholder="Clinic full address" value={profile.clinicAddress} onChange={(e) => setProfile({...profile, clinicAddress: e.target.value})} /></div>
          </div>
        </div>

        {/* Retainer */}
        <div className="card border-indigo-100">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiRepeat className="text-indigo-500" /> Monthly Retainer Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Retainer Fee (₹/month)</label><input className="input-field" type="number" value={profile.retainerFee} onChange={(e) => setProfile({...profile, retainerFee: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Includes</label><input className="input-field" placeholder="2 visits, unlimited calls, med tracking" /></div>
          </div>
          <p className="text-xs text-indigo-600 mt-3 p-2 bg-indigo-50 rounded-lg">Retainer patients get priority scheduling, medication tracking, and monthly home visits.</p>
        </div>

        {/* Insurance */}
        <div className="card border-emerald-100">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiShield className="text-emerald-500" /> Insurance Providers</h3>
          <div className="flex flex-wrap gap-2">
            {['Star Health', 'ICICI Lombard', 'Max Bupa', 'Niva Bupa', 'HDFC Ergo'].map(ins => (
              <span key={ins} className="badge badge-green">{ins}</span>
            ))}
            <button type="button" className="badge badge-slate border-dashed">+ Add Provider</button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="card border-green-100">
          <h3 className="section-title flex items-center gap-2 mb-3"><FaWhatsapp className="text-green-600" /> WhatsApp Integration</h3>
          <p className="text-xs text-slate-500 mb-3">Send appointment reminders, medication alerts, and prescription PDFs automatically.</p>
          <button type="button" className="btn-success flex items-center gap-1.5"><FaWhatsapp /> Connect WhatsApp Business</button>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-1.5"><FiSave className="text-sm" /> Save Settings</button>
      </form>
    </div>
  );
}
