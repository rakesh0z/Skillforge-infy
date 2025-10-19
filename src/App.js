import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Student/StudentDashboard';
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }/>

          <Route path="/instructor" element={
            <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }/>

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
