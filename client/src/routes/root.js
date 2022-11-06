import '../App.css';
import { Link } from "react-router-dom";

import Navbar from '../components/Navbar'

function Root() {
  return (
    <div className="App">
      <Navbar />
      <Link to="/login">Login</Link> | {" "}
      <Link to="/feed">Feed</Link> 
    </div>
  );
}

export default Root;
