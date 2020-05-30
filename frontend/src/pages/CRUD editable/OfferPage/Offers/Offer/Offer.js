import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, {useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {
  Box,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid, useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {OfferAdmin} from '../../../../../components/CRUD/Admins/OfferPage/OfferAdmin';
import {LoggedInOnly} from '../../../../../components/Auth/LoggedInOnly';

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

  return (
      <Grid item
            md={5}
            onClick={_ => !offerEditDialogOpen && history.push(
                `${match.url}/${props.offer.slug}`)}
            css={styles.root}>

        <LoggedInOnly>
          <OfferAdmin offer={props.offer} setOpen={setOfferEditDialogOpen}
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
                Dowiedz się więcej...
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