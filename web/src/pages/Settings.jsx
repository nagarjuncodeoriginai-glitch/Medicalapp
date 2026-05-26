import React, { useState } from 'react';
import { FiUser, FiSave, FiClock, FiShield, FiRepeat } from 'react-icons/fi';
import { FaWhatsapp, FaHeartbeat } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [profile, setProfile] = useState({
    name: user.name || '', email: user.email || '', phone: '',
    specialty: user.specialty || 'general', clinicName: user.clinicName || '',
    clinicAddress: '', clinicCity: '', qualification: '', registrationNo: '',
    consultationFee: 500, retainerFee: 5000, workStart: '09:00', workEnd: '18:00'
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="animate-fade-in-up space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1 text-sm">Manage clinic profile and care plans</p>
      </div>

      {/* Plan Info */}
      <div className="glass-card rounded-2xl p-5 border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-indigo-500/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white">Current Plan: <span className="text-violet-400">Pro</span></h3>
            <p className="text-xs text-white/40 mt-1">Full access to all elder care features. Billed monthly.</p>
          </div>
          <button className="btn-primary text-sm py-2.5">Manage Plan</button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Doctor Profile */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FiUser className="text-violet-400" /> Doctor Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input type="text" className="input-field py-3" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" className="input-field py-3" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Phone</label>
              <input type="tel" className="input-field py-3" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Specialty</label>
              <select className="input-field py-3" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})}>
                <option className="bg-[#1a1744]" value="general">General Physician</option>
                <option className="bg-[#1a1744]" value="geriatric">Geriatric Medicine</option>
                <option className="bg-[#1a1744]" value="cardiology">Cardiologist</option>
                <option className="bg-[#1a1744]" value="ortho">Orthopedic</option>
                <option className="bg-[#1a1744]" value="neuro">Neurologist</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Qualification</label>
              <input type="text" className="input-field py-3" value={profile.qualification} onChange={(e) => setProfile({...profile, qualification: e.target.value})} placeholder="MBBS, MD" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Registration No.</label>
              <input type="text" className="input-field py-3" value={profile.registrationNo} onChange={(e) => setProfile({...profile, registrationNo: e.target.value})} placeholder="MCI-12345" />
            </div>
          </div>
        </div>

        {/* Clinic Details */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FaHeartbeat className="text-emerald-400" /> Clinic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Clinic Name</label>
              <input type="text" className="input-field py-3" value={profile.clinicName} onChange={(e) => setProfile({...profile, clinicName: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Consultation Fee (₹)</label>
              <input type="number" className="input-field py-3" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Clinic Address</label>
              <input type="text" className="input-field py-3" value={profile.clinicAddress} onChange={(e) => setProfile({...profile, clinicAddress: e.target.value})} placeholder="Full address" />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FiClock className="text-blue-400" /> Working Hours
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Start Time</label>
              <input type="time" className="input-field py-3" value={profile.workStart} onChange={(e) => setProfile({...profile, workStart: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">End Time</label>
              <input type="time" className="input-field py-3" value={profile.workEnd} onChange={(e) => setProfile({...profile, workEnd: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Monthly Retainer Settings */}
        <div className="glass-card rounded-2xl p-6 border-amber-500/20">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FiRepeat className="text-amber-400" /> Monthly Retainer Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Retainer Fee (₹/month)</label>
              <input type="number" className="input-field py-3" value={profile.retainerFee} onChange={(e) => setProfile({...profile, retainerFee: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Includes</label>
              <input type="text" className="input-field py-3" placeholder="2 visits, unlimited calls, meds tracking" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-300">Retainer patients get priority scheduling, medication tracking, and monthly home visits included in their plan.</p>
          </div>
        </div>

        {/* Insurance Settings */}
        <div className="glass-card rounded-2xl p-6 border-emerald-500/20">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FiShield className="text-emerald-400" /> Insurance Integration
          </h3>
          <p className="text-xs text-white/40 mb-4">Connect insurance providers for seamless claim processing</p>
          <div className="flex flex-wrap gap-2">
            {['Star Health', 'ICICI Lombard', 'Max Bupa', 'Niva Bupa', 'HDFC Ergo'].map(ins => (
              <span key={ins} className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-medium">{ins}</span>
            ))}
            <button type="button" className="text-xs text-white/40 px-3 py-1.5 rounded-lg border border-dashed border-white/20 hover:border-white/40 transition-colors">+ Add Provider</button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="glass-card rounded-2xl p-6 border-green-500/20">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-5">
            <FaWhatsapp className="text-green-400" /> WhatsApp Integration
          </h3>
          <p className="text-xs text-white/40 mb-4">Auto-send appointment reminders, medication alerts & prescription PDFs</p>
          <button type="button" className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 flex items-center gap-2 text-sm transition-colors shadow-lg shadow-green-500/20">
            <FaWhatsapp /> Connect WhatsApp Business
          </button>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
          <FiSave /> Save All Settings
        </button>
      </form>
    </div>
  );
}
