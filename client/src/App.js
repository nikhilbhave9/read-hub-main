// Imports
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from 'react';

// Components
import Navbar from './Components/Navbar'
import Login from './Components/Authentication/Login';
import Logout from './Components/Authentication/Logout';
import Signup from './Components/Authentication/Signup';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import Highlights from './Components/Highlights';

// Google O-Auth
import { gapi } from 'gapi-script';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function App() {
 

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<FeedSettings />} />
        <Route path="/highlights" element={<Highlights />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
