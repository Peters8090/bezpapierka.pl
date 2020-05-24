import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, {useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  Box,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid, useTheme,
} from '@material-ui/core';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {OfferAdmin} from '../../../../../components/CRUD/Admins/OfferPage/OfferAdmin';
import {LoggedInOnly} from '../../../../../components/Auth/LoggedInOnly';

export const Offer = ({offer}) => {
  const theme = useTheme();

  const styles = {
    root: {
      [theme.breakpoints.up('md')]: {
        userSelect: 'none',
        transition: '0.3s cubic-bezier(.47, 1.64, .41, .8)',
        ':hover': {
          transform: 'scale(1.04)',
          cursor: 'pointer',
        },
      },
      margin: theme.spacing(2.5),
    },
    card: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
  };

  const [offerEditDialogOpen, setOfferEditDialogOpen] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();

  return (
      <Grid item
            md={5}
            onClick={_ => !offerEditDialogOpen && history.push(
                `${match.url}/${offer.slug}`)}
            css={styles.root}>

        <LoggedInOnly>
          <OfferAdmin offer={offer} setOpen={setOfferEditDialogOpen}
                      open={offerEditDialogOpen}/>
        </LoggedInOnly>

        <Card css={styles.card}>
          <BrandCardHeader image={offer.image} extra={(
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
            <TextInfoContent heading={offer.title}
                             overline={offer.superscription}
                             body={
                               <Typography color='textPrimary'>
                                 {offer.description}
                               </Typography>
                             }/>
            <Box p={1}/>
            <Divider/>
            <Box pt={2}>
              <Typography variant='body1' align='right' style={{
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
                Dowiedz się więcej...
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
  );
};