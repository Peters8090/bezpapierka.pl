import Hidden from '@material-ui/core/Hidden';
import React, {useContext} from 'react';

import {NavLink, withRouter} from 'react-router-dom';
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

export const NavigationItem = withRouter(props => {
  return (
      <Box pl={1} pr={1}
           display='flex'
           alignItems='center'>
        <NavLink
            to={props.link}
            style={{
              width: '100%',
              cursor: props.location.pathname === props.link && 'default',
            }}
            exact={props.exact}>
          <Desktop {...props} />
          <Mobile {...props} />
        </NavLink>
      </Box>
  );
});

const Mobile = withRouter(props => {
  const appDrawerContext = useContext(AppDrawerContext);
  return (
      <Hidden mdUp>
        <ListItem
            disabled={props.location.pathname === props.link}
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
});

const Desktop = withRouter(props => (
    <Hidden smDown>
      <Button startIcon={<Icon>{props.icon}</Icon>}
              style={{
                cursor: props.location.pathname === props.link && 'default',
              }}>
        <Typography variant='body1'
                    style={{
                      fontWeight: props.location.pathname === props.link &&
                          'bold',
                    }}>
          {props.name}
        </Typography>
      </Button>
    </Hidden>
));