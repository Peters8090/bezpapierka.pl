import React from 'react';

import {Paper, Typography, Box} from "@material-ui/core";

import classes from './Footer.module.scss';

export const Footer = props => {
    return (
        <footer>
            <Paper variant="outlined">
                <Box p={1}>
                    <Typography align='center'
                                className={classes.FooterText}>
                        (C) Copyright 2020
                    </Typography>
                </Box>
            </Paper>
        </footer>
    );
};