import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Nieprawidłowy email lub hasło');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('userId', data.userId);

            if (data.role === 'DOCTOR') {
                navigate(`/doctors/${data.userId}/dashboard`);
            } else if (data.role === 'PATIENT') {
                navigate(`/patients/${data.userId}/dashboard`);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Nieprawidłowy email lub hasło');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Logowanie do systemu
                    </h2>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            required
                            className="form-input"
                            value={formData.login}
                            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Hasło</label>
                        <input
                            type="password"
                            required
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full"
                    >
                        {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;