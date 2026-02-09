import React, { useState, useEffect, useCallback } from 'react';
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

    const fetchPatientData = useCallback(async () => {
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
    }, [patientId]);

    const fetchPrescriptions = useCallback(async () => {
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
    }, [patientId]);

    useEffect(() => {
        fetchPatientData();
        fetchPrescriptions();
    }, [fetchPatientData, fetchPrescriptions]);

    const handleEmailUpdate = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}/email`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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

    if (loading) return <div className="loading-state">Ładowanie danych...</div>;
    if (!patient) return <div className="error-message">Nie znaleziono danych pacjenta</div>;

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="patient-info">
                        <p className="patient-name">Pacjent: <span>{patient.firstName} {patient.lastName}</span></p>
                        <p className="patient-pesel">PESEL: <span>{patient.pesel}</span></p>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">Dane kontaktowe</h2>
                </div>
                <div className="card-content">
                    <div className="contact-info">
                        <label className="form-label">Email</label>
                        {isEditingEmail ? (
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="form-input"
                                    placeholder="Wprowadź nowy email"
                                />
                                <button
                                    onClick={handleEmailUpdate}
                                    className="btn btn-primary"
                                >
                                    Zapisz
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditingEmail(false);
                                        setNewEmail(patient.email || '');
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Anuluj
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <span className="contact-email"><span>{patient.email || 'Brak adresu email'}</span></span>
                                <button
                                    onClick={() => setIsEditingEmail(true)}
                                    className="btn btn-secondary"
                                >
                                    Edytuj
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">Historia recept</h2>
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
                        <p className="text-gray-500 text-center py-4">
                            Brak aktywnych recept
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;