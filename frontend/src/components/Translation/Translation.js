import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../App';
import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {useIsMount} from '../../utility';
import {ConfigurationContext} from '../Configuration/Configuration';

export const TranslationContext = React.createContext({
  gettext: () => {},
  gettextDjango: () => {},
});

export const Translation = ({children}) => {
  const [translationsDjango, setTranslationsDjango] = useState({});
  const [translationsDjangoJs, setTranslationsDjangoJs] = useState({});

  const {message, handleError} = useHttpErrorHandler(true);

  const appContext = useContext(AppContext);
  const configurationContext = useContext(ConfigurationContext);

  // django-admin makemessages doesn't pick up this function's calls (they are already defined in the django project)
  const gettextDjango = (text) => translationsDjango[text] ?? text;

  // django-admin makemessages picks up this function's calls (they are defined in the frontend project only)
  const gettext = (text) => translationsDjangoJs[text] ?? text;

  const fetchTranslation = async () =>
      await handleError(async () => {
        setTranslationsDjango((await axios.get(
            'http://localhost:8000/i18n/django')).data.catalog);
        setTranslationsDjangoJs((await axios.get(
            'http://localhost:8000/i18n/djangojs')).data.catalog);
      });

  useEffect(() => {
    if ((appContext.init[appContext.initActionTypes.CONFIGURATION]) === true || appContext.init === true) {
      fetchTranslation().then(() => appContext.initDispatch({
        type: appContext.initActionTypes.TRANSLATION,
      }));
    }
  }, [appContext.init[appContext.initActionTypes.CONFIGURATION], configurationContext.configuration]);

  return (
      <TranslationContext.Provider value={{
        gettext: gettext,
        gettextDjango: gettextDjango,
      }}>
        {children}
        {message}
      </TranslationContext.Provider>
  );
};