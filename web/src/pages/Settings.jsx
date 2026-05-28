import React, { useEffect, useState } from 'react';
import { FiUser, FiSave, FiClock, FiLock } from 'react-icons/fi';
import { FaWhatsapp, FaStethoscope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useApi } from '../hooks/useApi';
import { setSession, getUser } from '../utils/auth';
import Loader from '../components/Loader';

export default function Settings() {
  const { data: profile, loading } = useApi('/auth/profile');
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [form, setForm] = useState(null);
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' });

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      specialty: profile.specialty || 'general',
      qualification: profile.qualification || '',
      registrationNo: profile.registrationNo || '',
      clinicName: profile.clinicName || '',
      clinicAddress: profile.clinicAddress || '',
      clinicCity: profile.clinicCity || '',
      consultationFee: profile.consultationFee ?? 500,
      workingHours: {
        start: profile.workingHours?.start || '09:00',
        end: profile.workingHours?.end || '18:00'
      }
    });
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/auth/profile', form);
      const localUser = getUser();
      setSession(localStorage.getItem('token'), {
        ...localUser,
        name: data.name,
        email: data.email,
        specialty: data.specialty,
        clinicName: data.clinicName,
        plan: data.plan
      });
      toast.success('Settings saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setPwSaving(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: pw.currentPassword,
        newPassword: pw.newPassword
      });
      toast.success('Password updated');
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setPwSaving(false);
    }
  };

  if (loading || !form) return <Loader label="Loading profile..." />;

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your clinic profile and preferences</p>
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">
              Current Plan: <span className="text-blue-600">{(profile.plan || 'free').toUpperCase()}</span>
            </h3>
            {profile.planExpiry && (
              <p className="text-sm text-gray-600 mt-1">
                Expires {new Date(profile.planExpiry).toLocaleDateString('en-IN')}
              </p>
            )}
          </div>
          <button className="btn-primary">Upgrade to Pro - ₹1,499/mo</button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FiUser className="text-blue-600" /> Doctor Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text" className="input-field"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (read-only)</label>
              <input type="email" className="input-field bg-gray-100" value={form.email} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel" className="input-field"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select
                className="input-field"
                value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              >
                <option value="general">General Physician</option>
                <option value="dental">Dentist</option>
                <option value="eye">Ophthalmologist</option>
                <option value="ortho">Orthopedic</option>
                <option value="pediatric">Pediatrician</option>
                <option value="dermatology">Dermatologist</option>
                <option value="ent">ENT</option>
                <option value="cardiology">Cardiology</option>
                <option value="gynecology">Gynecology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                type="text" className="input-field"
                value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
              <input
                type="text" className="input-field"
                value={form.registrationNo}
                onChange={(e) => setForm({ ...form, registrationNo: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FaStethoscope className="text-emerald-600" /> Clinic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
              <input
                type="text" className="input-field"
                value={form.clinicName} onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
              <input
                type="number" min={0} className="input-field"
                value={form.consultationFee}
                onChange={(e) => setForm({ ...form, consultationFee: Number(e.target.value || 0) })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
              <input
                type="text" className="input-field"
                value={form.clinicAddress}
                onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text" className="input-field"
                value={form.clinicCity}
                onChange={(e) => setForm({ ...form, clinicCity: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FiClock className="text-purple-600" /> Working Hours
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time" className="input-field"
                value={form.workingHours.start}
                onChange={(e) =>
                  setForm({ ...form, workingHours: { ...form.workingHours, start: e.target.value } })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time" className="input-field"
                value={form.workingHours.end}
                onChange={(e) =>
                  setForm({ ...form, workingHours: { ...form.workingHours, end: e.target.value } })
                }
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <FaWhatsapp className="text-green-600" /> WhatsApp Integration
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            WhatsApp messages run via Twilio. Set <code>TWILIO_ACCOUNT_SID</code>,{' '}
            <code>TWILIO_AUTH_TOKEN</code> and <code>TWILIO_WHATSAPP_NUMBER</code> in the backend env.
          </p>
          <p className="text-xs text-gray-500">
            When credentials are missing, messages are logged in stub mode (no real message is sent).
          </p>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          <FiSave /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>

      <form onSubmit={changePassword} className="card">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <FiLock className="text-red-600" /> Change Password
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password" className="input-field" required
              value={pw.currentPassword}
              onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password" className="input-field" required minLength={6}
              value={pw.newPassword}
              onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New</label>
            <input
              type="password" className="input-field" required minLength={6}
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" disabled={pwSaving} className="btn-primary mt-4">
          {pwSaving ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
