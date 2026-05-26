import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiCheck, FiX, FiPlay } from 'react-icons/fi';
import toast from 'react-hot-toast';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const demoAppointments = [
  { _id: '1', patientId: { name: 'Rahul Sharma', phone: '9876543210', patientId: 'PAT-0001' }, date: new Date(), timeSlot: '09:00 AM', type: 'consultation', status: 'completed', tokenNumber: 1 },
  { _id: '2', patientId: { name: 'Priya Patel', phone: '9876543211', patientId: 'PAT-0002' }, date: new Date(), timeSlot: '09:30 AM', type: 'follow-up', status: 'completed', tokenNumber: 2 },
  { _id: '3', patientId: { name: 'Amit Kumar', phone: '9876543212', patientId: 'PAT-0003' }, date: new Date(), timeSlot: '10:00 AM', type: 'procedure', status: 'in-progress', tokenNumber: 3 },
  { _id: '4', patientId: { name: 'Sneha Gupta', phone: '9876543213', patientId: 'PAT-0004' }, date: new Date(), timeSlot: '10:30 AM', type: 'consultation', status: 'scheduled', tokenNumber: 4 },
  { _id: '5', patientId: { name: 'Rajesh Iyer', phone: '9876543214', patientId: 'PAT-0005' }, date: new Date(), timeSlot: '11:00 AM', type: 'emergency', status: 'scheduled', tokenNumber: 5 },
  { _id: '6', patientId: { name: 'Meera Singh', phone: '9876543215', patientId: 'PAT-0006' }, date: new Date(), timeSlot: '11:30 AM', type: 'checkup', status: 'scheduled', tokenNumber: 6 },
];

export default function Appointments() {
  const [appointments] = useState(demoAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  const statusStyles = {
    'completed': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'in-progress': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'scheduled': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
    'cancelled': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'no-show': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  };

  const typeColors = {
    'consultation': 'bg-blue-100 text-blue-700',
    'follow-up': 'bg-purple-100 text-purple-700',
    'procedure': 'bg-orange-100 text-orange-700',
    'emergency': 'bg-red-100 text-red-700',
    'checkup': 'bg-green-100 text-green-700',
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your daily schedule</p>
        </div>
        <div className="flex gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field py-2.5 px-4"
          />
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <FiPlus /> Book Appointment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
          <p className="text-sm text-gray-500">Total Today</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-emerald-100">
          <p className="text-2xl font-bold text-emerald-600">{appointments.filter(a => a.status === 'completed').length}</p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <p className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'in-progress').length}</p>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-gray-600">{appointments.filter(a => a.status === 'scheduled').length}</p>
          <p className="text-sm text-gray-500">Waiting</p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Token</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      {apt.tokenNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-900">{apt.patientId.name}</p>
                    <p className="text-xs text-gray-500">{apt.patientId.patientId} | {apt.patientId.phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiClock className="text-gray-400" />
                      <span className="font-medium">{apt.timeSlot}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[apt.type]}`}>
                      {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[apt.status]?.bg} ${statusStyles[apt.status]?.text}`}>
                      {apt.status === 'in-progress' ? 'In Progress' : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {apt.status === 'scheduled' && (
                        <button onClick={() => toast.success('Appointment started!')} className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100" title="Start">
                          <FiPlay className="text-sm" />
                        </button>
                      )}
                      {apt.status === 'in-progress' && (
                        <button onClick={() => toast.success('Appointment completed!')} className="p-2 bg-emerald-50 rounded-lg text-emerald-600 hover:bg-emerald-100" title="Complete">
                          <FiCheck className="text-sm" />
                        </button>
                      )}
                      <button className="p-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100" title="Cancel">
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Appointment booked!'); setShowAddModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select className="input-field">
                  <option value="">Select patient...</option>
                  <option>Rahul Sharma (PAT-0001)</option>
                  <option>Priya Patel (PAT-0002)</option>
                  <option>Amit Kumar (PAT-0003)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="input-field" defaultValue={selectedDate} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <select className="input-field">
                    {timeSlots.map(slot => <option key={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="input-field">
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="procedure">Procedure</option>
                  <option value="emergency">Emergency</option>
                  <option value="checkup">Checkup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms / Notes</label>
                <textarea className="input-field" rows={3} placeholder="Brief description..."></textarea>
              </div>
              <div className="flex gap-3 pt-4">
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
