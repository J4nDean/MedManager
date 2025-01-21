import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:8080';
    // Docelowo ID powinno pochodzić z kontekstu autoryzacji
    const DOCTOR_ID = 1;

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/doctors/${DOCTOR_ID}/patients`);
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać listy pacjentów');
                }
                const data = await response.json();
                setPatients(data);
            } catch (err) {
                console.error('Błąd:', err);
                setError('Wystąpił błąd podczas pobierania danych');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading-state">Ładowanie...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Panel Lekarza</h1>
                <p className="dashboard-subtitle">
                    Zarządzaj swoimi pacjentami i receptami
                </p>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <h2 className="text-lg font-medium">Lista Pacjentów</h2>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Pacjent</th>
                            <th>PESEL</th>
                            <th>Data przypisania</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patients.length > 0 ? (
                            patients.map(patient => (
                                <tr key={patient.id}>
                                    <td>{patient.firstName} {patient.lastName}</td>
                                    <td>{patient.pesel}</td>
                                    <td>
                                        {new Date(patient.assignmentDate).toLocaleDateString('pl-PL', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/patients/${patient.id}`)}
                                            className="btn btn-primary"
                                        >
                                            Szczegóły
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    Nie znaleziono żadnych pacjentów
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;