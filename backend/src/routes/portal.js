/**
 * Patient Portal — PUBLIC routes (no auth required)
 * Allows patients to:
 * 1. Find a doctor by clinic code or link
 * 2. Book appointments online
 * 3. Check symptoms (AI triage)
 * 4. View their appointment status
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const ai = require('../services/aiService');
const { asyncHandler } = require('../middleware/errorHandler');

// Get doctor's public profile by ID (for booking page)
router.get(
  '/doctor/:doctorId',
  asyncHandler(async (req, res) => {
    const doctor = await User.findById(req.params.doctorId).select(
      'name specialty qualification clinicName clinicAddress clinicCity consultationFee workingHours clinicLogo'
    );
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  })
);

// Search doctors (public)
router.get(
  '/doctors',
  asyncHandler(async (req, res) => {
    const { city, specialty, search } = req.query;
    const query = { isActive: true };
    if (city) query.clinicCity = { $regex: city, $options: 'i' };
    if (specialty && specialty !== 'all') query.specialty = specialty;
    if (search) {
      const safe = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: safe, $options: 'i' } },
        { clinicName: { $regex: safe, $options: 'i' } }
      ];
    }
    const doctors = await User.find(query)
      .select('name specialty qualification clinicName clinicCity consultationFee workingHours')
      .limit(20);
    res.json(doctors);
  })
);

// Get available slots for a doctor on a date
router.get(
  '/doctor/:doctorId/slots',
  asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'date query param required' });

    const doctor = await User.findById(req.params.doctorId).select('workingHours consultationFee');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const start = doctor.workingHours?.start || '09:00';
    const end = doctor.workingHours?.end || '18:00';

    // Generate 30-min slots
    const allSlots = [];
    let [h, m] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    while (h < endH || (h === endH && m < endM)) {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
      allSlots.push(`${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`);
      m += 30;
      if (m >= 60) { h++; m = 0; }
    }

    // Find booked slots for that date
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const booked = await Appointment.find({
      doctorId: req.params.doctorId,
      date: { $gte: dayStart, $lte: dayEnd },
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('timeSlot');

    const bookedSlots = booked.map(a => a.timeSlot);
    const available = allSlots.filter(s => !bookedSlots.includes(s));

    res.json({ slots: available, bookedCount: bookedSlots.length, fee: doctor.consultationFee });
  })
);

// Patient books appointment (public — creates patient if needed)
router.post(
  '/book',
  asyncHandler(async (req, res) => {
    const { doctorId, patientName, patientPhone, patientEmail, patientAge, patientGender, date, timeSlot, type, symptoms } = req.body;

    if (!doctorId || !patientName || !patientPhone || !date || !timeSlot) {
      return res.status(400).json({ message: 'doctorId, patientName, patientPhone, date, timeSlot are required' });
    }

    // Find or create patient
    let patient = await Patient.findOne({ doctorId, phone: patientPhone });
    if (!patient) {
      patient = await Patient.create({
        doctorId,
        name: patientName,
        phone: patientPhone,
        email: patientEmail || undefined,
        age: patientAge ? Number(patientAge) : undefined,
        gender: patientGender || undefined
      });
    }

    // Check slot not already taken
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const conflict = await Appointment.findOne({
      doctorId,
      date: { $gte: dayStart, $lte: dayEnd },
      timeSlot,
      status: { $nin: ['cancelled', 'no-show'] }
    });
    if (conflict) return res.status(409).json({ message: 'This slot is already booked. Please choose another.' });

    const appointment = await Appointment.create({
      doctorId,
      patientId: patient._id,
      date: new Date(date),
      timeSlot,
      type: type || 'consultation',
      status: 'scheduled',
      symptoms: symptoms || ''
    });

    res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment: {
        id: appointment._id,
        tokenNumber: appointment.tokenNumber,
        date: appointment.date,
        timeSlot: appointment.timeSlot,
        status: appointment.status
      },
      patient: { id: patient._id, patientId: patient.patientId, name: patient.name }
    });
  })
);

// AI Symptom Checker (public - no auth)
router.post(
  '/symptom-check',
  asyncHandler(async (req, res) => {
    const { symptoms, age, gender } = req.body;
    if (!symptoms) return res.status(400).json({ message: 'symptoms field required' });

    const systemMsg = {
      role: 'system',
      content: `You are an AI medical triage assistant for a patient-facing app. Based on symptoms, assess urgency and provide guidance. Respond ONLY in JSON format:
{
  "urgency": "emergency|urgent|routine",
  "urgencyExplanation": "brief reason for urgency level",
  "possibleConditions": ["condition1", "condition2", "condition3"],
  "immediateAdvice": "what to do right now",
  "shouldVisitDoctor": true/false,
  "suggestedSpecialty": "general|dental|eye|ortho|pediatric|dermatology|ent|cardiology|gynecology",
  "redFlags": ["any warning signs to watch for"],
  "homeRemedies": ["safe home care suggestions"],
  "disclaimer": "This is AI triage only. Always consult a doctor for medical advice."
}`
    };
    const userMsg = {
      role: 'user',
      content: `Patient: ${age || 'unknown'}y ${gender || 'unknown'}. Symptoms: ${symptoms}`
    };

    const result = await ai.chat([systemMsg, userMsg], { json: true, temperature: 0.2 });
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = {
        urgency: 'routine',
        urgencyExplanation: 'Unable to assess precisely. Please consult a doctor.',
        possibleConditions: ['Requires in-person evaluation'],
        immediateAdvice: 'If symptoms are severe, visit the nearest hospital.',
        shouldVisitDoctor: true,
        suggestedSpecialty: 'general',
        redFlags: [],
        homeRemedies: ['Rest', 'Stay hydrated'],
        disclaimer: 'This is AI triage only. Always consult a doctor for medical advice.'
      };
    }

    res.json({ ...parsed, provider: ai.getProvider() });
  })
);

// Check appointment status (public - by phone)
router.get(
  '/my-appointments',
  asyncHandler(async (req, res) => {
    const { phone, doctorId } = req.query;
    if (!phone) return res.status(400).json({ message: 'phone query param required' });

    const query = { phone };
    const patients = await Patient.find(query).select('_id doctorId name');
    if (!patients.length) return res.json({ appointments: [] });

    const patientIds = patients.map(p => p._id);
    const filter = { patientId: { $in: patientIds }, status: { $nin: ['cancelled'] } };
    if (doctorId) filter.doctorId = doctorId;

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name clinicName specialty')
      .populate('patientId', 'name phone patientId')
      .sort({ date: -1 })
      .limit(20);

    res.json({ appointments });
  })
);

// Patient records lookup (by phone - no auth, phone-based verification)
router.get(
  '/my-records',
  asyncHandler(async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ message: 'phone query param required' });

    const patient = await Patient.findOne({ phone }).sort({ createdAt: -1 });
    if (!patient) return res.status(404).json({ message: 'No records found for this phone number. Please check with your doctor.' });

    const [appointments, prescriptions, labTests, bills] = await Promise.all([
      Appointment.find({ patientId: patient._id }).populate('doctorId', 'name clinicName').sort({ date: -1 }).limit(20),
      require('../models/Prescription').find({ patientId: patient._id }).sort({ createdAt: -1 }).limit(10),
      require('../models/LabTest').find({ patientId: patient._id }).sort({ createdAt: -1 }).limit(10),
      require('../models/Billing').find({ patientId: patient._id }).sort({ createdAt: -1 }).limit(10)
    ]);

    res.json({ patient: { name: patient.name, patientId: patient.patientId, age: patient.age, gender: patient.gender, phone: patient.phone }, appointments, prescriptions, labTests, bills });
  })
);

// Patient submits review
router.post(
  '/review',
  asyncHandler(async (req, res) => {
    // For MVP, just acknowledge - in production save to a Review model
    res.json({ message: 'Review submitted successfully. Thank you!' });
  })
);

module.exports = router;
