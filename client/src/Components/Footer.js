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
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    width: '100%',
                    py: 1.5,
                    px: 2,
                    mt: 'auto',
                    bottom: 0,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container align="center">
                    <Typography variant="body1">
                        <i>Created by <Link href="https://github.com/nikhilbhave9" underline="none" target="_blank">{'Nikhil'}</Link> and <Link href="https://github.com/sohambagchi" underline="none" target="_blank">{'Soham'}</Link></i>
                    </Typography>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Footer;