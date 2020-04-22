import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, {useContext} from 'react';
import {AppContext} from "../../contexts/AppContext";

import classes from './ContentPage.module.scss';

export const ContentPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.ContentPage}>
            <Typography variant='h1' align='center' gutterBottom
                        className={classes.Title}>{page.misc.title}</Typography>
            <Box m={2}>
                <Container maxWidth='lg' className={classes.Content}>
                    <Typography variant='h3' display='block' paragraph align='justify' className={classes.Subtitle}
                                c>{page.misc.subtitle}</Typography>
                    {page.misc.image && <img
                        src={page.misc.image}
                        alt={page.misc.title} className={classes.Image}/>}
                </Container>
            </Box>
        </div>
    );
};