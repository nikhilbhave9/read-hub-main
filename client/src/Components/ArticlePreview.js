import { useNavigate } from 'react-router-dom';


// Styling 
import Typography from '@mui/material/Typography';


function ArticlePreview(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/article/:id')
    }


    return (
        <div>
            <Typography variant="h3">
                Title
                {props.title}
            </Typography>

            <Typography variant="h6">
                Date
                {props.date}
            </Typography>
            <button onClick={handleClick}>Read More</button>

        </div>
    )
}

export default ArticlePreview;
