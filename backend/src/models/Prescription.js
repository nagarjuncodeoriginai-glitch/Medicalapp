const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String }, // "500mg"
  frequency: { type: String }, // "1-0-1" or "Twice daily"
  duration: { type: String }, // "5 days"
  timing: { type: String, enum: ['before-food', 'after-food', 'empty-stomach', 'bedtime'] },
  notes: { type: String }
});

const prescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  prescriptionNo: { type: String },
  diagnosis: { type: String },
  symptoms: [{ type: String }],
  medicines: [medicineSchema],
  tests: [{ type: String }], // Lab tests recommended
  advice: { type: String },
  followUpDate: { type: Date },
  vitals: {
    bp: { type: String },
    pulse: { type: Number },
    temperature: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    spo2: { type: Number }
  },
  isTemplate: { type: Boolean, default: false },
  templateName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate prescription number
prescriptionSchema.pre('save', async function(next) {
  if (!this.prescriptionNo) {
    const count = await mongoose.model('Prescription').countDocuments({ doctorId: this.doctorId });
    this.prescriptionNo = `RX-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
