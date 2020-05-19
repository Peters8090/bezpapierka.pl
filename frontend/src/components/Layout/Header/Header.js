import {useMediaQuery} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton, {IconButtonProps} from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React, {useContext, useEffect, useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import {AuthContext} from '../../../App';
import {PageAdmin} from '../../CRUD/Admins/PageAdmin';
import {LoggedInOnly} from '../../Miscellaneous/LoggedInOnly';
import {Logo} from '../../Miscellaneous/Logo';
import {LayoutContext} from '../Layout';
import {NavigationItems} from './NavigationItems/NavigationItems';
import {AppDrawer} from './AppDrawer/AppDrawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookie from 'js-cookie';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCreateDialogOpen, setPageCreateDialogOpen] = useState(false);

  const scrollTrigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const theme = useTheme();
  const additionalItems = useContext(LayoutContext).headerAdditionalItems;
  const authContext = useContext(AuthContext);

  const styles = {
    header: {
      backgroundColor: scrollTrigger && theme.palette.background.default,
      transition: 'all ease-in-out 300ms',

      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: `${theme.misc.headerHeight}`,
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
      <header css={styles.header}>

        <div css={{flex: 1}}>
          <Logo/>
        </div>

        <Hidden smDown>
          <NavigationItems/>
        </Hidden>

        {additionalItems}

        <LoggedInOnly>

          <HeaderIconButton onClick={() => setPageCreateDialogOpen(true)}>
            <AddIcon/>
          </HeaderIconButton>

          <PageAdmin isEdit={false} open={pageCreateDialogOpen}
                     setOpen={setPageCreateDialogOpen}/>

          <HeaderIconButton onClick={() => {
            authContext.setAuthToken('');
            Cookie.remove('token');
          }}>
            <ExitToAppIcon/>
          </HeaderIconButton>
        </LoggedInOnly>

        <Hidden mdUp>
          <HeaderIconButton onClick={(_) => setDrawerOpen(!drawerOpen)}>
            <MenuIcon/>
          </HeaderIconButton>

          <AppDrawer drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen}/>
        </Hidden>
      </header>
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