import React, { Fragment, useState } from 'react';
import { NavigationItem } from './NavigationItem/NavigationItem';
import { Logo } from '../Logo/Logo';
import Radium from 'radium';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import Drawer from '@material-ui/core/Drawer';

import classes from './Navigation.module.scss';
import utilityClasses from '../../../styles/utility.module.scss';

const NavigationItems = props => (
    <Fragment>
        <div className={props.className}>
            <NavigationItem link="/"
                            name="Home"
                            icon={HomeIcon} />
        </div>
        <div className={props.className}>
            <NavigationItem link="/kontakt"
                            name="Kontakt"
                            icon={ContactsIcon} />
        </div>
    </Fragment>
);

const AppDrawer = props => (
    <Drawer
        className={utilityClasses.MobileOnly}
        anchor='left'
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}
        onClick={() => props.setDrawerOpen(false)}>
        <List className={classes.DrawerList}>
            <div className={classes.DrawerLogoWrapper}>
                <Logo />
            </div>
            <Divider />
            <NavigationItems />
        </List>
    </Drawer>
);

export const Navigation = Radium(props => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className={classes.Navigation}>
            <div className={classes.AppBar}>
                <IconButton edge="start"
                            onClick={(_) => setDrawerOpen(!drawerOpen)}
                            className={[classes.HamburgerMenuButton, utilityClasses.MobileOnly].join(' ')}>
                    <MenuIcon />
                </IconButton>

                <div className={classes.LogoWrapper}>
                    <Logo />
                </div>

                <NavigationItems className={utilityClasses.DesktopOnly} />
            </div>
            <AppDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
            <Divider />
        </div>
    );
});