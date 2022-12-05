import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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


    // Get user from redux global store
    const user = "test";


    // Add new website 
    const [newWebsite, setNewWebsite] = useState("");

    // Select subscription
    const [currentSubscription, setCurrentSubscription] = useState("Free");


    // Get current subscription from redux state OR user database
    // setCurrentSubscription("test");

    // Get all possible subscriptions from database
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        if (subscriptions.length < 3) {
            axios({
                method: 'get',
                url: '/api/subscriptions',
                // params: {
                //     userid: user
                // }
            })
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.subscriptions);
                    response.data.subscriptions.forEach((subscription) => {
                        setSubscriptions(subscriptions => [...subscriptions, subscription]);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);



    // Table management
    const [websites, setWebsites] = useState([{ "name": "testName", "url": "testURL" }]);
    // Each website will contain: Name, URL

    // axios({
    //     method: 'get',
    //     url: '/api/websites',
    //     data: {
    //         userid: user
    //     }
    // })
    //     .then((res) => {
    //         console.log(res);
    //         setWebsites(res.data); // SHOULD RETURN AN ARRAY OF WEBSITE OBJECTS
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });


    // End of Table
    console.log("Subs: ")
    console.log(subscriptions);

    // Handle new website input
    function handleAdd(e) {
        e.preventDefault();
        console.log(newWebsite);
        axios({
            method: 'post',
            url: '/api/websites',
            data: {
                userid: user,
                url: newWebsite
            }
        })
            .then((res) => {
                console.log(res);
                setWebsites(res.data); // SHOULD RETURN AN ARRAY OF WEBSITE OBJECTS
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
                userid: user,
                url: e.target.value
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
                    Add New
                </Typography>




                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 3, mb: 3 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleAdd}
                >

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="URL"
                        onInput={(e) => setNewWebsite(e.target.value)}
                    />


                    <Button type="submit" variant="contained" size="small" sx={{ mt: 0, mb: 3 }}>
                        Add
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
                            {websites.map((website) => (
                                <TableRow
                                    key={website.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {website.name}
                                    </TableCell>
                                    <TableCell>{website.url}</TableCell>
                                    <TableCell align='right'>
                                        <Button variant="contained" size="small" color="error" value={website.url} onClick={handleDelete}>Delete</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>



                <Box sx={{ mt: 3, mb: 3, p: 2 }}>
                    <Typography variant="h4">
                        Subscriptions
                    </Typography>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary">
                                Current Subscription: {currentSubscription}
                            </Typography>
                        </CardContent>
                    </Card>
                    
                    <Box sx={{ mt: 2 }}>               
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
                            onChange={(e) => setCurrentSubscription(e.target.value)}
                        >
                            {subscriptions.map((subscription) => (
                                <MenuItem value={subscription}>{subscription}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    </Box>
                </Box>



                <Typography variant="h4">
                    User Profile
                </Typography>
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Back
                </Button>
            </Container>
        </>
    );
}

export default FeedSettings;