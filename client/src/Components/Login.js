import react from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

// Styling
import { Container } from '@mui/material';
import '../App.css';

function Login() {

    // Step 1: Add O-Auth functionality 
    // Step 2: Add onClick functionality after submission 
    // Step 3: Add useNavigate hook from React Router to redirect to user-specific Dashboard

    const [username, setUsername] = useState("null");
    const [password, setPassword] = useState("null");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api2", {
            uid: username,
            pw: password,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <Container maxWidth="md">

            <div>
                <h2>Login</h2>
                {/* <input type="text" onChange={getInputValue}/> */}

                <label>
                    Username:
                    <div>
                        <input
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    Password:
                    <div>
                        <input
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </label>

                <div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

            </div>
        </Container>
    );
}

export default Login;