import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for alerts
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { email, password };

    // Check if the user already exists
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      setMessage('Account already exists please login'); // Alert for existing user
      return;
    }

    // Register the new user
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    setMessage('Successfully registered!'); // Success message
    navigate('/login'); 
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {message && (
        <div className="mb-4 p-2 text-center text-white bg-blue-500 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>.</p>
      </div>
    </div>
  );
};

export default RegisterForm;
