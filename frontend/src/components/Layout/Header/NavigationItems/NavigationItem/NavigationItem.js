import React, {useContext} from 'react';

import {ClassNames} from '@emotion/core';

import {NavLink} from 'react-router-dom';
import {ListItemText, ListItem, ListItemIcon, Button, Typography, Box, Icon} from '@material-ui/core';
import {DesktopOnly} from "../../../../UI/DesktopOnly";
import {MobileOnly} from "../../../../UI/MobileOnly";

import {AppDrawerContext} from "../../AppDrawer/AppDrawer";

export const NavigationItem = props => {
    return (
        <ClassNames>
            {({css, _}) => (
                <Box pl={1} pr={1}
                     display='flex'
                     alignItems='center'>
                    <NavLink
                        to={props.link}
                        activeClassName={css({'& * *': {fontWeight: 'bold'}})}
                        exact={props.exact}>
                        <Desktop {...props} />
                        <Mobile {...props} />
                    </NavLink>
                </Box>
            )}
        </ClassNames>
    );
};

const Mobile = props => {
    const ctx = useContext(AppDrawerContext);
    return (
        <MobileOnly>
            <ListItem
                button
                onClick={() => ctx.setDrawerOpen(false)}
                key={props.name}>
                <ListItemIcon>
                    <Icon>{props.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={props.name}/>
            </ListItem>
        </MobileOnly>
    )
};

const Desktop = props => (
    <DesktopOnly>
        <Button startIcon={<Icon>{props.icon}</Icon>}>
            <Typography variant='body1'>{props.name}</Typography>
        </Button>
    </DesktopOnly>
);