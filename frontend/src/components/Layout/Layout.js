import React, {useContext} from 'react';

import {Helmet} from "react-helmet";
import {withRouter} from "react-router";

import {PagesContext} from "../../contexts/PagesContext";
import {WaveBorder} from "../UI/WaveBorder/WaveBorder";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

import classes from './Layout.module.scss';

export const Layout = withRouter(props => {
    const currentPage = useContext(PagesContext).find(page => page.link === props.location.pathname);
    const appContext = useContext(PagesContext);

    return (
        <>
            {currentPage && <Helmet>
                <title>{currentPage.title} | bezpapierka.pl</title>
                <meta name="description" content={currentPage.description}/>
            </Helmet>}
            <Header/>
            {
                appContext.length > 0 &&
                <>
                    <main className={classes.Main} style={currentPage && currentPage.link === '/' ? {
                        backgroundImage: `url('${currentPage.background_image}')`,
                    } : null}>
                        {props.children}
                        <WaveBorder/>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
});