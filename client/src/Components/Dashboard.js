// Imports
import React, { useState, useEffect, useLayoutEffect } from 'react';

// Components
import Navbar from './Navbar';
import Article from './Article';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from '../userSlice';

// Styling
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Typography } from '@mui/material';


function Dashboard() {

    const user = useSelector(state => state.user); // Use the userReducer called "user"
    // OR
    // const user = useSelector(selectUser)
    console.log("user", user)

    // Set State

    // Subscription Tier
    const [subscription, setSubscription] = useState([]);

    // Websites in their Subscription
    const [websites, setWebsites] = useState([]);

    // Articles in all the websites
    const [articles, setArticles] = useState([]);

    // Fetch subscription tier from backend
    useLayoutEffect(() => {
        console.log("userSubscription", user, user.user.email)
        async function getUserSubscriptionDetails() {
            axios({
            method: 'post',
            url: '/api/user/getSubscription',
            data: {
                userId: user.user.email
            }
        })
            .then(res => {
                if (!res.data) {
                    setSubscription("Unknown [500]");
                    return;
                }

                if (res.data == 1) {
                    setSubscription("Free");
                } else if (res.data == 2) {
                    setSubscription("Premium");
                } else if (res.data == 3) {
                    setSubscription("Enterprise");
                }
                
                console.log(subscription);
            })
            .catch(err => console.log(err));
        }
        getUserSubscriptionDetails();        
    }, [user]);

    // Fetch websites from backend
    useLayoutEffect(() => {
        console.log("userWebsites", user, user.user.email)
        async function getUserWebsitesAndArticles() {
            axios({
            method: 'post',
            url: '/api/user/getWebsites',
            data: {
                userId: user.user.email
            }
        })
            .then(res => {
                if (!res.data) {
                    setWebsites(["Unknown [500]"]);
                    return;
                }
                console.log("0x0", res);
                console.log("0x1", res.data);
                console.log("0x2", res.data.websites);
                setWebsites(res.data.websites);
                console.log("0x3", websites);
            })
            .catch(err => console.log(err));
        }
        getUserWebsitesAndArticles();
    }, [user]);

    useLayoutEffect(() => {
        console.log("websites", websites, articles);
        async function getArticlesForWebsites() {
            for (let i = 0; i < websites.length; i++) {
                console.log(websites[i]);
                axios({
                    method: 'post',
                    url: '/api/websites/getArticles',
                    data: {
                        website: websites[i].url
                    }
                })
                    .then(res => {
                        if (!res.data) {
                            return;
                        }
                        console.log("1x1", res.data);
                        // append data to articles
                        setArticles(articles => [...articles, ...res.data.articles]);
                        
                        console.log("1xx1", res.data);
                        console.log("1xx2", articles);

                    })
                    .catch(err => console.log(err));
            }
        }
        getArticlesForWebsites();
    }, [websites])

    useLayoutEffect(() => {
        console.log("hello world")
        console.log("2x0", articles)
    }, [articles])

    return (
        <>
            <Navbar />

            <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
                <h1></h1>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h2">
                        Feed
                    </Typography>
                </Box>
                {/* <Grid container columnSpacing={2}>
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
                </Grid> */}


                <Grid container columnSpacing={2} rowSpacing={2}>
                    {  // render string if no articles
                        articles.length === 0 ? <h3>No articles found</h3> :
                            // render articles
                            
                    
                    articles.map((article) => (
                            <Grid key={article._id} item xs={12} sm={6}>
                                <Article article={article} user={user} />
                            </Grid>
                    ))}
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