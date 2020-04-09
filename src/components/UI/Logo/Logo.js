import React from "react";

import Typography from "@material-ui/core/Typography";

import classes from './Logo.module.scss';

export const Logo = props => {
    return (
        <div className={classes.Logo}>
            <Typography variant='h6'>bez</Typography>
            <Typography variant='h6'>papierka.pl</Typography>
        </div>
    )
};