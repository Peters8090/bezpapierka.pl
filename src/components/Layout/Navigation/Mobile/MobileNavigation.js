import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Logo } from '../../Logo/Logo';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import { mobileBound } from '../../../../contants';
import Divider from '@material-ui/core/Divider';
import Radium from 'radium';

export const MobileNavigation = Radium(props => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    return (
        <div style={{
            display: 'none',
            [`@media (max-width: ${mobileBound})`]: {
                display: 'block',
            },
        }}>
            <AppBar position='sticky'
                    color='primary'>
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                onClick={(_) => setDrawerOpen(!drawerOpen)}
                                style={{
                                    marginRight: theme.spacing(2),
                                }}>
                        <MenuIcon />
                    </IconButton>
                    <Logo />
                    <Drawer anchor='left'
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            onClick={() => setDrawerOpen(false)}>
                        <List style={{
                            paddingTop: 0,
                            minWidth: '60vw',
                        }}>
                            <div style={{
                                padding: '5vw',
                            }}>
                                <Logo />
                            </div>
                            <Divider />
                            <NavigationItem link="/"
                                            name="Home"
                                            icon={HomeIcon}
                                            mobile />
                            <NavigationItem link="/kontakt"
                                            name="Kontakt"
                                            icon={ContactsIcon}
                                            mobile />
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </div>
    );
});