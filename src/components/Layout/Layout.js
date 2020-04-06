import React, { Fragment } from 'react';
import { DesktopNavigation } from './Navigation/Desktop/DesktopNavigation';
import { Footer } from './Footer/Footer';
import { MobileNavigation } from './Navigation/Mobile/MobileNavigation';

export const Layout = props => {
    return (
        <Fragment>
            <header>
                <DesktopNavigation />
                <MobileNavigation />
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