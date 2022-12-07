import { useNavigate } from 'react-router-dom';


// Styling 
import Typography from '@mui/material/Typography';


function ArticlePreview () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/article/:id')
    }


    return (
        <div>
            <Typography variant="h3">
                Title
            </Typography>
            <Typography variant="h6">
                Author
            </Typography>
            <Typography variant="h6">
                Date
            </Typography>
            <Typography variant="body1">
                Content
            </Typography>
            <button onClick={handleClick}>Read More</button>
            
        </div>
    )
}

export default ArticlePreview;
