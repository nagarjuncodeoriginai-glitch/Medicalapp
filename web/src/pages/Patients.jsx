import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiX, FiShield, FiRepeat, FiZap, FiHeart, FiActivity } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const patients = [
  { id: '1', pid: 'PAT-001', name: 'Ramesh Gupta', phone: '98765-43210', age: 72, gender: 'Male', blood: 'B+', visits: 24, billed: 48000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Hypertension, Diabetes', risk: 'Medium' },
  { id: '2', pid: 'PAT-002', name: 'Savitri Devi', phone: '98765-43211', age: 68, gender: 'Female', blood: 'A+', visits: 18, billed: 35000, retainer: true, insurance: 'ICICI Lombard', meds: 3, condition: 'Rheumatoid Arthritis', risk: 'Low' },
  { id: '3', pid: 'PAT-003', name: 'Mohan Lal', phone: '98765-43212', age: 75, gender: 'Male', blood: 'O+', visits: 32, billed: 62000, retainer: false, insurance: 'None', meds: 5, condition: 'Heart Failure, COPD', risk: 'High' },
  { id: '4', pid: 'PAT-004', name: 'Kamla Bai', phone: '98765-43213', age: 80, gender: 'Female', blood: 'AB+', visits: 15, billed: 28000, retainer: true, insurance: 'Max Bupa', meds: 6, condition: 'Osteoporosis, Thyroid', risk: 'High' },
  { id: '5', pid: 'PAT-005', name: 'Suresh Patel', phone: '98765-43214', age: 65, gender: 'Male', blood: 'A-', visits: 10, billed: 22000, retainer: false, insurance: 'Niva Bupa', meds: 2, condition: 'Knee Recovery', risk: 'Low' },
  { id: '6', pid: 'PAT-006', name: 'Padma Sharma', phone: '98765-43215', age: 71, gender: 'Female', blood: 'B-', visits: 20, billed: 40000, retainer: true, insurance: 'Star Health', meds: 4, condition: 'Diabetes, Cataract', risk: 'Medium' },
];

const riskStyles = { High: 'badge-red', Medium: 'badge-amber', Low: 'badge-green' };

export default function Patients() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Patients</h1><p className="page-subtitle">{patients.length} elderly patients under AI-monitored care</p></div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Register Patient</button>
      </div>

      {/* AI Summary */}
      <div className="ai-glow p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0"><FiZap className="text-indigo-600 text-sm" /></div>
        <p className="text-sm text-gray-700"><span className="font-semibold">AI Health Monitor:</span> 2 patients flagged <span className="text-red-600 font-semibold">High Risk</span> — Mohan Lal (Heart Failure) and Kamla Bai (Fall Risk)</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
        {filtered.map(p => (
          <div key={p.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${p.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>{p.name[0]}</div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-[10px] text-gray-400">{p.pid} · {p.age}y · {p.gender}</p>
                </div>
              </div>
              <span className={`badge ${riskStyles[p.risk]}`}><FiZap className="text-[8px]" /> {p.risk}</span>
            </div>

            <p className="text-xs text-indigo-600 font-medium mb-3">{p.condition}</p>

            <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-gray-500 mb-3">
              <span className="flex items-center gap-1.5"><FiPhone className="text-gray-400 text-[10px]" /> {p.phone}</span>
              <span className="flex items-center gap-1.5"><FaPills className="text-blue-400 text-[10px]" /> {p.meds} medicines</span>
              <span className="flex items-center gap-1.5"><FiShield className="text-emerald-500 text-[10px]" /> {p.insurance}</span>
              <span className="flex items-center gap-1.5"><FiRepeat className="text-violet-500 text-[10px]" /> {p.visits} visits</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {p.retainer && <span className="badge-purple text-[8px]">Retainer</span>}
                <span className="text-xs font-bold text-emerald-600">₹{(p.billed/1000).toFixed(0)}K</span>
              </div>
              <div className="flex gap-1.5">
                <button className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"><FaWhatsapp className="text-xs" /></button>
                <button className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl animate-scale border border-gray-100">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">Register Patient</h2><button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-gray-400" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Patient registered! AI risk assessment started.'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Full Name *</label><input className="input-field" placeholder="Patient name" required /></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Phone *</label><input className="input-field" placeholder="+91 98765 43210" required /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Age</label><input className="input-field" type="number" placeholder="72" /></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Gender</label><select className="input-field"><option>Male</option><option>Female</option></select></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Blood</label><input className="input-field" placeholder="B+" /></div>
              </div>
              <div><label className="text-xs font-medium text-gray-600 mb-1 block">Medical Conditions</label><input className="input-field" placeholder="Diabetes, Hypertension..." /></div>
              <div><label className="text-xs font-medium text-gray-600 mb-1 block">Insurance Provider</label><input className="input-field" placeholder="Star Health, Max Bupa..." /></div>
              <label className="flex items-center gap-2.5 p-3 bg-indigo-50 rounded-xl border border-indigo-100 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 border-gray-300" />
                <span className="text-xs text-indigo-700 font-medium">Enroll in Monthly Retainer Plan (₹5,000/month)</span>
              </label>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Register</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
