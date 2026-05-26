# DocClinic Pro - All-in-One Doctor Clinic Management App

> Smart, Affordable Clinic Management for Modern Doctors - Web + Mobile

## Features

### Core Features
- **Patient Management** - Digital patient records, search, medical history
- **Appointment Booking** - Token system, daily queue, status tracking
- **Digital Prescriptions** - Fast prescriptions with templates, medicine database
- **Billing & Invoicing** - OPD fees, receipts, payment tracking (Cash/UPI/Card)
- **WhatsApp Reminders** - Auto-remind patients, reduce no-shows
- **Dashboard Analytics** - Revenue, patient stats, appointment overview

### Specialty Support (All-in-One)
- General Physician
- Dentist (Dental Chart)
- Ophthalmologist (Vision Records)
- Orthopedic (X-ray Storage)
- Pediatrician (Growth Charts)
- Dermatologist (Photo Comparison)
- ENT, Cardiology, Gynecology

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js, MongoDB |
| Web Dashboard | React 18, Tailwind CSS, Vite |
| Mobile App | React Native (Expo) |
| Auth | JWT + bcrypt |
| Messaging | WhatsApp Business API (Twilio) |

## Project Structure

```
Medicalapp/
├── backend/          # Node.js API Server
│   ├── src/
│   │   ├── models/       # MongoDB Models
│   │   ├── routes/       # API Routes
│   │   ├── middleware/   # Auth middleware
│   │   ├── services/     # Business logic
│   │   └── server.js     # Entry point
│   └── package.json
├── web/              # React Web Dashboard
│   ├── src/
│   │   ├── pages/        # Dashboard, Patients, etc.
│   │   ├── components/   # Layout, shared components
│   │   └── utils/        # API client
│   └── package.json
├── mobile/           # React Native Mobile App
│   ├── src/
│   │   └── screens/      # All mobile screens
│   ├── App.js
│   └── package.json
└── package.json      # Root workspace config
```

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env  # Edit with your MongoDB URI
npm install
npm run dev
```

### Web Dashboard
```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### Mobile App
```bash
cd mobile
npm install
npx expo start
```

## Pricing Plans

| Plan | Price | Target |
|------|-------|--------|
| Basic | INR 499/month | Single doctor clinic |
| Pro | INR 1,499/month | 2-3 doctor clinic |
| Enterprise | INR 4,999/month | Multi-branch hospital |

## API Endpoints

- `POST /api/auth/register` - Doctor registration
- `POST /api/auth/login` - Login
- `GET /api/patients` - List patients
- `POST /api/patients` - Add patient
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Book appointment
- `GET /api/prescriptions` - List prescriptions
- `POST /api/prescriptions` - Create prescription
- `GET /api/billing` - List bills
- `POST /api/billing` - Create invoice
- `GET /api/dashboard/stats` - Dashboard analytics
- `POST /api/whatsapp/send` - Send WhatsApp message

## License

MIT - Built with love for Indian doctors
