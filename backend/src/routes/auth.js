const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register Doctor
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, specialty, clinicName, clinicCity, qualification } = req.body;

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      specialty,
      clinicName,
      clinicCity,
      qualification,
      plan: 'free',
      planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days free trial
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'doctor-clinic-secret-2024',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        clinicName: user.clinicName,
        plan: user.plan
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ===== DUMMY LOGIN (No Database Needed) =====
    // Email: admin@clinic.com | Password: admin123
    if (email === 'admin@clinic.com' && password === 'admin123') {
      const token = jwt.sign(
        { userId: 'demo-doctor-001' },
        process.env.JWT_SECRET || 'doctor-clinic-secret-2024',
        { expiresIn: '30d' }
      );
      return res.json({
        token,
        user: {
          id: 'demo-doctor-001',
          name: 'Zakir',
          email: 'admin@clinic.com',
          specialty: 'general',
          clinicName: 'LifeCare Clinic',
          plan: 'pro'
        }
      });
    }
    // ===== END DUMMY LOGIN =====

    // Check if MongoDB is connected before querying
    if (require('mongoose').connection.readyState !== 1) {
      return res.status(400).json({ message: 'Invalid credentials. Use demo: admin@clinic.com / admin123' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'doctor-clinic-secret-2024',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        clinicName: user.clinicName,
        plan: user.plan
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Profile
router.get('/profile', auth, async (req, res) => {
  res.json(req.user);
});

// Update Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update here
    
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
