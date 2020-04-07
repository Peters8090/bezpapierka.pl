import React, { Fragment } from 'react';
import { Navigation } from './Navigation/Navigation';
import { Footer } from './Footer/Footer';

export const Layout = props => {
    return (
        <Fragment>
            <Navigation />
            <main>
                {props.children}
            </main>
            <Footer />
        </Fragment>
    );
};