const Appointment = require('../models/Appointment');

// Send appointment reminders for tomorrow
async function sendAppointmentReminders() {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const appointments = await Appointment.find({
      date: { $gte: tomorrow, $lt: dayAfter },
      status: { $in: ['scheduled', 'confirmed'] },
      reminderSent: false
    }).populate('patientId', 'name phone').populate('doctorId', 'name clinicName');

    for (const apt of appointments) {
      // In production, send via Twilio WhatsApp API
      console.log(`Sending reminder to ${apt.patientId.phone} for appointment with Dr. ${apt.doctorId.name}`);
      
      // Mark as sent
      apt.reminderSent = true;
      await apt.save();
    }

    return appointments.length;
  } catch (error) {
    console.error('Error sending reminders:', error);
    return 0;
  }
}

module.exports = { sendAppointmentReminders };
