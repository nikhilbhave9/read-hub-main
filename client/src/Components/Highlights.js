import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Highlights() {

    const navigate = useNavigate();
    function handleSubmit(e) {
        navigate('/dashboard');
    }

    return (
        <div>
            <h1>Highlights</h1>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
                Back
            </Button>
        </div>
    );
}

export default Highlights;