// WE WANT A PROTECTED AUTHENTICATION REDIRECT 
// LOGIN -> Both Login and Signup 

// Imports
import react from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styling
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Google O-Auth
import { GoogleLogin } from 'react-google-login';
import Signup from './Signup';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function Login() {

    // Step 1: Add O-Auth functionality 
    // Step 2: Add onClick functionality after submission 
    // Step 3: Add useNavigate hook from React Router to redirect to user-specific Dashboard

    function handleCallbackResponse(response) {
        console.log(response);
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

    }, []);


    const navigate = useNavigate();
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        navigate('/dashboard');
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    return (
        <Container align="center" sx={{ mt: '2rem' }}>
            <Typography variant="h3">Welcome to</Typography>
            <Typography variant="h1">ReadHub</Typography>
            <Box id="signInButton" sx={{ m: 4 }}>
                <GoogleLogin
                    clientId={clientID}
                    buttonText={"Login"}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </Box>

        </Container>
    );




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