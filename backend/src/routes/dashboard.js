const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Billing = require('../models/Billing');
const Prescription = require('../models/Prescription');
const auth = require('../middleware/auth');

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalPatients,
      todayAppointments,
      monthRevenue,
      todayCompleted,
      pendingPayments,
      newPatientsThisMonth
    ] = await Promise.all([
      Patient.countDocuments({ doctorId: req.user._id, isActive: true }),
      Appointment.countDocuments({ doctorId: req.user._id, date: { $gte: today, $lt: tomorrow } }),
      Billing.aggregate([
        { $match: { doctorId: req.user._id, createdAt: { $gte: startOfMonth }, paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ]),
      Appointment.countDocuments({ doctorId: req.user._id, date: { $gte: today, $lt: tomorrow }, status: 'completed' }),
      Billing.countDocuments({ doctorId: req.user._id, paymentStatus: 'pending' }),
      Patient.countDocuments({ doctorId: req.user._id, createdAt: { $gte: startOfMonth } })
    ]);

    res.json({
      totalPatients,
      todayAppointments,
      monthRevenue: monthRevenue[0]?.total || 0,
      todayCompleted,
      pendingPayments,
      newPatientsThisMonth
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recent activity
router.get('/recent', auth, async (req, res) => {
  try {
    const [recentPatients, recentAppointments] = await Promise.all([
      Patient.find({ doctorId: req.user._id }).sort({ createdAt: -1 }).limit(5).select('name phone patientId createdAt'),
      Appointment.find({ doctorId: req.user._id }).sort({ createdAt: -1 }).limit(10)
        .populate('patientId', 'name phone patientId')
    ]);

    res.json({ recentPatients, recentAppointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get monthly analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Billing.aggregate([
      { $match: { doctorId: req.user._id, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$paidAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthlyPatients = await Patient.aggregate([
      { $match: { doctorId: req.user._id, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ monthlyRevenue, monthlyPatients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
