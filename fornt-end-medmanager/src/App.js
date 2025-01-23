import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDetails from './components/PatientDetails';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';
import LoginForm from './components/LoginForm';

const PrivateRoute = ({ element, allowedRoles = [] }) => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return element;
};

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route
                            path="/doctors/:doctorId/dashboard"
                            element={
                                <PrivateRoute
                                    element={<DoctorDashboard />}
                                    allowedRoles={['DOCTOR']}
                                />
                            }
                        />
                        <Route
                            path="/doctors/:doctorId/patient/:patientId"
                            element={
                                <PrivateRoute
                                    element={<PatientDetails />}
                                    allowedRoles={['DOCTOR']}
                                />
                            }
                        />
                        <Route
                            path="/patients/:patientId/dashboard"
                            element={
                                <PrivateRoute
                                    element={<PatientDashboard />}
                                    allowedRoles={['PATIENT']}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;