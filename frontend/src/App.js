import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {Layout} from './components/Layout/Layout';
import {LoadingScreen} from './components/Miscellaneous/LoadingScreen';
import {HomePage} from './pages/HomePage/HomePage';
import {OfferPage} from './pages/OfferPage/OfferPage';
import {ContactPage} from './pages/ContactPage/ContactPage';
import {ContentPage} from './pages/ContentPage/ContentPage';
import {myAxios} from './axios';

export const PagesContext = React.createContext([]);

const App = _ => {
  const [pages, setPages] = useState([]);
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: 'dark',
      primary: {main: '#add8e6'},
      secondary: {main: '#ff1744'},

      logo1: {main: '#63b099'},
      logo2: {main: '#edb100'},
    },
    typography: {
      fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe Miscellaneous", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe Miscellaneous Emoji", "Segoe Miscellaneous Symbol"',
    },
    misc: {
      headerHeight: '3rem',
      waveBorderHeight: '8vh',
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      const fetchPage = async (url, component) => (await myAxios.get(
          url)).data.map(pageData => ({
        ...pageData,
        component: component,
      }));

      setPages([
        ...(await fetchPage('/home_page', HomePage)),
        ...(await fetchPage('/content_page', ContentPage)),
        ...(await fetchPage('/offer_page', OfferPage)),
        ...(await fetchPage('/contact_page', ContactPage)),
      ]);
    };
    fetchData();
  }, []);

  return (
      <div className="App">
        <StylesProvider injectFirst>
          <Paper>
            <BrowserRouter basename="/builds/bezpapierka.pl">
              <ThemeProvider theme={theme}>
                <PagesContext.Provider value={pages}>
                  {pages.length <= 0 ?
                      <LoadingScreen/>
                      : <Layout>
                        <Switch>
                          {pages.map(page => (
                              <Route path={page.link}
                                     key={page.id}
                                     exact={page.exact}>
                                <page.component pageId={page.id}/>
                              </Route>
                          ))}
                        </Switch>
                      </Layout>}
                </PagesContext.Provider>
              </ThemeProvider>
            </BrowserRouter>
          </Paper>
        </StylesProvider>
      </div>
  );
};

export default App;