import react from 'react'
import { useState, useEffect } from 'react';
import '../App.css';

function Feed() {

    // Set State
    const [backendData, setBackendData] = useState();

    useEffect(() => {
        fetch("/api1")
        .then(res => res.json())
        .then(data => setBackendData(data.message))
    }, []);

    return (
        <div className='App-header'>
            <h2>Your Feed</h2>
            <div>
                <p>
                    {(typeof backendData === 'undefined') ? "Loading" : backendData}
                </p>
            </div>

        </div>

    );
}

export default Feed;