import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {ConfigurationContext} from '../../../../components/Configuration/Configuration';
import {PagesContext, useCurrentPage} from '../../../../components/Pages/Pages';
import {OfferDetails} from './OfferDetails/OfferDetails';

export const useCurrentOffer = () => {
  const currentOfferPage = useCurrentPage();
  const match = useRouteMatch();

  return currentOfferPage.offers.find(
      offer => offer.slug === match.params.offerSlug);
};

export const OfferDetailsPage = props => {
  const currentOfferPage = useCurrentPage();
  const offer = useCurrentOffer();
  const configuration = useContext(ConfigurationContext).configuration;

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
          <title>{currentOfferPage.title} — {offer.title} | {configuration.site_name}</title>
          <meta name="description" content={offer.description}/>
        </Helmet>
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
      </div>
  );
};