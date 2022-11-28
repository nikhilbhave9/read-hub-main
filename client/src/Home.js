// COMPONENT FOR ALL NAVGIGATIONS AFTER LOGIN PAGE 
// ================================================

// Imports 
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar'
import Login from './Components/Authentication/Login';
import Logout from './Components/Authentication/Logout';
import Signup from './Components/Authentication/Signup';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import Highlights from './Components/Highlights';


// Styles



function DefaultContainer() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<FeedSettings />} />
                <Route path="/highlights" element={<Highlights />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default DefaultContainer;