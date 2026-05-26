const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const auth = require('../middleware/auth');

// Get all prescriptions (with patient filter)
router.get('/', auth, async (req, res) => {
  try {
    const { patientId, page = 1, limit = 20 } = req.query;
    const query = { doctorId: req.user._id, isTemplate: false };
    if (patientId) query.patientId = patientId;

    const prescriptions = await Prescription.find(query)
      .populate('patientId', 'name phone patientId age gender')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Prescription.countDocuments(query);
    res.json({ prescriptions, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get prescription templates
router.get('/templates', auth, async (req, res) => {
  try {
    const templates = await Prescription.find({ doctorId: req.user._id, isTemplate: true });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create prescription
router.post('/', auth, async (req, res) => {
  try {
    const prescription = new Prescription({
      ...req.body,
      doctorId: req.user._id
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save as template
router.post('/template', auth, async (req, res) => {
  try {
    const template = new Prescription({
      ...req.body,
      doctorId: req.user._id,
      isTemplate: true
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single prescription
router.get('/:id', auth, async (req, res) => {
  try {
    const prescription = await Prescription.findOne({ _id: req.params.id, doctorId: req.user._id })
      .populate('patientId', 'name phone patientId age gender bloodGroup allergies');
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
