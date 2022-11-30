import * as React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

// Components
import Logout from './Authentication/Logout';

// Styling 
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';

// Google O-Auth
import { gapi } from 'gapi-script';
import { ThemeProvider } from '@emotion/react';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"


// Themes
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

// Json data about profile (replace with DB code)
const profileData = {
  name: 'John',
  email: 'johndoe@gmail.com',
  dp: 'https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ=',
  subscription: 'Premium'
};

const drawerWidth = 160;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <List>
        <ListItem>
          {/* Enter Profile Information */}
          <Typography variant="h6">Profile Information</Typography>
        </ListItem>

        <ListItem>
          <img src={profileData.dp} alt="Profile Picture" width={drawerWidth - 40} height={drawerWidth - 60} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Hi, ${profileData.name}!`} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={`Subscription: ${profileData.subscription}`} />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <ListItem button component={Link} to="/dashboard">Feed</ListItem>
          <ListItem button component={Link} to="/settings">Settings</ListItem>
          <ListItem button component={Link} to="/dashboard">Highlights</ListItem>
          <ListItem><Logout /></ListItem>
        </Box>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>

          {/* Hamburger Icon for sidebar */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // sx={{ mr: 2, display: { sm: 'none' } }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Title */}
          <Typography variant="h6" noWrap component="div" sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
          }}>
            ReadHub
          </Typography>

          {/* List of buttons (Collapse to sidebar for mobile view) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'flex-end' }}>
            <Toolbar>
              <ThemeProvider theme={theme}>
                <Button size="small" sx={{ mr: 1 }} color='neutral' variant="text" component={Link} to="/dashboard">Feed</Button>
                <Button size="small" sx={{ mr: 1 }} color='neutral' variant="text" component={Link} to="/settings">Settings</Button>
                <Button size="small" color='neutral' variant="text" component={Link} to="/highlights">Highlights</Button>
                <Button><Logout /></Button>
              </ThemeProvider>
            </Toolbar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );

}



// function Navbar(props) {

//     useEffect(() => {
//         function start() {
//             gapi.client.init({
//                 clientId: clientID,
//                 scope: ""
//             })
//         };
//         gapi.load('client:auth2', start);
//     });




//     // Add conditional rendering based on whether user is logged in or not
//     // If user has logged in, display 3 buttons: Dashboard, Feed Settings, Highlights on the SIDEBAR

//     // ======================= Sidebar (App Drawer) code =======================

//     // const toggleDrawer = (event) => {
//     //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//     //         return;
//     //     }

//     // };


//     // =========================================================================


//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         MUI
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             MUI
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item} sx={{ color: '#fff' }}>
//                 {item}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//         <Typography>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
//           fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
//           aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
//           cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
//           at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
//           Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
//           numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
//           asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
//           assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
//           soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
//           ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
//           soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
//           Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
//           delectus quo eius exercitationem tempore. Delectus sapiente, provident
//           corporis dolorum quibusdam aut beatae repellendus est labore quisquam
//           praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
//           deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
//           fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
//           recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
//           debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
//           praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
//           voluptate iure labore, repellendus beatae quia unde est aliquid dolor
//           molestias libero. Reiciendis similique exercitationem consequatur, nobis
//           placeat illo laudantium! Enim perferendis nulla soluta magni error,
//           provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
//           iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
//           Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
//           reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
//           cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
//           consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
//           Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
//           dolores sunt inventore perferendis, aut sapiente modi nesciunt.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// Navbar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,


// };

// return (
//     <>
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
// <Typography href="/dashboard" variant="h6" component="a" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
//     ReadHub
// </Typography>

// <Button variant="contained"><Link to="/dashboard">Feed</Link></Button>
// <Button variant="contained"><Link to="/settings">Settings</Link></Button>
// <Button variant="contained"><Link to="/highlights">Highlights</Link></Button>
// <Button><Logout /></Button>
//                 </Toolbar>
//             </AppBar>
//         </Box> 
//     </>

// );


export default Navbar;