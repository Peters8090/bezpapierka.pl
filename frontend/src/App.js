import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import {CRUDEditablePageWrapper} from './pages/CRUD editable/CRUDEditablePageWrapper';
import {Layout} from './components/Layout/Layout';
import {LoadingPage} from './pages/LoadingPage/LoadingPage';
import {LoginPage} from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/CRUD editable/HomePage/HomePage';
import Cookie from 'js-cookie';
import {OfferPage, OfferPageContext} from './pages/CRUD editable/OfferPage/OfferPage';
import {ContactPage} from './pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from './pages/CRUD editable/ContentPage/ContentPage';
import {plPL} from '@material-ui/core/locale';
import axios from 'axios';
import {isEmpty, useIsMount} from './utility';

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
  dispatchAuthToken: (action) => {},
});

export const apiUrl = 'http://localhost:8000';

const authTokenReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      if(action.setCookie)
        Cookie.set('token', action.authToken, {expires: 365});
      return action.authToken;
    case 'DELETE':
      Cookie.remove('token');
      return '';
    default:
      throw new Error('Should not get there!');
  }
};

const App = () => {
  const [configuration, setConfiguration] = useState({});
  const [pages, setPages] = useState([]);
  const [appInitialized, setAppInitalized] = useState(false);
  const [authToken, dispatchAuthToken] = useReducer(authTokenReducer, );

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
    if (Cookie.get('token')) {
      dispatchAuthToken({
        type: 'SET',
        authToken: Cookie.get('token'),
        setCookie: false,
      });
    } else {
      dispatchAuthToken({
        type: 'SET',
        authToken: '',
      })
    }
  }, []);

  const isMount = useIsMount();

  useEffect(() => {
    // to skip initial state
    if(!isMount)
      fetchData().then(() => setAppInitalized(true));
  }, [authToken]);

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
              dispatchAuthToken: dispatchAuthToken,
            }}>
              <ConfigurationContext.Provider value={configuration}>
                <PagesContext.Provider value={{
                  pages: pages,
                  fetchData: fetchData,
                }}>
                  {!appInitialized ?
                      <LoadingPage/>
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
                                      <CRUDEditablePageWrapper>
                                        <page.component/>
                                      </CRUDEditablePageWrapper>
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