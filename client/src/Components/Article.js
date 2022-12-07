import { useNavigate } from 'react-router-dom';


// Styling 
import Typography from '@mui/material/Typography';


function Article () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard')
    }


    return (
        <div>
            <Typography variant="h1">
                Title
            </Typography>
            <Typography variant="h4">
                Author
            </Typography>
            <Typography variant="h4">
                Date
            </Typography>
            <Typography variant="body1">
                Content
            </Typography>
            <button onClick={handleClick}>Back</button>
            
        </div>
    )
}

export default Article;
