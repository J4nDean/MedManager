import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import SearchForm from '../components/SearchForm/SearchForm';
import DoctorList from '../components/DoctorList/DoctorList';

const HomePage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async (params = {}) => {
        try {
            setLoading(true);
            setError(null);

            const query = new URLSearchParams(params).toString();
            const response = await fetch(`/api/doctors?${query}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch doctors. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Doctor Finder!</h1>
                <SearchForm onSearch={fetchDoctors} />
                <DoctorList doctors={doctors} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default HomePage;