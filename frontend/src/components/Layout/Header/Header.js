import LinearProgress from "@material-ui/core/LinearProgress";
import React, {useContext, useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, useScrollTrigger} from '@material-ui/core';
import {AppContext} from "../../../contexts/AppContext";

import {Logo} from '../../UI/Logo/Logo';
import {NavigationItems} from "./NavigationItems/NavigationItems";
import {AppDrawer} from "./AppDrawer/AppDrawer";

import classes from './Header.module.scss';
import globalClasses from '../../../index.module.scss';

export const Header = _ => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const scrollTrigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 0,
    });

    const appContext = useContext(AppContext);

    return (
        <header className={[classes.Header, scrollTrigger && classes.HeaderOnScroll].join(' ')}>
            <div className={classes.LogoWrapper}>
                <Logo/>
            </div>

            {appContext.length > 0 &&
            <>
                <NavigationItems className={globalClasses.DesktopOnly}/>

                <IconButton edge="start"
                            onClick={(_) => setDrawerOpen(!drawerOpen)}
                            className={globalClasses.MobileOnly}>
                    <MenuIcon/>
                </IconButton>

                <AppDrawer drawerOpen={drawerOpen}
                           setDrawerOpen={setDrawerOpen}/>
            </>
            }
        </header>
    );
};