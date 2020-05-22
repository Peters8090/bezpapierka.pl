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
  const is404 = useContext(PagesContext).is404;
  const site_name = useContext(ConfigurationContext).configuration.site_name;

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);
  const [headerAdditionalItems, setHeaderAdditionalItems] = useState(<div/>);
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [backgroundSize, setBackgroundSize] = useState();

  const styles = {
    main: css`
      background-color: ${theme.palette.secondary.main};
      background-attachment: fixed;
      background-size: ${backgroundSize ?? 'cover'};
      background-image: url('${backgroundImageURL}');
      & > *:first-child {
        min-height: calc(100vh - ${theme.misc.headerHeight} - ${is404 ? '0px' : theme.misc.waveBorderHeight});
        padding-top: calc(${theme.misc.headerHeight} + ${theme.spacing(4)}px);
      }
    `,
    fab: css`
      position: fixed;
      bottom: ${theme.spacing(3)}px;
      right: ${theme.spacing(3)}px;
    `,
  };

  return (
      <Paper elevation={0}>
        <LayoutContext.Provider value={{
          headerAdditionalItems: headerAdditionalItems,
          setHeaderAdditionalItems: setHeaderAdditionalItems,
          setBackgroundImageURL: setBackgroundImageURL,
          setBackgroundSize: setBackgroundSize,
        }}>
          {currentPage && (
              <Helmet>
                <title>{currentPage.title} | {site_name}</title>
                <meta name="description" content={currentPage.description}/>
              </Helmet>
          )}
          <Header additionalItems={headerAdditionalItems}/>
          <main css={styles.main}>
            {props.children}
            <WaveBorder/>
          </main>
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