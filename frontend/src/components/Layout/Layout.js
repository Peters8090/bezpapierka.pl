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
import {DialogWithProps} from '../CRUD/DialogForm/DialogForm';
import {LoggedInOnly} from '../Miscellaneous/LoggedInOnly';
import {WaveBorder} from '../Miscellaneous/WaveBorder';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const Layout = props => {
  const currentPage = useCurrentPage();
  const site_name = useContext(ConfigurationContext).site_name;

  const theme = useTheme();

  const styles = {
    main: {
      backgroundImage: currentPage && `url('${currentPage.background_image}')`,
      backgroundColor: theme.palette.primary.main,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
    },
    pageWrapper: {
      minHeight: `calc(100vh - ${theme.misc.headerHeight} - ${theme.misc.waveBorderHeight})`,
      paddingTop: `calc(${theme.misc.headerHeight} + 1rem)`,
    },
  };

  const [configurationAdminOpen, setConfigurationAdminOpen] = useState(false);

  return (
      <Paper>
        {currentPage && (
            <Helmet>
              <title>{currentPage.title} | {site_name}</title>
              <meta name="description" content={currentPage.description}/>
            </Helmet>
        )}
        <Header/>
        <main css={styles.main}>
          <div css={styles.pageWrapper}>
            {props.children}
          </div>
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
          <DialogWithProps setOpen={setConfigurationAdminOpen}
                           open={configurationAdminOpen}>
            <ConfigurationAdmin/>
          </DialogWithProps>
        </LoggedInOnly>
      </Paper>
  );
};