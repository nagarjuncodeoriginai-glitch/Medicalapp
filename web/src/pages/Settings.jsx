import React, { useState } from 'react';
import { FiUser, FiSave, FiClock, FiShield, FiRepeat, FiZap, FiActivity } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Brijesh', email: 'admin@clinic.com', phone: '+91 98765 43210', specialty: 'geriatric', clinicName: 'LifeCare Clinic', clinicAddress: 'Sector 21, Noida', qualification: 'MBBS, MD', registrationNo: 'MCI-78945', consultationFee: 500, retainerFee: 5000, workStart: '09:00', workEnd: '18:00' });

  return (
    <div className="space-y-5 max-w-3xl">
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">AI Configuration & Platform Management</p></div>

      {/* AI Engine Config */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.05), rgba(79,70,229,0.03))', borderColor: 'rgba(109,40,217,0.12)' }}>
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white/90">AI Engine Configuration</h3>
          <span className="ai-badge text-[8px] ml-auto">6 Modules</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { name: 'Drug Interaction Detection', icon: '💊', active: true },
            { name: 'Fall Risk Prediction', icon: '⚠️', active: true },
            { name: 'Vitals Pattern Analysis', icon: '❤️', active: true },
            { name: 'Schedule Optimization', icon: '📅', active: true },
            { name: 'Revenue Forecasting', icon: '📈', active: true },
            { name: 'Adherence Monitoring', icon: '✅', active: true },
          ].map((m, i) => (
            <label key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-purple-500/20 transition-all">
              <input type="checkbox" defaultChecked={m.active} className="w-3.5 h-3.5 rounded bg-white/5 border-purple-500/30 text-purple-500" />
              <span className="text-[10px]">{m.icon}</span>
              <span className="text-[11px] text-white/70 font-medium">{m.name}</span>
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success('Settings saved!'); }} className="space-y-4">
        {/* Profile */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4"><FiUser className="text-purple-400" /> Doctor Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Full Name</label><input className="input-field" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Email</label><input className="input-field" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Phone</label><input className="input-field" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Specialty</label><select className="input-field" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})}><option value="geriatric">Geriatric Medicine</option><option value="general">General</option><option value="cardiology">Cardiology</option></select></div>
          </div>
        </div>

        {/* Clinic */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-4"><FiClock className="text-blue-400" /> Clinic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Clinic Name</label><input className="input-field" value={profile.clinicName} onChange={(e) => setProfile({...profile, clinicName: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Fee (₹)</label><input className="input-field" type="number" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Hours</label><div className="flex gap-2"><input type="time" className="input-field" value={profile.workStart} onChange={(e) => setProfile({...profile, workStart: e.target.value})} /><input type="time" className="input-field" value={profile.workEnd} onChange={(e) => setProfile({...profile, workEnd: e.target.value})} /></div></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Address</label><input className="input-field" value={profile.clinicAddress} onChange={(e) => setProfile({...profile, clinicAddress: e.target.value})} /></div>
          </div>
        </div>

        {/* Retainer */}
        <div className="card border-purple-500/10">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-3"><FiRepeat className="text-purple-400" /> Monthly Retainer</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Fee (₹/month)</label><input className="input-field" type="number" value={profile.retainerFee} onChange={(e) => setProfile({...profile, retainerFee: e.target.value})} /></div>
            <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Includes</label><input className="input-field" defaultValue="2 visits, unlimited calls, AI monitoring" /></div>
          </div>
        </div>

        {/* Insurance */}
        <div className="card border-emerald-500/10">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-3"><FiShield className="text-emerald-400" /> Insurance Providers</h3>
          <div className="flex flex-wrap gap-2">
            {['Star Health', 'ICICI Lombard', 'Max Bupa', 'Niva Bupa', 'HDFC Ergo'].map(ins => (<span key={ins} className="badge-green text-[9px]">{ins}</span>))}
            <button type="button" className="badge-slate text-[9px] border-dashed hover:border-purple-500/20 hover:text-purple-400 transition-colors">+ Add</button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="card border-green-500/10">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2 mb-3"><FaWhatsapp className="text-green-400" /> WhatsApp</h3>
          <p className="text-[11px] text-gray-500 mb-3">Auto-send appointment reminders, medication alerts & prescription PDFs</p>
          <button type="button" className="btn-success text-xs"><FaWhatsapp /> Connect WhatsApp</button>
        </div>

        <button type="submit" className="btn-primary text-xs"><FiSave className="text-xs" /> Save Settings</button>
      </form>
    </div>
  );
}
