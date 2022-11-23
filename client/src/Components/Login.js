import react from 'react'
import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Login () {

    const [username, setUsername] = useState("null");
    const [password, setPassword] = useState("null");

    function handleSubmit (e) {
        e.preventDefault();
        axios.post("/api2", {
            uid: username,
            pw: password,
        })
        .then (function (response) {
            console.log(response);
        })
        .catch (function (error) {
            console.log(error)
        });
    }

    return (
        <div className='App-header'>
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
    );
}

export default Login;