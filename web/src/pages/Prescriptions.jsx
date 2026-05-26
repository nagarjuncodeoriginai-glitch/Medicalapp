import React, { useState } from 'react';
import { FiPlus, FiFileText, FiPrinter, FiX, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const demoPrescriptions = [
  { _id: '1', prescriptionNo: 'RX-00001', patientId: { name: 'Rahul Sharma', patientId: 'PAT-0001', age: 35 }, diagnosis: 'Viral Fever', medicines: [{ name: 'Paracetamol 500mg', frequency: '1-0-1', duration: '5 days' }, { name: 'Cetirizine 10mg', frequency: '0-0-1', duration: '3 days' }], createdAt: '2024-01-15' },
  { _id: '2', prescriptionNo: 'RX-00002', patientId: { name: 'Priya Patel', patientId: 'PAT-0002', age: 28 }, diagnosis: 'Migraine', medicines: [{ name: 'Sumatriptan 50mg', frequency: 'SOS', duration: 'As needed' }], createdAt: '2024-01-14' },
  { _id: '3', prescriptionNo: 'RX-00003', patientId: { name: 'Amit Kumar', patientId: 'PAT-0003', age: 45 }, diagnosis: 'Hypertension', medicines: [{ name: 'Amlodipine 5mg', frequency: '1-0-0', duration: '30 days' }, { name: 'Telmisartan 40mg', frequency: '1-0-0', duration: '30 days' }], createdAt: '2024-01-13' },
];

export default function Prescriptions() {
  const [prescriptions] = useState(demoPrescriptions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '', timing: 'after-food' }]);

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', timing: 'after-food' }]);
  const removeMedicine = (idx) => setMedicines(medicines.filter((_, i) => i !== idx));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-500 mt-1">Create and manage digital prescriptions</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <FiPlus /> New Prescription
        </button>
      </div>

      {/* Prescription List */}
      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx._id} className="card hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <FiFileText className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{rx.patientId.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{rx.prescriptionNo}</span>
                  </div>
                  <p className="text-sm text-gray-500">{rx.patientId.patientId} | Age: {rx.patientId.age} | {rx.createdAt}</p>
                  <p className="text-sm font-medium text-blue-600 mt-1">Diagnosis: {rx.diagnosis}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-50 rounded-lg text-green-600 hover:bg-green-100" title="Send via WhatsApp">
                  <FaWhatsapp />
                </button>
                <button className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100" title="Print">
                  <FiPrinter />
                </button>
              </div>
            </div>
            <div className="mt-4 pl-16">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Medicines:</p>
              <div className="space-y-1">
                {rx.medicines.map((med, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded flex items-center justify-center text-xs font-bold">{i+1}</span>
                    <span className="font-medium text-gray-900">{med.name}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">{med.frequency}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">{med.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 animate-fade-in my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Prescription</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Prescription created!'); setShowAddModal(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select className="input-field"><option>Select patient...</option><option>Rahul Sharma</option><option>Priya Patel</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                  <input type="text" className="input-field" placeholder="e.g., Viral Fever" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">BP</label><input className="input-field" placeholder="120/80" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input className="input-field" placeholder="70" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label><input className="input-field" placeholder="98.6" /></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Medicines</label>
                  <button type="button" onClick={addMedicine} className="text-xs text-blue-600 font-medium hover:text-blue-700">+ Add Medicine</button>
                </div>
                {medicines.map((med, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="input-field flex-1 py-2" placeholder="Medicine name" />
                    <input className="input-field w-24 py-2" placeholder="1-0-1" />
                    <input className="input-field w-24 py-2" placeholder="5 days" />
                    <select className="input-field w-28 py-2"><option>After food</option><option>Before food</option><option>Empty stomach</option></select>
                    {medicines.length > 1 && <button type="button" onClick={() => removeMedicine(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>}
                  </div>
                ))}
              </div>

              <div><label className="block text-sm font-medium text-gray-700 mb-1">Advice</label><textarea className="input-field" rows={2} placeholder="Rest, drink fluids..."></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label><input type="date" className="input-field" /></div>

              <div className="flex gap-3 pt-4">
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
