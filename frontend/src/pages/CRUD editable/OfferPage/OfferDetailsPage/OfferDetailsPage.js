import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {withRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {ConfigurationContext} from '../../../../components/Configuration/Configuration';
import {OfferPageContext} from '../OfferPage';
import {OfferDetails} from './OfferDetails/OfferDetails';

export const OfferDetailsPage = withRouter(props => {
  const offerPageContext = useContext(OfferPageContext);

  const offer = offerPageContext.offers.find(
      offer => offer.slug === props.match.params.offerSlug);
  const site_name = useContext(ConfigurationContext).configuration.site_name;

  const styles = {
    avatar: css`
        font-size: 36px;
      `,
    appBarContent: css`
        display: flex;
        justify-content: center;
        align-items: center;
      `,
    offerDetailsWrapper: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
  };

  return (
      <div>
        <Helmet>
          <title>{offerPageContext.title} — {offer.title} | {site_name}</title>
          <meta name="description" content={offer.description}/>
        </Helmet>

        <OfferDetailsPageContext.Provider value={offer}>
          <AppBar position='sticky' color='secondary'>
            <Toolbar>
              <IconButton edge="start" color="inherit"
                          onClick={props.dialogOnClose}>
                <CloseIcon/>
              </IconButton>
              <Box ml={2}
                   css={styles.appBarContent}>
                <Avatar
                    alt={offer.title}
                    src={offer.image}
                    css={styles.avatar}/>
                <Box ml={1.5}>
                  <Typography variant='h6'>{offer.title}</Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          <Box p={5}
               css={styles.offerDetailsWrapper}>
            <OfferDetails/>
          </Box>
        </OfferDetailsPageContext.Provider>
      </div>
  );
});

export const OfferDetailsPageContext = React.createContext({});