import Fab from '@material-ui/core/Fab';
import {Home} from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {useContext, useState} from 'react';

import {Helmet} from 'react-helmet';
import {useTheme} from '@material-ui/core';
import {withRouter} from 'react-router';

import {ConfigurationContext, useCurrentPage} from '../../App';
import {ConfigurationAdmin} from '../CRUD/Admins/ConfigurationAdmin';
import {DialogWithProps} from '../CRUD/DialogForm/DialogForm';
import {WaveBorder} from '../Miscellaneous/WaveBorder';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

export const Layout = withRouter(props => {
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
      <React.Fragment>
        {currentPage && (
            <Helmet>
              <title>{currentPage.title} | {site_name}</title>
              <meta name="description" content={currentPage.description}/>
            </Helmet>
        )}
        <Header/>
        <main style={styles.main}>
          <div style={styles.pageWrapper}>
            {props.children}
          </div>
          <WaveBorder/>
        </main>
        <Footer/>

        <Fab color='secondary'
             onClick={() => setConfigurationAdminOpen(true)}
             style={{
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
      </React.Fragment>
  );
});