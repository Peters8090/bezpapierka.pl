import LinearProgress from "@material-ui/core/LinearProgress";
import React, {useEffect, useState} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {AppContext} from "./contexts/AppContext";
import {Layout} from './components/Layout/Layout';
import {ContentPage} from "./pages/ContentPage/ContentPage";
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from "./pages/OfferPage/OfferPage";
import {ContactPage} from './pages/ContactPage/ContactPage';
import {instance} from "./axios";

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


    return (
        <div className="App">
            <StylesProvider injectFirst>
                <BrowserRouter basename="/builds/bezpapierka.pl">
                    <ThemeProvider theme={theme}>
                        <AppContext.Provider value={appContext2}>
                            {appContext2.length <= 0 && <LinearProgress color="secondary" style={{
                                position: 'sticky',
                                top: 0
                            }}/>}
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