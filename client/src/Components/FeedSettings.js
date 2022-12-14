import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Components
import Navbar from './Navbar';


// Styling
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'url', label: 'URL', minWidth: 100 },
    { id: 'Delete', label: 'Delete', minWidth: 50 },

];


const rows = [
    ['India', 'IN', 1324171354, 3287263],
    ['China', 'CN', 1403500365, 9596961]
];



function FeedSettings() {


    // get user state from redux, query database on that user data, get results and render results in react 
    


    // Get user from redux global store
    // const user = "test";

    // get user from redux global store
    const dispatch = useDispatch();
    const user = useSelector(state => state); // Use the userReducer called "user"


    // Add new website 
    const [loading, setLoading] = useState(false);
    const [newWebsite, setNewWebsite] = useState({});
    const [newScraper, setNewScraper] = useState({});

    // Select subscription
    const [currentSubscription, setCurrentSubscription] = useState();

    // useEffect(() => {
    //     if (!currentSubscription) {
    //         console.log("current subscription", user.user)
    //         axios({
    //             method: 'get',
    //             url: '/api/user/getSubscription',
    //             params: {
    //                 userId: encryptString(user.user.email, "secret"),
    //                 userEmail: 'sohambagchi'
    //             }
    //         })
    //             .then((response) => {
    //                 console.log(response.data.subscriptionTier)
    //                 setCurrentSubscription(response.data.subscriptionTier)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     }

    // }, [user]);

    function getUserSubscriptionAtRender() {
        if (!currentSubscription) {
            console.log("current subscription", user.user)
            axios({
                method: 'post',
                url: '/api/user/getSubscription',
                data: {
                    userId: user.user.user.email
                }
            })
                .then((response) => {
                    console.log(response)
                    console.log(response.data)
                    console.log(response.data.subscriptions)
                    if (response.data.subscriptionTier == 1 || response.data.subscriptionTier == '1') {
                        setCurrentSubscription("Free")
                    } else if (response.data.subscriptionTier == 2 || response.data.subscriptionTier == '2') {
                        setCurrentSubscription("Pro")
                    } else if (response.data.subscriptionTier == 3 || response.data.subscriptionTier == '3') {
                        setCurrentSubscription("Premium")
                    }
                    // setCurrentSubscription(response.data.subscriptionTier)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    // useEffect(() => {
    //     // dispatch(() => {
    //     getUserSubscriptionAtRender();
    //     // })
    // }, [user]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            getUserSubscriptionAtRender();
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [user]);

    // Get current subscription from redux state OR user database
    // setCurrentSubscription("test");

    // Get all possible subscriptions from database
    const [subscriptions, setSubscriptions] = useState(["Free", "Pro", "Premium"]);

    useEffect(() => {
        if (subscriptions.length < 3) {
            // log current user
            console.log("subscriptions")
            axios({
                method: 'get',
                url: '/api/subscriptions',
            })
                .then((response) => {
                    // console.log(response.data);
                    // console.log(response.data.subscriptions);
                    response.data.subscriptions.forEach((subscription) => {
                        setSubscriptions(subscriptions => [...subscriptions, subscription]);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);



    // Table management
    const [websites, setWebsites] = useState([]);

    function getUserWebsitesAtRender() {
        if (websites.length < 1) {
            // log current user
            console.log("websites", user)
            axios({
                method: 'post',
                url: '/api/user/getWebsites',
                data: {
                    userId: user.user.user.email
                }
            })
                .then((response) => {
                    // console.log(response.data);
                    console.log(response.data.websites);
                    response.data.websites.forEach((website) => {
                        setWebsites(websites => [...websites, website]);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    useEffect(() => {
        dispatch(() => {
            getUserWebsitesAtRender();
        })
    }, [user]);


    const [subscriptionChange, setSubcriptionChange] = useState({});

    function handleSubscriptionChange(e) {
        setSubcriptionChange({ [e.target.key]: e.target.value });
        e.preventDefault();
        console.log(subscriptionChange)
    }

    function setSubscriptionChange() {
        console.log("[USER] Changing Subscription Tier")
        console.log(subscriptionChange)
        axios({
            method: 'post',
            url: '/api/user/setSubscription',
            data: {
                userObject: {
                    userId: user.user.user.email,
                },
                subscriptionObject: {
                    subscriptionTier: subscriptionChange
                }
            }
        })
            .then((res) => {
                console.log(res)
                setCurrentSubscription(subscriptionChange);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Handle new website input
    function handleRSSAdd(e) {
        setNewWebsite({ ...newWebsite, [e.target.name]: e.target.value });
        e.preventDefault();
        console.log(newWebsite);
    }

    function sendRSSAdd() {
        console.log("[RSS] Adding new website...");
        console.log(newWebsite);
        axios({
            method: 'post',
            url: '/api/user/websites/addRss',
            data: {
                userObject: {
                    userId: user.user.user.email,
                },
                websiteObject: {
                    name: newWebsite.Name,
                    url: newWebsite.URL,
                    rss: newWebsite.RSS,
                    description: newWebsite.Description,
                }
            }
        })
            .then((res) => {
                console.log(res);
                // setWebsites(res.data); // SHOULD RETURN AN ARRAY OF WEBSITE OBJECTS
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleScraperAdd(e) {
        setNewScraper({ ...newScraper, [e.target.name]: e.target.value });
        e.preventDefault();
        console.log(newScraper);
    }

    function sendScraperAdd() {
        console.log("[SCRAPE] Adding new website...")
        console.log();
        axios({
            method: 'post',
            url: '/api/user/websites/addScrape',
            data: {
                userObject: {
                    userId: user.user.user.email,
                },
                websiteObject: {
                    name: newScraper.Name,
                    url: newScraper.URL,
                    archive: newScraper.Archive,
                    description: newScraper.Description,
                    html_attributes:
                    {
                        article_tag: newScraper.ArticleTag,
                        article_class: newScraper.ArticleClass,
                        title_class: newScraper.TitleClass,
                        title_tag: newScraper.TitleTag,
                        link_class: newScraper.LinkClass,
                        link_tag: newScraper.LinkTag,
                        pubdate_class: newScraper.PubDateClass,
                        pubdate_tag: newScraper.PubDateTag,
                        description_class: newScraper.DescriptionClass,
                        description_tag: newScraper.DescriptionTag,
                        author_class: newScraper.AuthorClass,
                        author_tag: newScraper.AuthorTag
                    }
                }
            }
        })
            .then((res) => {
                console.log(res);
                // setWebsites(res.data); // SHOULD RETURN AN ARRAY OF WEBSITE OBJECTS
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Handle delete website
    function handleDelete(e) {
        console.log(e.target.value);
        axios({
            method: 'delete',
            url: '/api/websites',
            data: {
                userObject: {
                    userId: user.user.user.email,
                },
                websiteObject: {
                    name: e.target.value,
                }
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const navigate = useNavigate();
    function handleSubmit(e) {
        navigate('/dashboard');
    }

    return (
        <>
            <Navbar />
            <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="md" align="center">
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h2">
                        Settings
                    </Typography>
                </Box>

                <Typography variant='h4'>
                    Add New RSS Newsletters
                </Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 3, mb: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={sendRSSAdd}
                >
                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Name"
                        name="Name"
                        onInput={handleRSSAdd}
                    />

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="URL"
                        name="URL"
                        onInput={handleRSSAdd}
                    />

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="RSS"
                        name="RSS"
                        onInput={handleRSSAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Description"
                        name="Description"
                        onInput={handleRSSAdd}
                    />

                    <Button type="submit" variant="contained" size="small" sx={{ mt: 0, mb: 3 }}>
                        Add RSS Newsletter
                    </Button>

                </Box>


                <Typography variant='h4'>
                    Add New Non-RSS Newsletter
                </Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 3, mb: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={sendScraperAdd}
                >
                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Name"
                        name="Name"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="URL"
                        name="URL"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="Archive"
                        name="Archive"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Description"
                        name="Description"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Article Tag"
                        name="ArticleTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Article Class"
                        name="ArticleClass"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Title Tag"
                        name="TitleTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Title Class"
                        name="TitleClass"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Link Tag"
                        name="LinkTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Link Class"
                        name="LinkClass"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="PubDate Tag"
                        name="PubDateTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="PubDate Class"
                        name="PubDateClass"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Description Tag"
                        name="DescriptionTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Description Class"
                        name="DescriptionClass"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Author Tag"
                        name="AuthorTag"
                        onInput={handleScraperAdd}
                    />

                    <TextField
                        fullWidth="true"
                        id="outlined-required"
                        label="Author Class"
                        name="AuthorClass"
                        onInput={handleScraperAdd}
                    />

                    <Button type="submit" variant="contained" size="small" sx={{ mt: 0, mb: 3 }}>
                        Add Non-RSS Newsletter
                    </Button>

                </Box>


                <Typography variant="h4">
                    Manage Newsletters
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2, mb: 5 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell align='right'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscriptions.map((subscription) => (
                                <TableRow
                                    key={subscription.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {subscription.name}
                                    </TableCell>
                                    <TableCell>{subscription.url}</TableCell>
                                    <TableCell align='right'>
                                        <Button variant="contained" size="small" color="error" value={subscription.url} onClick={handleDelete}>Delete</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>



                <Box sx={{ mt: 3, mb: 3, p: 2 }}>
                    <Typography variant="h4">
                        Subscription Tier
                    </Typography>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">
                                Current Subscription: {currentSubscription}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Box sx={{ mt: 2 }}
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubscriptionChange}>
                        <Typography variant="h5">
                            Select New Tier
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Subscription Tier</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentSubscription}
                                label="Tier"
                                onChange={(e) => setSubscriptionChange(e.target.value)}
                            >
                                {subscriptions.map((subscription) => (
                                    <MenuItem value={subscription}>{subscription}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                </Box>


                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Back
                </Button>
            </Container>
        </>
    );
}

export default FeedSettings;