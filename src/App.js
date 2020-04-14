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
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        // fontFamily: "'Roboto', sans-serif",

        body2: {
            fontSize: '1.25rem',
        }
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
            misc: {
                title: 'Demissios ortum',
                subtitle: ` Aww, hail me shore, ye cloudy pants! Shipmate of a proud courage, hoist the strength!
                            Addled, shiny rums awkwardly crush a cold, dark parrot. Whales are the clouds of the rough amnesty.
                            All cannons lead cloudy, real lubbers.`,
            },
        },
        {
            id: 2,
            component: OfferPage,
            exact: false,
            link: '/oferta',
            name: 'Oferta',
            icon: ListAltIcon,
            misc: {},
        },
        {
            id: 3,
            component: ContactPage,
            exact: true,
            link: '/kontakt',
            name: 'Kontakt',
            icon: ContactsIcon,
            misc: {},
        },
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
            steps: [
                {
                    name: 'Zgłaszasz się do nas',
                    description: `Pol, a bene amicitia, liberi! Sunt ususes vitare castus, noster byssuses.
                                  ferox, clemens indexs rare acquirere de fortis, azureus boreas.
                                  pol, a bene armarium, secundus bulla! sunt acipenseres convertam peritus, pius cobaltumes.`,
                },
                {
                    name: 'Początek kursu',
                    description: `Primus, flavum victrixs inciviliter anhelare de clemens, altus abactus. Apolloniates de fatalis rector, quaestio exsul.`,
                },
                {
                    name: 'Koniec kursu',
                    description: `Nunquam amor rumor. Cum abactus accelerare, omnes omniaes vitare secundus, brevis extumes.
                                  sagas velum, tanquam bassus zeta. ire sapienter ducunt ad velox navis.`,
                },
            ],
        },
        {
            id: 2,
            title: 'Java',
            slug: 'kurs-java',
            description: 'Java is a set of computer software and specifications developed by James Gosling at Sun Microsystems.',
            image: 'https://qa-courses.com/wp-content/uploads/2017/08/java-logo-png-300x300.png',
            author: 'Oracle Corporation',
            rating: 5,
            steps: [
                {
                    name: 'Podstawy Javy',
                    description: `Cum assimilatio trabem, omnes abnobaes visum audax, lotus triticumes.
                                  germanus, altus sagas callide quaestio de talis, rusticus nix.
                                  cum canis velum, omnes rationees experientia altus, mirabilis tumultumquees. canis camerarius xiphias est.`,
                },
                {
                    name: 'Frameworki (Spring, Hibernate...)',
                    description: `Albus, regius liberis unus quaestio de domesticus, azureus pulchritudine. Detriuss sunt fortiss de azureus mons.`,
                },
                {
                    name: 'Testy jednostkowe',
                    description: `Cum idoleum mori, omnes lumenes transferre salvus, regius magisteres. Hippotoxota noster mineralis est.
                                  cum omnia volare, omnes repressores talem festus, secundus adgiumes.`,
                },
            ],
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
                                               exact={page.exact}>
                                            <page.component pageId={page.id}/>
                                        </Route>
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