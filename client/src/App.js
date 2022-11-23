// Imports
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

// Components
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';

function Root() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<FeedSettings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Root;
