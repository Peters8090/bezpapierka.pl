import Hidden from '@material-ui/core/Hidden';
import React, {useContext} from 'react';

import {NavLink, useLocation} from 'react-router-dom';
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  Button,
  Typography,
  Box,
  Icon,
} from '@material-ui/core';

import {AppDrawerContext} from '../../AppDrawer/AppDrawer';

export const NavigationItem = props => {
  const location = useLocation();

  return (
      <Box pl={1} pr={1}
           display='flex'
           alignItems='center'>
        <NavLink
            to={props.link}
            style={{
              width: '100%',
              cursor: location.pathname === props.link && 'default',
            }}
            exact={props.exact}>
          <Desktop {...props} />
          <Mobile {...props} />
        </NavLink>
      </Box>
  );
};

const Mobile = props => {
  const appDrawerContext = useContext(AppDrawerContext);
  const location = useLocation();

  return (
      <Hidden mdUp>
        <ListItem
            disabled={location.pathname === props.link}
            button
            onClick={() => appDrawerContext.setDrawerOpen(false)}
            key={props.name}>
          <ListItemIcon>
            <Icon>{props.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={props.name}/>
        </ListItem>
      </Hidden>
  );
};

const Desktop = props => {
  const location = useLocation();

  return (
      <Hidden smDown>
        <Button startIcon={<Icon>{props.icon}</Icon>}
                style={{
                  cursor: location.pathname === props.link && 'default',
                }}>
          <Typography variant='body1'
                      style={{
                        fontWeight: location.pathname === props.link &&
                            'bold',
                      }}>
            {props.name}
          </Typography>
        </Button>
      </Hidden>
  );
};