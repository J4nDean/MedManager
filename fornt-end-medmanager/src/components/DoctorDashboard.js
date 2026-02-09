import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DoctorDashboard() {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:8080';

    const fetchDoctorData = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}`);
            if (!response.ok) throw new Error('Nie udało się pobrać danych lekarza');
            const data = await response.json();
            setDoctor(data);
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania danych lekarza');
            console.error('Error:', err);
        }
    }, [doctorId]);

    const fetchPatients = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/patients`);
            if (!response.ok) throw new Error('Nie udało się pobrać listy pacjentów');
            const data = await response.json();
            setPatients(data);
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania danych');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    useEffect(() => {
        Promise.all([
            fetchDoctorData(),
            fetchPatients()
        ]);
    }, [fetchDoctorData, fetchPatients]);

    if (loading) return <div className="loading-state">Ładowanie...</div>;
    if (!doctor) return <div className="error-message">Nie udało się załadować danych lekarza</div>;

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="profile-info">
                        <p className="doctor-name">Lekarz: <span>{doctor.firstName} {doctor.lastName}</span></p>
                        <p className="doctor-specialization">Specjalizacja: <span>{doctor.specialization}</span></p>
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">Lista Pacjentów</h2>
                </div>
                <div className="card-content">
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
                                        {new Date(patient.assignmentDate).toLocaleDateString('pl-PL')}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/doctors/${doctorId}/patient/${patient.id}`)}
                                            className="btn btn-primary"
                                        >
                                            Szczegóły
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">
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