import React from 'react';

import {Paper, Typography} from "@material-ui/core";

import classes from './Footer.module.scss';

export const Footer = props => {
    return (
        <footer>
            <Paper variant="outlined">
                <Typography align='center'
                            className={classes.FooterText}>
                    (C) Copyright 2020
                </Typography>
            </Paper>
        </footer>
    );
};