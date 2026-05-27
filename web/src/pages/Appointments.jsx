import React, { useState } from 'react';
import { FiPlus, FiCheck, FiX, FiPlay, FiHome, FiZap, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const appointments = [
  { id: '1', token: 1, name: 'Ramesh Gupta', age: 72, time: '09:00 AM', type: 'Routine Checkup', status: 'done', retainer: true, mode: 'clinic' },
  { id: '2', token: 2, name: 'Savitri Devi', age: 68, time: '09:30 AM', type: 'Medication Review', status: 'done', retainer: true, mode: 'clinic' },
  { id: '3', token: 3, name: 'Mohan Lal', age: 75, time: '10:00 AM', type: 'Home Visit', status: 'active', retainer: false, mode: 'home' },
  { id: '4', token: 4, name: 'Kamla Bai', age: 80, time: '10:30 AM', type: 'Insurance Consultation', status: 'waiting', retainer: true, mode: 'clinic' },
  { id: '5', token: 5, name: 'Suresh Patel', age: 65, time: '11:00 AM', type: 'Physiotherapy', status: 'waiting', retainer: false, mode: 'clinic' },
  { id: '6', token: 6, name: 'Padma Sharma', age: 71, time: '11:30 AM', type: 'Monthly Retainer Visit', status: 'waiting', retainer: true, mode: 'home' },
];

export default function Appointments() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);

  const statusBadge = { done: 'badge-green', active: 'badge-blue', waiting: 'badge-slate' };
  const statusLabel = { done: 'Done', active: 'Active', waiting: 'Waiting' };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Appointments</h1><p className="page-subtitle">AI-optimised schedule for today</p></div>
        <div className="flex gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field py-2 w-40" />
          <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Book</button>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="ai-glow rounded-2xl border border-indigo-100 p-4 flex items-center gap-3">
        <FiZap className="text-indigo-500 flex-shrink-0" />
        <p className="text-sm text-slate-700"><span className="font-semibold">AI Suggestion:</span> Reschedule Kamla Bai to morning — her medication timing conflicts with afternoon slot. <button className="text-indigo-600 font-medium ml-1">Apply</button></p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: appointments.length, color: '' },
          { label: 'Completed', value: 2, color: 'text-emerald-600' },
          { label: 'In Progress', value: 1, color: 'text-blue-600' },
          { label: 'Home Visits', value: 2, color: 'text-amber-600' },
          { label: 'Retainer', value: 4, color: 'text-violet-600' },
        ].map((s, i) => (
          <div key={i} className="card p-3 text-center"><p className={`text-xl font-bold ${s.color || 'text-slate-800'}`}>{s.value}</p><p className="text-[10px] text-slate-500">{s.label}</p></div>
        ))}
      </div>

      {/* Table */}
      <div className="card-flat p-0 overflow-hidden border border-slate-100 rounded-2xl">
        <table className="w-full">
          <thead className="bg-slate-50/80 border-b border-slate-100">
            <tr><th className="table-header">#</th><th className="table-header">Patient</th><th className="table-header">Time</th><th className="table-header">Type</th><th className="table-header">Mode</th><th className="table-header">Status</th><th className="table-header">Action</th></tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt.id} className={`border-b border-slate-50 hover:bg-slate-50/50 ${apt.status === 'active' ? 'bg-blue-50/30' : ''}`}>
                <td className="table-cell"><span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${apt.status === 'done' ? 'bg-emerald-50 text-emerald-700' : apt.status === 'active' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{apt.token}</span></td>
                <td className="table-cell"><p className="text-sm font-medium text-slate-800">{apt.name} <span className="text-slate-400 font-normal text-xs">({apt.age}y)</span></p>{apt.retainer && <span className="badge badge-purple text-[8px]">Retainer</span>}</td>
                <td className="table-cell text-sm font-medium text-slate-700">{apt.time}</td>
                <td className="table-cell text-xs text-slate-600">{apt.type}</td>
                <td className="table-cell">{apt.mode === 'home' ? <span className="badge badge-amber"><FiHome className="text-[9px]" /> Home</span> : <span className="badge badge-slate">Clinic</span>}</td>
                <td className="table-cell"><span className={`badge ${statusBadge[apt.status]}`}>{statusLabel[apt.status]}</span></td>
                <td className="table-cell">
                  {apt.status === 'waiting' && <button onClick={() => toast.success('Started!')} className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100"><FiPlay className="text-xs" /></button>}
                  {apt.status === 'active' && <button onClick={() => toast.success('Completed!')} className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 hover:bg-emerald-100"><FiCheck className="text-xs" /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-semibold text-slate-900">Book Appointment</h2><button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><FiX className="text-lg text-slate-400" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Booked!'); setShowAdd(false); }} className="space-y-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Date</label><input type="date" className="input-field" defaultValue={date} /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Time</label><select className="input-field"><option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Type</label><select className="input-field"><option>Routine Checkup</option><option>Medication Review</option><option>Home Visit</option><option>Insurance Consultation</option><option>Physiotherapy</option><option>Monthly Retainer Visit</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Mode</label><select className="input-field"><option>Clinic</option><option>Home Visit</option></select></div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Book</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
