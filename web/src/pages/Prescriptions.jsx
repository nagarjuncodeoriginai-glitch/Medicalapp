import React, { useState } from 'react';
import { FiPlus, FiAlertTriangle, FiClock, FiX, FiPrinter, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const prescriptions = [
  { _id: '1', rxNo: 'RX-00001', patient: 'Ramesh Gupta', age: 72, diagnosis: 'Hypertension + Diabetes',
    medicines: [
      { name: 'Amlodipine 5mg', freq: '1-0-0', duration: '30 days', timing: 'Morning' },
      { name: 'Metformin 500mg', freq: '1-0-1', duration: '30 days', timing: 'After food' },
      { name: 'Ecosprin 75mg', freq: '0-1-0', duration: '30 days', timing: 'After lunch' },
    ], date: '15 Jan 2024', followUp: '15 Feb 2024', vitals: 'BP: 140/90, Sugar: 180 mg/dl' },
  { _id: '2', rxNo: 'RX-00002', patient: 'Savitri Devi', age: 68, diagnosis: 'Rheumatoid Arthritis',
    medicines: [
      { name: 'Hydroxychloroquine 200mg', freq: '1-0-1', duration: '30 days', timing: 'After food' },
      { name: 'Folic Acid 5mg', freq: '1-0-0', duration: '30 days', timing: 'Morning' },
    ], date: '14 Jan 2024', followUp: '14 Feb 2024', vitals: 'BP: 130/80, ESR: 45 mm/hr' },
  { _id: '3', rxNo: 'RX-00003', patient: 'Mohan Lal', age: 75, diagnosis: 'CHF + COPD',
    medicines: [
      { name: 'Furosemide 40mg', freq: '1-0-0', duration: '15 days', timing: 'Morning' },
      { name: 'Tiotropium Inhaler', freq: '1-0-0', duration: '30 days', timing: 'Morning' },
      { name: 'Digoxin 0.25mg', freq: '1-0-0', duration: '30 days', timing: 'Morning' },
    ], date: '13 Jan 2024', followUp: '28 Jan 2024', vitals: 'BP: 110/70, SpO2: 92%' },
];

export default function Prescriptions() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [meds, setMeds] = useState([{ name: '', freq: '', duration: '', timing: 'After food' }]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Medications & Prescriptions</h1>
          <p className="page-subtitle">Track medications, create prescriptions, send refill reminders</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-1.5">
          <FiPlus className="text-sm" /> New Prescription
        </button>
      </div>

      {/* Alert */}
      <div className="card border-amber-200 bg-amber-50/50 flex items-center gap-3 p-4">
        <FiAlertTriangle className="text-amber-600 text-lg flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">3 patients have medication refills due this week</p>
          <p className="text-xs text-slate-500">Ramesh Gupta, Kamla Bai, Padma Sharma</p>
        </div>
        <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"><FaWhatsapp className="text-green-600" /> Remind</button>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx._id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FaPills className="text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-800">{rx.patient}</h3>
                    <span className="badge badge-slate text-[9px]">{rx.rxNo}</span>
                  </div>
                  <p className="text-xs text-slate-400">{rx.age}y · {rx.date} · {rx.vitals}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-0.5">{rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100"><FaWhatsapp className="text-sm" /></button>
                <button className="p-1.5 rounded bg-slate-50 text-slate-600 hover:bg-slate-100"><FiPrinter className="text-sm" /></button>
              </div>
            </div>

            {/* Medicines Table */}
            <div className="bg-slate-50 rounded-lg p-3">
              <table className="w-full text-xs">
                <thead><tr className="text-slate-500"><th className="text-left pb-1.5 font-medium">#</th><th className="text-left pb-1.5 font-medium">Medicine</th><th className="text-left pb-1.5 font-medium">Dosage</th><th className="text-left pb-1.5 font-medium">Duration</th><th className="text-left pb-1.5 font-medium">Timing</th></tr></thead>
                <tbody>
                  {rx.medicines.map((med, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="py-1.5 text-slate-400">{i + 1}</td>
                      <td className="py-1.5 font-medium text-slate-700">{med.name}</td>
                      <td className="py-1.5 text-slate-600">{med.freq}</td>
                      <td className="py-1.5 text-slate-600">{med.duration}</td>
                      <td className="py-1.5 text-slate-500">{med.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Follow-up */}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-700">
              <FiClock className="text-[11px]" />
              <span>Follow-up: {rx.followUp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl animate-in my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Create Prescription</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><FiX className="text-lg text-slate-500" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Prescription created!'); setShowAddModal(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label><select className="input-field"><option>Select patient...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Diagnosis</label><input className="input-field" placeholder="Hypertension, Diabetes..." /></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">BP</label><input className="input-field" placeholder="140/90" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Sugar</label><input className="input-field" placeholder="120" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">SpO2</label><input className="input-field" placeholder="98%" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Weight</label><input className="input-field" placeholder="70 kg" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">Medicines</label>
                  <button type="button" onClick={() => setMeds([...meds, { name: '', freq: '', duration: '', timing: 'After food' }])} className="text-xs text-indigo-600 font-medium">+ Add</button>
                </div>
                {meds.map((_, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="input-field flex-1" placeholder="Medicine + dosage" />
                    <input className="input-field w-20" placeholder="1-0-1" />
                    <input className="input-field w-20" placeholder="30 days" />
                    <select className="input-field w-24"><option>After food</option><option>Before food</option><option>Morning</option><option>Night</option></select>
                    {meds.length > 1 && <button type="button" onClick={() => setMeds(meds.filter((_, i) => i !== idx))} className="p-1.5 text-red-500"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, diet..."></textarea></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Follow-up Date</label><input type="date" className="input-field" /></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Create Prescription</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
