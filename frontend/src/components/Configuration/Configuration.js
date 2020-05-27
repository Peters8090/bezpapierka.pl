import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../App';
import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {PagesContext} from '../Pages/Pages';

export const ConfigurationContext = React.createContext({
  configuration: {
    id: 1,
    site_name: '',
    favicon: '',
    logo: '',
    wave_border_height: 0,
    theme: '',
    primary_color: '',
    secondary_color: '',
    default_background_image: '',
    default_background_size: '',
  },
  fetchConfiguration: () => {},
});

export const Configuration = ({children}) => {
  const [configuration, setConfiguration] = useState({});

  const {message, handleError} = useHttpErrorHandler(true);

  const appContext = useContext(AppContext);
  const pagesAxios = useContext(PagesContext).axios;

  const fetchConfiguration = async () =>
      await handleError(async () => {
        setConfiguration((await pagesAxios.get('/configuration/1')).data);
      });

  useEffect(() => {
    if ((appContext.init[appContext.initActionTypes.PAGES]) === true) {
      fetchConfiguration().then(() => appContext.initDispatch({
        type: appContext.initActionTypes.CONFIGURATION,
      }));
    }
  }, [appContext.init[appContext.initActionTypes.PAGES]]);

  return (
      <ConfigurationContext.Provider value={{
        configuration: configuration,
        fetchConfiguration: fetchConfiguration,
      }}>
        {children}
        {message}
      </ConfigurationContext.Provider>
  );
};