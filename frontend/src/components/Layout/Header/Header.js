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
import {NavigationItems} from './NavigationItems/NavigationItems';
import {AppDrawer} from './AppDrawer/AppDrawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookie from 'js-cookie';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const Header = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCreateDialogOpen, setPageCreateDialogOpen] = useState(false);

  const scrollTrigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const theme = useTheme();
  const authContext = useContext(AuthContext);

  const styles = {
    header: css`
      background-color: ${scrollTrigger && theme.palette.background.default};
      transition: all ease-in-out 300ms;
      
      position: fixed;
      z-index: 1;
      width: 100%;
      height: ${theme.misc.headerHeight};
      padding: 0 ${theme.spacing(4)}px;
      display: flex;
      align-items: center;
    `,
    logoWrapper: css`
      flex: 1;
    `,
  };

  return (
      <header css={styles.header}>

        <div css={styles.logoWrapper}>
          <Logo/>
        </div>

        <Hidden smDown>
          <NavigationItems/>
        </Hidden>

        {props.additionalItems}

        <LoggedInOnly>

          <HeaderIconButton onClick={() => setPageCreateDialogOpen(true)}>
            <AddIcon/>
          </HeaderIconButton>

          <PageAdmin isEdit={false} open={pageCreateDialogOpen}
                     setOpen={setPageCreateDialogOpen}/>

          <HeaderIconButton onClick={() => {
            authContext.dispatchAuthToken({
              type: 'DELETE',
            })
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