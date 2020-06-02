import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {Logo} from '../../../Miscellaneous/Logo';
import {NavigationItems} from '../NavigationItems/NavigationItems';

export const AppDrawerContext = React.createContext({
  onClose: () => {},
});

export const AppDrawer = props => {
  const styles = {
    drawer: css`
      user-select: none;
    `,
    list: css`
      padding-top: 0;
      min-width: 60vw;
    `,
  };

  return (
      <Drawer css={styles.drawer}
              anchor='right'
              open={props.open}
              onClose={props.onClose}>
        <List css={styles.list}>
          <Box p={2}>
            <Logo/>
          </Box>
          <Divider/>
          <Box pt={1}/>

          <AppDrawerContext.Provider
              value={{onClose: props.onClose}}>
            <NavigationItems/>
          </AppDrawerContext.Provider>
        </List>
      </Drawer>
  );
};

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};