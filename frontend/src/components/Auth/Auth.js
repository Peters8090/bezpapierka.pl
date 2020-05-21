import axios from 'axios';
import Cookie from 'js-cookie';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import {AppContext} from '../../App';
import {isEmpty} from '../../utility';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  authToken: '',
  authTokenDispatch: action => {},
  axios: axios,
});

export const actionTypes = {
  SET: 'SET',
  DELETE: 'DELETE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET:
      if(action.setCookie)
        Cookie.set('token', action.authToken, {expires: 365});
      return action.authToken;
    case actionTypes.DELETE:
      Cookie.remove('token');
      return '';
    default:
      throw new Error('Should not get there!');
  }
};

export const Auth = ({children}) => {
  const [authToken, authTokenDispatch] = useReducer(reducer, '');

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
        axios: axiosInstance,
      }}>
        {children}
      </AuthContext.Provider>
  );
};