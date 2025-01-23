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
        <div className="login-container top-left no-box">
            <h2 className="login-title">Zaloguj się</h2>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
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
                    className="btn btn-primary"
                >
                    {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;