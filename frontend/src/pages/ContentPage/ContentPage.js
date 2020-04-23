import React, {useContext} from 'react';

import {Container, Typography, Box} from "@material-ui/core";

import {AppContext} from "../../contexts/AppContext";

import classes from './ContentPage.module.scss';

export const ContentPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.ContentPage}>
            <Typography variant='h1' align='center' gutterBottom
                        className={classes.Title}>{page.title}</Typography>
            <Box m={2}>
                <Container maxWidth='lg' className={classes.Content}>
                    <Typography variant='h3' display='block' paragraph align='justify' className={classes.Subtitle}
                                c>{page.misc.content}</Typography>
                    {page.misc.image && <img
                        src={page.misc.image}
                        alt={page.misc.title} className={classes.Image}/>}
                </Container>
            </Box>
        </div>
    );
};