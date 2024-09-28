
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Weather from './components/Weather';
import Footer from "./components/Footer";
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
            <Route path="/privacy" element={<PrivacyPolicy/>} />
              <Route path="/" element={<Home />} /> 
              <Route path="/Weather" element={<Weather />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    
  );
};

export default App;