import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './Navbar';


// Styling
import { Container } from '@mui/material';
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

    // Table management
    const [websites, setWebsites] = useState([{ "name": "testName", "url": "testURL" }]);
    // Each website will contain: Name, URL

    axios({
        method: 'get',
        url: '/api/websites',
        data: {
            userid: user
        }
    })
        .then((res) => {
            console.log(res);
            setWebsites(res.data); // SHOULD RETURN AN ARRAY OF WEBSITE OBJECTS
        })
        .catch((err) => {
            console.log(err);
        });


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
            <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
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
                        '& .MuiTextField-root': { mt: 3, mb: 3},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField
                        required
                        fullWidth="true"
                        id="outlined-required"
                        label="URL"

                    />


                    <Button variant="contained" size="small" sx={{ mt: 0, mb: 3 }}>
                        Add New
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




                <Typography variant="h4">
                    Subscriptions
                </Typography>
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