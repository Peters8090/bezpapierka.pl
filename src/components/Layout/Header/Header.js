import React, {useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import {Logo} from '../../UI/Logo/Logo';
import {NavigationItems} from "./NavigationItems/NavigationItems";
import {AppDrawer} from "./AppDrawer/AppDrawer";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import classes from './Header.module.scss';
import globalClasses from '../../../index.module.scss';

export const Header = props => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const minScrolled = 1;

    const scrollTrigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: minScrolled,
    });

    return (
        <header className={[classes.Header, scrollTrigger && classes.HeaderOnScroll].join(' ')}>
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
};