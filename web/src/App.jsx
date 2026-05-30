import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';
import Billing from './pages/Billing';
import Medicines from './pages/Medicines';
import LabTests from './pages/LabTests';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import DoctorProfile from './pages/DoctorProfile';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { isLoggedIn } from './utils/auth';

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  return isLoggedIn() ? <Navigate to="/" replace /> : children;
}

// Opt in to React Router v7 behavior now to silence the deprecation warnings.
const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

export default function App() {
  return (
    <AuthProvider>
    <ErrorBoundary>
    <Router future={routerFutureFlags}>
      <Toaster
        position="top-right"
        toastOptions={{ style: { borderRadius: '12px', background: '#333', color: '#fff' } }}
      />
      <Routes>
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
        <Route path="/forgot-password" element={<PublicOnly><ForgotPassword /></PublicOnly>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="billing" element={<Billing />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="lab-tests" element={<LabTests />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </ErrorBoundary>
    </AuthProvider>
  );
}
