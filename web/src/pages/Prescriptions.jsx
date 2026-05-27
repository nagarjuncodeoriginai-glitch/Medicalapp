import React, { useState } from 'react';
import { FiPlus, FiClock, FiX, FiPrinter, FiTrash2, FiZap, FiAlertTriangle, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const prescriptions = [
  { id: '1', rx: 'RX-001', patient: 'Ramesh Gupta', age: 72, diagnosis: 'Hypertension + Diabetes', medicines: [{ name: 'Amlodipine 5mg', freq: '1-0-0', dur: '30 days', status: 'active' }, { name: 'Metformin 500mg', freq: '1-0-1', dur: '30 days', status: 'active' }, { name: 'Ecosprin 75mg', freq: '0-1-0', dur: '30 days', status: 'refill' }], date: '15 Jan', followUp: '15 Feb', adherence: 85 },
  { id: '2', rx: 'RX-002', patient: 'Savitri Devi', age: 68, diagnosis: 'Rheumatoid Arthritis', medicines: [{ name: 'Hydroxychloroquine 200mg', freq: '1-0-1', dur: '30 days', status: 'active' }, { name: 'Folic Acid 5mg', freq: '1-0-0', dur: '30 days', status: 'active' }], date: '14 Jan', followUp: '14 Feb', adherence: 92 },
  { id: '3', rx: 'RX-003', patient: 'Mohan Lal', age: 75, diagnosis: 'Heart Failure + COPD', medicines: [{ name: 'Furosemide 40mg', freq: '1-0-0', dur: '15 days', status: 'refill' }, { name: 'Digoxin 0.25mg', freq: '1-0-0', dur: '30 days', status: 'warning' }], date: '13 Jan', followUp: '28 Jan', adherence: 68, aiAlert: 'Digoxin + Furosemide: Hypokalemia risk 62%' },
];

const medColors = { active: '#10b981', refill: '#f59e0b', warning: '#ef4444' };
const medLabels = { active: 'Active', refill: 'Refill Due', warning: 'AI Alert' };

export default function Prescriptions() {
  const [showAdd, setShowAdd] = useState(false);
  const [meds, setMeds] = useState([{ name: '', freq: '', dur: '' }]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Medications</h1>
          <p className="page-subtitle">AI Drug Interaction Engine + Adherence Monitoring</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs py-2"><FiPlus className="text-xs" /> New Prescription</button>
      </div>

      {/* AI Critical Alert */}
      <div className="card border-rose-500/10" style={{ background: 'rgba(239,68,68,0.03)' }}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0 border border-rose-500/15">
            <FiAlertTriangle className="text-rose-400 text-sm" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="ai-badge text-[8px]">AI Critical</span>
              <span className="badge-red text-[7px]">Immediate</span>
            </div>
            <p className="text-sm text-gray-200 font-medium">Kamla Bai: Warfarin + Aspirin — Bleeding risk 87%</p>
            <p className="text-[11px] text-gray-500 mt-0.5">AI recommends discontinuing Aspirin → switch to Clopidogrel 75mg</p>
          </div>
          <button className="btn-ghost text-rose-400 text-[10px]">Review</button>
        </div>
      </div>

      {/* AI Refill Tracker */}
      <div className="ai-glow">
        <div className="relative z-10 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FiZap className="text-purple-400 text-sm" />
            <h3 className="text-xs font-semibold text-white/85">AI Refill Tracker</h3>
          </div>
          <button className="btn-ghost text-green-400 text-[10px]"><FaWhatsapp className="text-[10px]" /> Remind All</button>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-2">
          {[
            { patient: 'Ramesh Gupta', med: 'Ecosprin 75mg', days: 3, urgency: 'high' },
            { patient: 'Mohan Lal', med: 'Furosemide 40mg', days: 5, urgency: 'medium' },
            { patient: 'Padma Sharma', med: 'Metformin 500mg', days: 8, urgency: 'low' },
          ].map((r, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[11px] font-semibold text-white/80">{r.patient}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${r.urgency === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15' : r.urgency === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'}`}>{r.days} days</span>
              </div>
              <p className="text-[10px] text-gray-500">{r.med}</p>
              <div className="mt-2 w-full h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.max(10, 100 - (r.days / 30) * 100)}%`, background: r.urgency === 'high' ? '#ef4444' : r.urgency === 'medium' ? '#f59e0b' : '#10b981' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                  <FaPills className="text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white/90">{rx.patient}</h3>
                    <span className="badge-slate text-[8px]">{rx.rx}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{rx.age}y · {rx.date}</p>
                  <p className="text-xs text-purple-300/80 font-medium mt-0.5">{rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Adherence Ring */}
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke={rx.adherence > 80 ? '#10b981' : rx.adherence > 60 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${rx.adherence * 0.88} 100`} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gray-400">{rx.adherence}%</span>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 border border-green-500/10"><FaWhatsapp className="text-[10px]" /></button>
                <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 border border-white/[0.06]"><FiPrinter className="text-[10px]" /></button>
              </div>
            </div>

            {/* AI Alert */}
            {rx.aiAlert && (
              <div className="mb-3 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-2">
                <FiZap className="text-amber-400 text-xs flex-shrink-0" />
                <p className="text-[10px] text-amber-300/80 font-medium">{rx.aiAlert}</p>
              </div>
            )}

            {/* Medicines */}
            <div className="space-y-1.5">
              {rx.medicines.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${medColors[m.status]}12`, border: `1px solid ${medColors[m.status]}25` }}>
                    {m.status === 'active' ? <FiCheck className="text-[10px]" style={{ color: medColors[m.status] }} /> : m.status === 'refill' ? <FiClock className="text-[10px]" style={{ color: medColors[m.status] }} /> : <FiAlertCircle className="text-[10px]" style={{ color: medColors[m.status] }} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white/80">{m.name}</p>
                    <p className="text-[10px] text-gray-500">{m.freq} · {m.dur}</p>
                  </div>
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded" style={{ color: medColors[m.status], background: `${medColors[m.status]}10`, border: `1px solid ${medColors[m.status]}20` }}>{medLabels[m.status]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.04] text-[10px] text-gray-500">
              <FiClock className="text-amber-400 text-[10px]" />
              <span>Follow-up: <span className="text-amber-400 font-medium">{rx.followUp}</span></span>
              <span className="ml-auto text-gray-600">Adherence AI</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="rounded-2xl w-full max-w-2xl p-6 animate-scale my-8" style={{ background: '#12101f', border: '1px solid rgba(109,40,217,0.12)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Create Prescription</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500"><FiX /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Created! AI checking drug interactions...'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Diagnosis</label><input className="input-field" placeholder="Hypertension..." /></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">BP</label><input className="input-field" placeholder="140/90" /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Sugar</label><input className="input-field" placeholder="120" /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">SpO2</label><input className="input-field" placeholder="98%" /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Weight</label><input className="input-field" placeholder="70kg" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-semibold text-gray-300">Medicines</label>
                  <button type="button" onClick={() => setMeds([...meds, { name: '', freq: '', dur: '' }])} className="text-[10px] text-purple-400 font-medium">+ Add</button>
                </div>
                {meds.map((_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder="Medicine + dosage" />
                    <input className="input-field w-20" placeholder="1-0-1" />
                    <input className="input-field w-20" placeholder="30 days" />
                    {meds.length > 1 && <button type="button" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))} className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400"><FiTrash2 className="text-xs" /></button>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, diet..."></textarea></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Follow-up</label><input type="date" className="input-field" /></div>
              </div>
              <div className="ai-glow">
                <p className="relative z-10 text-[10px] text-gray-400 flex items-center gap-1.5"><FiZap className="text-purple-400" /> AI will auto-detect drug interactions, set refill reminders & track adherence</p>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center text-xs">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
