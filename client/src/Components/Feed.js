import react from 'react'
import { useState, useEffect } from 'react';

function Feed() {

    // Set State
    const [backendData, setBackendData] = useState();

    useEffect(() => {
        fetch("/api1")
        .then(res => res.json())
        .then(data => setBackendData(data.message))
    }, []);

    return (
        <div>
            <p>
                {(typeof backendData === 'undefined') ? "Loading" : backendData}
            </p>
        </div>

    );
}

export default Feed;