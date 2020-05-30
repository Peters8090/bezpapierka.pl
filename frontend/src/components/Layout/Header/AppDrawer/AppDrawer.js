import React from 'react';
import {Drawer, List, Divider, Box} from '@material-ui/core';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Logo} from '../../../Miscellaneous/Logo';
import {NavigationItems} from '../NavigationItems/NavigationItems';

export const AppDrawerContext = React.createContext({
  setOpen: () => {},
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
              onClose={() => props.setOpen(false)}>
        <List css={styles.list}>
          <Box p={2}>
            <Logo/>
          </Box>
          <Divider/>
          <Box pt={1}/>

          <AppDrawerContext.Provider
              value={{setOpen: props.setOpen}}>
            <NavigationItems/>
          </AppDrawerContext.Provider>
        </List>
      </Drawer>
  );
};

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};