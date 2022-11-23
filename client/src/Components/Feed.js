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

    console.log(backendData);
    return (
        <div className='App-header'>
            <h2>Your Feed</h2>
            <div>
                {/* <ul>
                    {
                        backendData.map(content => {
                            <li>
                                
                                <span>Title: {content.title}</span>
                                <span>{content.body}</span>
                            </li>
                        })
                    }
                </ul> */}

                <p>
                    {(typeof backendData === 'undefined') ? "Loading" : backendData}
                </p>
            </div>

        </div>

    );
}

export default Feed;