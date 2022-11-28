import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';

// Styling
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Highlights() {

    const navigate = useNavigate();
    function handleSubmit(e) {
        navigate('/dashboard');
    }

    return (
        <>
        <Navbar />
        <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
            <Typography variant="h2">
                Top Newsletters
            </Typography>
            
        </Container>
        </>

    );
}
    export default Highlights;