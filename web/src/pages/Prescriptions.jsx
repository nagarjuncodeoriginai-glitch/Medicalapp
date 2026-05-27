import React, { useState } from 'react';
import { FiPlus, FiClock, FiX, FiPrinter, FiTrash2, FiZap, FiAlertTriangle, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const prescriptions = [
  { id: '1', rx: 'RX-001', patient: 'Ramesh Gupta', age: 72, diagnosis: 'Hypertension + Diabetes', medicines: [{ name: 'Amlodipine 5mg', freq: '1-0-0', dur: '30 days', status: 'active' }, { name: 'Metformin 500mg', freq: '1-0-1', dur: '30 days', status: 'active' }, { name: 'Ecosprin 75mg', freq: '0-1-0', dur: '30 days', status: 'refill' }], date: '15 Jan 2024', followUp: '15 Feb 2024', vitals: 'BP: 140/90 · Sugar: 180', adherence: 85 },
  { id: '2', rx: 'RX-002', patient: 'Savitri Devi', age: 68, diagnosis: 'Rheumatoid Arthritis', medicines: [{ name: 'Hydroxychloroquine 200mg', freq: '1-0-1', dur: '30 days', status: 'active' }, { name: 'Folic Acid 5mg', freq: '1-0-0', dur: '30 days', status: 'active' }], date: '14 Jan 2024', followUp: '14 Feb 2024', vitals: 'BP: 130/80 · ESR: 45', adherence: 92 },
  { id: '3', rx: 'RX-003', patient: 'Mohan Lal', age: 75, diagnosis: 'Heart Failure + COPD', medicines: [{ name: 'Furosemide 40mg', freq: '1-0-0', dur: '15 days', status: 'refill' }, { name: 'Tiotropium Inhaler', freq: '1-0-0', dur: '30 days', status: 'active' }, { name: 'Digoxin 0.25mg', freq: '1-0-0', dur: '30 days', status: 'warning' }], date: '13 Jan 2024', followUp: '28 Jan 2024', vitals: 'BP: 110/70 · SpO2: 92%', adherence: 68, aiAlert: 'Digoxin + Furosemide: Monitor potassium levels' },
];

const medStatusConfig = {
  active: { color: '#10b981', icon: FiCheck, label: 'Active' },
  refill: { color: '#f59e0b', icon: FiClock, label: 'Refill Due' },
  warning: { color: '#ef4444', icon: FiAlertCircle, label: 'AI Alert' },
};

export default function Prescriptions() {
  const [showAdd, setShowAdd] = useState(false);
  const [meds, setMeds] = useState([{ name: '', freq: '', dur: '' }]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Medications & Prescriptions</h1>
          <p className="page-subtitle">AI monitors drug interactions, adherence, and refill schedules</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> New Prescription</button>
      </div>

      {/* AI Drug Interaction Alert */}
      <div className="card" style={{ borderColor: 'rgba(239,68,68,0.15)', background: 'linear-gradient(135deg, rgba(239,68,68,0.05), rgba(15,23,42,0.6))' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 border border-rose-500/15">
            <FiAlertTriangle className="text-rose-400 text-lg" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="ai-badge">AI Drug Alert</span>
              <span className="badge-red text-[8px]">Critical</span>
            </div>
            <p className="text-sm text-white/90 font-medium">Kamla Bai: <span className="text-rose-400">Warfarin + Aspirin</span> — High bleeding risk detected</p>
            <p className="text-xs text-white/40 mt-1">AI recommends discontinuing Aspirin and switching to Clopidogrel. Click review to see full analysis.</p>
          </div>
          <button className="btn-secondary text-xs py-2">Review</button>
        </div>
      </div>

      {/* Refill Timeline */}
      <div className="ai-glow rounded-3xl p-5">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <FiZap className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white/90">AI Refill Tracker</h3>
            <span className="ml-auto text-[10px] text-white/30">Auto-reminds via WhatsApp</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { patient: 'Ramesh Gupta', med: 'Ecosprin 75mg', daysLeft: 3, urgency: 'high' },
              { patient: 'Mohan Lal', med: 'Furosemide 40mg', daysLeft: 5, urgency: 'medium' },
              { patient: 'Padma Sharma', med: 'Metformin 500mg', daysLeft: 7, urgency: 'low' },
            ].map((r, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-white/80">{r.patient}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ${r.urgency === 'high' ? 'bg-rose-500/15 text-rose-400' : r.urgency === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                    {r.daysLeft} days
                  </span>
                </div>
                <p className="text-[10px] text-white/40">{r.med}</p>
                {/* Progress bar showing days remaining */}
                <div className="mt-2 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(10, 100 - (r.daysLeft / 30) * 100)}%`, background: r.urgency === 'high' ? '#ef4444' : r.urgency === 'medium' ? '#f59e0b' : '#10b981' }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 flex items-center gap-2 text-[11px] font-medium text-green-400 hover:text-green-300 transition-colors">
            <FaWhatsapp /> Send Refill Reminders to All
          </button>
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-5">
        {prescriptions.map(rx => (
          <div key={rx.id} className="card">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 flex items-center justify-center border border-indigo-500/15">
                  <FaPills className="text-indigo-400 text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white/90">{rx.patient}</h3>
                    <span className="badge-slate text-[8px]">{rx.rx}</span>
                  </div>
                  <p className="text-[11px] text-white/30 mt-0.5">{rx.age}y · {rx.date} · {rx.vitals}</p>
                  <p className="text-xs text-indigo-400 font-medium mt-0.5">{rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Adherence Ring */}
                <div className="relative w-11 h-11">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke={rx.adherence > 80 ? '#10b981' : rx.adherence > 60 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${rx.adherence * 0.88} 100`} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white/60">{rx.adherence}%</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 border border-green-500/10"><FaWhatsapp className="text-sm" /></button>
                  <button className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 border border-white/[0.06]"><FiPrinter className="text-sm" /></button>
                </div>
              </div>
            </div>

            {/* AI Alert */}
            {rx.aiAlert && (
              <div className="mb-4 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
                <FiZap className="text-amber-400 flex-shrink-0" />
                <p className="text-[11px] text-amber-300 font-medium">{rx.aiAlert}</p>
              </div>
            )}

            {/* Medicines - Visual Pill Tracker */}
            <div className="space-y-2">
              {rx.medicines.map((m, i) => {
                const sc = medStatusConfig[m.status];
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group">
                    {/* Pill visual */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${sc.color}15`, border: `1px solid ${sc.color}25` }}>
                      <sc.icon className="text-xs" style={{ color: sc.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white/80">{m.name}</p>
                      <p className="text-[10px] text-white/30">{m.freq} · {m.dur}</p>
                    </div>
                    <span className="badge text-[8px]" style={{ background: `${sc.color}15`, color: sc.color, border: `1px solid ${sc.color}25` }}>{sc.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Follow-up */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.04]">
              <FiClock className="text-amber-400 text-xs" />
              <span className="text-[11px] text-white/40">Follow-up: <span className="text-amber-400 font-medium">{rx.followUp}</span></span>
              <span className="ml-auto text-[9px] text-white/20">Adherence Score</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card w-full max-w-2xl animate-scale my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create Prescription</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10"><FiX className="text-white/40" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Prescription created! AI checking interactions...'); setShowAdd(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Diagnosis</label><input className="input-field" placeholder="Hypertension, Diabetes..." /></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">BP</label><input className="input-field" placeholder="140/90" /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Sugar</label><input className="input-field" placeholder="120" /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">SpO2</label><input className="input-field" placeholder="98%" /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Weight</label><input className="input-field" placeholder="70 kg" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Medicines</label><button type="button" onClick={() => setMeds([...meds, { name: '', freq: '', dur: '' }])} className="text-xs text-indigo-400 font-medium">+ Add Medicine</button></div>
                {meds.map((_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input className="input-field flex-1" placeholder="Medicine + dosage" />
                    <input className="input-field w-24" placeholder="1-0-1" />
                    <input className="input-field w-24" placeholder="30 days" />
                    {meds.length > 1 && <button type="button" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))} className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 hover:bg-rose-500/20"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, diet changes..."></textarea></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Follow-up Date</label><input type="date" className="input-field" /></div>
              </div>
              <div className="ai-glow rounded-2xl p-3">
                <div className="relative z-10 flex items-center gap-2">
                  <FiZap className="text-indigo-400 text-sm flex-shrink-0" />
                  <p className="text-[10px] text-white/50">AI will automatically check for <span className="text-indigo-300 font-medium">drug interactions</span>, suggest optimal dosage timing, and set up <span className="text-indigo-300 font-medium">refill reminders</span>.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Create Prescription</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
