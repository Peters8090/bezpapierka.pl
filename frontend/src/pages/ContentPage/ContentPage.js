import React, {useContext} from 'react';

/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Container, Typography, Box, useTheme} from "@material-ui/core";
import {PageTitle} from "../../components/UI/PageTitle";

import {PagesContext} from "../../contexts/PagesContext";

export const ContentPage = props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    const theme = useTheme();

    return (
        <Box display='flex'
             flexDirection='column'
             alignItems='center'>
            <PageTitle title={page.title}/>
            <Box m={2}>
                <Container maxWidth='lg' css={{
                    display: 'flex',
                    alignItems: 'center',
                    [theme.breakpoints.down('md')]: {
                        display: 'block',
                        textAlign: 'center'
                    }
                }}>
                    <Typography
                        variant='h3'
                        display='block'
                        paragraph
                        align='justify'
                        style={{fontWeight: 'lighter'}}>{page.contents}</Typography>
                    {
                        page.image &&
                        <img
                            src={page.image}
                            alt={page.title}
                            css={{
                                borderRadius: '15px',
                                margin: '3rem',
                                width: '25vw',
                                [theme.breakpoints.down('md')]: {
                                    width: '60vw',
                                }
                            }}/>
                    }
                </Container>
            </Box>
        </Box>
    );
};