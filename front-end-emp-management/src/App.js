import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Department from './components/Department';
import Employee from './components/Employee';
import Dashboard from './components/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/departments" element={<Department />} />
        <Route path="/index" element={<Dashboard />} />

        <Route path="/employees" element={<Employee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        {/* Define other routes using Route component */}
      </Routes>
    </Router>
  );
}

export default App;
