import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {ListItemText, ListItem, ListItemIcon} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classes from './NavigationItem.module.scss';
import utilityClasses from '../../../../styles/utility.module.scss';
import {NavigationContext} from '../Navigation';

export const NavigationItem = props => {
    return (
        <div className={classes.NavigationItem}>
            <NavLink
                className={classes.NavLink}
                to={props.link}
                activeClassName={classes.Active}
                exact>
                <Desktop {...props} />
                <Mobile {...props} />
            </NavLink>
        </div>
    );
};

const Mobile = props => {
    const ctx = useContext(NavigationContext);
    return <ListItem
        button
        onClick={() => ctx.setDrawerOpen(false)}
        key={props.name}
        className={[utilityClasses.MobileOnly, classes.MobileButton].join(' ')}>
        <ListItemIcon>
            <props.icon/>
        </ListItemIcon>
        <ListItemText primary={props.name} className={classes.Text}/>
    </ListItem>
};

const Desktop = props => (
    <Button startIcon={<props.icon/>}
            className={[utilityClasses.DesktopOnly, classes.DesktopButton].join(' ')}>
        <p className={classes.Text}>{props.name}</p>
    </Button>
);