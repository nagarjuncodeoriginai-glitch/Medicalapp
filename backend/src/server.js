const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor-clinic')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/whatsapp', require('./routes/whatsapp'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Doctor Clinic API is running!' });
});

// WhatsApp Reminder Cron - Every day at 8 AM
cron.schedule('0 8 * * *', async () => {
  const { sendAppointmentReminders } = require('./services/whatsappService');
  await sendAppointmentReminders();
  console.log('Appointment reminders sent!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Doctor Clinic API running on port ${PORT}`);
});
