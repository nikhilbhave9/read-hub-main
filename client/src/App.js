// Imports
import { Routes, Route, Link } from "react-router-dom";

// Components
import Dashboard from './Components/Dashboard';
import FeedSettings from './Components/FeedSettings';
import Footer from './Components/Footer';
import PrivateRoutes from "./Components/PrivateRoutes";
import Login from './Components/Authentication/Login';

// Redux
import { useSelector } from 'react-redux';
import { login, selectUser } from './userSlice';

// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Container component="main" maxWidth="md" align="center" sx={{ marginTop: 12 }}>
      <Typography variant="h3" component="h3">
        Presenting a new way of consuming 
      </Typography>
      <Typography variant="h2" component="h2">
      the news
      </Typography>

      <Button variant="contained" sx={{ marginTop: 5 }}>
        <Link to='/login'>Log in</Link>
      </Button>
      
    </Container>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const user = useSelector(state => state.user); // Use the userReducer called "user"
  const currentUser = useSelector(state => state.user);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>

          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" exact element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<FeedSettings />} />
            </Route>
            <Route path="/login" element={<Login />} />

          </Routes>
          <Footer />
        </div>
      </ThemeProvider>

    </>
  );
}

export default App;
