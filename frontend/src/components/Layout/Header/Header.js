import {useMediaQuery} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton, {IconButtonProps} from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React, {useContext, useEffect, useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import {AuthContext} from '../../Auth/Auth';
import {PageAdmin} from '../../CRUD/Admins/PageAdmin/PageAdmin';
import {LoggedInOnly} from '../../Auth/LoggedInOnly';
import {Logo} from '../../Miscellaneous/Logo';
import {NavigationItems} from './NavigationItems/NavigationItems';
import {AppDrawer} from './AppDrawer/AppDrawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const Header = ({children}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCreateDialogOpen, setPageCreateDialogOpen] = useState(false);

  const authContext = useContext(AuthContext);

  const scrollTrigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const styles = {
    root: css`
      background-color: ${scrollTrigger && theme.palette.background.default};
      transition: all ease-in-out 300ms;
    `,
    logoWrapper: css`
      margin-left: ${theme.spacing(1.5)}px;
      flex: 1;
    `,
  };

  return (
      <AppBar component='root' position='sticky' color='transparent'
              elevation={0}
              css={styles.root}>
        <Toolbar variant={isMobile ? 'regular' : 'dense'}>
          <div css={styles.logoWrapper}>
            <Logo/>
          </div>

          <Hidden smDown>
            <NavigationItems/>
          </Hidden>

          {children}

          <LoggedInOnly>
            <HeaderIconButton onClick={() => setPageCreateDialogOpen(true)}>
              <AddIcon/>
            </HeaderIconButton>

            <PageAdmin isEdit={false} open={pageCreateDialogOpen}
                       setOpen={setPageCreateDialogOpen}/>

            <HeaderIconButton onClick={() => {
              authContext.authTokenDispatch({
                type: authContext.authTokenActionTypes.DELETE,
              });
            }}>
              <ExitToAppIcon/>
            </HeaderIconButton>
          </LoggedInOnly>

          <Hidden mdUp>
            <HeaderIconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon/>
            </HeaderIconButton>

            <AppDrawer open={drawerOpen}
                       setOpen={setDrawerOpen}/>
          </Hidden>
        </Toolbar>
      </AppBar>
  );
};

export const HeaderIconButton = (props: IconButtonProps) => {
  const authContext = useContext(AuthContext);

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'));

  if (authContext.isLoggedIn && isMobile) {
    return (
        <Box m={0.75}>
          <IconButton size='small' {...props}>
            {React.cloneElement(props.children, {fontSize: 'small'})}
          </IconButton>
        </Box>
    );
  } else {
    return (
        <IconButton  {...props}>
          {props.children}
        </IconButton>
    );
  }
};