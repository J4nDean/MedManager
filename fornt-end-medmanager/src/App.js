import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDetails from './components/PatientDetails';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/doctors/:doctorId/dashboard" element={<DoctorDashboard />} />
                        <Route path="/doctors/:doctorId/patient/:patientId" element={<PatientDetails />} />
                        <Route path="/patients/:patientId/dashboard" element={<PatientDashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;