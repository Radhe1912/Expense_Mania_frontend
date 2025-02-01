import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook for redirection

    // On component mount, check localStorage for dark mode preference
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true'; // Check if darkMode is saved as 'true'
        setDarkMode(savedDarkMode);
        if (savedDarkMode) {
            document.body.classList.add('dark-mode'); // Apply dark mode class if saved as true
        }
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set login state based on token presence
    }, []);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);

        // Save the new dark mode preference to localStorage
        localStorage.setItem('darkMode', newDarkMode);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/route/logout`, {
                method: "GET",
                credentials: "include", // Ensure cookies are sent with the request
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem("token"); // Remove token from localStorage
                localStorage.removeItem("userEmail"); // Remove userEmail from localStorage
                setIsLoggedIn(false);
                navigate(data.redirect); // Redirect to home page "/"
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">ExpenseMania</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{ marginLeft: "75%" }} className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/api/route/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={toggleDarkMode}>
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;