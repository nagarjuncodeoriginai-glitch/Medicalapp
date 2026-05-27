import React, { useState } from 'react';
import { FiUser, FiSave, FiClock, FiShield, FiRepeat, FiZap } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Brijesh', email: 'admin@clinic.com', phone: '+91 98765 43210', specialty: 'geriatric', clinicName: 'LifeCare Clinic', clinicAddress: 'Sector 21, Noida', qualification: 'MBBS, MD (Geriatric Medicine)', registrationNo: 'MCI-78945', consultationFee: 500, retainerFee: 5000, workStart: '09:00', workEnd: '18:00' });

  return (
    <div className="space-y-5 max-w-3xl">
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Manage profile, AI settings, and integrations</p></div>

      {/* AI Config */}
      <div className="card bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100">
        <div className="flex items-center gap-2 mb-3"><FiZap className="text-indigo-600" /><h3 className="text-sm font-semibold text-gray-800">AI Features</h3><span className="ai-badge ml-auto">Active</span></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Drug Interaction Alerts', 'Patient Risk Scoring', 'Revenue Predictions', 'Schedule Optimisation', 'Refill Reminders', 'Fall Risk Detection'].map(f => (
            <label key={f} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-100 cursor-pointer hover:border-indigo-200 transition-colors">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-indigo-600 border-gray-300" />
              <span className="text-[11px] text-gray-700 font-medium">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); toast.success('Settings saved!'); }} className="space-y-5">
        <div className="card">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiUser className="text-indigo-500" /> Doctor Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Full Name</label><input className="input-field" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Email</label><input className="input-field" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Phone</label><input className="input-field" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Specialty</label><select className="input-field" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})}><option value="geriatric">Geriatric Medicine</option><option value="general">General Physician</option><option value="cardiology">Cardiologist</option></select></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Qualification</label><input className="input-field" value={profile.qualification} onChange={(e) => setProfile({...profile, qualification: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Registration No.</label><input className="input-field" value={profile.registrationNo} onChange={(e) => setProfile({...profile, registrationNo: e.target.value})} /></div>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title flex items-center gap-2 mb-4"><FiClock className="text-blue-500" /> Clinic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Clinic Name</label><input className="input-field" value={profile.clinicName} onChange={(e) => setProfile({...profile, clinicName: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Fee (₹)</label><input className="input-field" type="number" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Hours</label><div className="flex gap-2"><input type="time" className="input-field" value={profile.workStart} onChange={(e) => setProfile({...profile, workStart: e.target.value})} /><input type="time" className="input-field" value={profile.workEnd} onChange={(e) => setProfile({...profile, workEnd: e.target.value})} /></div></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Address</label><input className="input-field" value={profile.clinicAddress} onChange={(e) => setProfile({...profile, clinicAddress: e.target.value})} /></div>
          </div>
        </div>

        <div className="card border-indigo-100">
          <h3 className="section-title flex items-center gap-2 mb-3"><FiRepeat className="text-violet-500" /> Monthly Retainer</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Fee (₹/month)</label><input className="input-field" type="number" value={profile.retainerFee} onChange={(e) => setProfile({...profile, retainerFee: e.target.value})} /></div>
            <div><label className="text-xs font-medium text-gray-600 mb-1 block">Includes</label><input className="input-field" defaultValue="2 visits, unlimited calls, med tracking" /></div>
          </div>
        </div>

        <div className="card border-emerald-100">
          <h3 className="section-title flex items-center gap-2 mb-3"><FiShield className="text-emerald-500" /> Insurance Providers</h3>
          <div className="flex flex-wrap gap-2">
            {['Star Health', 'ICICI Lombard', 'Max Bupa', 'Niva Bupa', 'HDFC Ergo'].map(ins => (<span key={ins} className="badge-green">{ins}</span>))}
            <button type="button" className="badge-slate border-dashed border border-gray-300 hover:border-indigo-300 hover:text-indigo-600 transition-colors">+ Add</button>
          </div>
        </div>

        <div className="card border-green-100">
          <h3 className="section-title flex items-center gap-2 mb-3"><FaWhatsapp className="text-green-600" /> WhatsApp</h3>
          <p className="text-xs text-gray-500 mb-3">Auto-send reminders, medication alerts, and prescription PDFs</p>
          <button type="button" className="btn-success"><FaWhatsapp /> Connect WhatsApp</button>
        </div>

        <button type="submit" className="btn-primary"><FiSave className="text-sm" /> Save Settings</button>
      </form>
    </div>
  );
}
