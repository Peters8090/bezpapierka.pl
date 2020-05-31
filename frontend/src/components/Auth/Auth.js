import React, {useContext, useEffect, useReducer} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

import {AppContext} from '../../App';
import {isEmpty} from '../../utility';

export const authTokenActionTypes = {
  SET: 'SET',
  DELETE: 'DELETE',
};

export const AuthContext = React.createContext({
  isLoggedIn: false,
  authToken: '',
  authTokenDispatch: action => {},
  authTokenActionTypes: authTokenActionTypes,

  axios: axios,
});


const authTokenReducer = (state, action) => {
  switch (action.type) {
    case authTokenActionTypes.SET:
      if(action.setCookie)
        Cookie.set('token', action.authToken, {expires: 365});
      return action.authToken;
    case authTokenActionTypes.DELETE:
      Cookie.remove('token');
      return '';
    default:
      throw new Error('Should not get there!');
  }
};

export const Auth = ({children}) => {
  const [authToken, authTokenDispatch] = useReducer(authTokenReducer, '');

  const appContext = useContext(AppContext);

  const axiosInstance = axios.create({
    baseURL: `${appContext.apiUrl}/accounts`,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
  });

  useEffect(() => {
    if (Cookie.get('token')) {
      authTokenDispatch({
        type: 'SET',
        authToken: Cookie.get('token'),
        setCookie: false,
      });
    }
    appContext.initDispatch({
      type: appContext.initActionTypes.AUTH,
    });
  }, []);

  return (
      <AuthContext.Provider value={{
        isLoggedIn: !isEmpty(authToken),
        authToken: authToken,
        authTokenDispatch: authTokenDispatch,
        authTokenActionTypes: authTokenActionTypes,

        axios: axiosInstance,
      }}>
        {children}
      </AuthContext.Provider>
  );
};