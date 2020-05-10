import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';

import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
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
import {emptyValues} from './utility';

export const PagesContext = React.createContext({
  pages: {},
  fetchPages: () => {},
});

const App = props => {
  const [pages, setPages] = useState([]);
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: 'light',
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

  const fetchPages = async () => {
    const fetchPage = async (url, component) => (await myAxios.get(
        url)).data.map(pageData => ({
      ...Object.filter(pageData, attr => !emptyValues.includes(attr)),
      component: component,
      apiEndpoint: url,
    }));

    setPages([
      ...(await fetchPage('/home_page', HomePage)),
      ...(await fetchPage('/content_page', ContentPage)),
      ...(await fetchPage('/offer_page', OfferPage)),
      ...(await fetchPage('/contact_page', ContactPage)),
    ]);
  };
  useEffect(() => {
    fetchPages();
  }, []);

  return (
      <div className="App">
        <Paper>
          <ThemeProvider theme={theme}>
            <PagesContext.Provider value={{
              pages: pages,
              fetchPages: fetchPages,
            }}>
              {pages.length <= 0 ?
                  <LoadingScreen/>
                  : (
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
                  )}
            </PagesContext.Provider>
          </ThemeProvider>
        </Paper>
      </div>
  );
};

export default App;