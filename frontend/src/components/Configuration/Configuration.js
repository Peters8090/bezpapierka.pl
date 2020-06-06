import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';

import App, {AppContext} from '../../App';
import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {AuthContext} from '../Auth/Auth';
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
  const [init, setInit] = useState(false);

  const [configuration, setConfiguration] = useState({});

  const {message, handleError} = useHttpErrorHandler(true);

  const apiUrl = useContext(AppContext).apiUrl;
  const authHeader = useContext(AuthContext).authHeader;
  const configurationAxios = axios.create({
    baseURL: `${apiUrl}/pages/configuration/1`,
    headers: {
      ...authHeader,
    }
  });

  const fetchConfiguration = async () => {
    await handleError(async () => {
      setConfiguration((await configurationAxios.get()).data);
    });
  };

  useEffect(() => {
    fetchConfiguration().then(() => setInit(true));
  }, []);

  return (
      <ConfigurationContext.Provider value={{
        configuration: configuration,
        fetchConfiguration: fetchConfiguration,
      }}>
        {init && children}
        {message}
      </ConfigurationContext.Provider>
  );
};