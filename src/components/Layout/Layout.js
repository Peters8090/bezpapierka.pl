import React, { Fragment } from 'react';
import { Navigation } from './Navigation/Navigation';
import { Footer } from './Footer/Footer';

export const Layout = props => {
    return (
        <Fragment>
            <header>
                <Navigation />
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <Footer />
            </footer>
        </Fragment>
    );
};