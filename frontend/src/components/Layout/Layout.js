import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';
import {useTheme} from '@material-ui/core';
import {Helmet} from 'react-helmet';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {isEmpty} from '../../utility';

import {ConfigurationContext} from '../Configuration/Configuration';
import {ConfigurationAdmin} from '../CRUD/Admins/ConfigurationAdmin';
import {LoggedInOnly} from '../Auth/LoggedInOnly';
import {useCurrentPage} from '../Pages/Pages';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const LayoutContext = React.createContext({
  headerAdditionalItems: <div/>,
  setHeaderAdditionalItems: () => {},
  setBackgroundImage: () => {},
  setBackgroundSize: () => {},
  setHeadTitleParts: () => {},
  setHeadDescription: () => {},
});

export const Layout = ({children}) => {
  const currentPage = useCurrentPage();
  const configuration = useContext(ConfigurationContext).configuration;

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);
  const [headerAdditionalItems, setHeaderAdditionalItems] = useState(<div/>);

  const [headTitleParts, setHeadTitleParts] = useState([]);
  const [headDescription, setHeadDescription] = useState('');

  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundSize, setBackgroundSize] = useState('');

  const theme = useTheme();
  const styles = {
    root: css`
      display: flex;
      flex-direction: column;
      
      min-height: 100vh;
      
      background-color: ${theme.palette.secondary.main};
      background-attachment: fixed;
      background-image: url('${isEmpty(backgroundImage) ?
        configuration.default_background_image : backgroundImage}');
      background-size: ${isEmpty(backgroundSize) ?
        configuration.default_background_size : backgroundSize};
    `,
    main: css`
      flex: 1;
            
      display: flex;
      flex-direction: column;
      
      padding: 0 ${theme.spacing(2)}px;
    `,
    fab: css`
      position: fixed;
      bottom: ${theme.spacing(3)}px;
      right: ${theme.spacing(3)}px;
    `,
  };

  const site_manifest = new Blob([
    JSON.stringify({
      'short_name': configuration.site_name,
      'name': configuration.site_name,
      'start_url': '.',
      'display': 'standalone',
      'theme_color': theme.palette.type === 'light' ? '#000000' : '#ffffff',
      'background_color': theme.palette.background.paper,
    })], {type: 'application/json'});

  const headTitle =
      `${headTitleParts.join(' — ')}${isEmpty(headTitleParts)
          ? ''
          : ' | '}${configuration.site_name}`;

  return (
      <Paper elevation={0} square css={styles.root}>
        <LayoutContext.Provider value={{
          headerAdditionalItems: headerAdditionalItems,
          setHeaderAdditionalItems: setHeaderAdditionalItems,
          setBackgroundImage: setBackgroundImage,
          setBackgroundSize: setBackgroundSize,
          setHeadTitleParts: setHeadTitleParts,
          setHeadDescription: setHeadDescription,
        }}>
          <Helmet>
            <title>
              {headTitle}
            </title>
            <meta name="description"
                  content={headDescription}/>
            <link rel='icon'
                  href={configuration.favicon}/>
            <link rel='apple-touch-icon'
                  href={configuration.favicon}/>
            <link rel="manifest" href={URL.createObjectURL(site_manifest)}/>
            <meta name="theme-color" content={theme.palette.primary.main}/>
          </Helmet>
          <Header>
            {headerAdditionalItems}
          </Header>
          <Box component='main' css={styles.main}>
            {children}
          </Box>
          <Footer/>
          <LoggedInOnly>
            <Fab color='primary'
                 onClick={() => setConfigurationAdminOpen(true)}
                 css={styles.fab}>
              <SettingsIcon/>
            </Fab>
            <ConfigurationAdmin onClose={() => setConfigurationAdminOpen(false)}
                                open={configurationAdminOpen}/>
          </LoggedInOnly>
        </LayoutContext.Provider>
      </Paper>
  );
};