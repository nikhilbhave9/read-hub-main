import * as React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

// Components
import Logout from './Logout';

// Styling 
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Google O-Auth
import { gapi } from 'gapi-script';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function Navbar() {

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientID,
            scope: ""
          })
        };
        gapi.load('client:auth2', start);
      });
    

    const [ hasLoggedIn, setHasLoggedIn ] = useState(false);

    // Add conditional rendering based on whether user is logged in or not
    // If user has logged in, display 3 buttons: Dashboard, Feed Settings, Highlights on the SIDEBAR

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            ReadHub
                        </Typography>
                        <Button variant="contained"><Link to="/dashboard">Feed</Link></Button>
                        <Button variant="contained"><Link to="/settings">Settings</Link></Button>
                        <Button variant="contained"><Link to="/highlights">Highlights</Link></Button>
                        <Button><Logout /></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
}

export default Navbar;