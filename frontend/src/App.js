import Paper from '@material-ui/core/Paper';
import React, {useContext, useEffect, useState} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom';
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
import { plPL } from '@material-ui/core/locale';
import {myAxios} from './axios';

export const PagesContext = React.createContext({
  pages: {},
  fetchData: () => {},
});

export const useCurrentPage = () => {
  const pagesContext = useContext(PagesContext);
  const location = useLocation();

  return pagesContext.pages.find(page => {
    if(page.exact)
      return location.pathname === page.link;
    else
      return location.pathname.includes(page.link);
  });
};

export const ConfigurationContext = React.createContext({
  id: 1,
  site_name: '',
  logo: '',
  theme: '',
  primary_color: '',
  secondary_color: '',
});

const App = () => {
  const [configuration, setConfiguration] = useState({});
  const [pages, setPages] = useState([]);

  const getTheme = () => responsiveFontSizes(createMuiTheme({
    palette: {
      type: configuration.theme,
      primary: {main: configuration.primary_color},
      secondary: {main: configuration.secondary_color},
    },
    typography: {
      fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe Miscellaneous", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe Miscellaneous Emoji", "Segoe Miscellaneous Symbol"',
    },
    misc: {
      headerHeight: '50px',
      waveBorderHeight: '8vh',
    },
  }, plPL));

  const [appInitialized, setAppInitalized] = useState(false);

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

    setConfiguration((await myAxios.get('/configuration/1')).data);
  };

  useEffect(() => {
    fetchData().then(() => setAppInitalized(true));
  }, []);

  return (
      <div className="App">
        <StylesProvider injectFirst>
          <Paper>
            <BrowserRouter basename="/builds/bezpapierka.pl">
              <ConfigurationContext.Provider value={configuration}>
                <PagesContext.Provider value={{
                  pages: pages,
                  fetchData: fetchData,
                }}>
                  {!appInitialized ?
                      <LoadingScreen/>
                      : (
                          <ThemeProvider theme={getTheme()}>
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
                          </ThemeProvider>
                      )}
                </PagesContext.Provider>
              </ConfigurationContext.Provider>
            </BrowserRouter>
          </Paper>
        </StylesProvider>
      </div>
  );
};

export default App;