import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {AppContext} from "./contexts/AppContext";
import {Layout} from './components/Layout/Layout';
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from "./pages/OfferPage/OfferPage";
import {ContactPage} from './pages/ContactPage/ContactPage';

import colors from './scss-partials/_colors.scss';
// import constants from './scss-partials/_constants.scss';
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ContactsIcon from "@material-ui/icons/Contacts";

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {main: colors['primary']},
        secondary: {main: colors['secondary']},
        error: {main: colors['error']},
        info: {main: colors['info']},
        success: {main: colors['success']},
    },
    typography: {
        fontFamily: "'Comic Neue', cursive",
        // Segoe UI

        button: {
            fontFamily: "'Roboto', sans-serif;",
        }
    },
    other: {
        // headerHeight: parseFloat(constants['header-height']) * parseFloat(getComputedStyle(document.documentElement).fontSize),
    }
}));

const appContext = {
    pages: [
        {
            id: 1,
            component: HomePage,
            exact: true,
            link: '/',
            name: 'Home',
            icon: HomeIcon,
        },
        {
            id: 2,
            component: OfferPage,
            exact: false,
            link: '/oferta',
            name: 'Oferta',
            icon: ListAltIcon,
        },
        {
            id: 3,
            component: ContactPage,
            exact: true,
            link: '/kontakt',
            name: 'Kontakt',
            icon: ContactsIcon,
        }
    ],
    offers: [
        {
            id: 1,
            title: 'Python',
            slug: 'kurs-python',
            description: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991.',
            image: 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png',
            author: 'Python Software Foundation',
            rating: 4,
        },
        {
            id: 2,
            title: 'Java',
            slug: 'kurs-java',
            description: 'Java is a set of computer software and specifications developed by James Gosling at Sun Microsystems.',
            image: 'https://qa-courses.com/wp-content/uploads/2017/08/java-logo-png-300x300.png',
            author: 'Oracle Corporation',
            rating: 5,
        },
    ],
};

const App = props => {
    return (
        <div className="App">
            <StylesProvider injectFirst>
                <BrowserRouter basename="/react/bezpapierka.pl">
                    <ThemeProvider theme={theme}>
                        <AppContext.Provider value={appContext}>
                            <Layout>
                                <Switch>
                                    {appContext.pages.map(page => (
                                        <Route path={page.link}
                                               key={page.id}
                                               id={page.id}
                                               exact={page.exact}
                                               component={page.component}/>
                                    ))}
                                </Switch>
                            </Layout>
                        </AppContext.Provider>
                    </ThemeProvider>
                </BrowserRouter>
            </StylesProvider>
        </div>
    );
};

export default App;