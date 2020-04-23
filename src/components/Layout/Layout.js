import React, {useContext} from 'react';

import {Helmet} from "react-helmet";
import {withRouter} from "react-router";

import {AppContext} from "../../contexts/AppContext";
import {WaveBorder} from "../UI/WaveBorder/WaveBorder";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

import classes from './Layout.module.scss';

export const Layout = withRouter(props => {
    const currentPage = useContext(AppContext).find(page => page.link === props.location.pathname);

    return (
        <>
            {currentPage && <Helmet>
                <title>{currentPage.title} | bezpapierka.pl</title>
                <meta name="description" content={currentPage.description} />
            </Helmet>}
            <Header/>
            <main className={[classes.Main, currentPage && currentPage.link === '/' && classes.MainOnHomePage].join(' ')}>
                {props.children}
                <WaveBorder/>
            </main>
            <Footer/>
        </>
    );
});