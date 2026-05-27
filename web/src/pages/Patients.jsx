import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiX, FiShield, FiRepeat, FiZap, FiHeart, FiActivity } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const patients = [
  { id: '1', pid: 'PAT-001', name: 'Ramesh Gupta', phone: '9876543210', age: 72, gender: 'Male', blood: 'B+', visits: 24, billed: 48000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Hypertension, Diabetes', risk: 92, riskLevel: 'Medium', heartRate: 78, bp: '140/90', lastVisit: '2 days ago' },
  { id: '2', pid: 'PAT-002', name: 'Savitri Devi', phone: '9876543211', age: 68, gender: 'Female', blood: 'A+', visits: 18, billed: 35000, retainer: true, insurance: 'ICICI Lombard', meds: 3, condition: 'Rheumatoid Arthritis', risk: 45, riskLevel: 'Low', heartRate: 72, bp: '130/80', lastVisit: '5 days ago' },
  { id: '3', pid: 'PAT-003', name: 'Mohan Lal', phone: '9876543212', age: 75, gender: 'Male', blood: 'O+', visits: 32, billed: 62000, retainer: false, insurance: 'None', meds: 5, condition: 'Heart Failure, COPD', risk: 97, riskLevel: 'High', heartRate: 88, bp: '110/70', lastVisit: 'Today' },
  { id: '4', pid: 'PAT-004', name: 'Kamla Bai', phone: '9876543213', age: 80, gender: 'Female', blood: 'AB+', visits: 15, billed: 28000, retainer: true, insurance: 'Max Bupa', meds: 6, condition: 'Osteoporosis, Thyroid', risk: 95, riskLevel: 'High', heartRate: 65, bp: '150/95', lastVisit: '1 day ago' },
  { id: '5', pid: 'PAT-005', name: 'Suresh Patel', phone: '9876543214', age: 65, gender: 'Male', blood: 'A-', visits: 10, billed: 22000, retainer: false, insurance: 'Niva Bupa', meds: 2, condition: 'Knee Replacement Recovery', risk: 30, riskLevel: 'Low', heartRate: 70, bp: '125/82', lastVisit: '1 week ago' },
  { id: '6', pid: 'PAT-006', name: 'Padma Sharma', phone: '9876543215', age: 71, gender: 'Female', blood: 'B-', visits: 20, billed: 40000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Diabetes, Cataract', risk: 68, riskLevel: 'Medium', heartRate: 74, bp: '135/85', lastVisit: '3 days ago' },
];

const riskColor = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
const riskBg = { High: 'rgba(239,68,68,0.1)', Medium: 'rgba(245,158,11,0.1)', Low: 'rgba(16,185,129,0.1)' };

export default function Patients() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">{patients.length} elderly patients under AI-monitored care</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Register Patient</button>
      </div>

      {/* AI Risk Summary */}
      <div className="ai-glow rounded-3xl p-5 flex items-start gap-4">
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 flex items-center justify-center flex-shrink-0 border border-rose-500/20">
          <FiActivity className="text-rose-400 text-lg" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="ai-badge">AI Health Monitor</span>
          </div>
          <p className="text-sm text-white/90 font-medium">2 patients flagged as <span className="text-rose-400 font-bold">High Risk</span> — Mohan Lal (Heart Failure, SpO2 dropping) and Kamla Bai (Fall Risk + Drug Interaction)</p>
          <p className="text-xs text-white/30 mt-1">AI continuously analyses vitals, medications, and age factors to predict health events before they happen.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
        <input type="text" placeholder="Search by name, phone, or patient ID..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger">
        {filtered.map(p => (
          <div key={p.id} className="card group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${p.gender === 'Male' ? 'text-blue-400' : 'text-pink-400'}`} style={{ background: p.gender === 'Male' ? 'rgba(59,130,246,0.1)' : 'rgba(236,72,153,0.1)' }}>
                    {p.name[0]}
                  </div>
                  {/* Online indicator */}
                  {p.lastVisit === 'Today' && <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/90">{p.name}</h3>
                  <p className="text-[10px] text-white/30">{p.pid} · {p.age}y · {p.gender} · {p.blood}</p>
                </div>
              </div>
              {/* AI Risk Score Circle */}
              <div className="relative w-11 h-11 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke={riskColor[p.riskLevel]} strokeWidth="3" strokeDasharray={`${p.risk * 0.88} 100`} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', filter: `drop-shadow(0 0 4px ${riskColor[p.riskLevel]}40)` }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold" style={{ color: riskColor[p.riskLevel] }}>{p.risk}</span>
                </div>
              </div>
            </div>

            {/* Condition */}
            <p className="text-xs text-indigo-400 font-medium mb-3">{p.condition}</p>

            {/* Vitals Bar */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
                <FiHeart className="text-rose-400 text-xs mx-auto mb-0.5" />
                <p className="text-[10px] font-bold text-white/70">{p.heartRate}</p>
                <p className="text-[8px] text-white/25">BPM</p>
              </div>
              <div className="flex-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
                <FiActivity className="text-blue-400 text-xs mx-auto mb-0.5" />
                <p className="text-[10px] font-bold text-white/70">{p.bp}</p>
                <p className="text-[8px] text-white/25">BP</p>
              </div>
              <div className="flex-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
                <FaPills className="text-violet-400 text-xs mx-auto mb-0.5" />
                <p className="text-[10px] font-bold text-white/70">{p.meds}</p>
                <p className="text-[8px] text-white/25">Meds</p>
              </div>
              <div className="flex-1 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
                <FiCalendar className="text-amber-400 text-xs mx-auto mb-0.5" />
                <p className="text-[10px] font-bold text-white/70">{p.visits}</p>
                <p className="text-[8px] text-white/25">Visits</p>
              </div>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {p.retainer && <span className="badge-purple text-[8px]"><FiRepeat className="text-[7px]" /> Retainer</span>}
              {p.insurance !== 'None' && <span className="badge-green text-[8px]"><FiShield className="text-[7px]" /> {p.insurance}</span>}
              <span className="badge text-[8px]" style={{ background: riskBg[p.riskLevel], color: riskColor[p.riskLevel], border: `1px solid ${riskColor[p.riskLevel]}30` }}><FiZap className="text-[7px]" /> {p.riskLevel} Risk</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <div>
                <span className="text-sm font-bold text-emerald-400">₹{(p.billed/1000).toFixed(0)}K</span>
                <span className="text-[10px] text-white/20 ml-1.5">billed</span>
              </div>
              <div className="flex gap-1.5">
                <button className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all border border-green-500/10 hover:border-green-500/20">
                  <FaWhatsapp className="text-sm" />
                </button>
                <button className="px-3 h-8 rounded-xl text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all border border-indigo-500/10 hover:border-indigo-500/20">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-lg animate-scale">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Register New Patient</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <FiX className="text-white/40" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Patient registered! AI risk assessment started.'); setShowAdd(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Full Name *</label><input className="input-field" placeholder="Patient name" required /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Phone *</label><input className="input-field" placeholder="+91 98765 43210" required /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Age</label><input className="input-field" type="number" placeholder="72" /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Gender</label><select className="input-field"><option value="Male">Male</option><option value="Female">Female</option></select></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Blood</label><input className="input-field" placeholder="B+" /></div>
              </div>
              <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Medical Conditions</label><input className="input-field" placeholder="Diabetes, Hypertension, Heart Disease..." /></div>
              <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Insurance Provider</label><input className="input-field" placeholder="Star Health, Max Bupa, ICICI Lombard..." /></div>
              
              {/* Retainer Enroll */}
              <div className="p-4 rounded-2xl border border-indigo-500/15 bg-indigo-500/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded-lg bg-white/5 border-2 border-indigo-500/30 text-indigo-500 focus:ring-indigo-500/30" />
                  <div>
                    <p className="text-xs font-semibold text-white/80">Enroll in Monthly Retainer Plan</p>
                    <p className="text-[10px] text-white/30 mt-0.5">₹5,000/month — includes 2 visits, medication tracking, 24/7 AI monitoring</p>
                  </div>
                </label>
              </div>

              <div className="ai-glow rounded-2xl p-3 mt-2">
                <div className="relative z-10 flex items-center gap-2">
                  <FiZap className="text-indigo-400 text-sm" />
                  <p className="text-[11px] text-white/50">AI will automatically generate a <span className="text-indigo-300 font-medium">health risk score</span> after registration based on age, conditions, and medications.</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Register Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FiCalendar(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
