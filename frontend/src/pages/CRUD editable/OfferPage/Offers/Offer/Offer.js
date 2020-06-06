import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {useHistory, useRouteMatch} from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {OfferAdmin} from '../../../../../components/CRUD/Admins/OfferPage/OfferAdmin';
import {LoggedInOnly} from '../../../../../components/Auth/LoggedInOnly';
import {TranslationContext} from '../../../../../components/Translation/Translation';

export const Offer = props => {
  const [offerEditDialogOpen, setOfferEditDialogOpen] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();

  const theme = useTheme();
  const styles = {
    root: css`
      ${theme.breakpoints.up('md')} {
        user-select: none;
        transition: 0.3s cubic-bezier(.47, 1.64, .41, .8);
        &:hover {
          transform: scale(1.04);
          cursor: pointer;
        }
      }
      margin: ${theme.spacing(2.5)}px;
    `,
    card: css`
      width: 100%;
      height: 100%;
      border-radius: ${theme.spacing(2.5)}px;
    `,
    learnMoreText: css`
      font-weight: bold;
      font-style: italic;
    `,
  };

  const translationContext = useContext(TranslationContext);
  const translations = {
    learnMoreText: translationContext.gettext`Learn more...`,
  }

  return (
      <Grid item
            md={5}
            onClick={_ => !offerEditDialogOpen && history.push(
                `${match.url}/${props.offer.slug}`)}
            css={styles.root}>

        <LoggedInOnly>
          <OfferAdmin offer={props.offer} onClose={() => setOfferEditDialogOpen(false)}
                      open={offerEditDialogOpen}/>
        </LoggedInOnly>

        <Card css={styles.card}>
          <BrandCardHeader image={props.offer.image} extra={(
              <LoggedInOnly>
                <IconButton onClick={event => {
                  event.stopPropagation();
                  setOfferEditDialogOpen(true);
                }}>
                  <EditIcon/>
                </IconButton>
              </LoggedInOnly>
          )}/>
          <CardContent>
            <TextInfoContent heading={props.offer.title}
                             overline={props.offer.superscription}
                             body={
                               <Typography color='textPrimary'>
                                 {props.offer.description}
                               </Typography>
                             }/>
            <Box pt={2}/>
            <Divider/>
            <Box pt={2}>
              <Typography variant='body1' align='right'
                          css={styles.learnMoreText}>
                {translations.learnMoreText}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
  );
};

Offer.propTypes = {
  offer: PropTypes.object.isRequired,
};