import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useEffect, useState} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom';
import {
  createMuiTheme, Dialog,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';
import {PageAdmin} from './components/CRUD/Admins/PageAdmin';
import {CrudEditablePageWrapper} from './components/CRUD/CrudEditablePageWrapper';
import {Layout} from './components/Layout/Layout';
import {LoadingScreen} from './components/Miscellaneous/LoadingScreen';
import {LoginPage} from './components/Miscellaneous/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';
import Cookie from "js-cookie"
import {OfferPage, OfferPageContext} from './pages/OfferPage/OfferPage';
import {ContactPage} from './pages/ContactPage/ContactPage';
import {ContentPage} from './pages/ContentPage/ContentPage';
import {plPL} from '@material-ui/core/locale';
import axios from 'axios';
import {isEmpty} from './utility';

export const useCurrentPage = () => {
  const pagesContext = useContext(PagesContext);
  const location = useLocation();

  return pagesContext.pages.find(page => {
    if (page.exact)
      return location.pathname === page.link;
    else
      return location.pathname.includes(page.link);
  });
};

export const PagesContext = React.createContext({
  pages: {},
  fetchData: () => {},
});

export const ConfigurationContext = React.createContext({
  id: 1,
  site_name: '',
  logo: '',
  theme: '',
  primary_color: '',
  secondary_color: '',
});

export const AuthContext = React.createContext({
  axios: axios,
  isLoggedIn: false,
  setAuthToken: () => {},
});

export const apiUrl = 'http://localhost:8000';

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
    const fetchPage = async (url, component) => (await pagesAxios.get(
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

    setConfiguration((await pagesAxios.get('/configuration/1')).data);
  };

  useEffect(() => {
    if (Cookie.get('token'))
      setAuthToken(Cookie.get('token'));
    fetchData().then(() => setAppInitalized(true));
  }, []);

  const [authToken, setAuthToken] = useState(
      '');

  const pagesAxios = axios.create({
    baseURL: `${apiUrl}/pages`,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
    headers: {
      ...(isEmpty(authToken) ? {} : {'Authorization': `Token ${authToken}`}),
    },
  });

  return (
      <div className="App">
        <StylesProvider injectFirst>
          <BrowserRouter>
            <AuthContext.Provider value={{
              axios: pagesAxios,
              isLoggedIn: !isEmpty(authToken),
              setAuthToken: setAuthToken,
            }}>
              <ConfigurationContext.Provider value={configuration}>
                <PagesContext.Provider value={{
                  pages: pages,
                  fetchData: fetchData,
                }}>
                  {!appInitialized ?
                      <LoadingScreen/>
                      : (
                          <ThemeProvider theme={getTheme()}>
                            <Switch>
                              <Layout>
                                <Route path='/login' exact>
                                  <LoginPage/>
                                </Route>

                                {pages.map(page => (
                                    <Route path={page.link}
                                           key={page.id}
                                           exact={page.exact}>
                                      <CrudEditablePageWrapper>
                                        <page.component/>
                                      </CrudEditablePageWrapper>
                                    </Route>
                                ))}
                              </Layout>
                            </Switch>
                          </ThemeProvider>
                      )}
                </PagesContext.Provider>
              </ConfigurationContext.Provider>
            </AuthContext.Provider>
          </BrowserRouter>
        </StylesProvider>
      </div>
  );
};

export default App;