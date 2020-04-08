import React, { Fragment } from 'react';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import classes from './Layout.module.scss';

export const Layout = props => {
    return (
        <Fragment>
            <Header />
            <main className={classes.Main}>
                {props.children}
            </main>
            <Footer />
        </Fragment>
    );
};