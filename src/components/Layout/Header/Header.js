import React, {useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, useScrollTrigger} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import {Logo} from '../../UI/Logo/Logo';
import {NavigationItems} from "./NavigationItems/NavigationItems";
import {AppDrawer} from "./AppDrawer/AppDrawer";

import classes from './Header.module.scss';
import globalClasses from '../../../index.module.scss';

export const Header = withRouter(props => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    let minScrolled = 1;

    if (props.location.pathname === '/home2')
        minScrolled = -1;

    const scrollTrigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: minScrolled,
    });

    return (
        <header
            className={[classes.Header, props.location.pathname === '/home3' ? scrollTrigger ? classes.HeaderOnScroll : classes.Header2 : scrollTrigger && classes.HeaderOnScroll].join(' ')}>
            <div className={classes.LogoWrapper}>
                <Logo/>
            </div>

            <NavigationItems className={globalClasses.DesktopOnly}/>

            <IconButton edge="start"
                        onClick={(_) => setDrawerOpen(!drawerOpen)}
                        className={[classes.HamburgerMenuButton, globalClasses.MobileOnly].join(' ')}>
                <MenuIcon/>
            </IconButton>

            <AppDrawer drawerOpen={drawerOpen}
                       setDrawerOpen={setDrawerOpen}/>
        </header>
    );
});