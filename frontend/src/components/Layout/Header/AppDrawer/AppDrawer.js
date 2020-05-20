import React from 'react';
import {Drawer, List, Divider, Box} from '@material-ui/core';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Logo} from '../../../Miscellaneous/Logo';
import {NavigationItems} from '../NavigationItems/NavigationItems';

export const AppDrawerContext = React.createContext({
  setDrawerOpen: () => {},
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
              open={props.drawerOpen}
              onClose={() => props.setDrawerOpen(false)}>
        <List css={styles.list}>
          <Box p={2}>
            <Logo/>
          </Box>
          <Divider/>
          <Box pt={1}/>

          <AppDrawerContext.Provider
              value={{setDrawerOpen: props.setDrawerOpen}}>
            <NavigationItems/>
          </AppDrawerContext.Provider>
        </List>
      </Drawer>
  );
};