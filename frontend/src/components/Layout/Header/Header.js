import React, {useContext, useState} from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, useScrollTrigger, useTheme} from '@material-ui/core';
import {PagesContext} from "../../../contexts/PagesContext";
import {DesktopOnly} from "../../Miscellaneous/Responsiveness/DesktopOnly";

import {Logo} from '../../Miscellaneous/Logo';
import {MobileOnly} from "../../Miscellaneous/Responsiveness/MobileOnly";
import {NavigationItems} from "./NavigationItems/NavigationItems";
import {AppDrawer} from "./AppDrawer/AppDrawer";

export const Header = _ => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const scrollTrigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 0,
    });

    const pagesContext = useContext(PagesContext);
    const theme = useTheme();

    const styles = {
        header: {
            backgroundColor: scrollTrigger && 'white',
            transition: 'all ease-in-out 300ms',

            position: 'fixed',
            zIndex: 1,
            width: '100%',
            height: `${theme.misc.headerHeight}`,
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
        }
    };

    return (
        <header style={styles.header}>
            <div style={{flex: 1}}>
                <Logo/>
            </div>

            {pagesContext.length > 0 &&
            <React.Fragment>
                <DesktopOnly>
                    <NavigationItems/>
                </DesktopOnly>

                <MobileOnly>
                    <IconButton edge="start"
                                onClick={(_) => setDrawerOpen(!drawerOpen)}>
                        <MenuIcon/>
                    </IconButton>

                    <AppDrawer drawerOpen={drawerOpen}
                               setDrawerOpen={setDrawerOpen}/>
                </MobileOnly>
            </React.Fragment>
            }
        </header>
    );
};