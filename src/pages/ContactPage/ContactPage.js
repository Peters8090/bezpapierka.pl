import React, {useContext} from 'react';

import Typography from "@material-ui/core/Typography";
import {AppContext} from "../../contexts/AppContext";

import classes from './ContactPage.module.scss';

export const ContactPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.ContactPage}>
            <Typography variant='h1'>{page.name}</Typography>
        </div>
    );
};