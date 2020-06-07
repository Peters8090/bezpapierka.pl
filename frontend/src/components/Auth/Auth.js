import React, {useContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

import {AppContext} from '../../App';
import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {isEmpty} from '../../utility';

export const authTokenActionTypes = {
  SET: 'SET',
  DELETE: 'DELETE',
};

export const AuthContext = React.createContext({
  isLoggedIn: false,
  authTokenDispatch: action => {},
  authTokenActionTypes: authTokenActionTypes,
  axios: axios,
  authHeader: {},
});

const authTokenReducer = (state, action) => {
  switch (action.type) {
    case authTokenActionTypes.SET:
      if (action.setCookie)
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
  const [init, setInit] = useState(false);

  const [authToken, authTokenDispatch] = useReducer(authTokenReducer, '');

  const appContext = useContext(AppContext);

  const axiosInstance = axios.create({
    baseURL: `${appContext.apiUrl}/accounts`,
  });

  const {handleError, message} = useHttpErrorHandler(true);

  useEffect(() => {
    handleError(async () => {
      if (Cookie.get('token')) {
        try {
          await axios.get(`${appContext.apiUrl}/pages`, {
            headers: {
              Authorization: `Token ${Cookie.get('token')}`,
            },
          });
          authTokenDispatch({
            type: 'SET',
            authToken: Cookie.get('token'),
            setCookie: false,
          });
        } catch (_) {
          authTokenDispatch({
            type: authTokenActionTypes.DELETE,
          });
        } finally {
          setInit(true);
        }
      }
      setInit(true);
    });
  }, []);

  return (
      <AuthContext.Provider value={{
        isLoggedIn: !isEmpty(authToken),
        authTokenDispatch: authTokenDispatch,
        authTokenActionTypes: authTokenActionTypes,
        authHeader: isEmpty(authToken)
            ? {}
            : {Authorization: `Token ${authToken}`},

        axios: axiosInstance,
      }}>
        {init && children}
        {message}
      </AuthContext.Provider>
  );
};