import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    function handleClick() {
        // axios get request
        axios.post('/api/gethighlights', {
            message: 'Testing POST ROUTE'
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
            

    }

    return (
        <>
            <Navbar />
            <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
                <Typography variant="h2">
                    Top Newsletters
                </Typography>
                <Button color="primary" onClick={handleClick}>
                    Primary
                </Button>
            </Container>
        </>

    );
}
export default Highlights;