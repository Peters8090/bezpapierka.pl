import React from 'react';

import Typography from "@material-ui/core/Typography";

import classes from './ContactPage.module.scss';

export const ContactPage = props => {
    return (
        <div className={classes.ContactPage}>
            <Typography variant='h1'>Kontakt</Typography>
        </div>
    );
};