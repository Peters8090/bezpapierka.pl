import React, {useEffect, useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {useTheme} from "@material-ui/core";

import {Logo} from '../../UI/Logo/Logo';
import {NavigationItems} from "./NavigationItems/NavigationItems";
import {AppDrawer} from "./AppDrawer/AppDrawer";

import classes from './Header.module.scss';
import globalClasses from '../../../index.module.scss';

export const Header = props => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState();
    const minScrolled = useTheme().other.headerHeight;

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
        <header className={[classes.Header, scrolled && classes.HeaderOnScroll].join(' ')}>
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