import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Footer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm" align="center">
                <Typography variant="h2" component="h1" gutterBottom>
                    Lorem ipsum
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis. Mauris eros odio, efficitur at tincidunt suscipit, mattis rhoncus tellus. Donec mattis ullamcorper libero, et elementum nisi fringilla quis. Cras viverra lorem non tortor euismod, non sagittis turpis viverra. Phasellus lacinia commodo nibh eget efficitur. Donec pulvinar imperdiet malesuada. Nulla vel iaculis est. Curabitur pharetra purus vel cursus tempor. Praesent facilisis urna et condimentum hendrerit. Ut pellentesque sagittis sem ac pellentesque. Etiam interdum pellentesque nisl, sed malesuada justo gravida sed.
                    Suspendisse ut velit non lorem lobortis vulputate. Cras a elit a lectus bibendum faucibus. Suspendisse potenti.
                    Quisque ultricies rutrum quam, ut blandit felis congue ac..</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis. Mauris eros odio, efficitur at tincidunt suscipit, mattis rhoncus tellus. Donec mattis ullamcorper libero, et elementum nisi fringilla quis. Cras viverra lorem non tortor euismod, non sagittis turpis viverra. Phasellus lacinia commodo nibh eget efficitur. Donec pulvinar imperdiet malesuada. Nulla vel iaculis est. Curabitur pharetra purus vel cursus tempor. Praesent facilisis urna et condimentum hendrerit. Ut pellentesque sagittis sem ac pellentesque. Etiam interdum pellentesque nisl, sed malesuada justo gravida sed.
                    Suspendisse ut velit non lorem lobortis vulputate. Cras a elit a lectus bibendum faucibus. Suspendisse potenti.
                    Quisque ultricies rutrum quam, ut blandit felis congue ac..</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis. Mauris eros odio, efficitur at tincidunt suscipit, mattis rhoncus tellus. Donec mattis ullamcorper libero, et elementum nisi fringilla quis. Cras viverra lorem non tortor euismod, non sagittis turpis viverra. Phasellus lacinia commodo nibh eget efficitur. Donec pulvinar imperdiet malesuada. Nulla vel iaculis est. Curabitur pharetra purus vel cursus tempor. Praesent facilisis urna et condimentum hendrerit. Ut pellentesque sagittis sem ac pellentesque. Etiam interdum pellentesque nisl, sed malesuada justo gravida sed.
                    Suspendisse ut velit non lorem lobortis vulputate. Cras a elit a lectus bibendum faucibus. Suspendisse potenti.
                    Quisque ultricies rutrum quam, ut blandit felis congue ac..</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien justo, lobortis sit amet vulputate ac, pretium rhoncus massa. Suspendisse eu massa at nisi laoreet sagittis. Mauris eros odio, efficitur at tincidunt suscipit, mattis rhoncus tellus. Donec mattis ullamcorper libero, et elementum nisi fringilla quis. Cras viverra lorem non tortor euismod, non sagittis turpis viverra. Phasellus lacinia commodo nibh eget efficitur. Donec pulvinar imperdiet malesuada. Nulla vel iaculis est. Curabitur pharetra purus vel cursus tempor. Praesent facilisis urna et condimentum hendrerit. Ut pellentesque sagittis sem ac pellentesque. Etiam interdum pellentesque nisl, sed malesuada justo gravida sed.
                    Suspendisse ut velit non lorem lobortis vulputate. Cras a elit a lectus bibendum faucibus. Suspendisse potenti.
                    Quisque ultricies rutrum quam, ut blandit felis congue ac..</Typography>
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container align="center">
                    <Typography variant="body1">
                        Created by <a href="https://github.com/nikhilbhave9" target="_blank">Nikhil</a> and <a href="https://github.com/sohambagchi" target="_blank">Soham</a>
                    </Typography>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Footer;