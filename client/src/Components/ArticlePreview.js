import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


// Styling 
import Typography from '@mui/material/Typography';


function ArticlePreview( {article, user} ) {

    // DON'T USE USER RIGHT NOW 


    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/article/:id')
    // }


    return (
        <div>
            <Typography variant="h3">
                Title
                {article.title}
            </Typography>

            <Typography variant="h6">
                Date
                {article.date}
            </Typography>


            <Typography variant="body1">
                {article.content}
            </Typography>
            {/* <button onClick={handleClick}>Read More</button> */}

        </div>
    )
}

export default ArticlePreview;
