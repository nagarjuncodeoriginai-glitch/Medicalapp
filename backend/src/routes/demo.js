/**
 * Demo Mode Routes
 *
 * These routes kick in ONLY when MongoDB is not connected.
 * They provide in-memory dummy data so the frontend can be explored
 * without needing any database.
 *
 * Credentials: demo@docclinic.com / demo1234
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Demo data store (in memory - resets on server restart)
const DEMO_USER = {
  _id: 'demo-doctor-001',
  id: 'demo-doctor-001',
  name: 'Demo Doctor',
  email: 'demo@docclinic.com',
  phone: '9000000000',
  role: 'doctor',
  specialty: 'general',
  qualification: 'MBBS, MD',
  registrationNo: 'REG-DEMO-001',
  clinicName: 'DocClinic Demo Centre',
  clinicAddress: '123 Health Street',
  clinicCity: 'Mumbai',
  consultationFee: 500,
  plan: 'pro',
  planExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  workingHours: { start: '09:00', end: '18:00' },
  isActive: true
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const DEMO_PATIENTS = [
  { _id: 'pat-1', patientId: 'PAT-0001', name: 'Ramesh Kumar', phone: '9876543210', age: 45, gender: 'male', bloodGroup: 'B+', city: 'Mumbai', allergies: ['Penicillin'], totalVisits: 12, totalBilled: 6500, isActive: true, createdAt: new Date('2024-10-15') },
  { _id: 'pat-2', patientId: 'PAT-0002', name: 'Priya Sharma', phone: '9876543211', age: 32, gender: 'female', bloodGroup: 'O+', city: 'Mumbai', allergies: [], totalVisits: 5, totalBilled: 2500, isActive: true, createdAt: new Date('2024-11-20') },
  { _id: 'pat-3', patientId: 'PAT-0003', name: 'Amit Patel', phone: '9876543212', age: 28, gender: 'male', bloodGroup: 'A+', city: 'Pune', allergies: [], totalVisits: 3, totalBilled: 1500, isActive: true, createdAt: new Date('2025-01-05') },
  { _id: 'pat-4', patientId: 'PAT-0004', name: 'Sunita Reddy', phone: '9876543213', age: 55, gender: 'female', bloodGroup: 'AB+', city: 'Mumbai', allergies: ['Aspirin'], totalVisits: 8, totalBilled: 4200, isActive: true, createdAt: new Date('2025-02-10') },
  { _id: 'pat-5', patientId: 'PAT-0005', name: 'Vikram Singh', phone: '9876543214', age: 38, gender: 'male', bloodGroup: 'B-', city: 'Delhi', allergies: [], totalVisits: 2, totalBilled: 1000, isActive: true, createdAt: new Date('2025-04-01') }
];

const DEMO_APPOINTMENTS = [
  { _id: 'apt-1', patientId: DEMO_PATIENTS[0], date: today.toISOString(), timeSlot: '09:00 AM', type: 'consultation', status: 'completed', tokenNumber: 1, symptoms: 'BP check' },
  { _id: 'apt-2', patientId: DEMO_PATIENTS[1], date: today.toISOString(), timeSlot: '09:30 AM', type: 'follow-up', status: 'completed', tokenNumber: 2, symptoms: 'Fever follow-up' },
  { _id: 'apt-3', patientId: DEMO_PATIENTS[2], date: today.toISOString(), timeSlot: '10:00 AM', type: 'consultation', status: 'in-progress', tokenNumber: 3, symptoms: 'Headache' },
  { _id: 'apt-4', patientId: DEMO_PATIENTS[3], date: today.toISOString(), timeSlot: '10:30 AM', type: 'consultation', status: 'scheduled', tokenNumber: 4, symptoms: 'Diabetes review' },
  { _id: 'apt-5', patientId: DEMO_PATIENTS[4], date: today.toISOString(), timeSlot: '11:00 AM', type: 'checkup', status: 'scheduled', tokenNumber: 5, symptoms: 'Annual checkup' }
];

const DEMO_PRESCRIPTIONS = [
  {
    _id: 'rx-1', prescriptionNo: 'RX-00001', patientId: DEMO_PATIENTS[0],
    diagnosis: 'Hypertension follow-up',
    medicines: [
      { name: 'Amlodipine', dosage: '5mg', frequency: '1-0-0', duration: '30 days', timing: 'after-food' },
      { name: 'Atorvastatin', dosage: '10mg', frequency: '0-0-1', duration: '30 days', timing: 'bedtime' }
    ],
    advice: 'Low-salt diet. Daily walk 30 min.',
    vitals: { bp: '140/90', pulse: 78, weight: 80 },
    createdAt: new Date('2025-05-20')
  },
  {
    _id: 'rx-2', prescriptionNo: 'RX-00002', patientId: DEMO_PATIENTS[1],
    diagnosis: 'Viral fever',
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', frequency: '1-1-1', duration: '3 days', timing: 'after-food' }
    ],
    advice: 'Rest, plenty of fluids.',
    vitals: { temperature: 101.2, weight: 58 },
    createdAt: new Date('2025-05-25')
  },
  {
    _id: 'rx-3', prescriptionNo: 'RX-00003', patientId: DEMO_PATIENTS[3],
    diagnosis: 'Type 2 Diabetes review',
    medicines: [
      { name: 'Metformin', dosage: '500mg', frequency: '1-0-1', duration: '30 days', timing: 'after-food' }
    ],
    advice: 'Continue diet plan. Fasting glucose in 1 month.',
    vitals: { bp: '130/85', weight: 72 },
    createdAt: new Date('2025-05-27')
  }
];

const DEMO_BILLS = [
  { _id: 'bill-1', invoiceNo: 'INV-00001', patientId: DEMO_PATIENTS[0], items: [{ description: 'Consultation', amount: 500, quantity: 1 }], subtotal: 500, totalAmount: 500, paidAmount: 500, paymentMethod: 'cash', paymentStatus: 'paid', createdAt: new Date('2025-05-20') },
  { _id: 'bill-2', invoiceNo: 'INV-00002', patientId: DEMO_PATIENTS[1], items: [{ description: 'Consultation', amount: 500, quantity: 1 }, { description: 'CBC Test', amount: 350, quantity: 1 }], subtotal: 850, totalAmount: 850, paidAmount: 850, paymentMethod: 'upi', paymentStatus: 'paid', createdAt: new Date('2025-05-25') },
  { _id: 'bill-3', invoiceNo: 'INV-00003', patientId: DEMO_PATIENTS[2], items: [{ description: 'Consultation', amount: 500, quantity: 1 }], subtotal: 500, totalAmount: 500, paidAmount: 0, paymentMethod: 'cash', paymentStatus: 'pending', createdAt: new Date('2025-05-27') },
  { _id: 'bill-4', invoiceNo: 'INV-00004', patientId: DEMO_PATIENTS[3], items: [{ description: 'Follow-up', amount: 300, quantity: 1 }, { description: 'HbA1c Test', amount: 600, quantity: 1 }], subtotal: 900, totalAmount: 900, paidAmount: 500, paymentMethod: 'card', paymentStatus: 'partial', createdAt: new Date('2025-05-28') }
];

// Middleware: only respond if DB is not connected (demo mode)
function demoOnly(req, res, next) {
  if (req.app.locals.dbConnected) return next('route');
  next();
}

// ==================== AUTH ====================
router.post('/auth/login', demoOnly, (req, res) => {
  const { email, password } = req.body;
  if (email === 'demo@docclinic.com' && password === 'demo1234') {
    const token = jwt.sign({ userId: DEMO_USER._id }, process.env.JWT_SECRET || 'demo-fallback-secret-key-32chars!!', { expiresIn: '30d' });
    return res.json({ token, user: DEMO_USER });
  }
  return res.status(401).json({ message: 'Invalid credentials. Use: demo@docclinic.com / demo1234' });
});

router.post('/auth/register', demoOnly, (req, res) => {
  const token = jwt.sign({ userId: DEMO_USER._id }, process.env.JWT_SECRET || 'demo-fallback-secret-key-32chars!!', { expiresIn: '30d' });
  return res.status(201).json({ token, user: { ...DEMO_USER, name: req.body.name || DEMO_USER.name } });
});

router.get('/auth/profile', demoOnly, (req, res) => {
  res.json(DEMO_USER);
});

router.put('/auth/profile', demoOnly, (req, res) => {
  res.json({ ...DEMO_USER, ...req.body });
});

router.post('/auth/change-password', demoOnly, (req, res) => {
  res.json({ message: 'Password updated (demo mode - not persisted)' });
});

router.post('/auth/forgot-password', demoOnly, (req, res) => {
  res.json({ message: 'If that email exists, a reset link has been sent.' });
});

// ==================== DASHBOARD ====================
router.get('/dashboard/stats', demoOnly, (req, res) => {
  res.json({
    totalPatients: DEMO_PATIENTS.length,
    todayAppointments: DEMO_APPOINTMENTS.length,
    monthRevenue: 2750,
    todayCompleted: 2,
    pendingPayments: 2,
    newPatientsThisMonth: 1
  });
});

router.get('/dashboard/recent', demoOnly, (req, res) => {
  res.json({
    recentPatients: DEMO_PATIENTS.slice(0, 5),
    recentAppointments: DEMO_APPOINTMENTS
  });
});

router.get('/dashboard/analytics', demoOnly, (req, res) => {
  res.json({
    monthlyRevenue: [
      { _id: '2025-01', revenue: 12500, count: 25 },
      { _id: '2025-02', revenue: 15200, count: 30 },
      { _id: '2025-03', revenue: 18700, count: 37 },
      { _id: '2025-04', revenue: 14300, count: 28 },
      { _id: '2025-05', revenue: 22100, count: 44 }
    ],
    monthlyPatients: [
      { _id: '2025-01', count: 8 },
      { _id: '2025-02', count: 5 },
      { _id: '2025-03', count: 12 },
      { _id: '2025-04', count: 6 },
      { _id: '2025-05', count: 3 }
    ]
  });
});

// ==================== PATIENTS ====================
router.get('/patients', demoOnly, (req, res) => {
  let list = [...DEMO_PATIENTS];
  if (req.query.search) {
    const s = req.query.search.toLowerCase();
    list = list.filter((p) =>
      p.name.toLowerCase().includes(s) || p.phone.includes(s) || p.patientId.toLowerCase().includes(s)
    );
  }
  res.json({ patients: list, total: list.length, pages: 1, page: 1 });
});

router.get('/patients/:id', demoOnly, (req, res) => {
  const p = DEMO_PATIENTS.find((x) => x._id === req.params.id);
  if (!p) return res.status(404).json({ message: 'Patient not found' });
  res.json(p);
});

router.post('/patients', demoOnly, (req, res) => {
  const newP = {
    _id: `pat-${Date.now()}`,
    patientId: `PAT-${String(DEMO_PATIENTS.length + 1).padStart(4, '0')}`,
    ...req.body,
    totalVisits: 0,
    totalBilled: 0,
    isActive: true,
    createdAt: new Date()
  };
  DEMO_PATIENTS.push(newP);
  res.status(201).json(newP);
});

router.put('/patients/:id', demoOnly, (req, res) => {
  const idx = DEMO_PATIENTS.findIndex((x) => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Patient not found' });
  Object.assign(DEMO_PATIENTS[idx], req.body);
  res.json(DEMO_PATIENTS[idx]);
});

router.delete('/patients/:id', demoOnly, (req, res) => {
  const idx = DEMO_PATIENTS.findIndex((x) => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Patient not found' });
  DEMO_PATIENTS[idx].isActive = false;
  res.json({ message: 'Patient deleted' });
});

// ==================== APPOINTMENTS ====================
router.get('/appointments', demoOnly, (req, res) => {
  res.json({ appointments: DEMO_APPOINTMENTS, total: DEMO_APPOINTMENTS.length, pages: 1, page: 1 });
});

router.get('/appointments/queue/today', demoOnly, (req, res) => {
  const queue = DEMO_APPOINTMENTS.filter((a) => ['scheduled', 'confirmed', 'in-progress'].includes(a.status));
  res.json(queue);
});

router.post('/appointments', demoOnly, (req, res) => {
  const patient = DEMO_PATIENTS.find((p) => p._id === req.body.patientId);
  const apt = {
    _id: `apt-${Date.now()}`,
    patientId: patient || DEMO_PATIENTS[0],
    date: req.body.date,
    timeSlot: req.body.timeSlot,
    type: req.body.type || 'consultation',
    status: 'scheduled',
    tokenNumber: DEMO_APPOINTMENTS.length + 1,
    symptoms: req.body.symptoms || ''
  };
  DEMO_APPOINTMENTS.push(apt);
  res.status(201).json(apt);
});

router.put('/appointments/:id', demoOnly, (req, res) => {
  const apt = DEMO_APPOINTMENTS.find((a) => a._id === req.params.id);
  if (!apt) return res.status(404).json({ message: 'Appointment not found' });
  Object.assign(apt, req.body);
  res.json(apt);
});

router.delete('/appointments/:id', demoOnly, (req, res) => {
  const idx = DEMO_APPOINTMENTS.findIndex((a) => a._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Appointment not found' });
  DEMO_APPOINTMENTS.splice(idx, 1);
  res.json({ message: 'Appointment cancelled' });
});

// ==================== PRESCRIPTIONS ====================
router.get('/prescriptions', demoOnly, (req, res) => {
  res.json({ prescriptions: DEMO_PRESCRIPTIONS, total: DEMO_PRESCRIPTIONS.length, pages: 1, page: 1 });
});

router.get('/prescriptions/templates', demoOnly, (req, res) => {
  res.json([]);
});

router.post('/prescriptions', demoOnly, (req, res) => {
  const patient = DEMO_PATIENTS.find((p) => p._id === req.body.patientId);
  const rx = {
    _id: `rx-${Date.now()}`,
    prescriptionNo: `RX-${String(DEMO_PRESCRIPTIONS.length + 1).padStart(5, '0')}`,
    patientId: patient || DEMO_PATIENTS[0],
    ...req.body,
    createdAt: new Date()
  };
  DEMO_PRESCRIPTIONS.push(rx);
  res.status(201).json(rx);
});

router.get('/prescriptions/:id', demoOnly, (req, res) => {
  const rx = DEMO_PRESCRIPTIONS.find((x) => x._id === req.params.id);
  if (!rx) return res.status(404).json({ message: 'Prescription not found' });
  res.json(rx);
});

router.delete('/prescriptions/:id', demoOnly, (req, res) => {
  const idx = DEMO_PRESCRIPTIONS.findIndex((x) => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Prescription not found' });
  DEMO_PRESCRIPTIONS.splice(idx, 1);
  res.json({ message: 'Prescription deleted' });
});

// ==================== BILLING ====================
router.get('/billing', demoOnly, (req, res) => {
  res.json({ bills: DEMO_BILLS, total: DEMO_BILLS.length, pages: 1, page: 1 });
});

router.get('/billing/revenue/summary', demoOnly, (req, res) => {
  res.json({ today: 1350, week: 2750, month: 2750, total: 15700 });
});

router.post('/billing', demoOnly, (req, res) => {
  const patient = DEMO_PATIENTS.find((p) => p._id === req.body.patientId);
  const subtotal = (req.body.items || []).reduce((s, i) => s + (Number(i.amount) || 0) * (Number(i.quantity) || 1), 0);
  const bill = {
    _id: `bill-${Date.now()}`,
    invoiceNo: `INV-${String(DEMO_BILLS.length + 1).padStart(5, '0')}`,
    patientId: patient || DEMO_PATIENTS[0],
    items: req.body.items || [],
    subtotal,
    totalAmount: subtotal - Number(req.body.discount || 0) + Number(req.body.tax || 0),
    paidAmount: Number(req.body.paidAmount || 0),
    paymentMethod: req.body.paymentMethod || 'cash',
    paymentStatus: Number(req.body.paidAmount || 0) >= subtotal ? 'paid' : Number(req.body.paidAmount || 0) > 0 ? 'partial' : 'pending',
    createdAt: new Date()
  };
  DEMO_BILLS.push(bill);
  res.status(201).json(bill);
});

router.put('/billing/:id', demoOnly, (req, res) => {
  const bill = DEMO_BILLS.find((b) => b._id === req.params.id);
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  Object.assign(bill, req.body);
  if (typeof req.body.paidAmount === 'number') {
    if (bill.paidAmount >= bill.totalAmount) bill.paymentStatus = 'paid';
    else if (bill.paidAmount > 0) bill.paymentStatus = 'partial';
    else bill.paymentStatus = 'pending';
  }
  res.json(bill);
});

// ==================== MEDICINES ====================
router.get('/medicines', demoOnly, (req, res) => {
  res.json([
    { _id: 'med-1', name: 'Paracetamol', strength: '500mg', form: 'tablet', defaultFrequency: '1-0-1', defaultDuration: '3 days', defaultTiming: 'after-food' },
    { _id: 'med-2', name: 'Amoxicillin', strength: '500mg', form: 'capsule', defaultFrequency: '1-1-1', defaultDuration: '5 days', defaultTiming: 'after-food' },
    { _id: 'med-3', name: 'Metformin', strength: '500mg', form: 'tablet', defaultFrequency: '1-0-1', defaultDuration: '30 days', defaultTiming: 'after-food' },
    { _id: 'med-4', name: 'Atorvastatin', strength: '10mg', form: 'tablet', defaultFrequency: '0-0-1', defaultDuration: '30 days', defaultTiming: 'bedtime' },
    { _id: 'med-5', name: 'Omeprazole', strength: '20mg', form: 'capsule', defaultFrequency: '1-0-0', defaultDuration: '14 days', defaultTiming: 'before-food' }
  ]);
});

// ==================== WHATSAPP ====================
router.post('/whatsapp/send', demoOnly, (req, res) => {
  res.json({ success: true, stubbed: true });
});

router.post('/whatsapp/remind', demoOnly, (req, res) => {
  res.json({ success: true, stubbed: true });
});

router.post('/whatsapp/prescription', demoOnly, (req, res) => {
  res.json({ success: true, stubbed: true });
});

router.post('/whatsapp/run-reminders', demoOnly, (req, res) => {
  res.json({ processed: 2, sent: 2 });
});

module.exports = router;
