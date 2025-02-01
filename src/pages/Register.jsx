import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar'
import '../style/Register.css'

const Register = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${backendUrl}/register`, formData, {
                withCredentials: true
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', formData.email);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || 'Registration failed');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='register-container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstname" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastname" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    )
}

export default Register