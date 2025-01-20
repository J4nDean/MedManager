import React, { useState, useEffect } from 'react';
import '../styles.css';

const DoctorSearch = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        specialization: ''
    });

    const fetchDoctors = async (page = 0) => {
        try {
            setLoading(true);
            setError(null);
            const params = new URLSearchParams({
                page: page,
                size: 10
            });

            if (formData.name) params.append('name', formData.name);
            if (formData.specialization) params.append('specialization', formData.specialization);

            const response = await fetch(`/api/doctors?${params}`);
            if (!response.ok) {
                throw new Error('Nie udało się pobrać listy lekarzy');
            }
            const data = await response.json();
            setDoctors(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setError('Nie udało się pobrać listy lekarzy. Spróbuj odświeżyć stronę.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchDoctors(0); // Reset do pierwszej strony przy wyszukiwaniu
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePageChange = (newPage) => {
        fetchDoctors(newPage);
    };

    return (
        <div className="main-content">
            <h1 className="search-header">Witaj w wyszukiwarce lekarzy!</h1>

            <p className="search-description">
                Znajdź lekarza szybko i łatwo. Przejrzyj listę poniżej lub skorzystaj z wyszukiwarki.
            </p>

            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-group">
                    <label>Imię i nazwisko:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Wpisz imię i nazwisko"
                    />
                </div>
                <div className="form-group">
                    <label>Specjalizacja:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="Wpisz specjalizację"
                    />
                </div>
                <button type="submit" className="search-button">
                    Wyszukaj
                </button>
            </form>

            <h2 className="search-header">Lista lekarzy</h2>

            {loading ? (
                <p>Ładowanie...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <table className="doctors-table">
                        <thead>
                        <tr>
                            <th>Imię i nazwisko</th>
                            <th>Specjalizacja</th>
                            <th>Email</th>
                            <th>Telefon</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.imie} {doctor.nazwisko}</td>
                                <td>{doctor.specjalizacja}</td>
                                <td>
                                    <a href={`mailto:${doctor.email}`} className="email-link">
                                        {doctor.email}
                                    </a>
                                </td>
                                <td>{doctor.telefon}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className="pagination-button"
                            >
                                Poprzednia
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    className={`pagination-button ${currentPage === index ? 'active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                                className="pagination-button"
                            >
                                Następna
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DoctorSearch;