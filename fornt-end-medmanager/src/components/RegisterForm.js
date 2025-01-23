import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        pesel: '',
        role: 'PATIENT',
        specialization: ''
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'Imię jest wymagane';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Nazwisko jest wymagane';
        }

        if (!formData.email) {
            newErrors.email = 'Email jest wymagany';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Nieprawidłowy format email';
        }

        if (!formData.password) {
            newErrors.password = 'Hasło jest wymagane';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Hasła nie są identyczne';
        }

        if (formData.role === 'PATIENT' && !formData.pesel) {
            newErrors.pesel = 'PESEL jest wymagany';
        } else if (formData.role === 'PATIENT' && !/^\d{11}$/.test(formData.pesel)) {
            newErrors.pesel = 'PESEL musi składać się z 11 cyfr';
        }

        if (formData.role === 'DOCTOR' && !formData.specialization) {
            newErrors.specialization = 'Specjalizacja jest wymagana';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Błąd rejestracji');
            }

            navigate('/login');
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-6 py-12">
                <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
                    Rejestracja
                </h2>

                {serverError && (
                    <div className="error-message">
                        {serverError}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Typ konta</label>
                        <select
                            className="form-select"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="PATIENT">Pacjent</option>
                            <option value="DOCTOR">Lekarz</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Imię</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        {errors.firstName && (
                            <p className="error-text">{errors.firstName}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Nazwisko</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        {errors.lastName && (
                            <p className="error-text">{errors.lastName}</p>
                        )}
                    </div>

                    {formData.role === 'PATIENT' && (
                        <div className="form-group">
                            <label className="form-label">PESEL</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.pesel}
                                onChange={(e) => setFormData({ ...formData, pesel: e.target.value })}
                            />
                            {errors.pesel && (
                                <p className="error-text">{errors.pesel}</p>
                            )}
                        </div>
                    )}

                    {formData.role === 'DOCTOR' && (
                        <div className="form-group">
                            <label className="form-label">Specjalizacja</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            />
                            {errors.specialization && (
                                <p className="error-text">{errors.specialization}</p>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && (
                            <p className="error-text">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Hasło</label>
                        <input
                            type="password"
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && (
                            <p className="error-text">{errors.password}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Potwierdź hasło</label>
                        <input
                            type="password"
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        {errors.confirmPassword && (
                            <p className="error-text">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Zarejestruj się
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;