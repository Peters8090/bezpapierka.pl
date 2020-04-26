import React, {useContext} from 'react';

import {NavLink} from 'react-router-dom';
import {ListItemText, ListItem, ListItemIcon, Button, Typography, Box, Icon} from '@material-ui/core';

import {AppDrawerContext} from "../../AppDrawer/AppDrawer";

import globalClasses from '../../../../../index.module.scss';
import classes from './NavigationItem.module.scss';

export const NavigationItem = props => {
    return (
        <Box pl={1} pr={1}
             display='flex'
             alignItems='center'>
            <NavLink
                to={props.link}
                style={{width: '100%'}}
                activeClassName={classes.Active}
                exact={props.exact}>
                <Desktop {...props} />
                <Mobile {...props} />
            </NavLink>
        </Box>
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
            <Icon>{props.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.name} className={classes.Text}/>
    </ListItem>
};

const Desktop = props => (
    <Button startIcon={<Icon>{props.icon}</Icon>}
            className={globalClasses.DesktopOnly}>
        <Typography className={classes.Text} variant='body1'>{props.name}</Typography>
    </Button>
);