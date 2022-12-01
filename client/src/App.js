// Imports
import { Routes, Route } from "react-router-dom";

// Components
import Authentication from './Components/Authentication';
import Signup from './Components/Authentication/Signup';
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import Highlights from './Components/Highlights';

// Redux
import { useSelector } from 'react-redux';
import { login, selectUser } from './userSlice';

// Google O-Auth
import { gapi } from 'gapi-script';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function App() {

  const user = useSelector(state => state.user); // Use the userReducer called "user"
  const currentUser = useSelector(state => state.user); 
  return (
    <>
      <div>

        <Routes>
          <Route path="/" element={<Authentication />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<FeedSettings />} />
          <Route path="/highlights" element={<Highlights />} />
        </Routes>
        <Footer />
      </div>

      
    </>
  );
}

export default App;
