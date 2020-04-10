import React, { Fragment } from 'react';
import {WaveBorder} from "../UI/WaveBorder/WaveBorder";

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import classes from './Layout.module.scss';

export const Layout = props => {
    return (
        <Fragment>
            <Header />
            <main className={classes.Main}>
                {props.children}
                <WaveBorder/>
            </main>
            <Footer />
        </Fragment>
    );
};