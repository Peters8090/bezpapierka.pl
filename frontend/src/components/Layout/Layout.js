import {Home} from "@material-ui/icons";
import React, {useContext} from 'react';

import {Helmet} from "react-helmet";
import {useTheme} from "@material-ui/core";
import {withRouter} from "react-router";

import {ConfigurationContext, PagesContext} from '../../App';
import {HomePage} from "../../pages/HomePage/HomePage";
import {WaveBorder} from "../Miscellaneous/WaveBorder";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const Layout = withRouter(props => {
    const currentPage = useContext(PagesContext).pages.find(page => page.link === props.location.pathname);
    const site_name = useContext(ConfigurationContext).site_name;

    const theme = useTheme();

    const styles = {
        main: {
            backgroundImage: currentPage && `url('${currentPage.background_image}')`,
            backgroundColor: theme.palette.primary.main,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
        },
        pageWrapper: {
            minHeight: `calc(100vh - ${theme.misc.headerHeight} - ${theme.misc.waveBorderHeight})`,
            paddingTop: `calc(${theme.misc.headerHeight} + 1rem)`
        },
    };

    return (
        <React.Fragment>
            {currentPage && (
                <Helmet>
                    <title>{currentPage.title} | {site_name}</title>
                    <meta name="description" content={currentPage.description}/>
                </Helmet>
            )}
            <Header/>
                <React.Fragment>
                    <main style={styles.main}>
                        <div style={styles.pageWrapper}>
                            {props.children}
                        </div>
                        <WaveBorder/>
                    </main>
                    <Footer/>
                </React.Fragment>
        </React.Fragment>
    );
});