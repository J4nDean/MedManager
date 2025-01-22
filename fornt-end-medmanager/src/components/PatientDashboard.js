import React, { useState, useEffect } from 'react';
import { Mail, Save, X } from 'lucide-react';
import { useParams } from 'react-router-dom';

const PatientDashboard = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const API_BASE_URL = 'http://localhost:8080';

    useEffect(() => {
        fetchPatientData();
        fetchPrescriptions();
    }, [patientId]);

    const fetchPatientData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}`);
            if (!response.ok) throw new Error('Nie udało się pobrać danych pacjenta');
            const data = await response.json();
            setPatient(data);
            setNewEmail(data.email || '');
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania danych pacjenta');
            console.error('Error:', err);
        }
    };

    const fetchPrescriptions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}/prescriptions`);
            if (!response.ok) throw new Error('Nie udało się pobrać recept');
            const data = await response.json();
            setPrescriptions(data);
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania recept');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailUpdate = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}/email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newEmail }),
            });

            if (!response.ok) throw new Error('Nie udało się zaktualizować adresu email');

            setPatient(prev => ({ ...prev, email: newEmail }));
            setIsEditingEmail(false);
        } catch (err) {
            setError('Wystąpił błąd podczas aktualizacji email');
            console.error('Error:', err);
        }
    };

    if (loading) {
        return (
            <div className="loading-state">
                <p>Ładowanie danych...</p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="error-message">
                Nie znaleziono danych pacjenta
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="card mb-6">
                <div className="card-header">
                    <div className="profile-grid">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {patient.firstName} {patient.lastName}
                            </h1>
                            <p className="text-lg text-gray-600">
                                PESEL: {patient.pesel}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <h2 className="text-lg font-medium">Dane kontaktowe</h2>
                </div>
                <div className="card-content">
                    <div className="profile-grid-full">
                        <p className="profile-label">Email</p>
                        {isEditingEmail ? (
                            <div className="email-edit-container">
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="form-input email-input"
                                    placeholder="Wprowadź nowy email"
                                />
                                <button
                                    onClick={handleEmailUpdate}
                                    className="icon-button icon-button-save"
                                    title="Zapisz"
                                >
                                    <Save size={20} />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditingEmail(false);
                                        setNewEmail(patient.email || '');
                                    }}
                                    className="icon-button icon-button-cancel"
                                    title="Anuluj"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="email-edit-container">
                                <p className="profile-value">{patient.email || 'Brak adresu email'}</p>
                                <button
                                    onClick={() => setIsEditingEmail(true)}
                                    className="icon-button icon-button-edit"
                                    title="Edytuj email"
                                >
                                    <Mail size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="text-lg font-medium">Historia recept</h2>
                </div>
                <div className="card-content">
                    {prescriptions.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Lekarz</th>
                                <th>Opis</th>
                                <th>Data wystawienia</th>
                                <th>Data ważności</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {prescriptions.map(prescription => (
                                <tr key={prescription.id}>
                                    <td>
                                        {prescription.doctorFirstName} {prescription.doctorLastName}
                                    </td>
                                    <td>{prescription.description}</td>
                                    <td>
                                        {new Date(prescription.issueDate).toLocaleDateString('pl-PL')}
                                    </td>
                                    <td>
                                        {new Date(prescription.expiryDate).toLocaleDateString('pl-PL')}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${prescription.status.toLowerCase()}`}>
                                            {prescription.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="empty-prescriptions">
                            Brak aktywnych recept
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;