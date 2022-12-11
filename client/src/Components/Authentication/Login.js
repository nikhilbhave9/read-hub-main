// WE WANT A PROTECTED AUTHENTICATION REDIRECT 
// LOGIN -> Both Login and Signup 

// Imports
import react from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";


// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from '../../userSlice';


// Styling
import cover from '../../Images/cover.png';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Google O-Auth
import Signup from './Signup';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Login() {

    // Step 1: Add O-Auth functionality 
    // Step 2: Add onClick functionality after submission 
    // Step 3: Add useNavigate hook from React Router to redirect to user-specific Dashboard


    // Redux to manage user state
    // const user = useSelector(state => state.user); // Use the userReducer called "user"
    const dispatch = useDispatch(); // Use the dispatch function to update the userReducer





    // const [ user, setUser ] = useState({});
    const navigate = useNavigate();

    const user = selectUser; // Use the userReducer called "user"


    function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        console.log("User logged in successfully!");
        console.log(userObject);

        // Use Redux to set state of user AND set status to authenticated 
        dispatch(login(userObject)); // Here, login is the action and userObject is the action.payload 

        // Prepare the userRequest to be sent to the server
        // const userRequest = {
        //     userToken: response.credential,
        //     firstName: userObject.firstName,
        //     lastName: userObject.lastName,
        //     email: userObject.email,
        //     dp: userObject.picture
        // }


        // // Add user to database if not already there
        // axios.post('/api/users', userRequest)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });



        navigate('/dashboard');
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: clientID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInButton'),
            { theme: 'outline', size: 'large', type: 'standard' }
        );

        console.log("Google O-Auth loaded successfully!")

    }, []);



    // const onSuccess = (res) => {
    //     console.log('[Login Success] currentUser:', res.profileObj);
    //     navigate('/dashboard');
    // };

    // const onFailure = (res) => {
    //     console.log('[Login failed] res:', res);
    // };

    // Get user from user (Redux)
    const currentUser = useSelector(state => state.user); // Use the userReducer called "user"


    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            ReadHub: Sign in
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Continue with Google
                        </Typography>

                        <Box id="signInButton" sx={{ m: 4 }}>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );

    // return (
    //     <Container align="center" sx={{ mt: '2rem' }}>
    //         <Typography variant="h3">Welcome to</Typography>
    //         <Typography variant="h1">ReadHub</Typography>





    //     </Container>
    // );




    // const [username, setUsername] = useState("null");
    // const [password, setPassword] = useState("null");

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     axios.post("/api2", {
    //         uid: username,
    //         pw: password,
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         });
    // }

    // return (
    //     <Container align="center">

    //         <div>
    //             <h2>Login</h2>
    //             {/* <input type="text" onChange={getInputValue}/> */}

    //             <label>
    //                 Username:
    //                 <div>
    //                     <input
    //                         onChange={e => setUsername(e.target.value)}
    //                     />
    //                 </div>
    //                 Password:
    //                 <div>
    //                     <input
    //                         onChange={e => setPassword(e.target.value)}
    //                     />
    //                 </div>
    //             </label>

    //             <div>
    //                 <button onClick={handleSubmit}>
    //                     Submit
    //                 </button>
    //             </div>

    //         </div>
    //     </Container>
    // );
}

export default Login;