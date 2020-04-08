import React from 'react';

import Paper from "@material-ui/core/Paper";

import classes from './Footer.module.scss';

export const Footer = props => {
    return (
        <footer>
            <Paper variant="outlined">
                <p className={classes.Text}>(C) Copyright 2020</p>
            </Paper>
        </footer>
    );
};