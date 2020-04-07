import React, {Fragment, useEffect, useState} from 'react';
import {NavigationItem} from './NavigationItem/NavigationItem';
import {Logo} from '../Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import Drawer from '@material-ui/core/Drawer';

import classes from './Navigation.module.scss';
import utilityClasses from '../../../styles/utility.module.scss';

export const Navigation = props => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState();
    const minScrolled = 50;

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > minScrolled && !scrolled) {
                setScrolled(true);
            } else if (window.scrollY < minScrolled && scrolled) {
                setScrolled(false);
            }
        }
    });

    return (
        <header className={[classes.Navigation, scrolled && classes.NavigationOpacity].join(' ')}>
            <div className={classes.AppBar}>
                <div className={classes.LogoWrapper}>
                    <Logo/>
                </div>

                <NavigationItems className={utilityClasses.DesktopOnly}/>

                <IconButton edge="start"
                            onClick={(_) => setDrawerOpen(!drawerOpen)}
                            className={[classes.HamburgerMenuButton, utilityClasses.MobileOnly].join(' ')}>
                    <MenuIcon/>
                </IconButton>
            </div>
            <AppDrawer drawerOpen={drawerOpen}
                       setDrawerOpen={setDrawerOpen}/>
            <Divider/>
        </header>
    );
};

export const NavigationContext = React.createContext({
    setDrawerOpen: () => {
    },
});

const NavigationItems = props => (
    <Fragment>
        <div className={props.className}>
            <NavigationItem link="/"
                            name="Home"
                            icon={HomeIcon}/>
        </div>
        <div className={props.className}>
            <NavigationItem link="/kontakt"
                            name="Kontakt"
                            icon={ContactsIcon}/>
        </div>
    </Fragment>
);

const AppDrawer = props => (
    <Drawer
        className={utilityClasses.MobileOnly}
        anchor='left'
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}>
        <List className={classes.DrawerList}>
            <div className={classes.DrawerLogoWrapper}>
                <Logo/>
            </div>
            <Divider/>

            <NavigationContext.Provider value={{setDrawerOpen: props.setDrawerOpen}}>
                <NavigationItems/>
            </NavigationContext.Provider>
        </List>
    </Drawer>
);