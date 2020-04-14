import React, {useContext} from 'react';

import {Typography} from "@material-ui/core";

import {AppContext} from "../../contexts/AppContext";

import classes from './HomePage.module.scss';

export const HomePage = props => {
    const page = useContext(AppContext).pages.find(page => props.pageId === page.id);

    return (
        <div className={classes.HomePage}>
            <div className={classes.Text}>
                <Typography variant='h1' gutterBottom className={classes.Title}>
                    {page.misc.title}
                </Typography>
                <Typography variant='h4' className={classes.Subtitle}>
                    {page.misc.subtitle}
                </Typography>
            </div>
        </div>
    );
};