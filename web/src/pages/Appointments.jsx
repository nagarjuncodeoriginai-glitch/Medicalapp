import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiCheck, FiX, FiPlay, FiHome, FiRepeat } from 'react-icons/fi';
import toast from 'react-hot-toast';

const appointments = [
  { _id: '1', token: 1, name: 'Ramesh Gupta', age: 72, phone: '9876543210', time: '09:00 AM', type: 'Routine Checkup', status: 'completed', retainer: true, mode: 'clinic' },
  { _id: '2', token: 2, name: 'Savitri Devi', age: 68, phone: '9876543211', time: '09:30 AM', type: 'Medication Review', status: 'completed', retainer: true, mode: 'clinic' },
  { _id: '3', token: 3, name: 'Mohan Lal', age: 75, phone: '9876543212', time: '10:00 AM', type: 'Home Visit', status: 'in-progress', retainer: false, mode: 'home' },
  { _id: '4', token: 4, name: 'Kamla Bai', age: 80, phone: '9876543213', time: '10:30 AM', type: 'Insurance Consultation', status: 'waiting', retainer: true, mode: 'clinic' },
  { _id: '5', token: 5, name: 'Suresh Patel', age: 65, phone: '9876543214', time: '11:00 AM', type: 'Physiotherapy', status: 'waiting', retainer: false, mode: 'clinic' },
  { _id: '6', token: 6, name: 'Padma Sharma', age: 71, phone: '9876543215', time: '11:30 AM', type: 'Monthly Retainer Visit', status: 'waiting', retainer: true, mode: 'home' },
];

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  const completed = appointments.filter(a => a.status === 'completed').length;
  const homeVisits = appointments.filter(a => a.mode === 'home').length;
  const retainerVisits = appointments.filter(a => a.retainer).length;

  const statusBadge = {
    completed: 'badge-green',
    'in-progress': 'badge-blue',
    waiting: 'badge-slate',
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage daily schedule and home visits</p>
        </div>
        <div className="flex gap-2">
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field py-2 w-40" />
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-1.5"><FiPlus className="text-sm" /> Book</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="card p-3 text-center"><p className="text-xl font-bold text-slate-800">{appointments.length}</p><p className="text-[10px] text-slate-500">Total</p></div>
        <div className="card p-3 text-center"><p className="text-xl font-bold text-emerald-600">{completed}</p><p className="text-[10px] text-slate-500">Completed</p></div>
        <div className="card p-3 text-center"><p className="text-xl font-bold text-blue-600">1</p><p className="text-[10px] text-slate-500">In Progress</p></div>
        <div className="card p-3 text-center"><p className="text-xl font-bold text-amber-600">{homeVisits}</p><p className="text-[10px] text-slate-500">Home Visits</p></div>
        <div className="card p-3 text-center"><p className="text-xl font-bold text-purple-600">{retainerVisits}</p><p className="text-[10px] text-slate-500">Retainer</p></div>
      </div>

      {/* List */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="table-header">#</th>
              <th className="table-header">Patient</th>
              <th className="table-header">Time</th>
              <th className="table-header">Type</th>
              <th className="table-header">Mode</th>
              <th className="table-header">Status</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt._id} className={`border-b border-slate-50 hover:bg-slate-50/50 ${apt.status === 'in-progress' ? 'bg-blue-50/30' : ''}`}>
                <td className="table-cell"><span className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-600">{apt.token}</span></td>
                <td className="table-cell">
                  <p className="text-sm font-medium text-slate-800">{apt.name} <span className="text-slate-400 font-normal">({apt.age}y)</span></p>
                  <p className="text-[10px] text-slate-400">{apt.phone}</p>
                </td>
                <td className="table-cell text-sm text-slate-700 font-medium">{apt.time}</td>
                <td className="table-cell">
                  <span className="text-xs text-slate-600">{apt.type}</span>
                  {apt.retainer && <span className="badge badge-purple text-[8px] ml-1.5">Retainer</span>}
                </td>
                <td className="table-cell">
                  {apt.mode === 'home' ? (
                    <span className="badge badge-amber flex items-center gap-1 w-fit"><FiHome className="text-[10px]" /> Home</span>
                  ) : (
                    <span className="badge badge-slate">Clinic</span>
                  )}
                </td>
                <td className="table-cell"><span className={`badge ${statusBadge[apt.status]}`}>{apt.status === 'in-progress' ? 'Active' : apt.status === 'completed' ? 'Done' : 'Waiting'}</span></td>
                <td className="table-cell">
                  {apt.status === 'waiting' && <button onClick={() => toast.success('Started!')} className="p-1.5 bg-indigo-50 rounded text-indigo-600 hover:bg-indigo-100"><FiPlay className="text-xs" /></button>}
                  {apt.status === 'in-progress' && <button onClick={() => toast.success('Completed!')} className="p-1.5 bg-emerald-50 rounded text-emerald-600 hover:bg-emerald-100"><FiCheck className="text-xs" /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl animate-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Book Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><FiX className="text-lg text-slate-500" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Booked!'); setShowAddModal(false); }} className="space-y-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label><select className="input-field"><option>Select patient...</option><option>Ramesh Gupta (PAT-0001)</option><option>Savitri Devi (PAT-0002)</option><option>Mohan Lal (PAT-0003)</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Date</label><input type="date" className="input-field" defaultValue={selectedDate} /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Time</label><select className="input-field"><option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>11:30 AM</option><option>12:00 PM</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Type</label><select className="input-field"><option>Routine Checkup</option><option>Medication Review</option><option>Home Visit</option><option>Insurance Consultation</option><option>Physiotherapy</option><option>Monthly Retainer Visit</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Mode</label><select className="input-field"><option value="clinic">Clinic Visit</option><option value="home">Home Visit</option></select></div>
              </div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Notes</label><textarea className="input-field" rows={2} placeholder="Patient condition, special needs..."></textarea></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
