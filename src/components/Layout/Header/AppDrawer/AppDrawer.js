import React from "react";
import Drawer from "@material-ui/core/Drawer";
import globalClasses from "../../../../index.module.scss";
import List from "@material-ui/core/List";
import classes from "../Header.module.scss";
import {Logo} from "../../../UI/Logo/Logo";
import Divider from "@material-ui/core/Divider";
import {NavigationItems} from "../NavigationItems/NavigationItems";

export const AppDrawerContext = React.createContext({
    setDrawerOpen: () => {},
});

export const AppDrawer = props => (
    <Drawer
        className={globalClasses.MobileOnly}
        anchor='left'
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}>
        <List className={classes.DrawerList}>
            <div className={classes.DrawerLogoWrapper}>
                <Logo/>
            </div>
            <Divider/>

            <AppDrawerContext.Provider value={{setDrawerOpen: props.setDrawerOpen}}>
                <NavigationItems/>
            </AppDrawerContext.Provider>
        </List>
    </Drawer>
);