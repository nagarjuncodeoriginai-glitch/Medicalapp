import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiX, FiShield, FiRepeat } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const patients = [
  { _id: '1', patientId: 'PAT-0001', name: 'Ramesh Gupta', phone: '9876543210', age: 72, gender: 'Male', bloodGroup: 'B+', visits: 24, billed: 48000, retainer: true, insurance: 'Star Health', medications: 4, condition: 'Hypertension, Diabetes' },
  { _id: '2', patientId: 'PAT-0002', name: 'Savitri Devi', phone: '9876543211', age: 68, gender: 'Female', bloodGroup: 'A+', visits: 18, billed: 35000, retainer: true, insurance: 'ICICI Lombard', medications: 3, condition: 'Rheumatoid Arthritis' },
  { _id: '3', patientId: 'PAT-0003', name: 'Mohan Lal', phone: '9876543212', age: 75, gender: 'Male', bloodGroup: 'O+', visits: 32, billed: 62000, retainer: false, insurance: 'None', medications: 5, condition: 'Heart Failure, COPD' },
  { _id: '4', patientId: 'PAT-0004', name: 'Kamla Bai', phone: '9876543213', age: 80, gender: 'Female', bloodGroup: 'AB+', visits: 15, billed: 28000, retainer: true, insurance: 'Max Bupa', medications: 6, condition: 'Osteoporosis, Thyroid' },
  { _id: '5', patientId: 'PAT-0005', name: 'Suresh Patel', phone: '9876543214', age: 65, gender: 'Male', bloodGroup: 'A-', visits: 10, billed: 22000, retainer: false, insurance: 'Niva Bupa', medications: 2, condition: 'Knee Replacement Recovery' },
  { _id: '6', patientId: 'PAT-0006', name: 'Padma Sharma', phone: '9876543215', age: 71, gender: 'Female', bloodGroup: 'B-', visits: 20, billed: 40000, retainer: true, insurance: 'Star Health', medications: 4, condition: 'Diabetes, Cataract' },
];

export default function Patients() {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">{patients.length} elderly patients under care</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-1.5">
          <FiPlus className="text-sm" /> Register Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input type="text" placeholder="Search name, phone, or ID..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="input-field pl-9" />
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(patient => (
          <div key={patient._id} className="card hover:shadow-md transition-shadow">
            {/* Top Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${patient.gender === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{patient.name}</h3>
                  <p className="text-[11px] text-slate-400">{patient.patientId} · {patient.age}y · {patient.gender}</p>
                </div>
              </div>
              {patient.retainer && <span className="badge badge-purple text-[9px]">Retainer</span>}
            </div>

            {/* Condition */}
            <p className="text-xs text-indigo-600 font-medium mb-3">{patient.condition}</p>

            {/* Info */}
            <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-600 mb-3">
              <div className="flex items-center gap-1.5"><FiPhone className="text-slate-400 text-[10px]" /> {patient.phone}</div>
              <div className="flex items-center gap-1.5"><FaPills className="text-blue-400 text-[10px]" /> {patient.medications} medicines</div>
              <div className="flex items-center gap-1.5"><FiShield className="text-emerald-400 text-[10px]" /> {patient.insurance}</div>
              <div className="flex items-center gap-1.5"><FiRepeat className="text-purple-400 text-[10px]" /> {patient.visits} visits</div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-sm font-semibold text-emerald-600">₹{(patient.billed / 1000).toFixed(0)}K billed</span>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100" title="WhatsApp">
                  <FaWhatsapp className="text-sm" />
                </button>
                <button className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded font-medium hover:bg-indigo-100">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl animate-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Register Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <FiX className="text-lg text-slate-500" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Patient registered!'); setShowAddModal(false); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Full Name *</label><input className="input-field" placeholder="Patient name" required /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Phone *</label><input className="input-field" placeholder="9876543210" required /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Age</label><input className="input-field" type="number" placeholder="72" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Gender</label><select className="input-field"><option>Male</option><option>Female</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Blood Group</label><input className="input-field" placeholder="B+" /></div>
              </div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Medical Conditions</label><input className="input-field" placeholder="Diabetes, Hypertension..." /></div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Insurance Provider</label><input className="input-field" placeholder="Star Health, Max Bupa..." /></div>
              <label className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg border border-indigo-100 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                <span className="text-xs text-indigo-700 font-medium">Enroll in Monthly Retainer Plan (₹5,000/month)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Register Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
