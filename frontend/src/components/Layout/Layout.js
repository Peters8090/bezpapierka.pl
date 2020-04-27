import React, {useContext} from 'react';

import {Helmet} from "react-helmet";
import {useTheme} from "@material-ui/core";
import {withRouter} from "react-router";

import {PagesContext} from "../../contexts/PagesContext";
import {WaveBorder} from "../Miscellaneous/WaveBorder";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const Layout = withRouter(props => {
    const currentPage = useContext(PagesContext).find(page => page.link === props.location.pathname);
    const pagesContext = useContext(PagesContext);

    const theme = useTheme();

    const styles = {
        main: {
            backgroundImage: currentPage && currentPage.link === '/' && `url('${currentPage.background_image}')`,
            backgroundColor: theme.palette.primary.main,
            backgroundAttachment: 'fixed',
            backgroundSize: 'contain',
        },
        pageWrapper: {
            minHeight: `calc(100vh - ${theme.misc.headerHeight} - ${theme.misc.waveBorderHeight})`,
            paddingTop: `${theme.misc.headerHeight}`
        },
    };

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
                    <main style={styles.main}>
                        <div style={styles.pageWrapper}>
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