import React from 'react';

import Typography from "@material-ui/core/Typography";

import classes from './HomePage.module.scss';

export const HomePage = props => {
    return (
        <div className={classes.HomePage}>
            <Typography variant='h1' gutterBottom className={classes.Title}>
                Demissios ortum
            </Typography>
            <Typography variant='h4' className={classes.Subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet molestie velit, et
                commodo tortor.
            </Typography>
        </div>
    );
};