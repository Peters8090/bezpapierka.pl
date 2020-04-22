import React, {useContext, useEffect} from 'react';

import {Typography} from "@material-ui/core";

import {LayoutContext} from "../../components/Layout/Layout";
import {AppContext} from "../../contexts/AppContext";

import classes from './HomePage.module.scss';

export const HomePage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);
    const layoutContext = useContext(LayoutContext);

    useEffect(() => {
        layoutContext.setIsHomePage(true);
        return () => layoutContext.setIsHomePage(false);
    }, []);

    return (
        <div className={classes.HomePage} id='HomePage'>
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