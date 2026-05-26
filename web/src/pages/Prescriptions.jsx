import React, { useState } from 'react';
import { FiPlus, FiFileText, FiPrinter, FiX, FiTrash2, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const demoPrescriptions = [
  { _id: '1', prescriptionNo: 'RX-00001', patientId: { name: 'Ramesh Gupta', patientId: 'PAT-0001', age: 72 }, diagnosis: 'Hypertension + Type-2 Diabetes', medicines: [{ name: 'Amlodipine 5mg', frequency: '1-0-0', duration: '30 days', timing: 'morning' }, { name: 'Metformin 500mg', frequency: '1-0-1', duration: '30 days', timing: 'after food' }, { name: 'Ecosprin 75mg', frequency: '0-1-0', duration: '30 days', timing: 'after lunch' }], createdAt: '2024-01-15', followUp: '2024-02-15', vitals: { bp: '140/90', sugar: '180 mg/dl' } },
  { _id: '2', prescriptionNo: 'RX-00002', patientId: { name: 'Savitri Devi', patientId: 'PAT-0002', age: 68 }, diagnosis: 'Rheumatoid Arthritis', medicines: [{ name: 'Hydroxychloroquine 200mg', frequency: '1-0-1', duration: '30 days', timing: 'after food' }, { name: 'Folic Acid 5mg', frequency: '1-0-0', duration: '30 days', timing: 'morning' }], createdAt: '2024-01-14', followUp: '2024-02-14', vitals: { bp: '130/80', esr: '45 mm/hr' } },
  { _id: '3', prescriptionNo: 'RX-00003', patientId: { name: 'Mohan Lal', patientId: 'PAT-0003', age: 75 }, diagnosis: 'CHF + COPD', medicines: [{ name: 'Furosemide 40mg', frequency: '1-0-0', duration: '15 days', timing: 'morning' }, { name: 'Tiotropium Inhaler', frequency: '1-0-0', duration: '30 days', timing: 'morning' }, { name: 'Digoxin 0.25mg', frequency: '1-0-0', duration: '30 days', timing: 'morning' }], createdAt: '2024-01-13', followUp: '2024-01-28', vitals: { bp: '110/70', spo2: '92%' } },
];

export default function Prescriptions() {
  const [prescriptions] = useState(demoPrescriptions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '', timing: 'after-food' }]);

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', timing: 'after-food' }]);
  const removeMedicine = (idx) => setMedicines(medicines.filter((_, i) => i !== idx));

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Medications & Prescriptions</h1>
          <p className="text-white/50 mt-1 text-sm">Track elderly medications, create prescriptions</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <FiPlus /> New Prescription
        </button>
      </div>

      {/* Medication Alert */}
      <div className="glass-card rounded-2xl p-4 border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <FiAlertTriangle className="text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">3 patients have medication refills due this week</p>
            <p className="text-xs text-white/40 mt-0.5">Ramesh Gupta, Kamla Bai, Padma Sharma — send WhatsApp reminders</p>
          </div>
          <button className="btn-glass text-xs py-2 px-3 flex items-center gap-1.5">
            <FaWhatsapp className="text-green-400" /> Remind All
          </button>
        </div>
      </div>

      {/* Prescription List */}
      <div className="space-y-4 stagger-children">
        {prescriptions.map(rx => (
          <div key={rx._id} className="glass-card rounded-2xl p-5 hover:bg-white/[0.04] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center border border-indigo-500/20">
                  <FaPills className="text-indigo-400 text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{rx.patientId.name}</h3>
                    <span className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded font-mono">{rx.prescriptionNo}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{rx.patientId.patientId} • Age: {rx.patientId.age} • {rx.createdAt}</p>
                  <p className="text-xs font-medium text-violet-400 mt-1">{rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="Send via WhatsApp">
                  <FaWhatsapp className="text-sm" />
                </button>
                <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Print">
                  <FiPrinter className="text-sm" />
                </button>
              </div>
            </div>

            {/* Vitals */}
            {rx.vitals && (
              <div className="flex gap-3 mb-3 flex-wrap">
                {Object.entries(rx.vitals).map(([key, val]) => (
                  <span key={key} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white/60">
                    <span className="text-white/30 uppercase">{key}:</span> {val}
                  </span>
                ))}
              </div>
            )}

            {/* Medicines */}
            <div className="space-y-1.5 ml-0 md:ml-16">
              {rx.medicines.map((med, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="w-5 h-5 bg-violet-500/20 text-violet-400 rounded flex items-center justify-center text-[10px] font-bold">{i+1}</span>
                  <span className="text-sm font-medium text-white flex-1">{med.name}</span>
                  <span className="text-xs text-white/40 hidden sm:inline">{med.frequency}</span>
                  <span className="text-[10px] text-white/30 hidden sm:inline">•</span>
                  <span className="text-xs text-white/40 hidden sm:inline">{med.duration}</span>
                  <span className="text-[10px] text-blue-400/70 hidden md:inline">{med.timing}</span>
                </div>
              ))}
            </div>

            {/* Follow-up */}
            {rx.followUp && (
              <div className="flex items-center gap-2 mt-3 ml-0 md:ml-16">
                <FiClock className="text-amber-400 text-xs" />
                <span className="text-[11px] text-amber-400">Follow-up: {rx.followUp}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-card rounded-2xl w-full max-w-2xl p-6 animate-fade-in-up my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Prescription</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Prescription created!'); setShowAddModal(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Patient</label>
                  <select className="input-field py-3"><option className="bg-[#1a1744]">Select patient...</option><option className="bg-[#1a1744]">Ramesh Gupta</option><option className="bg-[#1a1744]">Savitri Devi</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Diagnosis</label>
                  <input type="text" className="input-field py-3" placeholder="e.g., Hypertension" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">BP</label><input className="input-field py-2.5" placeholder="140/90" /></div>
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">Sugar</label><input className="input-field py-2.5" placeholder="120" /></div>
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">SpO2</label><input className="input-field py-2.5" placeholder="98%" /></div>
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">Weight</label><input className="input-field py-2.5" placeholder="70 kg" /></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Medicines</label>
                  <button type="button" onClick={addMedicine} className="text-xs text-violet-400 font-medium hover:text-violet-300">+ Add Medicine</button>
                </div>
                {medicines.map((med, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="input-field flex-1 py-2.5" placeholder="Medicine name + dosage" />
                    <input className="input-field w-20 py-2.5" placeholder="1-0-1" />
                    <input className="input-field w-20 py-2.5" placeholder="30 days" />
                    <select className="input-field w-28 py-2.5">
                      <option className="bg-[#1a1744]">After food</option>
                      <option className="bg-[#1a1744]">Before food</option>
                      <option className="bg-[#1a1744]">Morning</option>
                      <option className="bg-[#1a1744]">Night</option>
                    </select>
                    {medicines.length > 1 && <button type="button" onClick={() => removeMedicine(idx)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"><FiTrash2 className="text-sm" /></button>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, diet changes..."></textarea></div>
                <div><label className="block text-xs font-medium text-white/60 mb-1.5">Follow-up Date</label><input type="date" className="input-field py-3" /></div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-glass flex-1 text-sm">Cancel</button>
                <button type="submit" className="btn-primary flex-1 text-sm">Create Prescription</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
