import React, { useState } from 'react';
import { FiPlus, FiCheck, FiX, FiPlay, FiHome, FiZap, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const appointments = [
  { id: '1', token: 1, name: 'Ramesh Gupta', age: 72, time: '09:00 AM', type: 'Routine Checkup', status: 'done', retainer: true, mode: 'clinic' },
  { id: '2', token: 2, name: 'Savitri Devi', age: 68, time: '09:30 AM', type: 'Medication Review', status: 'done', retainer: true, mode: 'clinic' },
  { id: '3', token: 3, name: 'Mohan Lal', age: 75, time: '10:00 AM', type: 'Home Visit', status: 'active', retainer: false, mode: 'home' },
  { id: '4', token: 4, name: 'Kamla Bai', age: 80, time: '10:30 AM', type: 'Insurance Consult', status: 'waiting', retainer: true, mode: 'clinic' },
  { id: '5', token: 5, name: 'Suresh Patel', age: 65, time: '11:00 AM', type: 'Physiotherapy', status: 'waiting', retainer: false, mode: 'clinic' },
  { id: '6', token: 6, name: 'Padma Sharma', age: 71, time: '11:30 AM', type: 'Retainer Visit', status: 'waiting', retainer: true, mode: 'home' },
];

export default function Appointments() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h1 className="page-title">Appointments</h1><p className="page-subtitle">AI-optimised schedule — 2/6 completed</p></div>
        <div className="flex gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field py-2 w-40 text-sm" />
          <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Book</button>
        </div>
      </div>

      {/* AI Tip */}
      <div className="ai-glow p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0"><FiZap className="text-indigo-600 text-sm" /></div>
        <p className="text-sm text-gray-700"><span className="font-semibold">AI Suggestion:</span> Move Kamla Bai to 9:30 AM — her BP medication peaks at 11 AM causing drowsiness.</p>
        <button onClick={() => toast.success('Schedule optimised!')} className="btn-ghost text-indigo-600 flex-shrink-0">Apply</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[{ l: 'Total', v: 6, c: 'text-gray-800' }, { l: 'Done', v: 2, c: 'text-emerald-600' }, { l: 'Active', v: 1, c: 'text-blue-600' }, { l: 'Home', v: 2, c: 'text-amber-600' }, { l: 'Retainer', v: 4, c: 'text-violet-600' }].map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm"><p className={`text-xl font-bold ${s.c}`}>{s.v}</p><p className="text-[10px] text-gray-500 uppercase">{s.l}</p></div>
        ))}
      </div>

      {/* List */}
      <div className="card-flat overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr><th className="table-header">#</th><th className="table-header">Patient</th><th className="table-header">Time</th><th className="table-header">Type</th><th className="table-header">Mode</th><th className="table-header">Status</th><th className="table-header">Action</th></tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${a.status === 'active' ? 'bg-blue-50/30' : ''}`}>
                <td className="table-cell"><span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${a.status === 'done' ? 'bg-emerald-100 text-emerald-700' : a.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{a.token}</span></td>
                <td className="table-cell"><p className="text-sm font-medium text-gray-800">{a.name} <span className="text-gray-400 font-normal">({a.age}y)</span></p>{a.retainer && <span className="badge-purple text-[8px]">Retainer</span>}</td>
                <td className="table-cell text-sm text-gray-700 font-medium">{a.time}</td>
                <td className="table-cell text-xs text-gray-600">{a.type}</td>
                <td className="table-cell">{a.mode === 'home' ? <span className="badge-amber"><FiHome className="text-[9px]" /> Home</span> : <span className="badge-slate">Clinic</span>}</td>
                <td className="table-cell"><span className={`badge ${a.status === 'done' ? 'badge-green' : a.status === 'active' ? 'badge-blue' : 'badge-slate'}`}>{a.status === 'done' ? 'Done' : a.status === 'active' ? 'Active' : 'Waiting'}</span></td>
                <td className="table-cell">
                  {a.status === 'waiting' && <button onClick={() => toast.success('Started!')} className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100"><FiPlay className="text-xs" /></button>}
                  {a.status === 'active' && <button onClick={() => toast.success('Completed!')} className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 hover:bg-emerald-100"><FiCheck className="text-xs" /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-scale border border-gray-100">
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">Book Appointment</h2><button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-gray-400" /></button></div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Booked! AI will optimise timing.'); setShowAdd(false); }} className="space-y-3">
              <div><label className="text-xs font-medium text-gray-600 mb-1 block">Patient</label><select className="input-field"><option>Select...</option><option>Ramesh Gupta</option><option>Savitri Devi</option><option>Mohan Lal</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Date</label><input type="date" className="input-field" defaultValue={date} /></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Time</label><select className="input-field"><option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Type</label><select className="input-field"><option>Routine Checkup</option><option>Medication Review</option><option>Home Visit</option><option>Insurance Consultation</option><option>Physiotherapy</option></select></div>
                <div><label className="text-xs font-medium text-gray-600 mb-1 block">Mode</label><select className="input-field"><option>Clinic</option><option>Home Visit</option></select></div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button><button type="submit" className="btn-primary flex-1 justify-center">Book</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
