import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Container, Typography, Box, useTheme} from "@material-ui/core";
import {PageTitle} from "../../../components/Miscellaneous/PageTitle";
import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';

export const ContentPage = props => {
    const currentPage = useCurrentPage();

    const theme = useTheme();

    const styles = {
        container: {
            display: 'block',
            textAlign: 'center'
        },
        image: {
            borderRadius: '40px',
            marginTop: '2rem',
            [theme.breakpoints.up('md')]: {
                minWidth: '20vw',
                maxWidth: '60vw',

                minHeight: '25vh',
                maxHeight: '35vh',

                objectFit: 'cover',
            },
            [theme.breakpoints.down('sm')]: {
                width: '70vw',
            }
        }
    };

    return (
        <CRUDEditablePageWrapper>
            <PageTitle title={currentPage.title}/>
            <Box p={2}
                 display='flex'
                 flexDirection='column'
                 alignItems='center'>
                <Container maxWidth='lg' css={styles.container}>
                    <Typography
                        variant='h3'
                        display='block'
                        component='span'
                        paragraph
                        align='justify'
                        css={{fontWeight: 'lighter', whiteSpace: 'pre-wrap'}}>{currentPage.contents}</Typography>
                    {
                        currentPage.image &&
                        <img
                            src={currentPage.image}
                            alt={currentPage.title}
                            css={styles.image}/>
                    }
                </Container>
            </Box>
        </CRUDEditablePageWrapper>
    );
};