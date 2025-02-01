import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import '../style/Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`https://expense-mania-backend.onrender.com/api/route/login`, { email, password }, { withCredentials: true });

            // Store user data in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', email);

            setMessage(response.data.msg);
            setError('');

            navigate('/dashboard');

        }catch(error){
            setError(error.response?.data?.msg || 'An error occured');
            setMessage('');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='login-container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} name='email' className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name='password' className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
            </div>
        </div>
    )
}

export default Login