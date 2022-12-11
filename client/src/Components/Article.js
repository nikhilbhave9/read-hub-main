// Imports
import parse from 'html-react-parser'
// Styling 
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';
import Box from '@mui/material/Box';

function Article({ article, user }) {

    // DON'T USE USER RIGHT NOW 

    // function convert_pub_date(date) {
    //     const new_date = date.split("T");
    //     return new_date[0];

    // }
    console.log(article.description)

    function add_width_to_string(string) {
        const new_string = string.replace(/<img/g, '<img width="350"');
        return new_string;
    }

    function add_target_blank(string) {
        const new_string = string.replace(/<a/g, '<a target="_blank"');
        return new_string;
    }

    const img_description = add_width_to_string(article.description);
    const tag_img_description = add_target_blank(img_description);

    const parsedHTML = parse(tag_img_description);
    console.log(parsedHTML);

    return (
        <Paper>
            {/* <Grid key={article._id} container spacing={1}>
                        <Grid key={1} item xs={12}> */}
            <Typography variant="h6">
                {article.title}
            </Typography>
            {/* </Grid>

                        <Grid key={2} item xs={12} sm={6}> */}
            <Typography variant="body1">
                {article.newsletter}
            </Typography>
            {/* </Grid>

                        <Grid key={3} item xs={12} sm={6}> */}
            <Typography variant="body2">
                {article.author}
            </Typography>
            {/* </Grid>

                        <Grid key={4} item xs={12} sm={12}> */}

            <div>
                {parsedHTML}

            </div>

            {/* </Grid>
                </Grid> */}
        </Paper >

    )
}

export default Article;
