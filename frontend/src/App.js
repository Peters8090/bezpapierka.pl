import React, {useEffect, useReducer, useState} from 'react';
import {StylesProvider} from '@material-ui/core/styles';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import {Auth} from './components/Auth/Auth';
import {GlobalStyle} from './components/GlobalStyle/GlobalStyle';
import {Pages} from './components/Pages/Pages';
import {useIsMount} from './utility';

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
  initDispatch: () => {},
});

const App = () => {
  const [init, initDispatch] = useReducer(initReducer, Object.fromEntries(
      Object.entries({...initActionTypes}).
          map(initActionType => [initActionType[0], false])));

  const [translationsDjango, setTranslationsDjango] = useState({});
  const [translationsDjangoJs, setTranslationsDjangoJs] = useState({});

  // django-admin makemessages doesn't pick up this function's calls (they are already defined in the django project)
  const gettextDjango = (text) => translationsDjango[text] ?? text;

  // django-admin makemessages picks up this function's calls (they are defined in the frontend project only)
  const gettext = (text) => translationsDjangoJs[text] ?? text;

  useEffect(() => {
    (async () => {
      setTranslationsDjango((await axios.get(
          'http://localhost:8000/i18n/django')).data.catalog);
      setTranslationsDjangoJs((await axios.get(
          'http://localhost:8000/i18n/djangojs')).data.catalog);
    })();
  }, []);

  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      console.log(gettextDjango('Contact page'));
    }
  }, [translationsDjango]);

  useEffect(() => {
    if (!isMount) {
      console.log(gettext('test djangojs'));
    }
  }, [translationsDjangoJs]);

  /* when app is not initialized, init is equal something like this:
    init = {
      AUTH: false,
      CONFIGURATION: false,
      PAGES: false,
    }

    when app is initialized (all properties are true):
    init = true */

  return (
      <div className="App">
        <StylesProvider injectFirst>
          <GlobalStyle/>
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