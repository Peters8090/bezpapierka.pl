import React from "react";

import {Drawer, List, Divider, Box} from '@material-ui/core';

import {Logo} from "../../../Miscellaneous/Logo";
import {NavigationItems} from "../NavigationItems/NavigationItems";

export const AppDrawerContext = React.createContext({
    setDrawerOpen: () => {
    }
});

export const AppDrawer = props => (
    <Drawer style={{userSelect: 'none'}}
            anchor='right'
            open={props.drawerOpen}
            onClose={() => props.setDrawerOpen(false)}>
        <List style={{paddingTop: 0, minWidth: '60vw'}}>
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