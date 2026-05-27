import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiX, FiShield, FiRepeat, FiZap, FiActivity, FiHeart } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const patients = [
  { id: '1', name: 'Ramesh Gupta', phone: '98765-43210', age: 72, gender: 'M', blood: 'B+', visits: 24, billed: 48000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Hypertension, Diabetes', riskScore: 72, riskLevel: 'Medium', bp: '140/90', hr: 78 },
  { id: '2', name: 'Savitri Devi', phone: '98765-43211', age: 68, gender: 'F', blood: 'A+', visits: 18, billed: 35000, retainer: true, insurance: 'ICICI Lombard', meds: 3, condition: 'Rheumatoid Arthritis', riskScore: 35, riskLevel: 'Low', bp: '130/80', hr: 72 },
  { id: '3', name: 'Mohan Lal', phone: '98765-43212', age: 75, gender: 'M', blood: 'O+', visits: 32, billed: 62000, retainer: false, insurance: 'None', meds: 5, condition: 'Heart Failure, COPD', riskScore: 94, riskLevel: 'Critical', bp: '110/70', hr: 88 },
  { id: '4', name: 'Kamla Bai', phone: '98765-43213', age: 80, gender: 'F', blood: 'AB+', visits: 15, billed: 28000, retainer: true, insurance: 'Max Bupa', meds: 6, condition: 'Osteoporosis, Thyroid', riskScore: 89, riskLevel: 'High', bp: '150/95', hr: 65 },
  { id: '5', name: 'Suresh Patel', phone: '98765-43214', age: 65, gender: 'M', blood: 'A-', visits: 10, billed: 22000, retainer: false, insurance: 'Niva Bupa', meds: 2, condition: 'Knee Recovery', riskScore: 22, riskLevel: 'Low', bp: '125/82', hr: 70 },
  { id: '6', name: 'Padma Sharma', phone: '98765-43215', age: 71, gender: 'F', blood: 'B-', visits: 20, billed: 40000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Diabetes, Cataract', riskScore: 58, riskLevel: 'Medium', bp: '135/85', hr: 74 },
];

const riskColors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#a855f7', Low: '#10b981' };

export default function Patients() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">{patients.length} patients under AI-powered monitoring</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs py-2"><FiPlus className="text-xs" /> Register Patient</button>
      </div>

      {/* AI Risk Overview */}
      <div className="ai-glow flex items-center gap-3">
        <FiActivity className="relative z-10 text-purple-400" />
        <p className="relative z-10 text-sm text-gray-300"><span className="font-semibold text-white">AI Risk Engine:</span> 2 patients in <span className="text-rose-400 font-semibold">Critical/High</span> zone — Mohan Lal (SpO2 decline) & Kamla Bai (Fall risk)</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
        <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
        {filtered.map(p => (
          <div key={p.id} className="card group">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${p.gender === 'M' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>{p.name[0]}</div>
                <div>
                  <h3 className="text-sm font-semibold text-white/90">{p.name}</h3>
                  <p className="text-[10px] text-gray-500">{p.age}y · {p.gender} · {p.blood}</p>
                </div>
              </div>
              {/* AI Risk Ring */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke={riskColors[p.riskLevel]} strokeWidth="3" strokeDasharray={`${p.riskScore * 0.88} 100`} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold" style={{ color: riskColors[p.riskLevel] }}>{p.riskScore}</span>
                </div>
              </div>
            </div>

            {/* Condition */}
            <p className="text-xs text-purple-300/80 font-medium mb-2.5">{p.condition}</p>

            {/* Vitals Mini */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-[9px] text-gray-500">BP</p>
                <p className="text-[11px] font-bold text-white/70">{p.bp}</p>
              </div>
              <div className="flex-1 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-[9px] text-gray-500">HR</p>
                <p className="text-[11px] font-bold text-white/70">{p.hr}</p>
              </div>
              <div className="flex-1 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-[9px] text-gray-500">Meds</p>
                <p className="text-[11px] font-bold text-white/70">{p.meds}</p>
              </div>
              <div className="flex-1 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-[9px] text-gray-500">Visits</p>
                <p className="text-[11px] font-bold text-white/70">{p.visits}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.retainer && <span className="badge-purple text-[8px]">Retainer</span>}
              {p.insurance !== 'None' && <span className="badge-green text-[8px]"><FiShield className="text-[7px]" /> {p.insurance}</span>}
              <span className="badge text-[8px]" style={{ background: `${riskColors[p.riskLevel]}10`, color: riskColors[p.riskLevel], border: `1px solid ${riskColors[p.riskLevel]}25` }}>{p.riskLevel}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <span className="text-xs font-bold text-emerald-400">₹{(p.billed/1000).toFixed(0)}K</span>
              <div className="flex gap-1.5">
                <button className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"><FaWhatsapp className="text-xs" /></button>
                <button className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg hover:bg-purple-500/20 transition-colors border border-purple-500/15">Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl w-full max-w-lg p-6 animate-scale" style={{ background: '#12101f', border: '1px solid rgba(109,40,217,0.12)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Register Patient</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500"><FiX /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Patient registered! AI generating risk score...'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Full Name *</label><input className="input-field" placeholder="Patient name" required /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Phone *</label><input className="input-field" placeholder="+91 98765 43210" required /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Age</label><input className="input-field" type="number" placeholder="72" /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Gender</label><select className="input-field"><option value="M">Male</option><option value="F">Female</option></select></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Blood</label><input className="input-field" placeholder="B+" /></div>
              </div>
              <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Medical Conditions</label><input className="input-field" placeholder="Diabetes, Hypertension..." /></div>
              <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Insurance</label><input className="input-field" placeholder="Star Health, Max Bupa..." /></div>
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-purple-500/30 text-purple-500" />
                <span className="text-[11px] text-purple-300 font-medium">Monthly Retainer Plan — ₹5,000/month</span>
              </label>
              <div className="ai-glow mt-2">
                <p className="relative z-10 text-[10px] text-gray-400 flex items-center gap-1.5"><FiZap className="text-purple-400" /> AI will auto-generate health risk score based on age, conditions & medications</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center text-xs">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
