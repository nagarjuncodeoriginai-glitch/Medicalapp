import React, { useState } from 'react';
import { FiUser, FiSave, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaStethoscope } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Settings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [profile, setProfile] = useState({
    name: user.name || '', email: user.email || '', phone: '',
    specialty: user.specialty || 'general', clinicName: user.clinicName || '',
    clinicAddress: '', clinicCity: '', qualification: '', registrationNo: '',
    consultationFee: 500, workStart: '09:00', workEnd: '18:00'
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your clinic profile and preferences</p>
      </div>

      {/* Plan Info */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Current Plan: <span className="text-blue-600">Free Trial</span></h3>
            <p className="text-sm text-gray-600 mt-1">Your free trial expires in 25 days. Upgrade to continue.</p>
          </div>
          <button className="btn-primary">Upgrade to Pro - &#8377;1,499/mo</button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Doctor Profile */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FiUser className="text-blue-600" /> Doctor Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="input-field" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="input-field" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="input-field" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select className="input-field" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})}>
                <option value="general">General Physician</option>
                <option value="dental">Dentist</option>
                <option value="eye">Ophthalmologist</option>
                <option value="ortho">Orthopedic</option>
                <option value="pediatric">Pediatrician</option>
                <option value="dermatology">Dermatologist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input type="text" className="input-field" value={profile.qualification} onChange={(e) => setProfile({...profile, qualification: e.target.value})} placeholder="MBBS, MD" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
              <input type="text" className="input-field" value={profile.registrationNo} onChange={(e) => setProfile({...profile, registrationNo: e.target.value})} placeholder="MCI-12345" />
            </div>
          </div>
        </div>

        {/* Clinic Details */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FaStethoscope className="text-emerald-600" /> Clinic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
              <input type="text" className="input-field" value={profile.clinicName} onChange={(e) => setProfile({...profile, clinicName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (&#8377;)</label>
              <input type="number" className="input-field" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
              <input type="text" className="input-field" value={profile.clinicAddress} onChange={(e) => setProfile({...profile, clinicAddress: e.target.value})} placeholder="Full address" />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FiClock className="text-purple-600" /> Working Hours
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" className="input-field" value={profile.workStart} onChange={(e) => setProfile({...profile, workStart: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input type="time" className="input-field" value={profile.workEnd} onChange={(e) => setProfile({...profile, workEnd: e.target.value})} />
            </div>
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FaWhatsapp className="text-green-600" /> WhatsApp Integration
          </h3>
          <p className="text-sm text-gray-600 mb-4">Connect WhatsApp to send automatic appointment reminders and prescriptions to patients.</p>
          <button type="button" className="bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700 flex items-center gap-2">
            <FaWhatsapp /> Connect WhatsApp Business
          </button>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2">
          <FiSave /> Save All Settings
        </button>
      </form>
    </div>
  );
}
