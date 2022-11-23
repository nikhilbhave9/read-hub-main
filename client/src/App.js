// Imports
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from 'react';

// Components
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Logout from './Components/Logout';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import Highlights from './Components/Highlights';

// Google O-Auth
import { gapi } from 'gapi-script';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

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

export default App;
