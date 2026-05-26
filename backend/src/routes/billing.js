const express = require('express');
const router = express.Router();
const Billing = require('../models/Billing');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// Get all bills
router.get('/', auth, async (req, res) => {
  try {
    const { patientId, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = { doctorId: req.user._id };

    if (patientId) query.patientId = patientId;
    if (status) query.paymentStatus = status;
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const bills = await Billing.find(query)
      .populate('patientId', 'name phone patientId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Billing.countDocuments(query);
    res.json({ bills, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create bill
router.post('/', auth, async (req, res) => {
  try {
    const bill = new Billing({
      ...req.body,
      doctorId: req.user._id
    });
    await bill.save();

    // Update patient total billed
    await Patient.findByIdAndUpdate(req.body.patientId, {
      $inc: { totalBilled: bill.totalAmount }
    });

    const populated = await bill.populate('patientId', 'name phone patientId');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update payment status
router.put('/:id', auth, async (req, res) => {
  try {
    const bill = await Billing.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.user._id },
      req.body,
      { new: true }
    ).populate('patientId', 'name phone patientId');

    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get revenue summary
router.get('/revenue/summary', auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const [todayRevenue, weekRevenue, monthRevenue, totalRevenue] = await Promise.all([
      Billing.aggregate([
        { $match: { doctorId: req.user._id, createdAt: { $gte: new Date(today.setHours(0,0,0,0)) }, paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ]),
      Billing.aggregate([
        { $match: { doctorId: req.user._id, createdAt: { $gte: startOfWeek }, paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ]),
      Billing.aggregate([
        { $match: { doctorId: req.user._id, createdAt: { $gte: startOfMonth }, paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ]),
      Billing.aggregate([
        { $match: { doctorId: req.user._id, paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ])
    ]);

    res.json({
      today: todayRevenue[0]?.total || 0,
      week: weekRevenue[0]?.total || 0,
      month: monthRevenue[0]?.total || 0,
      total: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
