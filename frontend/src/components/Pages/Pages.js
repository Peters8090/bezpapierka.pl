import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Route, Switch, useLocation} from 'react-router-dom';

import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {AppContext} from '../../App';
import {LoadingPage} from '../../pages/LoadingPage/LoadingPage';
import {LoginPage} from '../../pages/LoginPage/LoginPage';
import {NotFoundPage} from '../../pages/NotFoundPage/NotFoundPage';
import {isEmpty} from '../../utility';
import {Auth, AuthContext} from '../Auth/Auth';
import {Configuration} from '../Configuration/Configuration';
import {Layout} from '../Layout/Layout';
import {Theme} from '../Theme/Theme';
import {usePageTypes} from '../CRUD/Admins/PageAdmin/usePageTypes';
import {Translation} from '../Translation/Translation';

export const useCurrentPage = () => {
  const pagesContext = useContext(PagesContext);
  const location = useLocation();

  return pagesContext.pages.find(page => {
    if (page.exact)
      return location.pathname === page.link;
    else
      return location.pathname.includes(page.link);
  }) ?? {};
};

export const PagesContext = React.createContext({
  pages: [],
  fetchPages: () => {},
  axios: axios,
});

export const Pages = () => {
  const [init, setInit] = useState(false);

  const [pages, setPages] = useState([]);

  const {handleError, message, errorHasOccurred} = useHttpErrorHandler(true);

  const authContext = useContext(AuthContext);

  const pageTypes = usePageTypes();

  const fetchPages = async () =>
      await handleError(async () => {
        try {
          const fetchPage = async (url, component) => (await axiosInstance.get(
              url)).data.map(pageData => ({
            ...pageData,
            component: component,
          }));

          let tempPages = [];
          for (const {apiEndpoint, component} of pageTypes) {
            (await fetchPage(apiEndpoint, component)).forEach(
                page => tempPages.push(page));
          }
          setPages(tempPages);

        } catch (error) {
          if (error.response && error.response.status === 401) {
            authContext.authTokenDispatch({
              type: authContext.authTokenActionTypes.DELETE,
            });
          } else {
            throw error;
          }
        }
      });

  const appContext = useContext(AppContext);
  // fetch pages after auth initialization to make sure the Authorization header will be added to the request
  useEffect(() => {
    fetchPages().then(() => setInit(true));
  }, []);

  useEffect(() => {
    if (appContext.init === true) {
      fetchPages();
    }
  }, [authContext.isLoggedIn]);

  const apiUrl = useContext(AppContext).apiUrl;
  const axiosInstance = axios.create({
    baseURL: `${apiUrl}/pages`,
    headers: {
      ...authContext.authHeader,
    },
  });

  return (
      <PagesContext.Provider value={{
        pages: pages,
        fetchPages: fetchPages,
        axios: axiosInstance,
      }}>
        {init && (
            <Theme>
              <Layout>
                <Switch>
                  <Route path='/login' exact>
                    <LoginPage/>
                  </Route>

                  {pages.map(page => (
                      <Route path={page.link}
                             component={page.component}
                             key={page.id}
                             exact={page.exact}/>
                  ))}

                  <Route>
                    <NotFoundPage/>
                  </Route>
                </Switch>
              </Layout>
            </Theme>
        )}
        {message}
      </PagesContext.Provider>
  );
};