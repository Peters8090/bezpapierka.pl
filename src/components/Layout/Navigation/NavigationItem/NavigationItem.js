import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export const NavigationItem = props => {
    return (
        <Fragment>
            <NavLink
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
                to={props.link}
                exact
            >
                {props.mobile ? <Mobile {...props} /> : <Desktop {...props} />}
            </NavLink>
        </Fragment>
    );
};

const Mobile = props => (
    <ListItem
        button
        key={props.name}
    >
        <ListItemIcon>
            <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
    </ListItem>
);

const Desktop = props => (
    <Button color="inherit">{props.name}</Button>
);