import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiCheck, FiX, FiPlay, FiHome, FiRepeat } from 'react-icons/fi';
import toast from 'react-hot-toast';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const demoAppointments = [
  { _id: '1', patientId: { name: 'Ramesh Gupta', phone: '9876543210', patientId: 'PAT-0001' }, date: new Date(), timeSlot: '09:00 AM', type: 'routine-checkup', status: 'completed', tokenNumber: 1, age: 72, retainer: true, visitType: 'clinic' },
  { _id: '2', patientId: { name: 'Savitri Devi', phone: '9876543211', patientId: 'PAT-0002' }, date: new Date(), timeSlot: '09:30 AM', type: 'medication-review', status: 'completed', tokenNumber: 2, age: 68, retainer: true, visitType: 'clinic' },
  { _id: '3', patientId: { name: 'Mohan Lal', phone: '9876543212', patientId: 'PAT-0003' }, date: new Date(), timeSlot: '10:00 AM', type: 'home-visit', status: 'in-progress', tokenNumber: 3, age: 75, retainer: false, visitType: 'home' },
  { _id: '4', patientId: { name: 'Kamla Bai', phone: '9876543213', patientId: 'PAT-0004' }, date: new Date(), timeSlot: '10:30 AM', type: 'insurance-consultation', status: 'scheduled', tokenNumber: 4, age: 80, retainer: true, visitType: 'clinic' },
  { _id: '5', patientId: { name: 'Suresh Patel', phone: '9876543214', patientId: 'PAT-0005' }, date: new Date(), timeSlot: '11:00 AM', type: 'physiotherapy', status: 'scheduled', tokenNumber: 5, age: 65, retainer: false, visitType: 'clinic' },
  { _id: '6', patientId: { name: 'Padma Sharma', phone: '9876543215', patientId: 'PAT-0006' }, date: new Date(), timeSlot: '11:30 AM', type: 'retainer-visit', status: 'scheduled', tokenNumber: 6, age: 71, retainer: true, visitType: 'home' },
];

export default function Appointments() {
  const [appointments] = useState(demoAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  const statusColors = {
    'completed': 'bg-emerald-500/20 text-emerald-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    'scheduled': 'bg-white/10 text-white/60',
    'cancelled': 'bg-rose-500/20 text-rose-400',
    'no-show': 'bg-orange-500/20 text-orange-400',
  };

  const typeColors = {
    'routine-checkup': 'bg-violet-500/20 text-violet-400 border-violet-500/20',
    'medication-review': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
    'home-visit': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
    'insurance-consultation': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
    'physiotherapy': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20',
    'retainer-visit': 'bg-rose-500/20 text-rose-400 border-rose-500/20',
  };

  const typeLabels = {
    'routine-checkup': 'Routine Checkup',
    'medication-review': 'Medication Review',
    'home-visit': 'Home Visit',
    'insurance-consultation': 'Insurance Consult',
    'physiotherapy': 'Physiotherapy',
    'retainer-visit': 'Retainer Visit',
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <p className="text-white/50 mt-1 text-sm">Manage elderly patient schedules</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field py-2.5 pl-10 pr-4 text-sm"
            />
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
            <FiPlus /> Book Appointment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{appointments.length}</p>
          <p className="text-[11px] text-white/40">Total</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center border-emerald-500/20">
          <p className="text-2xl font-bold text-emerald-400">{appointments.filter(a => a.status === 'completed').length}</p>
          <p className="text-[11px] text-white/40">Completed</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center border-blue-500/20">
          <p className="text-2xl font-bold text-blue-400">{appointments.filter(a => a.status === 'in-progress').length}</p>
          <p className="text-[11px] text-white/40">In Progress</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{appointments.filter(a => a.visitType === 'home').length}</p>
          <p className="text-[11px] text-white/40">Home Visits</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-rose-400">{appointments.filter(a => a.retainer).length}</p>
          <p className="text-[11px] text-white/40">Retainer</p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="glass-card rounded-2xl p-5">
        <div className="space-y-2.5">
          {appointments.map(apt => (
            <div key={apt._id} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:bg-white/5 ${apt.status === 'in-progress' ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
              <div className="flex items-center gap-4">
                {/* Token */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${statusColors[apt.status]}`}>
                  #{apt.tokenNumber}
                </div>
                {/* Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white text-sm">{apt.patientId.name}</p>
                    <span className="text-[10px] text-white/30">({apt.age}y)</span>
                    {apt.retainer && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium">RETAINER</span>}
                    {apt.visitType === 'home' && (
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                        <FiHome className="text-[8px]" /> HOME
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{apt.patientId.patientId} • {apt.patientId.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Time */}
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white/80">{apt.timeSlot}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${typeColors[apt.type]}`}>
                    {typeLabels[apt.type]}
                  </span>
                </div>
                {/* Status */}
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-medium ${statusColors[apt.status]}`}>
                  {apt.status === 'in-progress' ? 'Active' : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </span>
                {/* Actions */}
                <div className="flex gap-1.5">
                  {apt.status === 'scheduled' && (
                    <button onClick={() => toast.success('Started!')} className="p-2 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors">
                      <FiPlay className="text-xs" />
                    </button>
                  )}
                  {apt.status === 'in-progress' && (
                    <button onClick={() => toast.success('Completed!')} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                      <FiCheck className="text-xs" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Book Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-white/60">
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Appointment booked!'); setShowAddModal(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Patient</label>
                <select className="input-field py-3">
                  <option value="" className="bg-[#1a1744]">Select patient...</option>
                  <option className="bg-[#1a1744]">Ramesh Gupta (PAT-0001)</option>
                  <option className="bg-[#1a1744]">Savitri Devi (PAT-0002)</option>
                  <option className="bg-[#1a1744]">Mohan Lal (PAT-0003)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Date</label>
                  <input type="date" className="input-field py-3" defaultValue={selectedDate} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Time Slot</label>
                  <select className="input-field py-3">
                    {timeSlots.map(slot => <option key={slot} className="bg-[#1a1744]">{slot}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Type</label>
                  <select className="input-field py-3">
                    <option className="bg-[#1a1744]" value="routine-checkup">Routine Checkup</option>
                    <option className="bg-[#1a1744]" value="medication-review">Medication Review</option>
                    <option className="bg-[#1a1744]" value="home-visit">Home Visit</option>
                    <option className="bg-[#1a1744]" value="insurance-consultation">Insurance Consultation</option>
                    <option className="bg-[#1a1744]" value="physiotherapy">Physiotherapy</option>
                    <option className="bg-[#1a1744]" value="retainer-visit">Monthly Retainer Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Visit Mode</label>
                  <select className="input-field py-3">
                    <option className="bg-[#1a1744]" value="clinic">Clinic Visit</option>
                    <option className="bg-[#1a1744]" value="home">Home Visit</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Notes</label>
                <textarea className="input-field" rows={3} placeholder="Patient condition, special needs..."></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-glass flex-1 text-sm">Cancel</button>
                <button type="submit" className="btn-primary flex-1 text-sm">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
