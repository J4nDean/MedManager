import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

function HomePage() {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_BASE_URL = 'http://localhost:8080';
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/doctors`);
            if (!response.ok) throw new Error('Nie udało się pobrać listy lekarzy');
            const data = await response.json();
            setDoctors(data);

            // Ekstrakcja unikalnych specjalizacji
            const uniqueSpecialties = [...new Set(data.map(doctor => doctor.specialization))];
            setSpecialties(uniqueSpecialties);
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania danych');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Mapowanie danych lekarzy aby zawierały email
    const mappedDoctors = doctors.map(doctor => ({
        ...doctor,
        email: doctor.user ? doctor.user.login : 'Brak adresu email'
    }));

    const filteredDoctors = mappedDoctors.filter(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = fullName.includes(searchLower);
        const matchesSpecialty = !specialtyFilter || doctor.specialization === specialtyFilter;
        return matchesSearch && matchesSpecialty;
    });

    // Paginacja
    const indexOfLastDoctor = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstDoctor = indexOfLastDoctor - ITEMS_PER_PAGE;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className="loading-state">
            <p>Ładowanie danych...</p>
        </div>
    );

    return (
        <div className="home-page">
            <div className="page-header">
                <h1 className="page-title">Lista Lekarzy</h1>
            </div>

            <div className="card mb-6">
                <div className="card-content">
                    <div className="search-grid">
                        <div className="search-field">
                            <label className="form-label">Wyszukaj po imieniu lub nazwisku</label>
                            <div className="search-input-wrapper">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    className="form-input search-input"
                                    placeholder="Wprowadź imię lub nazwisko"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-field">
                            <label className="form-label">Filtruj po specjalizacji</label>
                            <select
                                className="form-input"
                                value={specialtyFilter}
                                onChange={(e) => setSpecialtyFilter(e.target.value)}
                            >
                                <option value="">Wszystkie specjalizacje</option>
                                {specialties.map(specialty => (
                                    <option key={specialty} value={specialty}>
                                        {specialty}
                                    </option>
                                ))}
                            </select>
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
                <div className="card-content">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Imię i Nazwisko</th>
                            <th>Email</th>
                            <th>Specjalizacja</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentDoctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td>{doctor.firstName} {doctor.lastName}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialization}</td>
                                <td>
                                    <Link
                                        to={`/doctors/${doctor.id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Zobacz profil
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {currentDoctors.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    Nie znaleziono lekarzy spełniających kryteria wyszukiwania
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;