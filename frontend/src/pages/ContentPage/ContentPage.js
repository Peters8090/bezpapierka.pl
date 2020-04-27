import React, {useContext} from 'react';

/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Container, Typography, Box, useTheme} from "@material-ui/core";
import {PageTitle} from "../../components/Miscellaneous/PageTitle";

import {PagesContext} from "../../contexts/PagesContext";

export const ContentPage = props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    const theme = useTheme();

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                display: 'block',
                textAlign: 'center'
            }
        },
        image: {
            borderRadius: '15px',
            margin: '3rem',
            width: '25vw',
            [theme.breakpoints.down('md')]: {
                width: '60vw',
            }
        }
    };

    return (
        <Box p={2}
             display='flex'
             flexDirection='column'
             alignItems='center'>
            <PageTitle title={page.title}/>
            <Container maxWidth='lg' css={styles.container}>
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
                        css={styles.image}/>
                }
            </Container>
        </Box>
    );
};