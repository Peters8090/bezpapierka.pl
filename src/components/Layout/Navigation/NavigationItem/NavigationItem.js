import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classes from './NavigationItem.module.scss';
import utilityClasses from '../../../../styles/utility.module.scss';

export const NavigationItem = props => {
    return (
        <div className={classes.NavigationItem}>
            <NavLink
                className={classes.NavLink}
                to={props.link}
                exact>
                <Desktop {...props} />
                <Mobile {...props} />
            </NavLink>
        </div>
    );
};

const Mobile = props => (
    <ListItem
        button
        key={props.name}
        className={utilityClasses.MobileOnly}>
        <ListItemIcon>
            <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
    </ListItem>
);

const Desktop = props => (
    <Button color="inherit"
            startIcon={<props.icon />}
            className={[utilityClasses.DesktopOnly, classes.DesktopButton].join(' ')}>
        {props.name}
    </Button>
);