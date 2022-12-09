// Imports
import { useState, useEffect } from 'react';

// Components
import Navbar from './Navbar';
import ArticlePreview from './ArticlePreview';
import Article from './Article';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from '../userSlice';

// Styling
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';


function Dashboard() {

    const user = useSelector(state => state.user); // Use the userReducer called "user"

    // Set State
    const [backendData, setBackendData] = useState([]);

    // Fetch data from backend for current user
    useEffect(() => {
        axios({
            method: 'get',
            url: '/api1'
            // data: {
            //     user: user
            // }
        })
            .then(res => {
                console.log(res.data);
                setBackendData(res.data);
            })
            .catch(err => console.log(err));
    }, []);



    // useEffect(() => {
    //     fetch("/api1")
    //         .then(res => res.json())
    //         .then(data => setBackendData(data.message))
    // }, []);

    // console.log(backendData);
    return (
        <>
            <Navbar />

            <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
                <h2>Your Feed</h2>

                <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Paper>
                            <h3>Article 1</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <h3>Article 2</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <h3>Article 3</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <h3>Article 4</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis.</p>
                        </Paper>
                    </Grid>
                </Grid>


                <Grid container columnSpacing={2}>
                    backendData.map(article => {
                        return (
                        <Grid item xs={12} sm={12}>
                            <Paper>
                                <h3>{article.title}</h3>
                                <p>{article.body}</p>
                            </Paper>
                        </Grid>

                    )});                     



                </Grid>





                {/* <div>
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

                {/* <p>
                    {(typeof backendData === 'undefined') ? "Loading" : backendData}
                </p>
            </div> */}


            </Container>
        </>
    );
}

export default Dashboard;