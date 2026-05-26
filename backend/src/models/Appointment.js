const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // "10:00 AM"
  duration: { type: Number, default: 30 }, // minutes
  type: { 
    type: String, 
    enum: ['consultation', 'follow-up', 'procedure', 'emergency', 'checkup'],
    default: 'consultation'
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  symptoms: { type: String },
  notes: { type: String },
  reminderSent: { type: Boolean, default: false },
  tokenNumber: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate token number for the day
appointmentSchema.pre('save', async function(next) {
  if (!this.tokenNumber) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await mongoose.model('Appointment').countDocuments({
      doctorId: this.doctorId,
      date: { $gte: today }
    });
    this.tokenNumber = count + 1;
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
