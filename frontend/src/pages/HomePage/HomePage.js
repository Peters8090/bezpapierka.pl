import React, {useContext} from 'react';

import {Typography} from "@material-ui/core";

import {AppContext} from "../../contexts/AppContext";

import classes from './HomePage.module.scss';

export const HomePage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.HomePage} id='HomePage'>
            <div className={classes.Text}>
                <Typography variant='h1' gutterBottom className={classes.Title}>
                    {page.heading}
                </Typography>
                <Typography variant='h4' className={classes.Subtitle}>
                    {page.subheading}
                </Typography>
            </div>
        </div>
    );
};