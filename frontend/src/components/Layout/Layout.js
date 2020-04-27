import {useTheme} from "@material-ui/core";
import NoSsr from "@material-ui/core/NoSsr";
import React, {useContext} from 'react';

/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Helmet} from "react-helmet";
import {withRouter} from "react-router";

import {PagesContext} from "../../contexts/PagesContext";
import {WaveBorder} from "../UI/WaveBorder/WaveBorder";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const Layout = withRouter(props => {
    const currentPage = useContext(PagesContext).find(page => page.link === props.location.pathname);
    const pagesContext = useContext(PagesContext);

    const theme = useTheme();

    return (
        <React.Fragment>
            {currentPage && <Helmet>
                <title>{currentPage.title} | bezpapierka.pl</title>
                <meta name="description" content={currentPage.description}/>
            </Helmet>}
            <Header/>
            {
                pagesContext.length > 0 &&
                <React.Fragment>
                    <main css={{
                        backgroundImage: currentPage && currentPage.link === '/' && `url('${currentPage.background_image}')`,
                        backgroundColor: theme.palette.primary.main,
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'contain',
                    }}>
                        <div style={{
                            minHeight: `calc(100vh - ${theme.misc.headerHeight} - ${theme.misc.waveBorderHeight})`,
                            paddingTop: `${theme.misc.headerHeight}`
                        }}>
                            {props.children}
                        </div>
                        <WaveBorder/>
                    </main>
                    <Footer/>
                </React.Fragment>
            }
        </React.Fragment>
    );
});