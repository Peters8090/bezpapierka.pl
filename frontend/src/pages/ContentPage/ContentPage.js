import React, {useContext} from 'react';

import {Container, Typography, Box} from "@material-ui/core";
import {PageTitle} from "../../components/UI/PageTitle";

import {PagesContext} from "../../contexts/PagesContext";

import classes from './ContentPage.module.scss';

export const ContentPage = props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    return (
        <Box display='flex'
             flexDirection='column'
             alignItems='center'>
            <PageTitle title={page.title}/>
            <Box m={2}>
                <Container maxWidth='lg' className={classes.Content}>
                    <Typography
                        variant='h3'
                        display='block'
                        paragraph
                        align='justify'
                        style={{fontWeight: 'lighter'}}>{page.contents}</Typography>
                    {page.image && <img
                        src={page.image}
                        alt={page.title} className={classes.Image}/>}
                </Container>
            </Box>
        </Box>
    );
};