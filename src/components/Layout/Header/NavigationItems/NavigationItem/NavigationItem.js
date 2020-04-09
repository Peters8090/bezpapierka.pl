import React, {useContext} from 'react';

import {NavLink} from 'react-router-dom';
import {ListItemText, ListItem, ListItemIcon, Button, Typography} from '@material-ui/core';

import {AppDrawerContext} from "../../AppDrawer/AppDrawer";

import globalClasses from '../../../../../index.module.scss';
import classes from './NavigationItem.module.scss';


export const NavigationItem = props => {
    return (
        <div className={classes.NavigationItem}>
            <NavLink
                to={props.link}
                className={classes.NavLink}
                activeClassName={classes.Active}
                exact>
                <Desktop {...props} />
                <Mobile {...props} />
            </NavLink>
        </div>
    );
};

const Mobile = props => {
    const ctx = useContext(AppDrawerContext);
    return <ListItem
        button
        onClick={() => ctx.setDrawerOpen(false)}
        key={props.name}
        className={globalClasses.MobileOnly}>
        <ListItemIcon>
            <props.icon/>
        </ListItemIcon>
        <ListItemText primary={props.name} className={classes.Text}/>
    </ListItem>
};

const Desktop = props => (
    <Button startIcon={<props.icon/>}
            className={globalClasses.DesktopOnly}>
        <Typography className={classes.Text} variant='body1'>{props.name}</Typography>
    </Button>
);