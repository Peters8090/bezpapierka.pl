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
import {DesktopOnly} from '../../../../Miscellaneous/Responsiveness/DesktopOnly';
import {MobileOnly} from '../../../../Miscellaneous/Responsiveness/MobileOnly';

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
      <MobileOnly>
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
      </MobileOnly>
  );
});

const Desktop = withRouter(props => (
    <DesktopOnly>
      <Button startIcon={<Icon>{props.icon}</Icon>}
              disabled={props.location.pathname === props.link}>
        <Typography variant='body1'>{props.name}</Typography>
      </Button>
    </DesktopOnly>
));