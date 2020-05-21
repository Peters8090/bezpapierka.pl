import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Route, Switch, useLocation, withRouter} from 'react-router-dom';
import {AppContext} from '../../App';
import {ContactPage} from '../../pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from '../../pages/CRUD editable/ContentPage/ContentPage';
import {HomePage} from '../../pages/CRUD editable/HomePage/HomePage';
import {OfferPage} from '../../pages/CRUD editable/OfferPage/OfferPage';
import {LoadingPage} from '../../pages/LoadingPage/LoadingPage';
import {LoginPage} from '../../pages/LoginPage/LoginPage';
import {NotFoundPage} from '../../pages/NotFoundPage/NotFoundPage';
import {isEmpty} from '../../utility';
import {AuthContext} from '../Auth/Auth';
import {Configuration} from '../Configuration/Configuration';
import {Layout} from '../Layout/Layout';
import {Theme} from '../Theme/Theme';

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
  fetchPages: () => {},
  axios: axios,
  is404: false,
});



export const Pages = () => {
  const [pages, setPages] = useState([]);
  const [is404, setIs404] = useState(false);

  const fetchPages = async () => {
    const fetchPage = async (url, component) => (await axiosInstance.get(
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

  const appContext = useContext(AppContext);
  // fetch pages after auth initialization to make sure the Authorization header will be added to the request
  useEffect(() => {
    if ((appContext.init[appContext.initActionTypes.AUTH]) === true) {
      fetchPages().then(() => appContext.initDispatch({
        type: appContext.initActionTypes.PAGES,
      }));
    }
  }, [appContext.init[appContext.initActionTypes.AUTH]]);

  const authContext = useContext(AuthContext);
  const apiUrl = useContext(AppContext).apiUrl;
  const axiosInstance = axios.create({
    baseURL: `${apiUrl}/pages`,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
    headers: {
      ...(isEmpty(authContext.authToken)
          ? {}
          : {'Authorization': `Token ${authContext.authToken}`}),
    },
  });

  return (
      <PagesContext.Provider value={{
        pages: pages,
        fetchPages: fetchPages,
        axios: axiosInstance,
        is404: is404,
      }}>
        <Configuration>
          {
            appContext.init === true ? (
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
                        <NotFoundPage setIs404={setIs404}/>
                      </Route>
                    </Switch>
                  </Layout>
                </Theme>
            ) : (
                <LoadingPage/>
            )
          }
        </Configuration>
      </PagesContext.Provider>
  );
};