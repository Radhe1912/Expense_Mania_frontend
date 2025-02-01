import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import '../style/Home.css';

const Home = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsSignedIn(!!token); // Convert token to boolean (true if present, false otherwise)
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container-fluid p-0">
                <section className="bg-primary text-white text-center py-5">
                    <div className="container">
                        <h1 className="display-4">Welcome to Your Personal Expense Tracker</h1>
                        <p className="lead">
                            Managing your finances has never been easier! Our Expense Tracker helps you stay on top of your spending and
                            save more for the future. Start tracking today and take control of your money.
                        </p>
                        {isSignedIn?(<></>):(<a href='/register' className="btn btn-light btn-lg">Get Started</a>)}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-5">
                    <div className="container">
                        <h1 className="text-center mb-5">Why Choose Us?</h1>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="icon mb-3">💰</div>
                                        <h3 className="card-title">Track Your Spending</h3>
                                        <p className="card-text">
                                            Easily log your daily expenses to keep a record of where your money is going. Visualize your expenses
                                            and make informed decisions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="icon mb-3">📊</div>
                                        <h3 className="card-title">Set Your Budget</h3>
                                        <p className="card-text">
                                            Define your monthly budget, and track how much you've spent and how much you have left. Set limits and
                                            avoid overspending.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="icon mb-3">🗂️</div>
                                        <h3 className="card-title">Category Breakdown</h3>
                                        <p className="card-text">
                                            Organize your expenses by category (e.g., food, transportation, etc.) to see where most of your money is
                                            spent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="icon mb-3">🎯</div>
                                        <h3 className="card-title">Stay on Track</h3>
                                        <p className="card-text">
                                            Get insights into your spending habits and identify areas where you can save money. Stay motivated to
                                            meet your financial goals.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="">
                    <div className="container">
                        <h1 className="text-center mb-5">How It Works</h1>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="step-number mb-3">1</div>
                                        <h3 className="card-title">Set Your Budget</h3>
                                        <p className="card-text">Start by setting a monthly budget based on your income.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="step-number mb-3">2</div>
                                        <h3 className="card-title">Log Your Expenses</h3>
                                        <p className="card-text">Log your daily expenses as you make purchases or pay bills.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="step-number mb-3">3</div>
                                        <h3 className="card-title">View Breakdowns</h3>
                                        <p className="card-text">View detailed breakdowns of your spending across various categories.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <div className="card-body">
                                        <div className="step-number mb-3">4</div>
                                        <h3 className="card-title">Monitor Progress</h3>
                                        <p className="card-text">Monitor your progress and adjust your budget accordingly to stay on track.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get Started Section */}
                <section className="bg-primary text-white text-center py-5">
                    <div className="container">
                        <h2 className="display-4 mb-4">Get Started Today!</h2>
                        <p className="lead mb-4">
                            It's time to take control of your finances. Start using the Expense Tracker today and begin saving for the
                            things that matter most to you. You can manage your budget, track your spending, and make smarter financial
                            decisions every day.
                        </p>
                        {isSignedIn==true?(<></>):(<a href='/register' className="btn btn-light btn-lg">Sig Up Now</a>)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;