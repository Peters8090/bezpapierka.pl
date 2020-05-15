import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {useCurrentPage} from '../../../App';
import {DialogWithProps} from '../../CRUD/DialogForm/DialogForm';
import {PageAdmin} from '../../CRUD/Admins/PageAdmin';
import {Logo} from '../../Miscellaneous/Logo';
import {NavigationItems} from './NavigationItems/NavigationItems';
import {AppDrawer} from './AppDrawer/AppDrawer';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCreateDialogOpen, setPageCreateDialogOpen] = useState(false);
  const [pageEditDialogOpen, setPageEditDialogOpen] = useState(false);

  const currentPage = useCurrentPage();

  const scrollTrigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const theme = useTheme();

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

  useEffect(() => {
    if (!currentPage) {
      setPageEditDialogOpen(false);
    }
  });

  return (
      <header css={styles.header}>
        <div css={{flex: 1}}>
          <Logo/>
        </div>

        <Hidden smDown>
          <NavigationItems/>
        </Hidden>

        {currentPage && (
            <React.Fragment>

              <IconButton
                  onClick={() => setPageEditDialogOpen(
                      prevState => !prevState)}>
                <EditIcon/>
              </IconButton>

              <DialogWithProps open={pageEditDialogOpen}
                               setOpen={setPageEditDialogOpen}>
                <PageAdmin isEdit={true}/>
              </DialogWithProps>

            </React.Fragment>
        )}

        <IconButton
            onClick={() => setPageCreateDialogOpen(
                prevState => !prevState)}>
          <AddIcon/>
        </IconButton>
        <DialogWithProps open={pageCreateDialogOpen}
                         setOpen={setPageCreateDialogOpen}>
          <PageAdmin isEdit={false}/>
        </DialogWithProps>

        <Hidden mdUp>
          <IconButton onClick={(_) => setDrawerOpen(!drawerOpen)}>
            <MenuIcon/>
          </IconButton>

          <AppDrawer drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen}/>
        </Hidden>
      </header>
  );
};