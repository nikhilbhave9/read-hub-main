// Imports
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

// Components
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import Highlights from './Components/Highlights';

function Root() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<FeedSettings />} />
        <Route path="/highlights" element={<Highlights />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Root;
