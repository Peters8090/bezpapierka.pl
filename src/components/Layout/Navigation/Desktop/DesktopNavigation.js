import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import { Logo } from '../../Logo/Logo';
import { mobileBound } from '../../../../contants';
import Radium from 'radium';

export const DesktopNavigation = Radium(props => {
    return (
        <div style={{
            display: 'none',
            [`@media (min-width: ${mobileBound})`]: {
                display: 'block',
            },
        }}>
            <AppBar position='sticky'
                    color='primary'>
                <Toolbar variant="dense">
                    <div style={{
                        flex: 1,
                    }}><Logo /></div>
                    <NavigationItem link="/"
                                    name="Home" />
                    <NavigationItem link="/kontakt"
                                    name="Kontakt" />
                </Toolbar>
            </AppBar>
        </div>
    );
});