import React, {useEffect, useState} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider, Icon} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';
import {instance} from "./axios";

import {AppContext} from "./contexts/AppContext";
import {Layout} from './components/Layout/Layout';
import {ContentPage} from "./pages/ContentPage/ContentPage";
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from "./pages/OfferPage/OfferPage";
import {ContactPage} from './pages/ContactPage/ContactPage';

import colors from './scss-partials/_colors.scss';

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

        h3: {
            fontSize: '2.7rem',
        },

        body2: {
            fontSize: '1.25rem',
        }
    }
}));

const appContext = [
    {
        id: 1,
        component: HomePage,
        exact: true,
        link: '/',
        title: 'Home',
        description: 'Opis strony głównej',
        icon: <Icon>home</Icon>,
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
        title: 'Oferta',
        description: 'Opis strony Oferta',
        icon: <Icon>list_alt</Icon>,
        misc: {
            title: 'Nasze Kursy',
            learnMoreText: 'Dowiedz się więcej...',
            offerDetailsPage: {
                nextText: 'Dalej',
                againText: 'Od nowa',
            },
            offers: [
                {
                    id: 1,
                    title: 'Python',
                    slug: 'kurs-python',
                    description: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991.',
                    image: 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png',
                    author: 'Python Software Foundation',
                    rating: 4,
                    sections: [
                        {
                            type: 'Paragraph',
                            title: `Dlaczego warto?`,
                            body: `Trabem velox ducunt ad alter parma. Cum ventus assimilant, omnes competitiones transferre audax, superbus fluctuies.
                                    epos
                                    Mirabilis, pius pess hic resuscitabo de neuter, superbus saga.
                                    a falsis, equiso flavum species.
                                    Monss sunt solems de barbatus silva. Habitios sunt fugas de lotus messor.
                                    cur castor trabem?
                                    Hibrida, contencio, et musa. Peritus, grandis scutums patienter vitare de noster, gratis humani generis.`,
                        },
                        {type: 'Stepper', title: 'Kroki'},
                        {
                            type: 'Paragraph',
                            title: `Turpiss cadunt`,
                            body: `Sunt cursuses acquirere altus, peritus decores. Dexter, placidus habitios aliquando imperium de albus, altus stella.
                                    cubiculum
                                    Cum scutum mori, omnes toruses vitare regius, albus abaculuses.
                                    decor ires, tanquam audax absolutio.
                                    Coordinatae de brevis extum, manifestum fortis! Advena de primus tata, prensionem clabulare!
                                    cur species ire?
                                    Galluss manducare! Fidelis, nobilis fluctuis una tractare de primus, germanus animalis.`,
                        },
                    ],
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
                    sections: [
                        {
                            type: 'Paragraph',
                            title: `Dlaczego warto?`,
                            body: `Trabem velox ducunt ad alter parma. Cum ventus assimilant, omnes competitiones transferre audax, superbus fluctuies.
                                    epos
                                    Mirabilis, pius pess hic resuscitabo de neuter, superbus saga.
                                    a falsis, equiso flavum species.
                                    Monss sunt solems de barbatus silva. Habitios sunt fugas de lotus messor.
                                    cur castor trabem?
                                    Hibrida, contencio, et musa. Peritus, grandis scutums patienter vitare de noster, gratis humani generis.`,
                        },
                        {type: 'Stepper', title: 'Kroki'},
                        {
                            type: 'Paragraph',
                            title: `Turpiss cadunt`,
                            body: `Sunt cursuses acquirere altus, peritus decores. Dexter, placidus habitios aliquando imperium de albus, altus stella.
                                    cubiculum
                                    Cum scutum mori, omnes toruses vitare regius, albus abaculuses.
                                    decor ires, tanquam audax absolutio.
                                    Coordinatae de brevis extum, manifestum fortis! Advena de primus tata, prensionem clabulare!
                                    cur species ire?
                                    Galluss manducare! Fidelis, nobilis fluctuis una tractare de primus, germanus animalis.`,
                        },
                    ],
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
        },
    },
    {
        id: 3,
        component: ContactPage,
        exact: true,
        link: '/kontakt',
        title: 'Kontakt',
        description: 'Opis strony Kontakt',
        icon: <Icon>contacts</Icon>,
        misc: {
            otherInfoContent: [
                {
                    text: 'kontakt@bezpapierka.pl',
                    icon: 'email',
                },
                {
                    text: '12 1234 1234 1234 1234 1234 1234',
                    icon: 'payment',
                },
            ],
        },
    },
    {
        id: 4,
        component: ContentPage,
        exact: true,
        link: '/o-nas',
        title: 'O nas',
        description: 'Opis strony O nas',
        icon: <Icon>info</Icon>,
        misc: {
            content: 'Meatballs punch has to have a canned, dark eggs component. ' +
                'Try brushing the maple syrup garlics with whole coconut milk and mayonnaise, cooked. ' +
                'Everyone just loves the bitterness of eggs ricotta enameld with dill.',
            image: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80*zBu6EBAwjXXXHz-z'
        },
    },
];

const App = props => {
    const [appContext2, setAppContext2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const page = async (url, component) => (await instance.get(url)).data.map(dat => ({
                ...dat,
                component: component
            }));
            setAppContext2([
                ...(await page('/home_page', HomePage)),
                ...(await page('/offer_page', OfferPage)),
                ...(await page('/contact_page', ContactPage)),
                ...(await page('/content_page', ContentPage)),
            ]);
        };

        fetchData();
    }, []);

    console.log(appContext2);


    return (
        <div className="App">
            <StylesProvider injectFirst>
                <BrowserRouter basename="/builds/bezpapierka.pl">
                        <ThemeProvider theme={theme}>
                            <AppContext.Provider value={appContext2}>
                                <Layout>
                                    <Switch>
                                        {appContext2.map(page => (
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