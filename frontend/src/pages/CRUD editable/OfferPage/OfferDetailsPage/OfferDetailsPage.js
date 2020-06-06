import {Dialog} from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {useRouteMatch} from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {LayoutContext} from '../../../../components/Layout/Layout';
import {useCurrentPage} from '../../../../components/Pages/Pages';
import {TranslationContext} from '../../../../components/Translation/Translation';
import {OfferDetails} from './OfferDetails/OfferDetails';

export const useCurrentOffer = () => {
  const currentOfferPage = useCurrentPage();
  const match = useRouteMatch();

  return currentOfferPage.offers.find(
      offer => offer.slug === match.params.offerSlug);
};

export const OfferDetailsPage = props => {
  const offer = useCurrentOffer();

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    offerImgAlt: gettext('Image for the offer'),
  };

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

  const layoutContext = useContext(LayoutContext);
  const currentOfferPage = useCurrentPage();
  useEffect(() => {
    layoutContext.setHeadTitleParts([offer.title, currentOfferPage.title]);
    layoutContext.setHeadDescription(offer.description);

    return () => {
      layoutContext.setHeadTitleParts([]);
      layoutContext.setHeadDescription('');
    };
  }, [offer.title, offer.description]);

  return (
      <Dialog open={true}
              fullScreen
              onClose={props.onClose}>
        <AppBar position='sticky' color='secondary'>
          <Toolbar>
            <IconButton edge="start" color="inherit"
                        onClick={props.onClose}>
              <CloseIcon/>
            </IconButton>
            <Box ml={2}
                 css={styles.appBarContent}>
              <Avatar
                  alt={translations.offerImgAlt}
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
      </Dialog>
  );
};
OfferDetailsPage.propTypes = {
  onClose: PropTypes.func.isRequired,
};