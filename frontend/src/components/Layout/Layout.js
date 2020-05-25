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
  const theme = useTheme();
  const site_name = useContext(ConfigurationContext).configuration.site_name;

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);
  const [headerAdditionalItems, setHeaderAdditionalItems] = useState(<div/>);
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [backgroundSize, setBackgroundSize] = useState();

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
                : ''}{site_name}</title>
            <meta name="description"
                  content={currentPage && currentPage.description}/>
            <link rel='icon'
                  href='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'/>
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