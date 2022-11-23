import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import Feed from './Components/Feed';
import Navbar from './Components/Navbar'

function Root() {
  return (
    <div className="App-header">
      <Navbar />
      <Link to="/login">Login</Link>
      <Link to="/feed">Feed</Link> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
      
    </div>
  );
}

export default Root;
