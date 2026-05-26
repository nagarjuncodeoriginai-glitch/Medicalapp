const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Send WhatsApp message to patient
router.post('/send', auth, async (req, res) => {
  try {
    const { phone, message, type } = req.body;
    
    // In production, integrate with Twilio/WhatsApp Business API
    // For now, return success simulation
    console.log(`WhatsApp to ${phone}: ${message}`);
    
    res.json({ 
      success: true, 
      message: 'WhatsApp message sent successfully',
      details: { phone, type, sentAt: new Date() }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Send appointment reminder
router.post('/remind', auth, async (req, res) => {
  try {
    const { patientName, phone, date, time, doctorName, clinicName } = req.body;
    
    const message = `Hello ${patientName}! This is a reminder for your appointment with Dr. ${doctorName} at ${clinicName} on ${date} at ${time}. Please arrive 10 minutes early. Reply CONFIRM to confirm or CANCEL to cancel.`;
    
    console.log(`Reminder to ${phone}: ${message}`);
    
    res.json({ success: true, message: 'Reminder sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reminder', error: error.message });
  }
});

// Send prescription via WhatsApp
router.post('/prescription', auth, async (req, res) => {
  try {
    const { phone, prescriptionUrl, patientName } = req.body;
    
    const message = `Hello ${patientName}! Your prescription from Dr. ${req.user.name} is ready. View here: ${prescriptionUrl}. Follow the medications as prescribed. Get well soon!`;
    
    console.log(`Prescription to ${phone}: ${message}`);
    
    res.json({ success: true, message: 'Prescription sent via WhatsApp' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send prescription', error: error.message });
  }
});

module.exports = router;
