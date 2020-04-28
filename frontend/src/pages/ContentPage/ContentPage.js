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
            display: 'block',
            textAlign: 'center'
        },
        image: {
            borderRadius: '15px',
            marginTop: '2rem',
            width: '35vw',
            [theme.breakpoints.down('md')]: {
                width: '70vw',
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