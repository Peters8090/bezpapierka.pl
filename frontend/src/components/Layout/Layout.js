import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {useContext, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../Configuration/Configuration';
import {ConfigurationAdmin} from '../CRUD/Admins/ConfigurationAdmin';
import {LoggedInOnly} from '../Auth/LoggedInOnly';
import {WaveBorder} from '../Miscellaneous/WaveBorder';
import {PagesContext, useCurrentPage} from '../Pages/Pages';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const LayoutContext = React.createContext({
  headerAdditionalItems: <div/>,
  setHeaderAdditionalItems: () => {},
  setBackgroundImageURL: () => {},
  setBackgroundSize: () => {},
});

export const Layout = props => {
  const currentPage = useCurrentPage();
  const configuration = useContext(ConfigurationContext).configuration;

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);
  const [headerAdditionalItems, setHeaderAdditionalItems] = useState(<div/>);
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [backgroundSize, setBackgroundSize] = useState();

  const theme = useTheme();
  const styles = {
    root: css`
      display: flex;
      flex-direction: column;
      
      min-height: 100vh;
      
      background-color: ${theme.palette.secondary.main};
      background-attachment: fixed;
      background-size: ${backgroundSize ?? 'cover'};
      background-image: url('${backgroundImageURL}');
    `,
    main: css`
      flex: 1;
      
      display: flex;
      flex-direction: column;
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

  return (
      <Paper elevation={0} square css={styles.root}>
        <LayoutContext.Provider value={{
          headerAdditionalItems: headerAdditionalItems,
          setHeaderAdditionalItems: setHeaderAdditionalItems,
          setBackgroundImageURL: setBackgroundImageURL,
          setBackgroundSize: setBackgroundSize,
        }}>
          <Helmet>
            <title>{currentPage
                ? `${currentPage.title} | `
                : ''}{configuration.site_name}</title>
            <meta name="description"
                  content={currentPage && currentPage.description}/>
            <link rel='icon'
                  href={configuration.favicon}/>
            <link rel='apple-touch-icon'
                  href={configuration.favicon}/>
            <link rel="manifest" href={URL.createObjectURL(site_manifest)}/>
            <meta name="theme-color" content={theme.palette.primary.main}/>
          </Helmet>
          <Header additionalItems={headerAdditionalItems}/>
          <Box component='main' css={styles.main}>
            {props.children}
          </Box>
          <Footer/>
          <LoggedInOnly>
            <Fab color='primary'
                 onClick={() => setConfigurationAdminOpen(true)}
                 css={styles.fab}>
              <SettingsIcon/>
            </Fab>
            <ConfigurationAdmin setOpen={setConfigurationAdminOpen}
                                open={configurationAdminOpen}/>
          </LoggedInOnly>
        </LayoutContext.Provider>
      </Paper>
  );
};