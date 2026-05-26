import React, { useState } from 'react';
import { FiSearch, FiPlus, FiPhone, FiUser, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const demoPatients = [
  { _id: '1', patientId: 'PAT-0001', name: 'Rahul Sharma', phone: '9876543210', age: 35, gender: 'male', bloodGroup: 'B+', totalVisits: 8, lastVisit: '2024-01-15', totalBilled: 12000 },
  { _id: '2', patientId: 'PAT-0002', name: 'Priya Patel', phone: '9876543211', age: 28, gender: 'female', bloodGroup: 'A+', totalVisits: 3, lastVisit: '2024-01-14', totalBilled: 5500 },
  { _id: '3', patientId: 'PAT-0003', name: 'Amit Kumar', phone: '9876543212', age: 45, gender: 'male', bloodGroup: 'O+', totalVisits: 12, lastVisit: '2024-01-13', totalBilled: 25000 },
  { _id: '4', patientId: 'PAT-0004', name: 'Sneha Gupta', phone: '9876543213', age: 22, gender: 'female', bloodGroup: 'AB+', totalVisits: 2, lastVisit: '2024-01-12', totalBilled: 3000 },
  { _id: '5', patientId: 'PAT-0005', name: 'Rajesh Iyer', phone: '9876543214', age: 55, gender: 'male', bloodGroup: 'A-', totalVisits: 15, lastVisit: '2024-01-11', totalBilled: 45000 },
  { _id: '6', patientId: 'PAT-0006', name: 'Meera Singh', phone: '9876543215', age: 32, gender: 'female', bloodGroup: 'B-', totalVisits: 5, lastVisit: '2024-01-10', totalBilled: 8500 },
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
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">{patients.length} total patients registered</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <FiPlus /> Add New Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, phone, or patient ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-11"
        />
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(patient => (
          <div key={patient._id} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${patient.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-xs text-gray-500">{patient.patientId}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600">
                  <FiEdit2 className="text-sm" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600">
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FiUser className="text-gray-400" />
                <span>{patient.age}y, {patient.gender === 'male' ? 'M' : 'F'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded">{patient.bloodGroup}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiPhone className="text-gray-400" />
                <span>{patient.phone}</span>
              </div>
              <div className="text-gray-600">
                <span className="text-xs">{patient.totalVisits} visits</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm font-semibold text-emerald-600">&#8377;{patient.totalBilled.toLocaleString()}</span>
              <div className="flex gap-2">
                <button className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 flex items-center gap-1">
                  <FaWhatsapp /> Message
                </button>
                <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" className="input-field" placeholder="Patient name" required
                    value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" className="input-field" placeholder="9876543210" required
                    value={newPatient.phone} onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input type="number" className="input-field" placeholder="25"
                    value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="input-field" value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <input type="text" className="input-field" placeholder="B+"
                    value={newPatient.bloodGroup} onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="input-field" placeholder="Full address"
                  value={newPatient.address} onChange={(e) => setNewPatient({...newPatient, address: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
