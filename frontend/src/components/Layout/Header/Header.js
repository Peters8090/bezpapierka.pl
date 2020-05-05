import Fab from '@material-ui/core/Fab';
import {dark} from '@material-ui/core/styles/createPalette';
import React, {useContext, useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import {IconButton, useScrollTrigger, useTheme} from '@material-ui/core';
import {PagesContext} from '../../../App';
import {
  PageCreateEditDialog,
} from '../../CRUD/PageCreateEditDialog';
import {DesktopOnly} from '../../Miscellaneous/Responsiveness/DesktopOnly';

import {Logo} from '../../Miscellaneous/Logo';
import {MobileOnly} from '../../Miscellaneous/Responsiveness/MobileOnly';
import {NavigationItems} from './NavigationItems/NavigationItems';
import {AppDrawer} from './AppDrawer/AppDrawer';

export const Header = _ => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCreateDialogOpen, setPageCreateDialogOpen] = useState(false);
  const [pageEditDialogOpen, setPageEditDialogOpen] = useState(false);

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

  return (
      <header style={styles.header}>
        <div style={{flex: 1}}>
          <Logo/>
        </div>

        <DesktopOnly>
          <NavigationItems/>
        </DesktopOnly>

        <Fab color='secondary' style={{
          position: 'fixed',
          bottom: theme.spacing(3),
          right: theme.spacing(3),
        }}>
          <SettingsIcon/>
        </Fab>

        <IconButton
            onClick={() => setPageEditDialogOpen(prevState => !prevState)}>
          <EditIcon/>
        </IconButton>

        <IconButton
            onClick={() => setPageCreateDialogOpen(prevState => !prevState)}>
          <AddIcon/>
        </IconButton>

        <PageCreateEditDialog open={pageEditDialogOpen}
                              setOpen={setPageEditDialogOpen}
                              isEdit={true}/>

        <PageCreateEditDialog open={pageCreateDialogOpen}
                              setOpen={setPageCreateDialogOpen}
                              isEdit={false}/>

        <MobileOnly>
          <IconButton onClick={(_) => setDrawerOpen(!drawerOpen)}>
            <MenuIcon/>
          </IconButton>

          <AppDrawer drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen}/>
        </MobileOnly>

      </header>
  );
};