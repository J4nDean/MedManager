import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function DoctorDashboard() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const API_BASE_URL = 'http://localhost:8080';
    const ITEMS_PER_PAGE = 5;

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
            setError('Wystąpił błąd podczas pobierania pacjentów');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    useEffect(() => {
        fetchDoctorData();
        fetchPatients();
    }, [fetchDoctorData, fetchPatients]);

    const filteredPatients = patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        return fullName.includes(searchLower) || patient.pesel.includes(searchLower);
    });

    const indexOfLastPatient = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPatient = indexOfLastPatient - ITEMS_PER_PAGE;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

    const handleViewPatient = (patientId) => {
        navigate(`/doctors/${doctorId}/patient/${patientId}`);
    };

    if (loading) return <div className="loading-state">Ładowanie danych...</div>;

    return (
        <div className="container">
            {error && <div className="error-message">{error}</div>}

            <BackButton />

            {doctor && (
                <div className="card">
                    <div className="card-header">
                        <div className="profile-info">
                            <p className="doctor-name">Lekarz: <span>{doctor.firstName} {doctor.lastName}</span></p>
                            <p className="doctor-specialization">Specjalizacja: <span>{doctor.specialization}</span></p>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">Moi pacjenci</h2>
                </div>
                <div className="card-content">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Szukaj po nazwie lub PESEL..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="form-input"
                        />
                    </div>

                    {patients.length > 0 ? (
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Imię i nazwisko</th>
                                    <th>PESEL</th>
                                    <th>Email</th>
                                    <th>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPatients.map(patient => (
                                    <tr key={patient.id}>
                                        <td>{patient.firstName} {patient.lastName}</td>
                                        <td>{patient.pesel}</td>
                                        <td>{patient.email || 'Brak'}</td>
                                        <td>
                                            <button
                                                onClick={() => handleViewPatient(patient.id)}
                                                className="btn btn-primary"
                                            >
                                                Szczegóły
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {totalPages > 1 && (
                                <div className="pagination-container">
                                    <div className="pagination">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Poprzednia
                                        </button>
                                        <span className="page-info">
                                            Strona {currentPage} z {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Następna
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            Brak pacjentów
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;
