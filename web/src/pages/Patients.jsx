import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiUser, FiX, FiEdit2, FiTrash2, FiHeart, FiShield } from 'react-icons/fi';
import { FaWhatsapp, FaPills } from 'react-icons/fa';
import toast from 'react-hot-toast';

const demoPatients = [
  { _id: '1', patientId: 'PAT-0001', name: 'Ramesh Gupta', phone: '9876543210', age: 72, gender: 'male', bloodGroup: 'B+', totalVisits: 24, lastVisit: '2024-01-15', totalBilled: 48000, retainer: true, insurance: 'Star Health', medications: 4, condition: 'Hypertension, Diabetes' },
  { _id: '2', patientId: 'PAT-0002', name: 'Savitri Devi', phone: '9876543211', age: 68, gender: 'female', bloodGroup: 'A+', totalVisits: 18, lastVisit: '2024-01-14', totalBilled: 35000, retainer: true, insurance: 'ICICI Lombard', medications: 3, condition: 'Arthritis' },
  { _id: '3', patientId: 'PAT-0003', name: 'Mohan Lal', phone: '9876543212', age: 75, gender: 'male', bloodGroup: 'O+', totalVisits: 32, lastVisit: '2024-01-13', totalBilled: 62000, retainer: false, insurance: 'None', medications: 5, condition: 'Heart Disease, COPD' },
  { _id: '4', patientId: 'PAT-0004', name: 'Kamla Bai', phone: '9876543213', age: 80, gender: 'female', bloodGroup: 'AB+', totalVisits: 15, lastVisit: '2024-01-12', totalBilled: 28000, retainer: true, insurance: 'Max Bupa', medications: 6, condition: 'Osteoporosis, Thyroid' },
  { _id: '5', patientId: 'PAT-0005', name: 'Suresh Patel', phone: '9876543214', age: 65, gender: 'male', bloodGroup: 'A-', totalVisits: 10, lastVisit: '2024-01-11', totalBilled: 22000, retainer: false, insurance: 'Niva Bupa', medications: 2, condition: 'Joint Pain' },
  { _id: '6', patientId: 'PAT-0006', name: 'Padma Sharma', phone: '9876543215', age: 71, gender: 'female', bloodGroup: 'B-', totalVisits: 20, lastVisit: '2024-01-10', totalBilled: 40000, retainer: true, insurance: 'Star Health', medications: 4, condition: 'Diabetes, Cataract' },
];

export default function Patients() {
  const [patients] = useState(demoPatients);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', phone: '', age: '', gender: 'male', bloodGroup: '', address: '' });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.patientId.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    toast.success('Patient added successfully!');
    setShowAddModal(false);
    setNewPatient({ name: '', phone: '', age: '', gender: 'male', bloodGroup: '', address: '' });
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Elderly Patients</h1>
          <p className="text-white/50 mt-1 text-sm">{patients.length} patients under care</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <FiPlus /> Register Patient
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by name, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="flex gap-2">
          <button className="btn-glass text-xs py-2 px-4">All</button>
          <button className="btn-glass text-xs py-2 px-4 opacity-60">Retainer</button>
          <button className="btn-glass text-xs py-2 px-4 opacity-60">Insured</button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
        {filtered.map(patient => (
          <div key={patient._id} className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${patient.gender === 'male' ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-blue-400' : 'bg-gradient-to-br from-pink-500/30 to-rose-500/30 text-pink-400'}`}>
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{patient.name}</h3>
                  <p className="text-[11px] text-white/40">{patient.patientId} • {patient.age}y</p>
                </div>
              </div>
              <div className="flex gap-1">
                {patient.retainer && (
                  <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium border border-amber-500/20">RETAINER</span>
                )}
              </div>
            </div>

            {/* Condition */}
            <p className="text-xs text-violet-400 font-medium mb-3">{patient.condition}</p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FiPhone className="text-white/30 text-[10px]" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FiHeart className="text-rose-400/60 text-[10px]" />
                <span>{patient.bloodGroup}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FaPills className="text-blue-400/60 text-[10px]" />
                <span>{patient.medications} medicines</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FiShield className="text-emerald-400/60 text-[10px]" />
                <span className="truncate">{patient.insurance}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-3 border-t border-white/5">
              <div className="text-center">
                <p className="text-sm font-bold text-white">{patient.totalVisits}</p>
                <p className="text-[9px] text-white/30">Visits</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-emerald-400">₹{(patient.totalBilled/1000).toFixed(0)}K</p>
                <p className="text-[9px] text-white/30">Billed</p>
              </div>
              <div className="flex gap-1.5">
                <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="WhatsApp">
                  <FaWhatsapp className="text-xs" />
                </button>
                <button className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors" title="View">
                  <FiUser className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Register Elderly Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors">
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Full Name *</label>
                  <input type="text" className="input-field py-3" placeholder="Patient name" required
                    value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Phone *</label>
                  <input type="tel" className="input-field py-3" placeholder="9876543210" required
                    value={newPatient.phone} onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Age</label>
                  <input type="number" className="input-field py-3" placeholder="72"
                    value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Gender</label>
                  <select className="input-field py-3" value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}>
                    <option value="male" className="bg-[#1a1744]">Male</option>
                    <option value="female" className="bg-[#1a1744]">Female</option>
                    <option value="other" className="bg-[#1a1744]">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Blood</label>
                  <input type="text" className="input-field py-3" placeholder="B+"
                    value={newPatient.bloodGroup} onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Medical Conditions</label>
                <input type="text" className="input-field py-3" placeholder="Diabetes, Hypertension..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Insurance Provider</label>
                <input type="text" className="input-field py-3" placeholder="Star Health, Max Bupa..." />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-amber-500" />
                <span className="text-xs text-amber-300">Enroll in Monthly Retainer Plan (₹5,000/month)</span>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-glass flex-1 text-sm">Cancel</button>
                <button type="submit" className="btn-primary flex-1 text-sm">Register Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
