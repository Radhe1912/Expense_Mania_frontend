import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../style/Dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '', date: '' });
    const [editExpense, setEditExpense] = useState({
        _id: '',
        amount: '',
        category: '',
        description: '',
        date: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);  // To toggle between add and edit mode
    const [selectedCategory, setSelectedCategory] = useState(''); // State for category filter

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        getExpense();
    }, []);

    const getExpense = async () => {
        try {
            const response = await axios.get(`https://expense-mania-backend.onrender.com/api/expenses`, {
                headers: { Authorization: `Bearer ${token}` } // Authorization header
            });
            console.log("Response of expenses ", response.data.expenses);
            setExpenses(response.data.expenses);
        } catch (error) {
            setError('Session expired please login again');
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://expense-mania-backend.onrender.com/api/expenses/add`, newExpense, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(response.data.msg);
            getExpense(); // Refresh the expenses list
        } catch (error) {
            setError('Error adding expense');
        }
    };

    const handleEdit = (expense) => {
        const formattedDate = new Date(expense.date).toISOString().split('T')[0];
        setEditExpense({
            _id: expense._id,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            date: formattedDate
        });
        setIsEditing(true); // Toggle the modal for editing
        getExpense();
    };

    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://expense-mania-backend.onrender.com/api/expenses/update`, {
                expenseId: editExpense._id,
                amount: editExpense.amount,
                category: editExpense.category,
                description: editExpense.description,
                date: editExpense.date
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEditing(false); // Close the edit form
            getExpense(); // Refresh the expenses list
        } catch (error) {
            setError('Error updating expense');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://expense-mania-backend.onrender.com/api/expenses/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Expense deleted');
            getExpense(); // Refresh the expenses list
        } catch (error) {
            setError('Error deleting expense');
        }
    };

    // Calculate category-wise spending
    const categoryTotals = (expenses || []).reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += parseFloat(expense.amount);
        return acc;
    }, {});

    const totalExpenses = Object.values(categoryTotals).reduce((acc, total) => acc + total, 0);

    // Data for the bar chart
    const barChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Total Spending',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', // Neon Pink
                    'rgba(54, 162, 235, 0.7)', // Neon Blue
                    'rgba(75, 192, 192, 0.7)', // Neon Teal
                    'rgba(255, 206, 86, 0.7)', // Neon Yellow
                    'rgba(153, 102, 255, 0.7)', // Neon Purple
                    'rgba(255, 159, 64, 0.7)', // Neon Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Brighter Neon Pink
                    'rgba(54, 162, 235, 1)', // Brighter Neon Blue
                    'rgba(75, 192, 192, 1)', // Brighter Neon Teal
                    'rgba(255, 206, 86, 1)', // Brighter Neon Yellow
                    'rgba(153, 102, 255, 1)', // Brighter Neon Purple
                    'rgba(255, 159, 64, 1)', // Brighter Neon Orange
                ],
                borderWidth: 2,
            },
        ],
    };

    // Data for the pie chart
    const pieChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', // Neon Pink
                    'rgba(54, 162, 235, 0.7)', // Neon Blue
                    'rgba(75, 192, 192, 0.7)', // Neon Teal
                    'rgba(255, 206, 86, 0.7)', // Neon Yellow
                    'rgba(153, 102, 255, 0.7)', // Neon Purple
                    'rgba(255, 159, 64, 0.7)', // Neon Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Brighter Neon Pink
                    'rgba(54, 162, 235, 1)', // Brighter Neon Blue
                    'rgba(75, 192, 192, 1)', // Brighter Neon Teal
                    'rgba(255, 206, 86, 1)', // Brighter Neon Yellow
                    'rgba(153, 102, 255, 1)', // Brighter Neon Purple
                    'rgba(255, 159, 64, 1)', // Brighter Neon Orange
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <h2>Welcome to ExpenseMania</h2>

                {/* Main Content Section */}
                <div className="main-content">
                    {/* Left: Bar Chart */}
                    <div className="chart-section left">
                        <h3>Category-wise Spending</h3>
                        <Bar data={barChartData} options={{ responsive: true }} />
                    </div>

                    {/* Middle: Form */}
                    <div className="form-section">
                        {isEditing ? (
                            <div className="expense-form">
                                <h3>Edit Expense</h3>
                                <form onSubmit={handleUpdateExpense}>
                                    <input
                                        type="number"
                                        value={editExpense.amount}
                                        onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={editExpense.category}
                                        onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                                        required
                                    >
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Health">Health</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Utilities">Utilities</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={editExpense.description}
                                        onChange={(e) => setEditExpense({ ...editExpense, description: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="date"
                                        value={editExpense.date}
                                        onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                                        required
                                    />
                                    <button type="submit">Update</button>
                                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                </form>
                            </div>
                        ) : (
                            <div className="expense-form">
                                <h3>Add Expense</h3>
                                <form onSubmit={handleAddExpense}>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={newExpense.category}
                                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Health">Health</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Utilities">Utilities</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                                        required
                                    />
                                    <button type="submit">Add</button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Right: Pie Chart */}
                    <div className="chart-section right">
                        <h3>Spending Distribution</h3>
                        <Pie data={pieChartData} options={{ responsive: true }} />
                    </div>
                </div>

                <div>
                    <h1>Your Expenses Calculation</h1>
                </div>

                {/* Category-wise and Total Expenses Section */}
                <div className="total-expenses-section">
                    <div className='row'>
                        <div className='col-sm-6 col-md-6 col-lg-6'>
                            <h3>Total Expenses by Category</h3>
                            <ul>
                                {Object.entries(categoryTotals).map(([category, total]) => (
                                    <li key={category}>
                                        <strong>{category}:</strong> ${total.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='m-auto col-sm-6 col-md-6 col-lg-6'>
                            <h3>Overall Total Expenses</h3>
                            <p><strong>Total:</strong> ${totalExpenses.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Displaying Expenses */}
                <div className="expenses-list">
                    <h1>Your Expenses</h1>
                    {error && <div className="error">{error}</div>}
                    {message && <div className="success">{message}</div>}

                    {/* Category Filter Dropdown */}
                    <div className="category-filter">
                        <label htmlFor="category-filter">Filter by Category:</label>
                        <select
                            id="category-filter"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Utilities">Utilities</option>
                        </select>
                    </div>

                    {expenses && expenses.length > 0 ? (
                        <div className="expenses-grid">
                            {expenses
                                .filter((expense) =>
                                    selectedCategory ? expense.category === selectedCategory : true
                                )
                                .map((expense, index) => (
                                    <div
                                        key={expense._id}
                                        className={`expense-card ${index === expenses.length - 1 && expenses.length % 2 !== 0 ? 'full-width' : ''}`}
                                    >
                                        <div className="expense-icon m-auto d-flex justify-content-center align-items-center">
                                            <span role="img" aria-label="money">💰</span>
                                        </div>
                                        <div className="expense-details m-auto d-grid align-items-center justify-content-center">
                                            <p className="expense-amount">💵 ${expense.amount}</p>
                                            <p className="expense-category">
                                                <span role="img" aria-label="category">🏷️</span> {expense.category}
                                            </p>
                                            <p className="expense-description">
                                                <span role="img" aria-label="description">📝</span> {expense.description}
                                            </p>
                                            <p className="expense-date">
                                                <span role="img" aria-label="date">📅</span> {expense.date}
                                            </p>
                                        </div>
                                        <div className="buttons-container">
                                            <button className="edit-button" onClick={() => handleEdit(expense)}>
                                                <span role="img" aria-label="edit">✏️</span> Edit
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(expense._id)}>
                                                <span role="img" aria-label="delete">🗑️</span> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="no-expenses">No expenses available. Add one to get started!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;