import React, {useContext, useEffect, useReducer, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {StylesProvider} from '@material-ui/core/styles';
import {Auth, AuthContext} from './components/Auth/Auth';
import {Configuration} from './components/Configuration/Configuration';
import {Pages} from './components/Pages/Pages';
import {Theme} from './components/Theme/Theme';

export const initActionTypes = {
  AUTH: 'AUTH',
  CONFIGURATION: 'CONFIGURATION',
  PAGES: 'PAGES',
};

const initReducer = (state, action) => {
  const newState = {...state};
  if (!(initActionTypes.hasOwnProperty(action.type))) {
    throw new Error('Should not get there!');
  }
  newState[action.type] = true;
  if (Object.values(newState).every(e => e === true)) {
    return true;
  } else {
    return newState;
  }
};

export const AppContext = React.createContext({
  apiUrl: '',
  init: false,
  initActionTypes: initActionTypes,
  initDispatch: (state, action) => {},
});

const App = () => {
  const [init, initDispatch] = useReducer(initReducer, Object.fromEntries(
      Object.entries({...initActionTypes}).
          map(initActionType => [initActionType[0], false])));
  /*

  when app is not initialized, init is equal something like this:
  init = {
    AUTH: false,
    CONFIGURATION: false,
    PAGES: false,
  }

  when app is initialized:
  init = true
   */

  return (
      <div className="App">
        <StylesProvider injectFirst>
          <BrowserRouter>
            <AppContext.Provider value={{
              // apiUrl: 'http://api-testy-bezpapierka-pl.piotr-bartoszewski.com',
              apiUrl: 'http://localhost:8000',
              init: init,
              initActionTypes: initActionTypes,
              initDispatch: initDispatch,
            }}>
              <Auth>
                <Pages/>
              </Auth>
            </AppContext.Provider>
          </BrowserRouter>
        </StylesProvider>
      </div>
  );
};

export default App;