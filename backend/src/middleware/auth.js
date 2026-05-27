const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'doctor-clinic-secret-2024');
    
    // Allow dummy/demo user without DB
    if (decoded.userId === 'demo-doctor-001') {
      req.user = {
        _id: 'demo-doctor-001',
        name: 'Brijesh',
        email: 'admin@clinic.com',
        specialty: 'geriatric',
        clinicName: 'LifeCare Clinic',
        plan: 'pro'
      };
      return next();
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
