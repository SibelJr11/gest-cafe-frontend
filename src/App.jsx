import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import FarmRegisterPage from './pages/FarmRegisterPage';
import FarmsPage from './pages/FarmsPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route  path="/register-user" element={<UserRegisterPage />} />
        <Route path="/register-farm" element={<FarmRegisterPage />} />
        <Route path="/farms" element={<FarmsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
