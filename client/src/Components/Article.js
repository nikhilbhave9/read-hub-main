import { useNavigate } from 'react-router-dom';


// Styling 
import Typography from '@mui/material/Typography';


function Article (props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard')
    }


    return (
        <div>
            <Typography variant="h3">
                Title
                {props.title}
            </Typography>
            <Typography variant="h6">
                Author
                {props.author}
            </Typography>
            <Typography variant="h6">
                Date
                {props.date}
            </Typography>
            <Typography variant="body1">
                Content
                {props.content}
            </Typography>
            <button onClick={handleClick}>Back</button>
            
        </div>
    )
}

export default Article;
