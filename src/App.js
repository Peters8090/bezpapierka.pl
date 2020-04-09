import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {PagesContext} from "./contexts/PagesContext";
import {Layout} from './components/Layout/Layout';
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from "./pages/OfferPage/OfferPage";
import {ContactPage} from './pages/ContactPage/ContactPage';

import colors from './scss-partials/_colors.scss';
import constants from './scss-partials/_constants.scss';
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ContactsIcon from "@material-ui/icons/Contacts";

const theme = responsiveFontSizes( createMuiTheme({
    palette: {
        primary: {main: colors['primary']},
        secondary: {main: colors['secondary']},
        error: {main: colors['error']},
        info: {main: colors['info']},
        success: {main: colors['success']},
    },
    typography: {
        fontFamily: 'Comic Neue',
    },
    other: {
        headerHeight: parseFloat(constants['header-height']) * parseFloat(getComputedStyle(document.documentElement).fontSize),
    }
}));

const pages = [
    {
        component: HomePage,
        link: '/',
        name: 'Home',
        icon: HomeIcon,
    },
    {
        component: OfferPage,
        link: '/oferta',
        name: 'Oferta',
        icon: ListAltIcon,
    },
    {
        component: ContactPage,
        link: '/kontakt',
        name: 'Kontakt',
        icon: ContactsIcon,
    }
];

const App = props => {
    return (
        <div className="App">
            <StylesProvider injectFirst>
                <BrowserRouter basename="/react/bezpapierka.pl">
                    <ThemeProvider theme={theme}>
                        <PagesContext.Provider value={pages}>
                            <Layout>
                                <Switch>
                                    {pages.map(page => (
                                        <Route path={page.link}
                                               exact
                                               key={page.link}
                                               component={page.component}/>
                                    ))}
                                </Switch>
                            </Layout>
                        </PagesContext.Provider>
                    </ThemeProvider>
                </BrowserRouter>
            </StylesProvider>
        </div>
    );
};

export default App;