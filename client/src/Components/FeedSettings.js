import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

// Styling
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

function FeedSettings() {

    const navigate = useNavigate();
    function handleSubmit(e) {
        navigate('/dashboard');
    }

    return (
        <Container component="main" sx={{ mt: 1, mb: 10 }} maxWidth="lg" align="center">
            <Typography variant="h2">
                Settings
            </Typography>
            <Typography variant="h4">
                Newsletters
            </Typography>
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
    );
}

export default FeedSettings;