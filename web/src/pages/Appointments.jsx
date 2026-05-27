import React, { useState } from 'react';
import { FiPlus, FiCheck, FiX, FiPlay, FiHome, FiZap, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const appointments = [
  { id: '1', token: 1, name: 'Ramesh Gupta', age: 72, phone: '98765-43210', time: '09:00', type: 'Routine Checkup', status: 'done', retainer: true, mode: 'clinic', duration: 30 },
  { id: '2', token: 2, name: 'Savitri Devi', age: 68, phone: '98765-43211', time: '09:30', type: 'Medication Review', status: 'done', retainer: true, mode: 'clinic', duration: 20 },
  { id: '3', token: 3, name: 'Mohan Lal', age: 75, phone: '98765-43212', time: '10:00', type: 'Home Visit', status: 'active', retainer: false, mode: 'home', duration: 45, address: 'Sector 12, Dwarka' },
  { id: '4', token: 4, name: 'Kamla Bai', age: 80, phone: '98765-43213', time: '10:30', type: 'Insurance Consultation', status: 'waiting', retainer: true, mode: 'clinic', duration: 30 },
  { id: '5', token: 5, name: 'Suresh Patel', age: 65, phone: '98765-43214', time: '11:00', type: 'Physiotherapy', status: 'waiting', retainer: false, mode: 'clinic', duration: 40 },
  { id: '6', token: 6, name: 'Padma Sharma', age: 71, phone: '98765-43215', time: '11:30', type: 'Monthly Retainer Visit', status: 'waiting', retainer: true, mode: 'home', duration: 30, address: 'MG Road, Andheri' },
];

const statusConfig = {
  done: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', label: 'Completed', border: 'rgba(16,185,129,0.2)' },
  active: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'In Progress', border: 'rgba(59,130,246,0.3)' },
  waiting: { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.03)', label: 'Waiting', border: 'rgba(255,255,255,0.06)' },
};

export default function Appointments() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAdd, setShowAdd] = useState(false);

  const totalDone = appointments.filter(a => a.status === 'done').length;
  const progress = (totalDone / appointments.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">AI-optimised schedule — {totalDone}/{appointments.length} completed today</p>
        </div>
        <div className="flex gap-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field py-2.5 w-44" />
          <button onClick={() => setShowAdd(true)} className="btn-primary"><FiPlus className="text-sm" /> Book</button>
        </div>
      </div>

      {/* AI Optimization */}
      <div className="ai-glow rounded-3xl p-5 flex items-center gap-4">
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
          <FiZap className="text-blue-400 text-lg" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="ai-badge">AI Scheduler</span>
          </div>
          <p className="text-sm text-white/90 font-medium">Suggestion: Move <span className="text-blue-300">Kamla Bai</span> to 9:30 AM — her blood pressure medication peaks at 11 AM causing drowsiness.</p>
        </div>
        <div className="relative z-10 flex gap-2">
          <button onClick={() => toast.success('Schedule optimised by AI!')} className="btn-primary text-xs py-2 px-4">Apply</button>
          <button className="btn-secondary text-xs py-2 px-4">Dismiss</button>
        </div>
      </div>

      {/* Progress Bar + Stats */}
      <div className="card-flat">
        <div className="flex items-center gap-6 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40">Day Progress</span>
              <span className="text-xs font-bold text-white/70">{totalDone}/{appointments.length}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 animate-gradient" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)', backgroundSize: '200% 100%' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Total', value: appointments.length, color: '#a78bfa' },
            { label: 'Completed', value: totalDone, color: '#10b981' },
            { label: 'Active', value: 1, color: '#3b82f6' },
            { label: 'Home Visits', value: 2, color: '#f59e0b' },
            { label: 'Retainer', value: 4, color: '#8b5cf6' },
          ].map((s, i) => (
            <div key={i} className="text-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="card-flat">
        <h3 className="section-title flex items-center gap-2 mb-5">
          <FiClock className="text-indigo-400" /> Today's Timeline
          <span className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" /><span className="text-[10px] text-white/30">Live</span></span>
        </h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-transparent" />

          <div className="space-y-1">
            {appointments.map((apt, i) => {
              const sc = statusConfig[apt.status];
              return (
                <div key={apt.id} className="flex gap-4 group">
                  {/* Time */}
                  <div className="w-[45px] text-right flex-shrink-0 pt-4">
                    <p className="text-xs font-bold text-white/60">{apt.time}</p>
                  </div>

                  {/* Dot */}
                  <div className="relative flex-shrink-0 pt-4">
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: sc.color, background: apt.status === 'active' ? sc.bg : 'rgba(5,8,22,1)' }}>
                      {apt.status === 'done' && <div className="w-2 h-2 rounded-full" style={{ background: sc.color }} />}
                      {apt.status === 'active' && <div className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: sc.color }} />}
                    </div>
                    {apt.status === 'active' && <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30" style={{ background: sc.color }} />}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 p-4 rounded-2xl border mb-2 transition-all duration-500 group-hover:translate-x-1 ${apt.status === 'active' ? 'shadow-lg' : ''}`} style={{ background: sc.bg, borderColor: sc.border }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white/80">#{apt.token}</span>
                          <h4 className="text-sm font-semibold text-white/90">{apt.name}</h4>
                          <span className="text-[10px] text-white/30">({apt.age}y)</span>
                          {apt.retainer && <span className="badge-purple text-[8px]">Retainer</span>}
                          {apt.mode === 'home' && <span className="badge-amber text-[8px]"><FiHome className="text-[7px]" /> Home</span>}
                        </div>
                        <p className="text-xs text-white/40">{apt.type} · {apt.duration} min</p>
                        {apt.address && (
                          <p className="text-[10px] text-amber-400/60 mt-1 flex items-center gap-1"><FiMapPin className="text-[9px]" /> {apt.address}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge text-[9px]" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                        {apt.status === 'waiting' && (
                          <button onClick={() => toast.success(`Started appointment with ${apt.name}`)} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))', border: '1px solid rgba(99,102,241,0.3)' }}>
                            <FiPlay className="text-indigo-300 text-xs" />
                          </button>
                        )}
                        {apt.status === 'active' && (
                          <button onClick={() => toast.success(`Completed appointment with ${apt.name}`)} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.3))', border: '1px solid rgba(16,185,129,0.3)' }}>
                            <FiCheck className="text-emerald-300 text-xs" />
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

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md animate-scale">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Book Appointment</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10">
                <FiX className="text-white/40" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Appointment booked! AI will optimise timing.'); setShowAdd(false); }} className="space-y-4">
              <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Patient</label><select className="input-field"><option>Select patient...</option><option>Ramesh Gupta (72y)</option><option>Savitri Devi (68y)</option><option>Mohan Lal (75y)</option><option>Kamla Bai (80y)</option></select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Date</label><input type="date" className="input-field" defaultValue={date} /></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Time</label><select className="input-field"><option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>11:30 AM</option><option>12:00 PM</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Type</label><select className="input-field"><option>Routine Checkup</option><option>Medication Review</option><option>Home Visit</option><option>Insurance Consultation</option><option>Physiotherapy</option><option>Monthly Retainer Visit</option></select></div>
                <div><label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Mode</label><select className="input-field"><option>Clinic</option><option>Home Visit</option></select></div>
              </div>
              <div className="ai-glow rounded-2xl p-3">
                <div className="relative z-10 flex items-center gap-2">
                  <FiZap className="text-indigo-400 text-sm flex-shrink-0" />
                  <p className="text-[10px] text-white/50">AI will analyse patient medications and vitals to suggest the <span className="text-indigo-300">optimal time slot</span>.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
