import React, {useEffect, useState} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider, LinearProgress} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {PagesContext} from "./contexts/PagesContext";
import {Layout} from './components/Layout/Layout';
import {ContentPage} from "./pages/ContentPage/ContentPage";
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from "./pages/OfferPage/OfferPage";
import {ContactPage} from './pages/ContactPage/ContactPage';
import {instance} from "./axios";

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {main: '#add8e6'},
        secondary: {main: '#ff1744'},
        error: {main: '#f44336'},
        info: {main: '#3f51b5'},
        success: {main: '#8bc34a'},

        logo1: {main: '#000'},
        logo2: {main: '#edb100'}
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
    },
    misc: {
        headerHeight: '3rem',
        waveBorderHeight: '8vh',
    }
}));

const App = props => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const page = async (url, component) => (await instance.get(url)).data.map(dat => ({
                ...dat,
                component: component
            }));
            setPages([
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
                        <PagesContext.Provider value={pages}>
                            {
                                pages.length <= 0 &&
                                (<LinearProgress color="secondary" style={{
                                    position: 'sticky',
                                    top: 0
                                }}/>)
                            }
                            <Layout>
                                <Switch>
                                    {pages.map(page => (
                                        <Route path={page.link}
                                               key={page.id}
                                               exact={page.exact}>
                                            <page.component pageId={page.id}/>
                                        </Route>
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