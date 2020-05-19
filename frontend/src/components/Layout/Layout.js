import Fab from '@material-ui/core/Fab';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {useContext, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useTheme} from '@material-ui/core';
import {ConfigurationContext, useCurrentPage} from '../../App';
import {ConfigurationAdmin} from '../CRUD/Admins/ConfigurationAdmin';
import {LoggedInOnly} from '../Miscellaneous/LoggedInOnly';
import {WaveBorder} from '../Miscellaneous/WaveBorder';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const LayoutContext = React.createContext({
  headerAdditionalItems: <div/>,
  setHeaderAdditionalItems: () => {},
  setBackgroundImageURL: () => {},
});

export const Layout = props => {
  const currentPage = useCurrentPage();
  const site_name = useContext(ConfigurationContext).site_name;
  const theme = useTheme();

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);
  const [headerAdditionalItems, setHeaderAdditionalItems] = useState(<div/>);
  const [backgroundImageURL, setBackgroundImageURL] = useState('');

  const styles = {
    main: {
      backgroundImage: `url('${backgroundImageURL}')`,
      backgroundColor: theme.palette.primary.main,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      '& > *:first-child': {
        minHeight: `calc(100vh - ${theme.misc.headerHeight} - ${theme.misc.waveBorderHeight})`,
        paddingTop: `calc(${theme.misc.headerHeight} + 1rem)`,
      },
    },
  };

  return (
      <Paper elevation={0}>
        <LayoutContext.Provider value={{
          headerAdditionalItems: headerAdditionalItems,
          setHeaderAdditionalItems: setHeaderAdditionalItems,
          setBackgroundImageURL: setBackgroundImageURL,
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
            <Fab color='secondary'
                 onClick={() => setConfigurationAdminOpen(true)}
                 css={{
                   position: 'fixed',
                   bottom: theme.spacing(3),
                   right: theme.spacing(3),
                 }}>
              <SettingsIcon/>
            </Fab>
            <ConfigurationAdmin setOpen={setConfigurationAdminOpen}
                                open={configurationAdminOpen}/>
          </LoggedInOnly>
        </LayoutContext.Provider>
      </Paper>
  );
};