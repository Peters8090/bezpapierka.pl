import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import {NavLink, useLocation} from 'react-router-dom';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {AppDrawerContext} from '../../AppDrawer/AppDrawer';

export const NavigationItem = props => {
  const location = useLocation();

  const styles = {
    root: css`
      display: flex;
      align-items: center;
    `,
    navLink: css`
      width: 100%;
      cursor: ${location.pathname === props.link && 'default'};
    `,
  };

  return (
      <Box pl={1} pr={1} css={styles.root}>
        <NavLink
            to={props.link}
            css={styles.navLink}
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
            onClick={appDrawerContext.onClose}
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

  const styles = {
    button: css`
      cursor: ${location.pathname === props.link && 'default'};
    `,
    typography: css`
      font-weight: ${location.pathname === props.link && 'bold'};
    `,
  };

  return (
      <Hidden smDown>
        <Button startIcon={<Icon>{props.icon}</Icon>}
                css={styles.button}>
          <Typography variant='body1'
                      css={styles.typography}>
            {props.name}
          </Typography>
        </Button>
      </Hidden>
  );
};