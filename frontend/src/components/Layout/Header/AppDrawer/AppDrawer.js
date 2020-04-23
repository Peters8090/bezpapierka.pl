import React from "react";

import {Drawer, List, Divider, Box} from '@material-ui/core';

import {Logo} from "../../../UI/Logo/Logo";
import {NavigationItems} from "../NavigationItems/NavigationItems";

import classes from "./AppDrawer.module.scss";
import globalClasses from "../../../../index.module.scss";

export const AppDrawerContext = React.createContext({
    setDrawerOpen: () => {
    }
});

export const AppDrawer = props => (
    <Drawer
        className={[globalClasses.MobileOnly, classes.AppDrawer].join(' ')}
        anchor='right'
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}>
        <List className={classes.List}>
            <Box p={2}>
                <Logo/>
            </Box>
            <Divider/>

            <AppDrawerContext.Provider value={{setDrawerOpen: props.setDrawerOpen}}>
                <NavigationItems/>
            </AppDrawerContext.Provider>
        </List>
    </Drawer>
);