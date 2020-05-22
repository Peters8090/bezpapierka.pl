import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../App';
import {PagesContext} from '../Pages/Pages';

export const ConfigurationContext = React.createContext({
  configuration: {
    id: 1,
    site_name: '',
    logo: '',
    theme: '',
    primary_color: '',
    secondary_color: '',
    default_background_image: '',
  },
  fetchConfiguration: () => {},
});

export const Configuration = ({children}) => {
  const [configuration, setConfiguration] = useState({});

  const appContext = useContext(AppContext);
  const pagesAxios = useContext(PagesContext).axios;

  const fetchConfiguration = async () => {
    setConfiguration((await pagesAxios.get('/configuration/1')).data);
  };

  useEffect(() => {
    fetchConfiguration().then(() => appContext.initDispatch({
      type: appContext.initActionTypes.CONFIGURATION,
    }));
  }, []);

  return (
      <ConfigurationContext.Provider value={{
        configuration: configuration,
        fetchConfiguration: fetchConfiguration,
      }}>
        {children}
      </ConfigurationContext.Provider>
  );
};