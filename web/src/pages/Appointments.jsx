import React, { useState } from 'react';
import { FiPlus, FiCheck, FiX, FiPlay, FiHome, FiZap, FiClock, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const appointments = [
  { id: '1', token: 1, name: 'Ramesh Gupta', age: 72, time: '09:00 AM', type: 'Routine Checkup', status: 'done', retainer: true, mode: 'clinic', aiNote: null },
  { id: '2', token: 2, name: 'Savitri Devi', age: 68, time: '09:30 AM', type: 'Medication Review', status: 'done', retainer: true, mode: 'clinic', aiNote: null },
  { id: '3', token: 3, name: 'Mohan Lal', age: 75, time: '10:00 AM', type: 'Home Visit', status: 'active', retainer: false, mode: 'home', aiNote: 'SpO2 declining — carry portable O2' },
  { id: '4', token: 4, name: 'Kamla Bai', age: 80, time: '10:30 AM', type: 'Insurance Consult', status: 'waiting', retainer: true, mode: 'clinic', aiNote: 'Conflict: BP med peaks at 11 AM — suggest reschedule to 9 AM' },
  { id: '5', token: 5, name: 'Suresh Patel', age: 65, time: '11:00 AM', type: 'Physiotherapy', status: 'waiting', retainer: false, mode: 'clinic', aiNote: null },
  { id: '6', token: 6, name: 'Padma Sharma', age: 71, time: '11:30 AM', type: 'Retainer Visit', status: 'waiting', retainer: true, mode: 'home', aiNote: null },
];

export default function Appointments() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);
  const done = appointments.filter(a => a.status === 'done').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">AI auto-scheduling with conflict detection — {done}/{appointments.length} done</p>
        </div>
        <div className="flex gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field py-2 w-40 text-xs" />
          <button onClick={() => setShowAdd(true)} className="btn-primary text-xs py-2"><FiPlus className="text-xs" /> Book</button>
        </div>
      </div>

      {/* AI Conflict Alert */}
      <div className="ai-glow flex items-start gap-3">
        <div className="relative z-10 w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/15">
          <FiAlertTriangle className="text-amber-400 text-sm" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="ai-badge text-[8px]">AI Conflict</span>
          </div>
          <p className="text-sm text-gray-200 font-medium">Kamla Bai's 10:30 slot conflicts with medication timing</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Her Amlodipine peaks at 11 AM causing drowsiness. AI suggests moving to 9:00 AM for better alertness during consultation.</p>
        </div>
        <div className="relative z-10 flex gap-2">
          <button onClick={() => toast.success('Rescheduled to 9:00 AM!')} className="btn-primary text-[10px] py-1.5 px-3">Apply Fix</button>
          <button className="btn-ghost text-[10px]">Dismiss</button>
        </div>
      </div>

      {/* Progress + Stats */}
      <div className="card-flat">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Day Progress</span>
          <span className="text-xs font-bold text-white/70">{done}/{appointments.length}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden mb-4">
          <div className="h-full rounded-full animate-gradient transition-all duration-1000" style={{ width: `${(done / appointments.length) * 100}%`, background: 'linear-gradient(90deg, #6d28d9, #4f46e5, #6d28d9)', backgroundSize: '200% 100%' }} />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { l: 'Total', v: appointments.length, c: '#a78bfa' },
            { l: 'Done', v: done, c: '#10b981' },
            { l: 'Active', v: 1, c: '#3b82f6' },
            { l: 'Home', v: 2, c: '#f59e0b' },
            { l: 'Retainer', v: 4, c: '#6d28d9' },
          ].map((s, i) => (
            <div key={i} className="text-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
              <p className="text-[9px] text-gray-500 uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="card-flat">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title flex items-center gap-2"><FiClock className="text-purple-400" /> Timeline</h3>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" /> Live</span>
        </div>

        <div className="relative">
          <div className="absolute left-[46px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent" />

          <div className="space-y-1">
            {appointments.map(apt => {
              const colors = { done: '#10b981', active: '#3b82f6', waiting: 'rgba(255,255,255,0.2)' };
              const bgColors = { done: 'rgba(16,185,129,0.04)', active: 'rgba(59,130,246,0.04)', waiting: 'transparent' };
              return (
                <div key={apt.id} className="flex gap-3 group">
                  <div className="w-[40px] text-right pt-3 flex-shrink-0">
                    <p className="text-[11px] font-bold text-gray-500">{apt.time.split(' ')[0]}</p>
                    <p className="text-[9px] text-gray-600">{apt.time.split(' ')[1]}</p>
                  </div>
                  <div className="relative pt-3.5 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: colors[apt.status], background: apt.status !== 'waiting' ? colors[apt.status] : 'transparent' }} />
                    {apt.status === 'active' && <div className="absolute top-3.5 left-0 w-3 h-3 rounded-full animate-ping opacity-20" style={{ background: colors.active }} />}
                  </div>
                  <div className={`flex-1 p-3 rounded-xl border mb-1 transition-all group-hover:translate-x-1 ${apt.status === 'active' ? 'border-blue-500/15' : 'border-white/[0.04]'}`} style={{ background: bgColors[apt.status] }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-400">#{apt.token}</span>
                          <p className="text-sm font-medium text-white/85">{apt.name}</p>
                          <span className="text-[9px] text-gray-500">({apt.age}y)</span>
                          {apt.retainer && <span className="badge-purple text-[7px]">Retainer</span>}
                          {apt.mode === 'home' && <span className="badge-amber text-[7px]"><FiHome className="text-[6px]" /> Home</span>}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{apt.type}</p>
                        {apt.aiNote && (
                          <div className="mt-1.5 flex items-start gap-1.5 p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                            <FiZap className="text-amber-400 text-[10px] mt-0.5 flex-shrink-0" />
                            <p className="text-[10px] text-amber-300/80">{apt.aiNote}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${apt.status === 'done' ? 'badge-green' : apt.status === 'active' ? 'badge-blue' : 'badge-slate'}`}>
                          {apt.status === 'done' ? 'Done' : apt.status === 'active' ? 'Active' : 'Waiting'}
                        </span>
                        {apt.status === 'waiting' && (
                          <button onClick={() => toast.success(`Started ${apt.name}`)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-purple-500/10 border border-purple-500/15 text-purple-400 hover:bg-purple-500/20 transition-colors">
                            <FiPlay className="text-[10px]" />
                          </button>
                        )}
                        {apt.status === 'active' && (
                          <button onClick={() => toast.success(`Completed ${apt.name}`)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                            <FiCheck className="text-[10px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Book Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl w-full max-w-md p-6 animate-scale" style={{ background: '#12101f', border: '1px solid rgba(109,40,217,0.12)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Book Appointment</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-white/5 text-gray-500"><FiX /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Booked! AI checking for conflicts...'); setShowAdd(false); }} className="space-y-3">
              <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Patient</label><select className="input-field"><option>Select patient...</option><option>Ramesh Gupta (72y)</option><option>Savitri Devi (68y)</option><option>Mohan Lal (75y)</option><option>Kamla Bai (80y)</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Date</label><input type="date" className="input-field" defaultValue={date} /></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Time</label><select className="input-field"><option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>11:30 AM</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Type</label><select className="input-field"><option>Routine Checkup</option><option>Medication Review</option><option>Home Visit</option><option>Insurance Consult</option><option>Physiotherapy</option><option>Retainer Visit</option></select></div>
                <div><label className="text-[10px] font-medium text-gray-400 mb-1 block">Mode</label><select className="input-field"><option>Clinic</option><option>Home Visit</option></select></div>
              </div>
              <div className="ai-glow">
                <p className="relative z-10 text-[10px] text-gray-400 flex items-center gap-1.5"><FiZap className="text-purple-400" /> AI will check medication timing conflicts and suggest optimal slot</p>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center text-xs">Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
