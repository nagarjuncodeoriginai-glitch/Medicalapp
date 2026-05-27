import React, { useState } from 'react';
import { FiPlus, FiClock, FiX, FiPrinter, FiTrash2, FiZap, FiAlertTriangle } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const prescriptions = [
  { id: '1', rx: 'RX-001', patient: 'Ramesh Gupta', age: 72, diagnosis: 'Hypertension + Diabetes', medicines: [{ name: 'Amlodipine 5mg', freq: '1-0-0', dur: '30 days' }, { name: 'Metformin 500mg', freq: '1-0-1', dur: '30 days' }, { name: 'Ecosprin 75mg', freq: '0-1-0', dur: '30 days' }], date: '15 Jan 2024', followUp: '15 Feb 2024', vitals: 'BP: 140/90 · Sugar: 180' },
  { id: '2', rx: 'RX-002', patient: 'Savitri Devi', age: 68, diagnosis: 'Rheumatoid Arthritis', medicines: [{ name: 'Hydroxychloroquine 200mg', freq: '1-0-1', dur: '30 days' }, { name: 'Folic Acid 5mg', freq: '1-0-0', dur: '30 days' }], date: '14 Jan 2024', followUp: '14 Feb 2024', vitals: 'BP: 130/80 · ESR: 45' },
  { id: '3', rx: 'RX-003', patient: 'Mohan Lal', age: 75, diagnosis: 'Heart Failure + COPD', medicines: [{ name: 'Furosemide 40mg', freq: '1-0-0', dur: '15 days' }, { name: 'Tiotropium Inhaler', freq: '1-0-0', dur: '30 days' }, { name: 'Digoxin 0.25mg', freq: '1-0-0', dur: '30 days' }], date: '13 Jan 2024', followUp: '28 Jan 2024', vitals: 'BP: 110/70 · SpO2: 92%', aiAlert: 'Digoxin + Furosemide: Monitor potassium' },
];

export default function Prescriptions() {
  const [showAdd, setShowAdd] = useState(false);
  const [meds, setMeds] = useState([{ name: '', freq: '', dur: '' }]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Medications & Prescriptions</h1><p className="page-subtitle">AI monitors drug interactions and refill schedules</p></div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> New Prescription</button>
      </div>

      {/* AI Alert */}
      <div className="card border-rose-100 bg-rose-50/30 flex items-start gap-3 p-4">
        <FiAlertTriangle className="text-rose-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-slate-800">AI Drug Interaction Alert</p>
          <p className="text-xs text-slate-600 mt-0.5">Kamla Bai: <span className="text-rose-600 font-medium">Warfarin + Aspirin</span> — high bleeding risk detected. Recommend discontinuing aspirin.</p>
        </div>
        <button className="btn-ghost text-rose-600 text-xs flex-shrink-0">Review</button>
      </div>

      {/* Refill Reminder */}
      <div className="ai-glow rounded-2xl border border-indigo-100 p-4 flex items-center gap-3">
        <FiZap className="text-indigo-500 flex-shrink-0" />
        <p className="text-sm text-slate-700"><span className="font-semibold">AI Refill Alert:</span> 3 patients need medication refills this week — Ramesh Gupta, Kamla Bai, Padma Sharma</p>
        <button className="btn-ghost text-xs text-green-700 flex-shrink-0"><FaWhatsapp className="text-green-600" /> Remind All</button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center"><FaPills className="text-indigo-600" /></div>
                <div>
                  <div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-slate-800">{rx.patient}</h3><span className="badge badge-slate text-[9px]">{rx.rx}</span></div>
                  <p className="text-[11px] text-slate-400">{rx.age}y · {rx.date} · {rx.vitals}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-0.5">{rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"><FaWhatsapp className="text-sm" /></button>
                <button className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100"><FiPrinter className="text-sm" /></button>
              </div>
            </div>

            {/* AI Alert for this prescription */}
            {rx.aiAlert && (
              <div className="mb-3 p-2.5 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                <FiZap className="text-amber-600 text-xs flex-shrink-0" />
                <p className="text-[11px] text-amber-800 font-medium">{rx.aiAlert}</p>
              </div>
            )}

            {/* Medicines */}
            <div className="bg-slate-50/80 rounded-xl p-3">
              <table className="w-full text-xs">
                <thead><tr className="text-slate-400 border-b border-slate-100"><th className="text-left pb-2 font-medium">#</th><th className="text-left pb-2 font-medium">Medicine</th><th className="text-left pb-2 font-medium">Dosage</th><th className="text-left pb-2 font-medium">Duration</th></tr></thead>
                <tbody>
                  {rx.medicines.map((m, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0"><td className="py-2 text-slate-400">{i+1}</td><td className="py-2 font-medium text-slate-700">{m.name}</td><td className="py-2 text-slate-600">{m.freq}</td><td className="py-2 text-slate-500">{m.dur}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs text-amber-700">
              <FiClock className="text-[11px]" /> Follow-up: {rx.followUp}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl animate-in my-8">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-semibold text-slate-900">Create Prescription</h2><button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><FiX className="text-lg text-slate-400" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Prescription created!'); setShowAdd(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Diagnosis</label><input className="input-field" placeholder="Hypertension, Diabetes..." /></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">BP</label><input className="input-field" placeholder="140/90" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Sugar</label><input className="input-field" placeholder="120" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">SpO2</label><input className="input-field" placeholder="98%" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Weight</label><input className="input-field" placeholder="70 kg" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label className="text-xs font-semibold text-slate-700">Medicines</label><button type="button" onClick={() => setMeds([...meds, { name: '', freq: '', dur: '' }])} className="text-xs text-indigo-600 font-medium">+ Add</button></div>
                {meds.map((_, i) => (
                  <div key={i} className="flex gap-2 mb-2"><input className="input-field flex-1" placeholder="Medicine + dosage" /><input className="input-field w-20" placeholder="1-0-1" /><input className="input-field w-20" placeholder="30 days" />{meds.length > 1 && <button type="button" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))} className="p-1.5 text-rose-500"><FiTrash2 className="text-sm" /></button>}</div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, diet..."></textarea></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Follow-up</label><input type="date" className="input-field" /></div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Create</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
