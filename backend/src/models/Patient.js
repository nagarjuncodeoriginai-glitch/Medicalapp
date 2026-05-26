const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: String, unique: true }, // Auto-generated: PAT-001
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dateOfBirth: { type: Date },
  bloodGroup: { type: String },
  address: { type: String },
  city: { type: String },
  emergencyContact: { type: String },
  allergies: [{ type: String }],
  medicalHistory: [{ type: String }],
  // Specialty-specific fields
  dentalChart: { type: Object }, // For dentists
  visionRecord: { type: Object }, // For eye doctors
  growthChart: [{ type: Object }], // For pediatricians
  skinPhotos: [{ type: String }], // For dermatologists
  notes: { type: String },
  lastVisit: { type: Date },
  totalVisits: { type: Number, default: 0 },
  totalBilled: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate patient ID
patientSchema.pre('save', async function(next) {
  if (!this.patientId) {
    const count = await mongoose.model('Patient').countDocuments({ doctorId: this.doctorId });
    this.patientId = `PAT-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
