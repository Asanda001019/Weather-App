import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom'; 

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      login(foundUser);
      setMessage('Successfully logged in!'); // Alert for successful login
      setTimeout(() => {
        navigate('/Weather'); // Redirect after a short delay
      }, 1000); // Adjust delay as needed (1000 ms = 1 second)
    } else {
      setMessage('Invalid credentials'); // Alert for invalid credentials
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {message && (
        <div className="mb-4 p-2 text-center text-white bg-blue-500 rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
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
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
